import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ClearIconButton }  from "@/components/layout/ClearIconButton"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

type ModalWindowProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  content?: string | React.ReactNode;
};

export const ModalWindow = ({ open, onClose, title, text, content }: ModalWindowProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
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
}
