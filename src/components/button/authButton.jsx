"use client";

import { Button } from "@mui/material";
import styled from "@emotion/styled";

const CustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "var(--font-inter)",
  padding: "8px 16px",
  lineHeight: 1.715,
  "&.Mui-disabled": {
    color: "#b7b7b7",
    backgroundColor: "grey",
  },
}));

const AuthButton = ({ children, ...keys }) => (
  <CustomButton
    color="primary"
    variant="contained"
    fullWidth
    type="submit"
    className={keys.className || ""}
    onClick={keys.onClick}
    disabled={keys.disabled || false}
  >
    {children}
  </CustomButton>
);

export default AuthButton;
