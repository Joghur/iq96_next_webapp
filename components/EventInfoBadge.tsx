import type { ReactNode } from "react";
import { Badge } from "./ui/badge";

interface Props {
	children: ReactNode;
}

const EventInfoBadge = ({ children }: Props) => {
	return (
		<Badge
			variant="outline"
			className={
				"dynamic_text bg-secondary text-secondary-foreground p-1 m-0.5 border border-red-500 shadow-lg"
			}
		>
			{children}
		</Badge>
	);
};

export default EventInfoBadge;
