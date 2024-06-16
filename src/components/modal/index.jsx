import React from "react";
import { IoIosClose } from "react-icons/io";

import { Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";

const CustomizedModal = styled(Modal, {
  shouldForwardProp: (props) => props !== "modalStyles",
})(({ theme, modalStyles }) => ({
  ...modalStyles,
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  border: "none",
  bgcolor: "background.paper",
  boxShadow: 24,
};
const AppModal = ({
  ariaLabelledBy,
  ariaDescribedBy,
  open = false,
  handleClose = () => {},
  sx = {},
  parentsx = {},
  children,
  className = "",
  ind,
  closeable = true,
}) => {
  return (
    <CustomizedModal
      key={ind}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      open={open}
      sx={parentsx}
      onClose={() => {
        closeable && handleClose();
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          className={`max-h-[90%] productunderstading-scrollablediv overflow-auto rounded-md relative ${className}`}
          sx={{ ...style, ...sx }}
        >
          {closeable ? (
            <div className="absolute top-4 right-4">
              <IoIosClose onClick={handleClose} size={30} />
            </div>
          ) : null}
          {children}
        </Box>
      </Fade>
    </CustomizedModal>
  );
};
export default AppModal;
