import { ChangeEvent, useState } from "react";
import Form from "react-bootstrap/Form";

import { SelectLabelType } from "@/utils/form";

type Props = {
  selection?: SelectLabelType<any, any>[];
  propertyKey: string;
  checked: string | undefined;
  disabled: boolean;
  onChange: (id: string, value: string) => void;
};

const FormRadioButtonGroup = ({
  selection,
  propertyKey,
  checked,
  onChange,
  disabled,
}: Props) => {
  const [radioButtonValue, setRadioButtonValue] = useState(checked);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRadioButtonValue(value);
    onChange(propertyKey.toString(), value || "");
  };

  return (
    <>
      {selection?.map((valueItem, index: number) => (
        <Form.Check
          key={`form-${index}`}
          type="radio"
          id={propertyKey.toString()}
          name={propertyKey.toString()}
          label={valueItem.label.toString()}
          value={valueItem.type.toString()}
          checked={valueItem.type.toString() === radioButtonValue}
          onChange={handleRadioChange}
          disabled={disabled}
          data-cy={`${valueItem.label.toString()}-form-radio`}
        />
      ))}
    </>
  );
};

export default FormRadioButtonGroup;
