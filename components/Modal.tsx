"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
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
	footer?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
	open,
	onOpenChange,
	title,
	children,
	className,
	maxHeightClassName, // valgfrit override
	footer,
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogClose />
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
				<DialogFooter>{footer}</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
