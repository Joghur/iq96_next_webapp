import { Badge } from './badge';

interface Props {
  text?: string;
}

const NewContentBadge = ({ text }: Props) => {
  return (
    <Badge variant="secondary" className="absolute right-1 top-1 p-1">
      {text && text}
    </Badge>
  );
};

export default NewContentBadge;
