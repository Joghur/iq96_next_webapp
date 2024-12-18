import { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

type Props = {
  propertyKey: string;
  isChecked: boolean;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FormCheckBox = ({
  propertyKey,
  isChecked,
  disabled,
  onChange,
}: Props) => {
  return (
    <Form.Check
      id={propertyKey.toString()}
      type="checkbox"
      name={propertyKey.toString()}
      checked={isChecked}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default FormCheckBox;
