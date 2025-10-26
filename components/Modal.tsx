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
	children?: React.ReactNode; // Description / body
	className?: string; // ekstra styling hvis du vil
	maxHeightClassName?: string; // hvis du vil justere højde senere
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
					// centreret, pæn størrelse, og sikrer at indhold ikke løber ud af bunden
					"sm:max-w-lg rounded-xl overflow-hidden",
					// max-h så vi altid kan se hele modalen; indhold scroller
					maxHeightClassName ?? "max-h-[85vh] sm:max-h-[85vh]",
					className,
				)}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{children && (
						<DialogDescription
							// gør kun selve beskrivelsen scrollable, så titel (og evt. footer) står fast
							className="mt-2 max-h-[65vh] overflow-y-auto"
						>
							{children}
						</DialogDescription>
					)}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
