/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { useTheme } from "@features/member/ThemeToggle";
import type { ReactNode } from "@node_modules/@types/react";

type Props = {
	children: ReactNode;
	onClick: () => void;
	onDoubleClick?: () => void;
};

const CircleBackground = ({ children, onClick, onDoubleClick }: Props) => {
	const { theme } = useTheme();
	return (
		<div
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			className={`p-1 flex items-center justify-center rounded-full border-2 shadow-lg ${theme === "dark" ? "bg-gray-500 border-slate-300 " : "bg-slate-50 border-gray-500"}`}
		>
			{children}
		</div>
	);
};

export default CircleBackground;
