/** biome-ignore-all lint/a11y/noStaticElementInteractions: <TODO> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <TODO> */
import type { ReactNode } from "@node_modules/@types/react";

type Props = {
	children: ReactNode;
	onClick: () => void;
	onDoubleClick?: () => void;
};

const CircleBackground = ({ children, onClick, onDoubleClick }: Props) => {
	return (
		<div
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			className={
				"p-1 flex items-center justify-center rounded-full border shadow-lg bg-secondary text-secondary-foreground"
			}
		>
			{children}
		</div>
	);
};

export default CircleBackground;
