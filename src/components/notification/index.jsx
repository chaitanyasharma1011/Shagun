"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  notificationState,
  hideNotification,
  removeNotification,
} from "@/redux/slices/notificationSlice";

import AppSnackbar from "./snackbar";

const Notification = () => {
  const dispatch = useDispatch();
  const { open, ...keys } = useSelector(notificationState);

  const onClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(hideNotification());
    const removeTimer = setTimeout(() => {
      dispatch(removeNotification());
      clearTimeout(removeTimer);
    }, 100);
  };

  const { severity, message, autoHideDuration, anchorOrigin, variant, icon } =
    keys;

  let messageTemp = message;
  if (typeof messageTemp === "string" && messageTemp) {
    messageTemp = (
      <span className="font-inter-medium text-sm">{messageTemp}</span>
    );
  }

  return (
    <AppSnackbar
      open={open}
      {...(icon && { icon })}
      onClose={onClose}
      severity={severity}
      message={messageTemp}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      variant={variant}
      sx={{ fontFamily: "var(--font-inter)" }}
    />
  );
};

export default Notification;
