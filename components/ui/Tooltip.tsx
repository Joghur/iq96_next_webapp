'use client';

import { ReactNode } from 'react';
import { cn } from '@lib/utils';

interface Props {
  children: ReactNode;
  text: string;
  position?: 'top' | 'right';
}

const Tooltip = ({ children, text, position = 'top' }: Props) => {
  const tooltipClass = cn({
    'tooltip-right tooltip': position === 'right',
    tooltip: position === 'top',
  });

  return (
    <div className={tooltipClass} data-tip={text}>
      <div className="dynamic_text">{children}</div>
    </div>
  );
};

export default Tooltip;
