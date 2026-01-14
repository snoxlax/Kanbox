import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArchiveOutlined,
  ContentCopyOutlined,
  Check,
  East,
  LinkOutlined,
  OpenInNew,
  PermIdentity,
  TurnedInNotOutlined,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import { Popover } from "@mui/material";
import { AddMemberMenu } from "./AddMemberMenu";
import { CardActionMenu } from "./CardActionMenu";
import { CardCoverMenu } from "./CardCoverMenu";
import { LabelMenu } from "./LabelMenu";
import { copyCard, moveCard } from "../../store/actions/board-actions";

export function CardPopover({
  card,
  listId,
  open,
  anchorEl,
  id,
  openCard,
  handleClose,
  handleDelete,
}) {
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const { boardId } = useParams();

  function handleMenuItemClick(e, menuKey) {
    e.stopPropagation();

    const actions = {
      open: () => openCard(),
      archive: () => handleDelete(),

      editLabels: () => {
        setSubmenuAnchorEl(e.currentTarget);
        setActiveSubmenu(menuKey);
      },

      changeCover: () => {
        setSubmenuAnchorEl(e.currentTarget);
        setActiveSubmenu(menuKey);
      },

      copyLink: () => {
        navigator.clipboard.writeText(
          `${window.location.origin}/board/${boardId}/${listId}/${card._id}`
        );
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      },

      changeMembers: () => {
        setSubmenuAnchorEl(e.currentTarget);
        setActiveSubmenu(menuKey);
      },

      copyCard: () => {
        setSubmenuAnchorEl(e.currentTarget);
        setActiveSubmenu(menuKey);
      },

      moveCard: () => {
        setSubmenuAnchorEl(e.currentTarget);
        setActiveSubmenu(menuKey);
      },
    };

    actions[menuKey]?.();
  }

  function handleCopyCardSubmit(formData) {
    const {
      boardId: destinationBoardId,
      keepLabels,
      keepMembers,
      listId: destinationListId,
      position,
      title,
    } = formData;

    const copyData = {
      sourceBoardId: boardId,
      destinationBoardId,
      sourceListId: listId,
      destinationListId,
      keepLabels,
      keepMembers,
      position,
      title,
    };

    copyCard(copyData, card);
    handleSubmenuClose();
    handleClose();
  }

  function handleMoveCardSubmit(formData) {
    const {
      boardId: destinationBoardId,
      listId: destinationListId,
      position,
    } = formData;

    const moveData = {
      sourceBoardId: boardId,
      sourceListId: listId,
      destinationBoardId,
      destinationListId,
      position,
    };

    moveCard(moveData, card);
    handleSubmenuClose();
    handleClose();
  }

  function handleSubmenuClose() {
    setSubmenuAnchorEl(null);
    setActiveSubmenu(null);
  }

  const isSubmenuOpen = Boolean(submenuAnchorEl);

  return (
    <>
      <Popover
        transitionDuration={150}
        disableEnforceFocus
        disableAutoFocus
        className="card-popover"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          zIndex: theme => theme.zIndex.modal + 1,
        }}
        slotProps={{
          paper: {
            sx: {
              background: "transparent",
              boxShadow: "none",
            },
          },
          backdrop: {
            sx: {
              backgroundColor: "hsla(0, 0%, 0%, 0.6)",
            },
          },
        }}
      >
        <div className="card-popover-content">
          {cardActionsMenuItems().map(({ label, key, icon }) => (
            <button
              key={key}
              onClick={e => handleMenuItemClick(e, key)}
              className={`card-menu-button ${
                activeSubmenu === key ? "is-active" : ""
              }`}
            >
              {key === "copyLink" && copiedLink ? (
                <Check sx={{ color: "#22c55e" }} />
              ) : (
                icon
              )}
              {label}
            </button>
          ))}
        </div>
      </Popover>
      {isSubmenuOpen && activeSubmenu === "changeMembers" && (
        <AddMemberMenu
          boardId={boardId}
          listId={listId}
          card={card}
          anchorEl={submenuAnchorEl}
          isMemberMenuOpen={isSubmenuOpen}
          onCloseMemberMenu={handleSubmenuClose}
          sx={{
            zIndex: theme => theme.zIndex.modal + 2,
          }}
        />
      )}
      {isSubmenuOpen && activeSubmenu === "editLabels" && (
        <LabelMenu
          card={card}
          anchorEl={submenuAnchorEl}
          isLabelMenuOpen={isSubmenuOpen}
          onCloseLabelMenu={handleSubmenuClose}
          sx={{
            zIndex: theme => theme.zIndex.modal + 2,
          }}
        />
      )}
      {isSubmenuOpen && activeSubmenu === "changeCover" && (
        <CardCoverMenu
          card={card}
          anchorEl={submenuAnchorEl}
          isOpen={isSubmenuOpen}
          onClose={handleSubmenuClose}
          sx={{
            zIndex: theme => theme.zIndex.modal + 2,
          }}
        />
      )}
      {isSubmenuOpen &&
        (activeSubmenu === "copyCard" || activeSubmenu === "moveCard") && (
          <CardActionMenu
            anchorEl={submenuAnchorEl}
            isOpen={isSubmenuOpen}
            onClose={handleSubmenuClose}
            card={card}
            listId={listId}
            mode={activeSubmenu}
            onCopySubmit={handleCopyCardSubmit}
            onMoveSubmit={handleMoveCardSubmit}
          />
        )}
    </>
  );
}

function cardActionsMenuItems() {
  return [
    { label: "Open card", key: "open", icon: <OpenInNew /> },
    {
      label: "Edit labels",
      key: "editLabels",
      icon: <TurnedInNotOutlined />,
    },
    {
      label: "Change members",
      key: "changeMembers",
      icon: <PermIdentity />,
    },
    {
      label: "Change cover",
      key: "changeCover",
      icon: <DriveFileRenameOutline />,
    },
    { label: "Move card", key: "moveCard", icon: <East /> },
    { label: "Copy card", key: "copyCard", icon: <ContentCopyOutlined /> },
    { label: "Copy link", key: "copyLink", icon: <LinkOutlined /> },
    { label: "Archive", key: "archive", icon: <ArchiveOutlined /> },
  ];
}
