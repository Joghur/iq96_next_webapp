import { Fragment, ReactNode } from "react";

import Tooltip from "./Tooltip";

interface Props {
  children: ReactNode;
  label: string;
  tooltipText?: string;
  tooltipIcon?: ReactNode;
}

const SettingsItem = ({ children, label, tooltipText, tooltipIcon }: Props) => {
  return (
    <Fragment>
      <div className="dynamic_text flex flex-none font-semibold">
        <div className="flex items-center gap-1">
          {label}
          {tooltipText && (
            <Tooltip text={tooltipText}>{tooltipIcon && tooltipIcon}</Tooltip>
          )}
        </div>
      </div>
      {children}
    </Fragment>
  );
};

export default SettingsItem;
