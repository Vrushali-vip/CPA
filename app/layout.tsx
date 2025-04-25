// import type { Metadata } from "next";
// import { Montserrat, Roboto_Mono } from "next/font/google"

// import "./globals.css";
// import Navbar from "@/components/custom/Navbar";
// import Footer from "@/components/custom/Footer";
// import { Toaster } from "@/components/ui/toaster";
// import AuthProvider from "@/components/custom/AuthProvider";
// import NextJsTopLoader from "nextjs-toploader";

// const mont = Montserrat({
//   variable: "--font-mont",
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });
// const robo = Roboto_Mono({
//   variable: "--font-robo",
//   subsets: ["latin"],
//   display: "swap",
// })

// export const metadata: Metadata = {
//   title: {
//     template: '%s | Alphalake Services',
//     default: 'Alphalake Services - for Efficient Business Processes',
//   },
//   description: "Tailored end-to-end implementation services for automation and Ai solutions. Alphalake Ai are specialists in health and human services.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <AuthProvider>
//         <body
//           className={`${mont.variable} ${robo.variable} dark antialiased max-w-100vw overflow-x-hidden`}
//         >
//           <NextJsTopLoader />
//           <Navbar />
//           {children}
//           <Footer />
//           <Toaster />
//         </body>
//       </AuthProvider>
//     </html>
//   );
// }

// import type { Metadata } from "next";
// import { Montserrat, Roboto_Mono } from "next/font/google"
// import "./globals.css";
// import Navbar from "@/components/custom/Navbar";
// import Footer from "@/components/custom/Footer";
// import { Toaster } from "@/components/ui/toaster";
// import AuthProvider from "@/components/custom/AuthProvider";
// import NextJsTopLoader from "nextjs-toploader";
// import AuthenticatedMenu from "@/components/custom/AuthenticatedMenu";


// const mont = Montserrat({
//   variable: "--font-mont",
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

// const robo = Roboto_Mono({
//   variable: "--font-robo",
//   subsets: ["latin"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: {
//     template: '%s | Alphalake Services',
//     default: 'Alphalake Services - for Efficient Business Processes',
//   },
//   description: "Tailored end-to-end implementation services for automation and Ai solutions. Alphalake Ai are specialists in health and human services.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <AuthProvider>
//         <body
//           className={`${mont.variable} ${robo.variable} dark antialiased max-w-100vw overflow-x-hidden`}
//         >
//           <NextJsTopLoader />
//           <Navbar />
//           <AuthenticatedMenu />
//           {children}
//           <Footer />
//           <Toaster />
//         </body>
//       </AuthProvider>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/custom/AuthProvider";
import NextJsTopLoader from "nextjs-toploader";
import AuthenticatedMenuWrapper from "@/AuthenticatedMenuWrapper";


const mont = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const robo = Roboto_Mono({
  variable: "--font-robo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Alphalake Services",
    default: "Alphalake Services - for Efficient Business Processes",
  },
  description:
    "Tailored end-to-end implementation services for automation and Ai solutions. Alphalake Ai are specialists in health and human services.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${mont.variable} ${robo.variable} dark antialiased max-w-100vw overflow-x-hidden`}
        >
          <NextJsTopLoader />
          <Navbar />
          <AuthenticatedMenuWrapper />
          {children}
          <Footer />
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}

