// import React from 'react';

// const BookingsPage = () => {
//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">Book an Appointment</h1>
//       <iframe
//         src="https://calendar.google.com/calendar/appointments/AcZssZ0DOOO70Ytqw8CeYHxpCGLL7L5pkQhyGfGY2k4=?gv=true"
//         style={{ border: 0 }}
//         width="100%"
//         height="600"
//         frameBorder="0"
//       ></iframe>
//     </div>
//   );
// };

// export default BookingsPage;

// app/bookings/page.tsx
// import React from 'react';

// const BookingsPage = () => {
//   return (
//     <div className="max-w-5xl mx-auto p-4 text-white">
//       <h1 className="text-2xl font-semibold mb-4 text-white">
//         Book an Appointment
//       </h1>
//       <div className="rounded-lg overflow-hidden shadow-lg ring-1 ring-primary">
//         <iframe
//           src="https://calendar.google.com/calendar/appointments/AcZssZ0DOOO70Ytqw8CeYHxpCGLL7L5pkQhyGfGY2k4=?gv=true"
//           style={{ border: 0 }}
//           width="100%"
//           height="600"
//           frameBorder="0"
//           className="w-full h-[600px] bg-white"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default BookingsPage;


import React from 'react';

const BookingsPage = () => {
    return (
        // <div className="max-w-3xl mx-auto p-4 text-white">
        //   <h1 className="text-2xl font-semibold mb-4 text-white text-center">
        //     Book an Appointment
        //   </h1>
        //   <div className="rounded-lg overflow-hidden shadow-lg ring-1 ring-primary">
        //     <iframe
        //       src="https://calendar.google.com/calendar/u/0/appointments/AcZssZ052PXkGX-2pK1ppfAwtHu0_QYEZWL2Wu99D4M="
        //       style={{ border: 0 }}
        //       width="100%"
        //       height="600"
        //       frameBorder="0"
        //       className="w-full h-[600px] bg-white"
        //     ></iframe>
        //   </div>
        // </div>
        <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
            <div className="w-full max-w-3xl">
                <h1 className="text-2xl font-semibold mb-10 text-center">
                    Book an Appointment
                </h1>
                <div className="rounded-md overflow-hidden shadow ring-1 ring-primary">
                    <iframe
                        src="https://calendar.google.com/calendar/u/0/appointments/AcZssZ052PXkGX-2pK1ppfAwtHu0_QYEZWL2Wu99D4M="
                        style={{ border: 0 }}
                        width="100%"
                        height="400"
                        frameBorder="0"
                        className="w-full h-[500px] bg-white"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default BookingsPage;
