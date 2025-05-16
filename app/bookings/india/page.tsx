import React from 'react';

const BookingsPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen text-white p-4">
            <div className="w-full max-w-3xl">
                <h1 className="text-2xl font-semibold mb-10 text-center">
                    Book an Appointment
                </h1>
                <div className="rounded-md overflow-hidden shadow ring-1 ring-primary">
                    <iframe
                        src="https://calendar.google.com/calendar/u/0/appointments/AcZssZ052PXkGX-2pK1ppfAwtHu0_QYEZWL2Wu99D4M="
                        style={{ border: 0 }}
                        width="100%"
                        height="200"
                        frameBorder="0"
                        className="w-full h-[500px] bg-white"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default BookingsPage;
