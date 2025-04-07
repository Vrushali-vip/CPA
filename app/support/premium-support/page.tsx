"use client";
import React from "react";

export default function ServiceHubInfo() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-6xl w-full">
      <h2 className="text-3xl font-bold text-white mb-4 text-center mb-6">Key Information</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <div className="border border-gray-700">
            {[
              ["Service Commencement", "The support commences on the day your quote is accepted and/or digitally signed."],
              ["Service Expiration", "The ServiceHub is offered on a rolling monthly basis until such time as a request for discontinuation is received from an authorised person at the customer. 1 month’s notice is required."],
              ["UK Business Hours", "8am to 6pm."],
              ["Hours of Cover", "24 hours per day, 7 days a week, 365 days a year."],
              ["Named persons authorised to log tickets", "A list of named persons authorised to log tickets on behalf of the customer is agreed and maintained. If a ticket is received from anyone outside this list, our team will seek approval from someone on the named list before adding them."],
              ["Escalations at Alphalake", "Olly Cogan, Steve Elliott, Alwin Fernandes"]
            ].map(([title, description], index) => (
              <div key={index} className="flex border-t border-gray-700">
                <div className="w-1/3  p-4 font-semibold border-b border-l border-t border-primary text-primary">{title}</div>
                <div className="w-2/3 p-4 border-b border-r border-t border-l border-white">{description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
