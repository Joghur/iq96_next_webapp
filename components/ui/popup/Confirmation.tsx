"use client";

import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

import { DangerButton, PrimaryButton } from "@/components/ui/buttons/Buttons";

type Props = {
  header?: string;
  label: string;
  values?: string[];
  open: boolean;
  onModalConfirm?: () => void;
  onModalCancel?: () => void;
  children?: ReactNode;
};

const ConfirmationPopup = ({
  header,
  label,
  open,
  onModalConfirm,
  onModalCancel,
}: Props) => {
  return (
    <Modal
      show={open}
      onHide={onModalCancel}
      size="sm"
      scrollable
      data-cy="confirmation-form-modal"
    >
      {header && (
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body className="text-nowrap">{label}</Modal.Body>
      <Modal.Footer>
        <PrimaryButton onClick={onModalConfirm} data-cy={"ok-button"}>
          OK
        </PrimaryButton>
        <DangerButton onClick={onModalCancel} data-cy={"cancel-button"}>
          Fortryd
        </DangerButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationPopup;
