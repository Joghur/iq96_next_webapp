import { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

import { FormAs } from '@/components/ui/form/OneFormItem';
import { calculateHeight } from '@components/ui/form';

type Props = {
  label: string;
  value: string | number;
  propertyKey: string;
  as: FormAs;
  type: 'text' | 'number' | 'date';
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FormControl = ({
  label,
  value,
  propertyKey,
  as,
  type,
  disabled,
  onChange,
}: Props) => (
  <Form.Control
    id={propertyKey.toString()}
    as={as}
    type={type}
    defaultValue={value.toString()}
    onChange={onChange}
    disabled={disabled}
    style={{
      height:
        type === 'text' && as === 'textarea'
          ? calculateHeight(value.toString())
          : 'auto',
    }}
  />
);

export default FormControl;
