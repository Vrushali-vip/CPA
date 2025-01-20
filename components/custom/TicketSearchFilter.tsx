"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function TicketSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string | null>(searchParams.get("status"));
  const [keyword, setKeyword] = useState<string>(searchParams.get("keyword") || "");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    if (startDateParam && endDateParam) {
      return {
        from: new Date(startDateParam),
        to: new Date(endDateParam),
      };
    }
    return undefined;
  });

  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const debouncedUpdateQuery = useDebouncedCallback(() => {
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    if (keyword) params.set("keyword", keyword);
    if (dateRange?.from) {
      params.set("startDate", format(dateRange.from, "yyyy-MM-dd"));
    }
    if (dateRange?.to) {
      params.set("endDate", format(dateRange.to, "yyyy-MM-dd"));
    }

    router.push(`/servicehub?${params.toString()}`);
  }, 300);

  useEffect(() => {
    debouncedUpdateQuery();
  }, [status, keyword, dateRange, debouncedUpdateQuery]);

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);

    let fromDate: Date | undefined;
    let toDate: Date | undefined = new Date();

    switch (value) {
      case "this-week":
        fromDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        break;
      case "last-week":
        fromDate = startOfWeek(subMonths(new Date(), 1), { weekStartsOn: 1 });
        toDate = endOfWeek(subMonths(new Date(), 1), { weekStartsOn: 1 });
        break;
      case "this-month":
        fromDate = startOfMonth(new Date());
        break;
      case "last-month":
        fromDate = startOfMonth(subMonths(new Date(), 1));
        toDate = endOfMonth(subMonths(new Date(), 1));
        break;
      case "last-3-months":
        fromDate = subMonths(new Date(), 3);
        break;
      case "last-6-months":
        fromDate = subMonths(new Date(), 6);
        break;
      case "date-range":
        return;
      default:
        return;
    }

    if (fromDate && toDate) {
      setDateRange({ from: fromDate, to: toDate });
    } else if (fromDate) {
      setDateRange({ from: fromDate, to: new Date() });
    }
  };

  const clearFilters = () => {
    setStatus(null);
    setKeyword(""); 
    setDateRange(undefined); 
    setSelectedPeriod(null); 
    router.push("/servicehub"); 
  };
  

  const hasActiveFilters = status || keyword || dateRange?.from || dateRange?.to;

  return (
    <div className="rounded-lg mb-4 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filter Tickets</h2>
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            className="text-white border-gray-600"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className={`flex flex-wrap gap-2`}>
        <div
          className={`flex-1 ${selectedPeriod === "date-range" ? "lg:w-[30%]" : "lg:w-[40%]"}`}
        >
          <Label className="text-md font-medium mb-1"></Label>
          <Input
            type="text"
            className="w-full border rounded-md p-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by title"
          />
        </div>

        <div className={`flex-1 ${selectedPeriod === "date-range" ? "lg:w-[30%]" : "lg:w-[20%]"}`}>
          <Select
            value={selectedPeriod || undefined}
            onValueChange={handlePeriodChange}
          >
            <SelectTrigger className="w-full border rounded-md p-2 text-gray-400">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select period</SelectLabel>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="date-range">Custom Date Range</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {selectedPeriod === "date-range" && (
          <div className="flex-1 lg:w-[20%]">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
        )}

        <div className={`flex-1 ${selectedPeriod === "date-range" ? "lg:w-[20%]" : "lg:w-[20%]"}`}>
          <Label className="text-md font-medium mb-1"></Label>
          <Select
            value={status || undefined}
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger className="w-full border rounded-md p-2 text-gray-400">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel></SelectLabel>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="PROGRESS">In Progress</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
