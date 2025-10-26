import { MdClose } from "react-icons/md";
import CircleBackground from "./CircleBackgroundButton";

type Props = {
	onClick: () => void;
	onDoubleClick?: () => void;
	colour?: string;
};

const CloseButton = ({ onClick, onDoubleClick, colour }: Props) => {
	return (
		<CircleBackground onClick={onClick} onDoubleClick={onDoubleClick}>
			<MdClose color={colour ? colour : ""} />
		</CircleBackground>
	);
};

export default CloseButton;
