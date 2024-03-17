'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@lib/utils';

interface Props {
  children: ReactNode;
  text: string;
  position?: 'top' | 'right';
}

const Tooltip = ({ children, text, position = 'top' }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipClass = cn({
    'tooltip-right tooltip': position === 'right',
    tooltip: position === 'top',
  });

  const handleTouchStart = () => {
    setShowTooltip(true);
  };

  const handleTouchEnd = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={tooltipClass}
      data-tip={text}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="dynamic_text">{children}</div>
      {showTooltip && <div className="tooltip-content">{text}</div>}
    </div>
  );
};

export default Tooltip;
