"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

// COMPONENTS
// import PasswordMeter from "./passwordMeter";

const Input = styled("input", {
  shouldForwardProp: (props) => props !== "error",
})(({ theme, error, disabled }) => ({
  width: "100%",
  fontFamily: "var(--font-inter)",
  fontSize: 14,
  outline: "none",
  padding: 8,
  borderRadius: 6,
  lineHeight: "20px",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "white",
  backgroundColor: "#06071B",
  transition: "border-color 150ms ease-in-out",
  ...(!disabled && {
    color: "#B1B5C4",
  }),
  ...(!disabled &&
    !error && {
      "&:hover, &:focus": {
        borderColor: theme.palette.primary.main,
      },
    }),
  ...(!disabled &&
    error && {
      borderColor: "#df6868",
    }),
  ...(disabled && {
    borderColor: "grey",
    color: "grey",
    "::placeholder": {
      color: "grey",
    },
    "::-webkit-input-placeholder": {
      color: "grey",
    },
    ":-ms-input-placeholder": {
      color: "grey",
    },
    cursor: "not-allowed",
  }),
}));

const PopoverWrapper = styled("div")({
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(99, 99, 99, 0.2))",
  marginTop: 1.5,
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 8,
    width: 10,
    height: 10,
    backgroundColor: "#ffffff",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
  position: "absolute",
  backgroundColor: "#ffffff",
  borderRadius: 4,
  right: 0,
  top: 48,
});

const AuthInput = ({
  id,
  register = {},
  error = false,
  type = "text",
  label: inputLabel,
  helperText = "",
  placeholder,
  disabled = false,
  autoComplete = "off",
  style = {},
  name,
  value,
  onChange,
  required = false,
  className = "",
  passwordMeter = false,
  popoverContent = "",
}) => {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [popover = false, setPopover] = useState();

  const onTogglePopover = (popoverTemp) => {
    setPopover(popoverTemp);
  };

  let inputType = type;
  if (inputType === "password")
    inputType = passwordToggle ? "text" : "password";

  const inputStyles = (type) => {
    switch (type) {
      case "password":
        return { paddingRight: 35 };
      case "phone":
        return { paddingLeft: 35 };
      case "subdomain":
        return { paddingLeft: 65, paddingRight: 160 };
      default:
        return {};
    }
  };
  return (
    <div
      className={`space-y-[6px] w-full${className ? ` ${className}` : ""}`}
      style={style}
    >
      {inputLabel && (
        <label
          htmlFor={id}
          className="font-montserrat font-semibold text-xs tracking-wide text-[#B1B5C4]"
        >
          <span>{inputLabel.toUpperCase()}</span>
          {required && <span className="text-[#ff4d4f]"> *</span>}
        </label>
      )}
      {/* {passwordMeter && <PasswordMeter value={value} />} */}
      <div className="relative w-full">
        <Input
          id={id}
          {...register}
          error={error}
          type={inputType}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          fullwidth="true"
          name={name}
          value={value}
          onChange={onChange}
          style={inputStyles(type)}
          onMouseOver={() => {
            if (!popoverContent) return;
            if (popover) return;
            onTogglePopover(true);
          }}
          onMouseOut={() => {
            if (!popover) return;
            onTogglePopover(false);
          }}
        />
        {/* DEBUG- DISABLE PASSWORD HIDE/SHOW WHEN INPUT IS DISABLED */}
        {type === "password" && (
          <div className="absolute right-[12px] top-[12px]">
            {passwordToggle && (
              <div
                onClick={() => setPasswordToggle(false)}
                role="button"
                tabIndex="0"
              >
                <BsFillEyeFill color="#1982F8" />
              </div>
            )}
            {!passwordToggle && (
              <div
                onClick={() => setPasswordToggle(true)}
                role="button"
                tabIndex="0"
              >
                <BsFillEyeSlashFill color="#ffffff" />
              </div>
            )}
          </div>
        )}
        {type === "phone" && (
          <p className="absolute left-2 top-[10px] text-gray-400 text-sm">
            +91
          </p>
        )}
        {popover && <PopoverWrapper>{popoverContent}</PopoverWrapper>}
      </div>
      {helperText && (
        <span
          className={`font-montserrat text-xs${
            error ? " text-[#df6868]" : " text-white"
          }`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default AuthInput;
