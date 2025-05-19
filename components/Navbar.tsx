// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function Navbar() {
//   return (
//     <header className="w-full border-b shadow-sm bg-[#1A2C50]">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* Logo */}
//         <Link href="/" className="flex items-center space-x-2 bg-white">
//           <Image
//             src="/compass-point-assist-logo.png" // Place your logo image in public/logo.png
//             alt="Company Logo"
//             width={200}
//             height={200}
//             className="rounded-md "
//           />
//         </Link>

//         <div className="flex items-center space-x-4">
//           <Link href="/maps">
//             <Button variant="ghost" className="text-lg font-semibold font-monteserrat text-[#ECCBAE]">MAPS</Button>
//           </Link>
//           <Link href="/articles">
//             <Button variant="ghost" className="text-lg font-semibold font-monteserrat text-[#ECCBAE]">ARTICLES</Button>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/DropdownMenu";

// export default function Navbar() {
//   return (
//     <header className="w-full border-b shadow-sm bg-[#1A2C50]">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link href="/" className="flex items-center space-x-2 bg-white">
//           <Image
//             src="/compass-point-assist-logo.png"
//             alt="Company Logo"
//             width={200}
//             height={200}
//             className="rounded-md"
//           />
//         </Link>

//         <div className="flex items-center space-x-4">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className="text-lg font-semibold font-monteserrat text-[#ECCBAE]"
//               >
//                 MAPS
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="bg-white">
//               <DropdownMenuItem>
//                 <Link href="/maps/ukraine-map" className="w-full">
//                   Ukraine Map
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Link href="/maps/global-risk-map" className="w-full">
//                   Global Risk Map
//                 </Link>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Link href="/articles">
//             <Button
//               variant="ghost"
//               className="text-lg font-semibold font-monteserrat text-[#ECCBAE]"
//             >
//               ARTICLES
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/DropdownMenu";
// import { ChevronDown, ChevronUp } from "lucide-react"; 
// import * as React from "react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <header className="w-full border-b shadow-sm bg-[#1A2C50]">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link href="/" className="flex items-center space-x-2 bg-white">
//           <Image
//             src="/compass-point-assist-logo.png"
//             alt="Company Logo"
//             width={200}
//             height={200}
//             className="rounded-md"
//           />
//         </Link>
//         <div className="flex items-center space-x-4">
//           <Link href="/articles">
//             <Button
//               variant="ghost"
//               className="text-lg font-semibold font-monteserrat text-[#ECCBAE]"
//             >
//               ARTICLES
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import * as React from "react";

// type NavbarProps = {
//   scrollToArticles: () => void;
// };

// export default function Navbar({ scrollToArticles }: NavbarProps) {

//   return (
//     <header className="w-full border-b shadow-sm bg-[#1A2C50]">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <div className="flex items-center space-x-2 bg-white">
//           <Image
//             src="/compass-point-assist-logo.png"
//             alt="Company Logo"
//             width={200}
//             height={200}
//             className="rounded-md"
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <Button
//             variant="ghost"
//             className="text-lg font-semibold font-monteserrat text-[#ECCBAE]"
//             onClick={scrollToArticles}
//           >
//             ARTICLES
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import * as React from "react";

// type NavbarProps = {
//   scrollToArticles: () => void;
// };

// export default function Navbar({ scrollToArticles }: NavbarProps) {
//   return (
//     <header className="w-full border-b shadow-sm bg-[#1A2C50]">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <div className="flex items-center space-x-2 bg-white">
//           <Image
//             src="/compass-point-assist-logo.png"
//             alt="Company Logo"
//             width={200}
//             height={200}
//             className="rounded-md"
//           />
//         </div>
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="ghost"
//             className="text-lg font-semibold font-monteserrat text-[#ECCBAE]"
//             onClick={scrollToArticles}
//           >
//             ARTICLES
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as React from "react";

type NavbarProps = {
  scrollToArticles: () => void;
};

export default function Navbar({ scrollToArticles }: NavbarProps) {
  return (
    <header className="w-full shadow-sm bg-[#1A2C50]">
      <div className="mx-auto flex items-center justify-between">
        <div className="w-2/10 bg-white flex items-center justify-center">
          <Image
            src="/compass-point-assist-logo.png"
            alt="Company Logo"
            width={300}
            height={300}
            className="rounded-md py-2 px-2"
          />
        </div>

        <div className="flex items-center space-x-4 w-9/10 justify-end mr-7">
          <Button
            variant="ghost"
            className="text-xl font-semibold font-monteserrat text-[#ECCBAE]"
            onClick={scrollToArticles}
          >
            ARTICLES
          </Button>
        </div>
      </div>
    </header>
  );
}
