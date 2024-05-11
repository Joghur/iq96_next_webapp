import { ReactElement } from 'react';

type Props = {
  hoverText?: string | string[];
  placement?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  children: ReactElement;
};

const HoverWrapper = ({ hoverText, placement, children }: Props) => {
  return <div>Page</div>;
};

export default HoverWrapper;
