import React, { FunctionComponent } from "react";
import { DialogActions, Button, DialogTitle, Dialog } from "@material-ui/core";

type DeleteModalProps = {
  open: boolean;
  onDelete: () => void; // shell function to call within the parent component
  onModalClose: () => void;
};

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  open,
  onDelete,
  onModalClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        onModalClose();
      }}
    >
      <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
      <DialogActions>
        <Button color="secondary" onClick={onModalClose}>
          No
        </Button>
        <Button color="primary" onClick={onDelete}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
