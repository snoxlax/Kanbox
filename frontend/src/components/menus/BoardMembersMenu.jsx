import { useMemo } from "react";
import { PopoverMenu } from "../ui/PopoverMenu";
import { Avatar } from "../ui/Avatar";
import "../../assets/styles/components/AddMemberMenu.css";

export function BoardMembersMenu({ board, anchorEl, isOpen, onClose }) {
  const { owner, members } = useMemo(() => {
    const boardOwner = board?.owner || null;
    const allMembers = board?.members || [];

    const nonOwnerMembers = boardOwner
      ? allMembers.filter(
          m => String(m.userId) !== String(boardOwner.userId)
        )
      : allMembers;

    return { owner: boardOwner, members: nonOwnerMembers };
  }, [board]);

  return (
    <PopoverMenu
      transitionDuration={0}
      anchorEl={anchorEl}
      isOpen={isOpen}
      onClose={onClose}
      title="Board members"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      paperProps={{ sx: { mt: 1, minWidth: 240 } }}
    >
      <div className="member-menu-content">
        <ul className="members-list">
          {owner && (
            <li className="member-menu-item">
              <div
                className="member-item-label"
                title={`${owner.fullname} (${owner.username})`}
              >
                <Avatar user={owner} size={32} />
                <span className="member-name">
                  {owner.fullname || owner.username}
                </span>
                <span className="owner-tag">Owner</span>
              </div>
            </li>
          )}
          {members.map(member => (
            <li key={member.userId} className="member-menu-item">
              <div
                className="member-item-label"
                title={`${member.fullname} (${member.username})`}
              >
                <Avatar user={member} size={32} />
                <span className="member-name">
                  {member.fullname || member.username}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PopoverMenu>
  );
}
