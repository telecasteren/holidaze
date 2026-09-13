import * as React from "react";
import { ClearIconButton } from "@/components/layout/ClearIconButton";
import { Box, Modal, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

const style: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 320,
  maxHeight: "90vh",
  overflowY: "auto",
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

type ModalWindowProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  content?: string | React.ReactNode;
};

export const ModalWindow = ({
  open,
  onClose,
  title,
  text,
  content,
}: ModalWindowProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          role="dialog"
          aria-modal="true"
          sx={(theme) => ({
            ...style,
            ...theme.applyStyles("dark", {
              backgroundColor: "#34383D",
            }),
          })}
        >
          <ClearIconButton onClick={onClose} />
          <Typography id="modal-title" variant="h6" component="h6">
            {title}
          </Typography>
          <Typography id="modal-description" variant="body1" component="p">
            {text}
          </Typography>
          {content && <Box>{content}</Box>}
        </Box>
      </Modal>
    </div>
  );
};
