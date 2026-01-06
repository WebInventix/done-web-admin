import * as React from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  outlined: "none",
};

const CustomModal = ({ children, isOpen, setIsOpen }) => {
  return (
    <Modal
      keepMounted
      open={isOpen}
      onClose={setIsOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        "& .MuiPaper-root": {
          // Target the root Paper component inside Modal
          border: "none",
          border: "5px solid blue",
        },
      }}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
