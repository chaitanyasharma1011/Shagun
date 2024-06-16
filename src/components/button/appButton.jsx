import { Button } from "@mui/material";
import styled from "@emotion/styled";

const CustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "var(--font-inter)",
  padding: "8px 16px",
  lineHeight: 1.715,
  // "&.Mui-disabled": {
  //   color: "#b7b7b7",
  //   backgroundColor: "grey",
  // },
}));

const AppButton = ({
  children,
  variant = "contained",
  component = "",
  disabled = false,
  startIcon = null,
  color = "primary",
  endIcon = null,
  className = "",
  sx = {},
  ...keys
}) => (
  <CustomButton
    color={color}
    component={component}
    disabled={disabled}
    startIcon={startIcon}
    endIcon={endIcon}
    variant={variant}
    type="submit"
    onClick={keys.onClick}
    className={className}
    sx={sx}
  >
    {children}
  </CustomButton>
);

export default AppButton;
