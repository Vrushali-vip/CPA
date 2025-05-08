// 'use client';

// import { useRouter } from 'next/navigation';
// import React from 'react';

// const BookingDropdown = () => {
//   const router = useRouter();

//   const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     if (value) {
//       router.push(`/bookings/${value}`);
//     }
//   };

//   return (
//     <select
//       onChange={handleSelect}
//       defaultValue=""
//       className="ml-2 mr-2 lg:ml-auto appearance-none bg-primary text-white rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-0"
//     >
//       <option value="" disabled>
//         Book Demo
//       </option>
//       <option value="uk" className="text-black">UK Hours</option>
//       <option value="india" className="text-black">India Hours</option>
//     </select>
//   );
// };

// export default BookingDropdown;


// 'use client';

// import { useRouter } from 'next/navigation';
// import React from 'react';

// const BookingDropdown = () => {
//   const router = useRouter();

//   const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     if (value) {
//       router.push(`/bookings/${value}`);
//     }
//   };

//   return (
//     <select
//       onChange={handleSelect}
//       defaultValue=""
//       className="ml-2 mr-2 lg:ml-auto bg-primary text-white rounded-full px-3 py-2 text-sm appearance-none focus:outline-none"
//     >
//       <option value="" disabled className="bg-transparent text-black">
//         Book Demo
//       </option>
//       <option value="uk" className="bg-transparent text-black">
//         UK Hours
//       </option>
//       <option value="india" className="bg-transparent text-black">
//         India Hours
//       </option>
//     </select>
//   );
// };

// export default BookingDropdown;


// 'use client';

// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// const BookingDropdown = () => {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSelect = (route: string) => {
//     if (route) {
//       router.push(`/bookings/${route}`);
//     }
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="ml-2 mr-2 lg:ml-auto bg-primary text-white rounded-full px-3 py-2 text-sm focus:outline-none"
//       >
//         Book Demo
//       </button>

//       {isOpen && (
//         <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white z-10">
//           <div className="py-1">
//             <button
//               onClick={() => handleSelect('uk')}
//               className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               UK Hours
//             </button>
//             <button
//               onClick={() => handleSelect('india')}
//               className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               India Hours
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingDropdown;

'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

const BookingDropdown = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (route: string) => {
        if (route) {
            router.push(`/bookings/${route}`);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-2 mr-2 lg:ml-auto bg-primary text-white rounded-full px-3 py-2 text-sm focus:outline-none"
            >
                Book Demo
            </button>

            {isOpen && (
                <div className="absolute mt-1 w-full rounded-md shadow-lg bg-black border border-input ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 z-10">
                    <div className="py-1">
                        <button
                            onClick={() => handleSelect('uk')}
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-accent"
                        >
                            UK Hours
                        </button>
                        <button
                            onClick={() => handleSelect('india')}
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-accent"
                        >
                            India Hours
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingDropdown;