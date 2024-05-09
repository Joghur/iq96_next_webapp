import { ChangeEvent, useState } from "react";
import Form from "react-bootstrap/Form";

import { getLabelOrType, SelectLabelType } from "@/utils/form";

type Props = {
  label: string;
  value?: string;
  selection: SelectLabelType<any, any>[];
  disabled: boolean;
  onChange: (value: string) => void;
};

const FormSelect = ({ label, value, selection, disabled, onChange }: Props) => {
  const [selectedValue, setSelectedValue] = useState(
    getLabelOrType(
      value?.toString() || "THIS SHOULD NOT SHOW",
      "toLabel",
      selection,
    ),
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);

    onChange(getLabelOrType(value, "toType", selection).toString());
  };

  return (
    <Form.Select
      onChange={handleSelectChange}
      value={selectedValue}
      data-cy={`${label}-form-select`}
      disabled={disabled}
      className="bg-light"
    >
      <option key="empty-option" data-cy="empty-option-form-option"></option>
      {selection?.map((valueItem, index: number) => (
        <option key={index} data-cy={`${valueItem.label}-form-option`}>
          {valueItem.label.toString()}
        </option>
      ))}
    </Form.Select>
  );
};

export default FormSelect;
