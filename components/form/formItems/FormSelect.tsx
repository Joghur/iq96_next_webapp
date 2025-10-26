// ./formItems/FormSelect.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { SelectLabelType, getLabelOrType } from "@lib/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  label: string; // (ikke brugt i selve select'en – beholdes for kompatibilitet)
  value?: string; // "type" (din nuværende værdi)
  selection: SelectLabelType<any, any>[];
  disabled: boolean;
  onChange: (value: string) => void; // sender "type" tilbage
};

const FormSelect: React.FC<Props> = ({
  value,
  selection,
  disabled,
  onChange,
}) => {
  // find label for nuværende type (samme logik som før)
  const initialLabel = useMemo(
    () =>
      getLabelOrType(
        (value ?? "THIS SHOULD NOT SHOW").toString(),
        "toLabel",
        selection
      ) ?? "",
    [value, selection]
  );

  const [selectedLabel, setSelectedLabel] = useState<string>(initialLabel);

  // Hold lokal label i sync, hvis parent ændrer value-prop
  useEffect(() => {
    setSelectedLabel(initialLabel);
  }, [initialLabel]);

  const handleChange = (nextLabel: string) => {
    setSelectedLabel(nextLabel);
    const asType = getLabelOrType(nextLabel, "toType", selection);
    onChange((asType ?? "").toString());
  };

  return (
    <Select
      disabled={disabled}
      value={selectedLabel}
      onValueChange={handleChange}
    >
      <SelectTrigger className="bg-muted"> {/* erstatter 'bg-light' */}
        <SelectValue placeholder="" />
      </SelectTrigger>

      <SelectContent>
        {/* tom option som i dit oprindelige */}
        <SelectItem value="">{""}</SelectItem>

        {selection?.map((item, idx) => {
          const labelText = item.label?.toString() ?? "";
          return (
            <SelectItem key={idx} value={labelText}>
              {labelText}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default FormSelect;


// import { SelectLabelType, getLabelOrType } from '@lib/form';
// import { ChangeEvent, useState } from 'react';
// import Form from 'react-bootstrap/Form';

// type Props = {
//   label: string;
//   value?: string;
//   selection: SelectLabelType<any, any>[];
//   disabled: boolean;
//   onChange: (value: string) => void;
// };

// const FormSelect = ({ value, selection, disabled, onChange }: Props) => {
//   const [selectedValue, setSelectedValue] = useState(
//     getLabelOrType(
//       value?.toString() || 'THIS SHOULD NOT SHOW',
//       'toLabel',
//       selection
//     )
//   );

//   const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     const value = event.target.value;
//     setSelectedValue(value);

//     onChange(getLabelOrType(value, 'toType', selection).toString());
//   };

//   return (
//     <Form.Select
//       onChange={handleSelectChange}
//       value={selectedValue}
//       disabled={disabled}
//       className="bg-light"
//     >
//       <option key="empty-option"></option>
//       {selection?.map((valueItem, index: number) => (
//         <option key={index}>{valueItem.label.toString()}</option>
//       ))}
//     </Form.Select>
//   );
// };

// export default FormSelect;
