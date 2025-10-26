/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { SelectLabelType } from '@lib/form';

type Props = {
  selection?: SelectLabelType<any, any>[];
  propertyKey: string;
  checked: string | undefined;
  disabled: boolean;
  onChange: (id: string, value: string) => void;
};

const FormRadioButtonGroup = ({
  selection = [],
  propertyKey,
  checked,
  onChange,
  disabled,
}: Props) => {
  const [radioButtonValue, setRadioButtonValue] = useState(checked);

  const handleChange = (value: string) => {
    setRadioButtonValue(value);
    onChange(propertyKey.toString(), value || '');
  };

  return (
    <RadioGroup
      value={radioButtonValue}
      onValueChange={handleChange}
      className="flex flex-col gap-2"
      disabled={disabled}
    >
      {selection.map((item, index) => {
        const label = item.label?.toString();
        const value = item.type?.toString();

        return (
          <div key={`radio-${index}`} className="flex items-center space-x-2">
            <RadioGroupItem
              id={`${propertyKey}-${index}`}
              value={value}
              disabled={disabled}
            />
            <Label htmlFor={`${propertyKey}-${index}`}>{label}</Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default FormRadioButtonGroup;
