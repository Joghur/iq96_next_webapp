"use client";

import type * as React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children?: React.ReactNode;
	className?: string;
	maxHeightClassName?: string;
};

const Modal: React.FC<ModalProps> = ({
	open,
	onOpenChange,
	title,
	children,
	className,
	maxHeightClassName, // valgfrit override
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={cn(
					"sm:max-w-lg rounded-xl overflow-hidden",
					maxHeightClassName ?? "max-h-[85vh] sm:max-h-[85vh]",
					className,
				)}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{children && (
						<DialogDescription className="mt-2 max-h-[65vh] overflow-y-auto">
							{children}
						</DialogDescription>
					)}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
