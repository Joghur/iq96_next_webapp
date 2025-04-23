import { useState } from 'react';
import { SimpleDateTimePicker } from './datetime-picker';

type Props = {
  newDate: string;
  newTime: string;
  onChangeTime: () => void;
  onChangeDate: () => void;
};

const DateTimePicker = ({
  newDate,
  newTime,
  onChangeTime,
  onChangeDate,
}: Props) => {
  const [_newDate, setNewDate] = useState<string>(''); // "2025-09-28"
  const [_newTime, setNewTime] = useState<string>(''); // "21:30"

  return (
    <SimpleDateTimePicker
      value={{ date: newDate, time: newTime }}
      onChange={({ date, time }) => {
        setNewDate(date);
        setNewTime(time);
      }}
    />
  );
};

export default DateTimePicker;
