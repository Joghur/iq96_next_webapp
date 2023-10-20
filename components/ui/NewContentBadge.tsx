import { Badge } from './badge';

interface Props {
  text?: string;
}

const NewContentBadge = ({ text }: Props) => {
  return (
    <Badge
      variant="secondary"
      className="dynamic_text absolute sm:right-0 sm:top-0 p-0.3 sm:p-1"
    >
      {text && text}
    </Badge>
  );
};

export default NewContentBadge;
