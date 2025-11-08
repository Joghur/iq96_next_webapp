import { MdEdit } from "react-icons/md";
import CircleBackground from "./CircleBackgroundButton";

type Props = {
	onClick: () => void;
	onDoubleClick?: () => void;
	colour?: string;
};

const EditButton = ({ onClick, onDoubleClick, colour = "black" }: Props) => {
	return (
		<CircleBackground onClick={onClick} onDoubleClick={onDoubleClick}>
			<MdEdit color={colour ? colour : ""} />
		</CircleBackground>
	);
};
export default EditButton;
