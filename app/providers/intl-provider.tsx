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


// "use client";

// import { NextIntlClientProvider } from "next-intl";
// import { useState, useEffect } from "react";
// import en from "@/messages/en.json";
// import de from "@/messages/de.json";

// type Messages = typeof en;

// const messagesMap: Record<string, Messages> = {
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

// "use client";

// import { NextIntlClientProvider } from "next-intl";
// import { ReactNode, useEffect, useState } from "react";

// export default function IntlProviderWrapper({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [locale, setLocale] = useState("en");
//   const [messages, setMessages] = useState<any>(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("locale");
//     const initialLocale = stored || "en";
//     setLocale(initialLocale);

//     import(`../../messages/${initialLocale}.json`).then((mod) =>
//       setMessages(mod.default)
//     );
//   }, []);

//   // Only render when messages are loaded
//   if (!messages) return null;

//   return (
//     <NextIntlClientProvider locale={locale} messages={messages}>
//       {children}
//     </NextIntlClientProvider>
//   );
// }

"use client";

import { NextIntlClientProvider, Messages } from "next-intl";
import { ReactNode, useEffect, useState } from "react";

export default function IntlProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("locale");
    const initialLocale = stored || "en";
    setLocale(initialLocale);

    import(`../../messages/${initialLocale}.json`).then((mod) =>
      setMessages(mod.default)
    );
  }, []);

  if (!messages) return null;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
