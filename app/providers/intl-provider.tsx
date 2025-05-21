// "use client";

// import { NextIntlClientProvider } from "next-intl";
// import { useState, useEffect } from "react";
// import en from "@/messages/en.json";
// import de from "@/messages/de.json";

// const messagesMap: Record<string, any> = {
//   en,
//   de,
// };

// export default function IntlProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [locale, setLocale] = useState("en");

//   useEffect(() => {
//     const stored = localStorage.getItem("locale");
//     if (stored && stored in messagesMap) {
//       setLocale(stored);
//     }
//   }, []);

//   const messages = messagesMap[locale];

//   return (
//     <NextIntlClientProvider
//       locale={locale}
//       messages={messages}
//       timeZone="UTC"
//       now={new Date()}
//     >
//       {children}
//     </NextIntlClientProvider>
//   );
// }


"use client";

import { NextIntlClientProvider } from "next-intl";
import { useState, useEffect } from "react";
import en from "@/messages/en.json";
import de from "@/messages/de.json";

// Define a type for your messages structure
type Messages = typeof en;

const messagesMap: Record<string, Messages> = {
  en,
  de,
};

export default function IntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("locale");
    if (stored && stored in messagesMap) {
      setLocale(stored);
    }
  }, []);

  const messages = messagesMap[locale];

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="UTC"
      now={new Date()}
    >
      {children}
    </NextIntlClientProvider>
  );
}