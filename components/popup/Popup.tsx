"use client";

import Modal from "@components/Modal";
import { Button } from "@components/ui/button";
import type { ReactNode } from "react";

type Props = {
	popupLabel: string;
	values?: string[];
	open: boolean;
	onModalClose: () => void;
	children?: ReactNode;
	size?: "sm" | "lg" | "xl";
};

// TODO needs FIX

const Popup = ({
	popupLabel,
	values,
	open,
	onModalClose,
	children,
	// size = "lg",
}: Props) => {
	return (
		<Modal open={open} onOpenChange={onModalClose} title={popupLabel}>
			{values?.map((value, index) => (
				<div key={`modal-body-${index}`}>{value}</div>
			))}
			{children && children}
			<Button onClick={onModalClose}>OK</Button>
		</Modal>
	);
};

export default Popup;
