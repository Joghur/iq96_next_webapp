import CloseButton from "@components/buttons/CloseButton";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
	title: string;
	actionButtons: ReactNode[];
	onClose: () => void;
};

const ActionHeader = ({ children, title, actionButtons, onClose }: Props) => {
	return (
		<div className="w-full px-4 sm:px-6 mt-8">
			<div className="fixed top-0 left-0 w-full h-32 p-4 bg-primary shadow-md z-50">
				<h3 className="text-lg font-bold">
					<div className="flex flex-row items-center justify-between">
						{title}
						<CloseButton onClick={onClose} />
					</div>
				</h3>
				<div className="flex justify-between py-10">
					{actionButtons?.map((first) => first)}
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default ActionHeader;
