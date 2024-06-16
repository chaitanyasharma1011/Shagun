"use client";

import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import _ from "lodash";
import { memo, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Input = styled(TextField, {
  shouldForwardProp: (props) => props !== "inputStyles",
})(({ theme, inputStyles }) => ({
  width: "100%",
  ".MuiInputLabel-shrink": {
    top: 2,
  },
  "& label": {
    fontFamily: "var(--font-inter)",
    fontSize: 14,
  },
  "& .MuiOutlinedInput-root": {
    // width: 350,
    width: "100%",
    fontFamily: "var(--font-inter)",
    fontSize: 14,
    lineHeight: "1.429em",
    "& input": {
      padding: "10px 14px",
      height: "inherit",
    },
    "& fieldset": {
      borderColor: "black",
    },
  },
  [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
    "& .MuiOutlinedInput-root": {
      // width: 350,
      minWidth: "100%",
    },
  },
  ...inputStyles,
}));

const AppInput = ({
  id,
  error = false,
  type = "text",
  variant = "outlined",
  label,
  helperText = "",
  placeholder,
  disabled = false,
  autoComplete = "off",
  name,
  value,
  onChange,
  sx = {},
  InputProps = {},
  minRows = 1,
  maxRows = 1,
  multiline = false,
  required = false,
  className = "",
  passwordMeter = false,
  popoverContent = "",
}) => {
  const [passwordToggle, setPasswordToggle] = useState(false);
  let inputType = type;
  if (inputType === "password")
    inputType = passwordToggle ? "text" : "password";

  return (
    <div className={`relative w-full ${className}`}>
      <Input
        size="small"
        variant={variant}
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        type={inputType}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        fullwidth="true"
        name={name}
        value={value}
        onChange={onChange}
        minRows={minRows}
        maxRows={maxRows}
        multiline={multiline}
        sx={sx}
        InputProps={InputProps}
      />
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
              <BsFillEyeSlashFill color="#3D3D3D" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// LOGIC TO SUPPORT DATE PICKER MEMOIZATION
const isEqual = (prev, next) => {
  const {
    error: prevError,
    helperText: prevHelperText,
    disabled: prevDisabled,
  } = prev;
  const prevValue = _.has(prev, "value") ? prev.value : prev.inputProps.value;
  const {
    error: nextError,
    helperText: nextHelperText,
    disabled: nextDisabled,
  } = next;
  const nextValue = _.has(next, "value") ? next.value : next.inputProps.value;
  return _.isEqual(
    [prevValue, prevError, prevDisabled, prevHelperText],
    [nextValue, nextError, nextDisabled, nextHelperText]
  );
};

export default memo(AppInput, isEqual);
