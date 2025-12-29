import { createTheme } from "@mui/material/styles";

const FONT_FALLBACK =
  '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';

const muiTheme = createTheme({
  typography: {
    fontFamily: FONT_FALLBACK,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },

  useCssVariables: false,
  /**
   * Component Style Overrides (Dark Theme)
   *
   * Custom styling for form components with dark mode colors.
   */
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // removes the overlay
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--gray5, #040a10)", // Input field background color
          color: "var(--gray1, #ddd)", // Input text color
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--form-input-border-color, #4a9eff)", // Input border color on hover (light blue)
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--form-input-border-color, #4a9eff)", // Input border color when focused (light blue)
          },
          "& .MuiInputBase-input::placeholder": {
            color: "var(--form-input-placeholder-color, var(--gray2, #aaa))", // Placeholder text color
            opacity: 1, // Placeholder opacity
          },
        },
        notchedOutline: {
          borderColor: "var(--form-input-border-color, #4a9eff)", // Default input border color (light blue)
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#CECFD2", // Label text color (off-white)
          "&.Mui-focused": {
            color: "#669DF1", // Label text color when input is focused (blue)
          },
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        slotProps: {
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 4],
                },
              },
            ],
          },
        },
      },
      styleOverrides: {
        root: {
          cursor: "pointer", // Autocomplete root cursor (pointer)
          "& .MuiInputBase-root": {
            cursor: "pointer", // Input base cursor (pointer)
            padding: "4px 8px", // Reduced padding for smaller size
          },
          "& .MuiInputBase-input": {
            cursor: "pointer", // Input cursor (pointer)
            caretColor: "transparent", // Hide caret when not focused
            padding: "4px 8px", // Reduced padding for smaller size
            fontSize: "14px", // Smaller font size
            "&::selection": {
              backgroundColor: "transparent", // Transparent text selection
            },
          },
          "& .MuiInputBase-input:focus": {
            caretColor: "auto", // Show caret when focused
          },
          "& .MuiInputLabel-root": {
            fontSize: "14px", // Smaller label font size
          },
        },
        popper: {
          zIndex: 1500,
        },
        paper: {
          backgroundColor: "#2B2C2F", // Autocomplete dropdown background color (very dark gray)
          color: "#CECFD2", // Autocomplete dropdown text color (light gray)
          border: "none",
        },
        listbox: {
          "& .MuiAutocomplete-option": {
            color: "#CECFD2", // Autocomplete option text color (light gray)
            borderLeft: "3px solid transparent", // Default transparent border to maintain spacing
            "&:hover": {
              backgroundColor: "#303134", // Autocomplete option background on hover (lighter dark gray)
            },
            "&.Mui-focused": {
              backgroundColor: "#303134", // Autocomplete option background when focused (lighter dark gray)
            },
            "&[aria-selected='true']": {
              backgroundColor: "transparent", // Selected option background (transparent)
              borderLeft: "3px solid #669DF1", // Selected option left border (blue)
              "&:hover": {
                backgroundColor: "#123263", // Selected option background on hover (blue)
              },
              "&.Mui-focused": {
                backgroundColor: "#123263", // Selected option background when focused (blue)
              },
            },
          },
        },
        popupIndicator: {
          color: "#CECFD2", // Dropdown arrow icon color (light gray)
        },
        clearIndicator: {
          color: "#CECFD2", // Clear/close button icon color (light gray)
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#A9ABAF", // Unchecked checkbox border/icon color (medium gray)
          "& .MuiSvgIcon-root": {
            color: "#A9ABAF", // Unchecked checkbox icon color (medium gray)
          },
          "&.Mui-checked": {
            color: "#669DF1", // Checked checkbox color (blue)
            "& .MuiSvgIcon-root": {
              color: "#669DF1", // Checked checkbox icon color (blue)
            },
          },
          "&:hover": {
            backgroundColor: "#CECED912", // Checkbox background on hover (very light gray)
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#8fb8f6", // Button background color (light blue, matching card-save-button)
          color: "#000000", // Button text color
          padding: "6px 12px",
          minWidth: 0, // Remove default min-width
          lineHeight: "20px", // Line height
          boxShadow: "none", // Remove default box shadow
          borderRadius: "4px",
          textTransform: "none", // Prevent uppercase text transformation
          "&:hover": {
            backgroundColor: "#6f9ce6", // Button background on hover (darker blue, matching card-save-button)
            color: "#000000", // Button text color on hover
          },
          "&:active": {
            backgroundColor: "#6f9ce6", // Button background when active (darker blue)
            color: "#000000", // Button text color when active
          },
          "&.Mui-disabled": {
            backgroundColor: "#F7F8F9", // Disabled button background (light gray)
            color: "#7D818A", // Disabled button text color (gray)
            border: "1px solid #7D818A", // Disabled button border
          },
        },
        outlined: {
          backgroundColor: "transparent", // Outlined button background (transparent)
          color: "#8fb8f6", // Outlined button text color (brand blue)
          border: "1px solid #8fb8f6", // Outlined button border (brand blue)
          "&:hover": {
            backgroundColor: "rgba(143, 184, 246, 0.1)", // Outlined button background on hover (subtle blue tint)
            color: "#8fb8f6", // Outlined button text color on hover (brand blue)
            border: "1px solid #8fb8f6", // Outlined button border on hover
          },
          "&:active": {
            backgroundColor: "#6f9ce6", // Outlined button background when active (darker blue)
            color: "#000000", // Outlined button text color when active (black)
            border: "1px solid #6f9ce6", // Outlined button border when active
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent", // Disabled outlined button background (transparent)
            color: "#7D818A", // Disabled outlined button text color (gray)
            border: "1px solid #7D818A", // Disabled outlined button border
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "14px",
        },
        secondary: {
          fontSize: "14px",
        },
      },
    },
    MuiTextareaAutosize: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--gray5, #040a10)", // Input field background color
          color: "var(--gray1, #ddd)", // Input text color
          border: "1px solid var(--form-input-border-color, #4a9eff)", // Default border color
          borderRadius: "4px",
          padding: "0.5rem",
          fontFamily: "inherit",
          fontSize: "inherit",
          "&:hover": {
            borderColor: "var(--form-input-border-color, #4a9eff)", // Border color on hover
          },
          "&:focus": {
            outline: "none",
            borderColor: "var(--form-input-border-color, #4a9eff)", // Border color when focused
          },
          "&::placeholder": {
            color: "var(--form-input-placeholder-color, var(--gray2, #aaa))", // Placeholder text color
            opacity: 1, // Placeholder opacity
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#374151", // dark surplus background
          color: "var(--grey1)", // white "+X" text
          border: "1px solid #1f2937", // dark border for surplus
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          "& .MuiAvatar-root": {
            border: "transparent",
            fontWeight: 500,
            lineHeight: "24px",
          },
          "& .MuiAvatarGroup-avatar": {
            border: "0px solid transparent", // dark border, override MUI default
            color: "var(--gray1)",
            backgroundColor: "var(--gray5)",
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
        size: "small",
      },
      styleOverrides: {
        root: {
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          color: "#CECFD2",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "var(--gray4)",
            color: "#CECFD2",
          },
          "&.Mui-selected": {
            color: "#FFFFFF",
            backgroundColor: "#1868DB",
            "&:hover": {
              backgroundColor: "#144794",
              color: "#FFFFFF",
            },
          },
          variants: [
            {
              props: { variant: "square" },
              style: {
                borderRadius: "4px",
              },
            },
          ],
        },
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: "small",
      },
    },
  },
});

export { muiTheme };
