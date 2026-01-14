import { PopoverMenu } from "../ui/PopoverMenu";
import { CardActionForm } from "../card/CardActionForm";

export function CardActionMenu({
  anchorEl,
  isOpen,
  onClose,
  card,
  listId,
  mode, // "copy" or "move"
  onCopySubmit,
  onMoveSubmit,
}) {
  const title = mode === "copy" ? "Copy to..." : "Move to...";
  const submitButtonText = mode === "copy" ? "Create card" : "Move";
  const isCopyMode = mode === "copy";

  return (
    <PopoverMenu
      anchorEl={anchorEl}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      paperProps={{ sx: { mt: 1 } }}
      sx={{
        zIndex: theme => theme.zIndex.modal + 2,
      }}
    >
      <CardActionForm
        card={card}
        listId={listId}
        isCopyMode={isCopyMode}
        onCopySubmit={onCopySubmit}
        onMoveSubmit={onMoveSubmit}
        submitButtonText={submitButtonText}
      />
    </PopoverMenu>
  );
}
