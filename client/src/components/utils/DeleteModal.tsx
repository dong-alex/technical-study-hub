import React, { FunctionComponent } from "react";
import { Modal, Button } from "react-materialize";

type DeleteModalProps = {
  open: boolean;
  onDelete: () => void; // shell function to call within the parent component
  onModalClose: Function;
};

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  open,
  onDelete,
  onModalClose,
}) => {
  return (
    <Modal
      actions={[
        <Button
          flat
          modal="close"
          node="button"
          waves="green"
          onClick={() => {
            onModalClose();
          }}
        >
          No
        </Button>,
        <Button
          flat
          modal="close"
          node="button"
          waves="green"
          onClick={() => {
            onDelete();
          }}
        >
          Yes
        </Button>,
      ]}
      fixedFooter
      header="Delete item"
      open={open}
      options={{
        dismissible: true,
        endingTop: "10%",
        inDuration: 250,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: "4%",
      }}
    >
      Are you sure you want to delete this item?
    </Modal>
  );
};

export default DeleteModal;
