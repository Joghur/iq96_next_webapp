"use client";

import { Label } from "./label";

interface Props {
  preLabel?: string;
  postLabel?: string;
  value: boolean;
  onChange: () => void;
}

const Switch = ({ preLabel, postLabel, value, onChange }: Props) => (
  <div>
    <div className="flex items-center space-x-2">
      {preLabel && <Label htmlFor="theme-mode">{preLabel}</Label>}
      <input
        type="checkbox"
        className="toggle"
        onChange={onChange}
        checked={value}
      />
      {postLabel && <Label htmlFor="theme-mode">{postLabel}</Label>}
    </div>
  </div>
);

export default Switch;
