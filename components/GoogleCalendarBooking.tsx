'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@/components/ui/button';

export const GoogleCalendarBooking = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const bookingUrl = 'https://calendar.google.com/calendar/u/0/appointments/AcZssZ052PXkGX-2pK1ppfAwtHu0_QYEZWL2Wu99D4M=';

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time.');
      return;
    }

    const fullDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':').map(Number);
    fullDateTime.setHours(hours);
    fullDateTime.setMinutes(minutes);

    window.open(bookingUrl, '_blank');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="ml-2 lg:ml-auto rounded-full px-4"
          size="sm"
        >
          Book A Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div>
          <h2 className="text-lg font-semibold mb-4">Select Date & Time</h2>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              dateFormat="yyyy-MM-dd"
              className="w-full px-3 py-2 border rounded"
              minDate={new Date()}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Select Time</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <Button className="w-full" onClick={handleBooking}>
            Confirm & Book
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
