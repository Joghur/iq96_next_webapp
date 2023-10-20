import { Badge } from './badge';

interface Props {
  text?: string;
  main?: boolean;
  absolute?: boolean;
}

const NewContentBadge = ({ text, main = false, absolute = true }: Props) => {
  return (
    <Badge
      variant="secondary"
      className={`dynamic_text ${absolute ? 'absolute' : 'relative'} ${
        main ? '' : 'right-0 sm:right-1 top-0 sm:top-1'
      } p-0.3 sm:p-1`}
    >
      {text && text}
    </Badge>
  );
};

export default NewContentBadge;
