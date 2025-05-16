"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BookingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center">Book a Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Olly */}
        <div className="p-6 rounded-xl border shadow-md flex flex-col items-center">
          <div className="w-40 h-40 relative mb-4">
            <Image
              src="/ollyc.jpg"
              alt="Olly"
              fill
              className="rounded-full object-cover"
              sizes="160px"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Olly Cogan</h2>
          <p className="text-sm mb-4 text-center">Founder and CEO</p>
          <Button
            onClick={() => router.push("/bookings/uk")}
            className="rounded-full px-6"
          >
            UK Business Hours
          </Button>
        </div>

        <div className="p-6 rounded-xl border shadow-md flex flex-col items-center">
          <div className="w-40 h-40 relative mb-4">
            <Image
              src="/alwin.jpg"
              alt="Alwin"
              fill
              className="rounded-full object-cover"
              sizes="160px"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Alwin Fernandes</h2>
          <p className="text-sm mb-4 text-center">Director and Equity Partner</p>
          <Button
            onClick={() => router.push("/bookings/india")}
            className="rounded-full px-6"
          >
            India Business Hours
          </Button>
        </div>
      </div>
    </div>
  );
}
