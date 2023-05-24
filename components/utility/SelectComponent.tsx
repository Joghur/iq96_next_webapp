import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
  colour: string;
}

interface Props {
  options: Option[];
  onChange: (event: string) => void;
}

// export default function SelectComponent({options, onChange}: Props) {

//   return (
//     <Select
//       variant="standard"
//       value={selectedOption?.value ?? ''}
//       onChange={handleOptionChange}
//       sx={{zIndex: 9998, backgroundColor: 'lightgray', p: 1}}>
//       {options.map(option => (
//         <MenuItem
//           key={option.value}
//           value={option.value}
//           sx={{color: option.colour}}>
//           {option.label}
//         </MenuItem>
//       ))}
//     </Select>
//   );
// }

const SelectComponent: React.FC<Props> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options[0],
  );

  const handleOptionChange = (event: string) => {
    const selectedOption = options.find(option => option.value === event);
    setSelectedOption(selectedOption || null);
    onChange(event);
  };

  return (
    <select
      className="select select-bordered"
      onChange={e => onChange(e.target.value)}>
      {options.map((option, index) => (
        <option
          key={index}
          value={option.value}
          className="hover:bg-pink-200 focus:bg-pink-200">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
