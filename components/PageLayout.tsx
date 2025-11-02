import type { ReactNode } from "react";
import BottomSpacer from "./BottomSpacer";
import HeaderNavbar from "./HeaderNavBar";

interface Props {
	children: ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className="relative bg text flex flex-grow flex-col align-middle justify-center">
			<HeaderNavbar />
			{children}
			<BottomSpacer />
		</div>
	);
};

export default PageLayout;
