import { SelectLabelType, getLabelOrType } from '@components/ui/form';
import { ChangeEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';

type Props = {
  label: string;
  value?: string;
  selection: SelectLabelType<any, any>[];
  disabled: boolean;
  onChange: (value: string) => void;
};

const FormSelect = ({ value, selection, disabled, onChange }: Props) => {
  const [selectedValue, setSelectedValue] = useState(
    getLabelOrType(
      value?.toString() || 'THIS SHOULD NOT SHOW',
      'toLabel',
      selection
    )
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);

    onChange(getLabelOrType(value, 'toType', selection).toString());
  };

  return (
    <Form.Select
      onChange={handleSelectChange}
      value={selectedValue}
      disabled={disabled}
      className="bg-light"
    >
      <option key="empty-option"></option>
      {selection?.map((valueItem, index: number) => (
        <option key={index}>{valueItem.label.toString()}</option>
      ))}
    </Form.Select>
  );
};

export default FormSelect;
