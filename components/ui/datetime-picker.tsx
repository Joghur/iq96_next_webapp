'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@features/ui/calendar';
import { Input } from '@features/ui/input';
import { Button } from '@features/ui/button';
import { cn } from '@/lib/utils'; // Shadcn helper til classnames
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popoverDialog';

type Props = {
  value?: { date: string; time: string };
  onChange: (value: { date: string; time: string }) => void;
};

export function SimpleDateTimePicker({ value, onChange }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value?.date ? new Date(value.date) : undefined
  );
  const [selectedTime, setSelectedTime] = useState(value?.time ?? '');

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && selectedTime) {
      onChange({
        date: format(date, 'yyyy-MM-dd'),
        time: selectedTime,
      });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setSelectedTime(time);
    if (selectedDate && time) {
      onChange({
        date: format(selectedDate, 'yyyy-MM-dd'),
        time,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="w-[120px]"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[200px] justify-start text-left font-normal',
                !selectedDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : 'Vælg dato'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-50 w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Preview */}
      {selectedDate && selectedTime && (
        <div className="text-sm text-muted-foreground">
          Valgt: {format(selectedDate, 'yyyy-MM-dd')} kl. {selectedTime}
        </div>
      )}
    </div>
  );
}
