'use client';

import { ChangeEvent, useState } from 'react';
import { Button } from '@features/ui/button';
import { Input } from '@features/ui/input';
import { TrashIcon } from 'lucide-react';
import { SimpleDateTimePicker } from '@features/ui/datetime-picker';
import { DayEvent, DayEventElement, DayEventType } from './EventsPage';

interface Props {
  dayEvents: DayEvent[];
  onChange: (updated: DayEvent[]) => void;
}

export default function DayEventsForm({ dayEvents, onChange }: Props) {
  console.log('dayEvents', dayEvents);

  const [events, setEvents] = useState<DayEvent[]>(dayEvents);
  const [newDate, setNewDate] = useState<string>(''); // "2025-09-28"
  const [newTime, setNewTime] = useState<string>(''); // "21:30"
  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState<DayEventType>('meetingPoint');

  const updateParent = (updated: DayEvent[]) => {
    setEvents(updated);
    onChange(updated);
  };

  const handleAdd = () => {
    if (!newDate || !newTime || !newLabel) return;

    const updated = [...events];
    const day = updated.find((d) => d.dateString === newDate);

    const newEntry: DayEventElement = {
      time: newTime,
      label: newLabel,
      type: newType,
    };

    if (day) {
      day.entries.push(newEntry);
    } else {
      updated.push({ dateString: newDate, entries: [newEntry] });
    }

    updateParent(updated);
    setNewDate('');
    setNewTime('');
    setNewLabel('');
    setNewType('meetingPoint');
  };

  const handleDelete = (dateString: string, index: number) => {
    const updated = events
      .map((day) =>
        day.dateString === dateString
          ? { ...day, entries: day.entries.filter((_, i) => i !== index) }
          : day
      )
      .filter((day) => day.entries.length !== 0);

    updateParent(updated);
  };

  const handleChangeType = (val: ChangeEvent<HTMLSelectElement>) => {
    setNewType(val.target.value as DayEventType);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SimpleDateTimePicker
          value={{ date: newDate, time: newTime }}
          onChange={({ date, time }) => {
            setNewDate(date);
            setNewTime(time);
          }}
        />

        <Input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Beskrivelse"
        />

        <select
          value={newType}
          onChange={handleChangeType}
          className="mt-1 p-2 block w-full border-gray-300 dark:border-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="meetingPoint">Mødested</option>
          <option value="dinner">Middag</option>
          <option value="guidedTour">Guidet tur</option>
          <option value="action">Aktivitet</option>
        </select>
      </div>

      <Button onClick={handleAdd}>Tilføj event</Button>

      <div className="space-y-4">
        {events.map((day) => (
          <div key={day.dateString} className="border p-4 rounded-md">
            <h3 className="font-semibold text-lg mb-2">{day.dateString}</h3>
            <ul className="space-y-2">
              {day.entries.map((entry, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>
                    {entry.time} – {entry.label} ({entry.type})
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(day.dateString, index)}
                  >
                    <TrashIcon className="w-4 h-4 text-red-500" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
