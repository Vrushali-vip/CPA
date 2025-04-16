// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// export default function HamburgerMenu() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative">
//       {/* Hamburger Button */}
//       <button 
//         onClick={toggleMenu} 
//         className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
//         aria-label="Menu"
//       >
//       </button>
      
//       {/* Sidebar */}
//       <div 
//         className={`fixed top-0 left-0 h-full shadow-lg transition-transform duration-300 ease-in-out z-20 ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//         style={{ width: '250px' }}
//       >
//         <div className="p-4 border-b">
//           <div className="flex justify-between items-center">
//             <h2 className="font-bold text-lg">Menu</h2>
//             <button 
//               onClick={toggleMenu} 
//               className="p-1 rounded-full"
//               aria-label="Close menu"
//             >
//             </button>
//           </div>
//         </div>
//         <div className="py-4">
//           <Link href="/dashboard" className="block px-4 py-2 hover:text-primary font-medium">
//             XPO Ops
//           </Link>
//           <Link href="/servicehub" className="block px-4 py-2 hover:text-primary font-medium">
//             XPO Support
//           </Link>
//         </div>
//       </div>
      
//       {/* Overlay to close sidebar when clicking outside */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-10"
//           onClick={toggleMenu}
//         ></div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // optional icon package

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
        onClick={toggleMenu} 
        className="text-3xl font-bold p-3 focus:outline-none z-30 relative bg-card                      "
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-card shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '250px' }}
      >
        <div className="p-4 border-b flex justify-between items-center ">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={toggleMenu}
            className="text-xl font-bold"
            aria-label="Close Menu"
          >
            ×
          </button>
        </div>
        <div className="py-2">
          <Link href="/dashboard" className="block py-2 hover:text-primary font-medium text-lg ml-16 mt-2 ">
            XPO Ops
          </Link>
          <hr className="border-primary ml-16" />
          <Link href="/servicehub" className="block py-2 hover:text-primary  font-medium text-lg ml-16 mt-2">
            XPO Support
          </Link>
          <hr className="border-primary ml-16" />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}
