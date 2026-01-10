import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";

const TRELLO_COLORS = [
  { bgcolor: "#0066FF", color: "#E5E5E5" }, // Bold Blue
  { bgcolor: "#E53935", color: "#292A2E" }, // Bold Red
  { bgcolor: "#FFB300", color: "#292A2E" }, // Bold Orange-Yellow
  { bgcolor: "#43A047", color: "#292A2E" }, // Bold Green
  { bgcolor: "#00ACC1", color: "#292A2E" }, // Bold Cyan
  { bgcolor: "#8E24AA", color: "#E5E5E5" }, // Bold Purple
  { bgcolor: "#E91E63", color: "#292A2E" }, // Bold Pink-Magenta
  { bgcolor: "#FDD835", color: "#292A2E" }, // Bold Yellow-Gold
  { bgcolor: "#8E241A", color: "#E5E5E5" }, // Bold Dark Gray
  { bgcolor: "#616161", color: "#E5E5E5" }, // Bold Medium Gray
];

export function Avatar({ user, size = 24, fontSize = 12 }) {
  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return TRELLO_COLORS[Math.abs(hash) % TRELLO_COLORS.length];
  }

  function stringAvatar(name) {
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";
    const colorConfig = stringToColor(name);

    return {
      sx: {
        bgcolor: colorConfig.bgcolor,
        color: colorConfig.color,
        fontSize: fontSize,
      },
      children: `${first}${second}`,
    };
  }

  const avatarProps = stringAvatar(user.fullname);

  return (
    <MuiAvatar
      sx={{
        width: size,
        height: size,
        ...avatarProps.sx,
      }}
      alt={user.fullname}
    >
      {avatarProps.children}
    </MuiAvatar>
  );
}
