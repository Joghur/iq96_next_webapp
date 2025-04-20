import { MdAdd } from '@node_modules/react-icons/md';
import CircleBackground from './CircleBackgroundButton';

type Props = {
  onClick: () => void;
  onDoubleClick?: () => void;
  colour?: string;
};

const AddButton = ({ onClick, onDoubleClick, colour = 'black' }: Props) => {
  return (
    <CircleBackground onClick={onClick} onDoubleClick={onDoubleClick}>
      <MdAdd color={colour ? colour : ''} />
    </CircleBackground>
  );
};
export default AddButton;
