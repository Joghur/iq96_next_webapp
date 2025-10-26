'use client';

import Modal from '@components/Modal';
import { Button } from '@components/ui/button';
import { ReactNode } from 'react';

type Props = {
  popupLabel: string;
  values?: string[];
  open: boolean;
  onModalClose?: () => void;
  children?: ReactNode;
  size?: 'sm' | 'lg' | 'xl';
};

const Popup = ({
  popupLabel,
  values,
  open,
  onModalClose,
  children,
  size = 'lg',
}: Props) => {
  return (
    <Modal show={open} onHide={onModalClose} size={size} scrollable>
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
        <Button onClick={onModalClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
