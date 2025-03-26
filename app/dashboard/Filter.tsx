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
    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">Date Range</label>
                <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
                    <SelectTrigger className="text-white">
                        <SelectValue placeholder="Select Date Range" />
                    </SelectTrigger>
                    <SelectContent className="text-white">
                        <SelectItem value="Today">Today</SelectItem>
                        <SelectItem value="Yesterday">Yesterday</SelectItem>
                        <SelectItem value="This Week">This Week</SelectItem>
                        <SelectItem value="This Month">This Month</SelectItem>
                        <SelectItem value="All">All Time</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">Processes</label>
                <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                    <SelectTrigger className="text-white">
                        <SelectValue placeholder="Select Process" />
                    </SelectTrigger>
                    <SelectContent className="text-white">
                        <SelectItem value="All">All</SelectItem>
                        {Array.from(new Set(logs.map((log) => log.partner_name)))
                            .filter(partner => partner !== '')
                            .map((partner) => (
                                <SelectItem key={partner} value={partner}>
                                    {partner || "Unknown"}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}