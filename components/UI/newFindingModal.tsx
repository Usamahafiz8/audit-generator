import React, { Dispatch, SetStateAction } from "react";
import { Modal, Text } from "@nextui-org/react";
import FindingModalForm from "./findingModalFrom";
import { Audit } from "../../types/types";

const FindingModal: React.FC<{
    auditId : string | string[]
    audit: Audit
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ audit,open, setOpen, auditId }) => {
  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Modal
      closeButton
      width="600px"
      aria-labelledby="modal-title"
      open={open}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text b id="modal-title" size={18}>
          Add New Finding
        </Text>
      </Modal.Header>
      <Modal.Body>
        <FindingModalForm audit={audit} auditId={auditId} setOpen={setOpen}/>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default FindingModal;
