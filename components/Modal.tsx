// import { cn } from '@lib/utils';

// type Props = {
//   children: React.ReactNode;
//   open: boolean;
// };

// const Modal = ({ children, open }: Props) => {
//   const modalClass = cn({
//     'modal modal-middle': true,
//     'modal-open': open,
//   });

//   return (
//     <div className={modalClass}>
//       <div className="sm-relative modal-box fixed top-4 sm:top-auto">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;

// components/Modal.tsx
"use client";

import { X } from "lucide-react";
import * as React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogDescription as ShadDescription,
	DialogFooter as ShadFooter,
	DialogHeader as ShadHeader,
	DialogTitle as ShadTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Size = "sm" | "lg" | "xl" | "fullscreen";

type BaseProps = {
	children?: React.ReactNode;
	size?: Size;
	centered?: boolean;
	/** true | "static" — "static" = klik på overlay lukker ikke */
	backdrop?: true | "static";
	/** om Escape må lukke; default true */
	keyboard?: boolean;
	scrollable?: boolean;
	className?: string;
	title?: string;
};

/** Understøt både React-Bootstrap API og “kontrolleret” open/onOpenChange */
type ModalProps =
	| (BaseProps & {
			/** React-Bootstrap stil */
			show: boolean;
			onHide?: () => void;
			open?: never;
			onOpenChange?: never;
	  })
	| (BaseProps & {
			/** Kontrolleret “Dialog” stil */
			open: boolean;
			onOpenChange?: (open: boolean) => void;
			show?: never;
			onHide?: never;
	  });

const sizeClasses = (size?: Size) => {
	switch (size) {
		case "sm":
			return "sm:max-w-md";
		case "lg":
			return "sm:max-w-xl";
		case "xl":
			return "sm:max-w-2xl";
		case "fullscreen":
			return "w-[98vw] h-[96vh] sm:max-w-none p-0";
		default:
			return "sm:max-w-lg";
	}
};

const ModalRoot: React.FC<ModalProps> = (props) => {
	const {
		children,
		size,
		centered = true,
		backdrop = true,
		keyboard = true,
		scrollable = false,
		className,
		title,
	} = props as BaseProps;

	// Afgør hvilken API der bruges
	const isBootstrapApi = "show" in props;
	const open = isBootstrapApi ? props.show : (props as any).open;

	const onClose = React.useCallback(
		(nextOpen: boolean) => {
			if (isBootstrapApi) {
				if (!nextOpen) (props as any).onHide?.();
			} else {
				(props as any).onOpenChange?.(nextOpen);
			}
		},
		[isBootstrapApi, props],
	);

	const blockOutside = backdrop === "static";
	const blockEsc = !keyboard;

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				onInteractOutside={(e) => {
					if (blockOutside) e.preventDefault();
				}}
				onEscapeKeyDown={(e) => {
					if (blockEsc) e.preventDefault();
				}}
				className={cn(
					sizeClasses(size),
					centered ? "translate-y-0" : "mt-12 sm:mt-24",
					scrollable ? "max-h-[80vh] overflow-y-auto" : "",
					"rounded-xl",
					className,
				)}
			>
				<DialogTitle>{title ? title : ""}</DialogTitle>
				{children}
			</DialogContent>
		</Dialog>
	);
};

/** Subcomponents der matcher <Modal.Header/Title/Body/Footer> */
type HeaderProps = {
	children?: React.ReactNode;
	closeButton?: boolean;
	description?: React.ReactNode;
};
const Header: React.FC<HeaderProps> = ({
	children,
	closeButton,
	description,
}) => (
	<div className="mb-2">
		<ShadHeader className="mb-2">
			{children}
			{description && (
				<ShadDescription className="mt-1">{description}</ShadDescription>
			)}
		</ShadHeader>
		{closeButton && (
			<DialogClose asChild>
				<button
					aria-label="Close"
					className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background"
				>
					<X className="h-4 w-4" />
				</button>
			</DialogClose>
		)}
	</div>
);

const Title: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
	children,
	className,
}) => (
	<ShadTitle className={cn("text-lg font-semibold", className)}>
		{children}
	</ShadTitle>
);

const Body: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	className,
	children,
	...rest
}) => (
	<div className={cn("space-y-3", className)} {...rest}>
		{children}
	</div>
);

const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	className,
	children,
	...rest
}) => (
	<ShadFooter className={cn("mt-4", className)} {...rest}>
		{children}
	</ShadFooter>
);

/** Compound API: <Modal.Header/Title/Body/Footer> */
export const Modal = Object.assign(ModalRoot, { Header, Title, Body, Footer });
export default Modal;
