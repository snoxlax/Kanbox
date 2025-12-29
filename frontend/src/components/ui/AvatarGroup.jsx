import { AvatarGroup as MuiAvatarGroup } from "@mui/material";

export function AvatarGroup({
  fontSize = 12,
  size = 24,
  max = 3,
  children,
  sx,
  ...props
}) {
  const defaultSx = {
    "& .MuiAvatarGroup-avatar": {
      width: size,
      height: size,
      fontSize: fontSize,
    },
    ...sx,
  };

  return (
    <MuiAvatarGroup spacing={5} max={max} sx={defaultSx} {...props}>
      {children}
    </MuiAvatarGroup>
  );
}
