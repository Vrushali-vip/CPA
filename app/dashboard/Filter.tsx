// "use client";

// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

// interface FilterProps {
//     selectedDateFilter: string;
//     setSelectedDateFilter: (value: string) => void;
//     selectedProcess: string;
//     setSelectedProcess: (value: string) => void;
//     logs: { partner_name: string }[];
// }

// export function Filters({
//     selectedDateFilter,
//     setSelectedDateFilter,
//     selectedProcess,
//     setSelectedProcess,
//     logs,
// }: FilterProps) {
//     const partnersWithImages = ["Vigo", "Quargo", "Vita", "Cumbria"];

//     const uniqueProcesses = Array.from(new Set(logs.map((log) => log.partner_name)))
//         .filter(partner => partner && partner.trim() !== '')
//         .sort();

//     return (
//         <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:items-end w-full">
//             <div className="flex flex-col w-full sm:w-auto">
//                 <label className="text-sm mb-1">Date Range</label>
//                 <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
//                     <SelectTrigger className="text-white border-gray-600 w-full sm:w-[180px]">
//                         <SelectValue placeholder="Select Date Range" />
//                     </SelectTrigger>
//                     <SelectContent className="text-white bg-gray-800 border-gray-600">
//                         <SelectItem value="Today">Today</SelectItem>
//                         <SelectItem value="Yesterday">Yesterday</SelectItem>
//                         <SelectItem value="This Week">This Week</SelectItem>
//                         <SelectItem value="This Month">This Month</SelectItem>
//                         <SelectItem value="All">All Time</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>

//             <div className="flex flex-col w-full sm:w-auto">
//                 <label className="text-sm mb-1">Processes</label>
//                 <Select value={selectedProcess} onValueChange={setSelectedProcess}>
//                      <SelectTrigger className="text-white border-gray-600 w-full sm:w-[240px]">
//                         <SelectValue placeholder="Select Process" />
//                     </SelectTrigger>
//                     <SelectContent className="text-white bg-gray-800 border-gray-600 max-h-[300px]">
//                         <SelectItem value="All">All</SelectItem>
//                         {uniqueProcesses.map((partner) => {
//                             let displayText = partner;
//                             if (partnersWithImages.includes(partner)) {
//                                 displayText = `Partner POD Image - ${partner}`;
//                             }
//                             return (
//                                 <SelectItem key={partner} value={partner}>
//                                     {displayText}
//                                 </SelectItem>
//                             );
//                         })}
//                     </SelectContent>
//                 </Select>
//             </div>

//             <div className="bg-white  rounded-md mt-2 sm:mt-0 w-fit">
//                 <img
//                     src="/xpo-logistics.svg"
//                     alt="XPO Logistics Logo"
//                     className="h-8 w-auto block mt-2"
//                 />
//             </div>
//         </div>
//     );
// }

"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FilterProps {
    selectedDateFilter: string;
    setSelectedDateFilter: (value: string) => void;
    selectedProcess: string;
    setSelectedProcess: (value: string) => void;
    logs: { partner_name: string }[];
}

export function Filters({
    selectedDateFilter,
    setSelectedDateFilter,
    selectedProcess,
    setSelectedProcess,
    logs,
}: FilterProps) {
    const partnersWithImages = ["Vigo", "Quargo", "Vita", "Cumbria"];

    const uniqueProcesses = Array.from(new Set(logs.map((log) => log.partner_name)))
        .filter(partner => partner && partner.trim() !== '')
        .sort();

    return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:items-end w-full">
            <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm mb-1">Date Range</label>
                <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
                    <SelectTrigger className="text-white border-gray-600 w-full sm:w-[180px]">
                        <SelectValue placeholder="Select Date Range" />
                    </SelectTrigger>
                    <SelectContent className="text-white bg-gray-800 border-gray-600">
                        <SelectItem value="Today">Today</SelectItem>
                        <SelectItem value="Yesterday">Yesterday</SelectItem>
                        <SelectItem value="This Week">This Week</SelectItem>
                        {/* Added Last Week Option */}
                        <SelectItem value="Last Week">Last Week</SelectItem>
                        <SelectItem value="This Month">This Month</SelectItem>
                        <SelectItem value="All">All Time</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm mb-1">Processes</label>
                <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                     <SelectTrigger className="text-white border-gray-600 w-full sm:w-[240px]">
                        <SelectValue placeholder="Select Process" />
                    </SelectTrigger>
                    <SelectContent className="text-white bg-gray-800 border-gray-600 max-h-[300px]">
                        <SelectItem value="All">All</SelectItem>
                        {uniqueProcesses.map((partner) => {
                            let displayText = partner;
                            if (partnersWithImages.includes(partner)) {
                                displayText = `Partner POD Image - ${partner}`;
                            }
                            return (
                                <SelectItem key={partner} value={partner}>
                                    {displayText}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>

            <div className="bg-white  rounded-md mt-2 sm:mt-0 w-fit">
                <img
                    src="/xpo-logistics.svg"
                    alt="XPO Logistics Logo"
                    className="h-8 w-auto block mt-2"
                />
            </div>
        </div>
    );
}