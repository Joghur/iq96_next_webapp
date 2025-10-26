"use client";

import Modal from "@components/Modal";
import { Button } from "@components/ui/button";
import type { ReactNode } from "react";

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
		<Modal show={open} onHide={onModalCancel} size="sm" scrollable>
			{header && (
				<Modal.Header closeButton>
					<Modal.Title>{header}</Modal.Title>
				</Modal.Header>
			)}
			<Modal.Body className="text-nowrap">{label}</Modal.Body>
			<Modal.Footer>
				<Button onClick={onModalConfirm}>OK</Button>
				<Button variant="destructive" onClick={onModalCancel}>
					Fortryd
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmationPopup;
