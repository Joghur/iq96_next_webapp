'use client';

import { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { calculateHeight } from '@lib/form';
import { FormAs } from '../OneFormItem';

type Props = {
  value: string | number;
  propertyKey: string;
  as: FormAs; // "input" | "textarea"
  type: 'text' | 'number' | 'date';
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FormControl = ({
  value,
  propertyKey,
  as,
  type,
  disabled,
  onChange,
}: Props) => {
  if (as === 'textarea') {
    const height = type === 'text' ? calculateHeight(value.toString()) : 'auto';

    return (
      <Textarea
        id={propertyKey}
        disabled={disabled}
        defaultValue={value.toString()}
        onChange={(e) =>
          onChange(e as unknown as ChangeEvent<HTMLInputElement>)
        }
        style={{ height }}
      />
    );
  }

  return (
    <Input
      id={propertyKey}
      type={type}
      disabled={disabled}
      defaultValue={value.toString()}
      onChange={onChange}
    />
  );
};

export default FormControl;

// import { ChangeEvent } from 'react';
// import Form from 'react-bootstrap/Form';

// import { calculateHeight } from '@lib/form';
// import { FormAs } from '../OneFormItem';

// type Props = {
//   value: string | number;
//   propertyKey: string;
//   as: FormAs;
//   type: 'text' | 'number' | 'date';
//   disabled: boolean;
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
// };

// const FormControl = ({
//   value,
//   propertyKey,
//   as,
//   type,
//   disabled,
//   onChange,
// }: Props) => (
//   <Form.Control
//     id={propertyKey.toString()}
//     as={as}
//     type={type}
//     defaultValue={value.toString()}
//     onChange={onChange}
//     disabled={disabled}
//     style={{
//       height:
//         type === 'text' && as === 'textarea'
//           ? calculateHeight(value.toString())
//           : 'auto',
//     }}
//   />
// );

// export default FormControl;
