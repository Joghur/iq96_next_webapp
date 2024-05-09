"use client";

import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

import { PrimaryButton } from "@/components/ui/buttons/Buttons";

type Props = {
  popupLabel: string;
  values?: string[];
  open: boolean;
  onModalClose?: () => void;
  children?: ReactNode;
  size?: "sm" | "lg" | "xl";
};

const Popup = ({
  popupLabel,
  values,
  open,
  onModalClose,
  children,
  size = "lg",
}: Props) => {
  return (
    <Modal
      show={open}
      onHide={onModalClose}
      size={size}
      scrollable
      data-cy="form-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{popupLabel}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-nowrap">
        {values &&
          values.map((value, index) => (
            <div key={`modal-body-${index}`}>{value}</div>
          ))}
        {children && children}
      </Modal.Body>
      <Modal.Footer>
        <PrimaryButton onClick={onModalClose} data-cy={"ok-button"}>
          OK
        </PrimaryButton>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
