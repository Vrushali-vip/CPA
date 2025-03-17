// "use client";
// import { ChevronUp, ChevronDown, User } from "lucide-react";
// import { signOut, useSession } from "next-auth/react";
// import { useToast } from "@/hooks/use-toast";
// import Image from "next/image";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface Country {
//   code: string;
//   name: string;
//   flag: string;
// }

// const countries: Country[] = [
//   { code: "ind", name: "INDIA", flag: "/ind_flag.png" },
//   { code: "uk", name: "UK", flag: "/uk_flag.jpg" },
// ];

// export default function NavbarClient() {
//   const session = useSession();
//   const { toast } = useToast();
//   const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
//   const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
//   const countryDropdownRef = useRef<HTMLDivElement>(null);
//   const [isDropdownOpen] = useState(false);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         countryDropdownRef.current &&
//         !countryDropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsCountryMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleCountrySelect = (country: Country) => {
//     setSelectedCountry(country);
//     setIsCountryMenuOpen(false);
//   };

//   const onLogOutClick = () => {
//     signOut();
//     toast({
//       title: "Logged out",
//       description: "You have been logged out.",
//     });
//   };

//   const isAdminOrSupport =
//     session?.data?.user?.role === "ADMIN" ||
//     session?.data?.user?.role === "SUPPORT";

//   return (
//     <div className="flex items-center gap-4">
//       <div
//         ref={countryDropdownRef}
//         className={`relative transition-transform duration-300 ease-in-out ${
//           session?.data?.user ? "translate-x-4" : "translate-x-0"
//         }`}
//       >
//         <div
//           className="flex items-center gap-1 cursor-pointer text-primary px-2 py-1"
//           onClick={() => setIsCountryMenuOpen((prev) => !prev)}
//         >
//           <Image
//             src={selectedCountry.flag}
//             alt={selectedCountry.name}
//             width={24}
//             height={24}
//             className="rounded-full object-cover object-center bg-background"
//             style={{
//               borderRadius: "50%",
//               aspectRatio: "1/1",
//               width: "24px",
//               height: "24px",
//             }}
//           />
//           <span>{selectedCountry.name}</span>
//           {isCountryMenuOpen ? (
//             <ChevronUp size={16} />
//           ) : (
//             <ChevronDown size={16} />
//           )}
//         </div>
//         <div
//           className={`absolute top-full left-0 mt-1 bg-background text-primary shadow-md border rounded-md z-50 w-32 
//           ${isCountryMenuOpen ? "block" : "hidden"} overflow-auto`}
//           style={{
//             maxHeight: "200px",
//             overflowY: "auto",
//           }}
//         >
//           {countries.map((country) => (
//             <div
//               key={country.code}
//               onClick={() => handleCountrySelect(country)}
//               className="flex items-center gap-2 cursor-pointer px-3 py-2"
//             >
//               <Image
//                 src={country.flag}
//                 alt={country.name}
//                 width={24}
//                 height={24}
//                 className="rounded-full object-cover object-center"
//                 style={{
//                   borderRadius: "50%",
//                   aspectRatio: "1/1",
//                   width: "24px",
//                   height: "24px",
//                 }}
//               />
//               {country.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {session?.data?.user ? (
//         <div className="relative ml-4 mr-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="flex items-center gap-2 p-1 rounded-full bg-primary transition">
//                 {session?.data?.user?.image ? (
//                   <Image
//                     width={50}
//                     height={50}
//                     src={session.data.user.image}
//                     className="w-7 h-7 rounded-full object-cover"
//                     alt="User avatar"
//                   />
//                 ) : (
//                   <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
//                     <User className="w-5 h-5 text-primary" />
//                   </div>
//                 )}
//                 {isDropdownOpen ? (
//                   <ChevronUp size={16} className="text-gray-600" />
//                 ) : (
//                   <ChevronDown size={16} className="text-gray-600" />
//                 )}
//               </button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               {!isAdminOrSupport && (
//                 <DropdownMenuItem asChild>
//                   <Link href="/servicehub" className="w-full cursor-pointer">
//                     ServiceHub
//                   </Link>
//                 </DropdownMenuItem>
//               )}
//               <DropdownMenuItem>
//                 <Link href="/profile" className="w-full cursor-pointer">
//                   Profile
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <button
//                   className="w-full cursor-pointer"
//                   onClick={onLogOutClick}
//                 >
//                   Log Out
//                 </button>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       ) : (
//         <Link
//           href="/servicehub"
//           className="text-primary hover:cursor-pointer mr-3"
//         >
//           Log in
//         </Link>
//       )}

//       <Button
//         variant="default"
//         className="ml-2 lg:ml-auto rounded-full px-4"
//         size="sm"
//       >
//         Book A Demo
//       </Button>
//     </div>
//   );
// }
