import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

type TicketSearchProps = {
  nameFilter: string;
  setNameFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  customerFilter: string;
  setCustomerFilter: (filter: string) => void;
  periodFilter: string;
  setPeriodFilter: (filter: string) => void;
  selectedDateRange: DateRange | undefined;
  setSelectedDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>; 
  clearFilters: () => void;
  customers: { id: string; name: string }[];
};


const TicketSearch = ({
  nameFilter,
  setNameFilter,
  statusFilter,
  setStatusFilter,
  customerFilter,
  setCustomerFilter,
  periodFilter,
  setPeriodFilter,
  selectedDateRange,
  setSelectedDateRange,
  clearFilters,
  customers,
}: TicketSearchProps) => {

  return (
    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-2 lg:items-center mb-4">
      <div className="w-full lg:w-auto lg:flex-grow">
        <Input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-full"
          placeholder="Search by ticket name..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:flex lg:space-x-2 gap-4 lg:gap-0 w-full lg:w-auto">

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Select status</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="PROGRESS">In Progress</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
          </SelectContent>
        </Select>

        {/* Customer Filter */}
        <Select value={customerFilter} onValueChange={(value) => setCustomerFilter(value)}>
          <SelectTrigger className="w-full lg:w-[200px]">
            <SelectValue placeholder="Customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Select customer</SelectItem>
            {customers.map((customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      <Select value={periodFilter} onValueChange={(value) => setPeriodFilter(value)}>
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Select period</SelectItem>
          <SelectItem value="this-week">This week</SelectItem>
          <SelectItem value="last-week">Last week</SelectItem>
          <SelectItem value="this-month">This month</SelectItem>
          <SelectItem value="last-month">Last Month</SelectItem>
          <SelectItem value="last-3-months">Last 3 months</SelectItem>
          <SelectItem value="last-6-months">Last 6 months</SelectItem>
          <SelectItem value="last-1-year">Last 1 year</SelectItem>
          <SelectItem value="date_range">Date Range</SelectItem>
        </SelectContent>
      </Select>

      {periodFilter === "date_range" && (
        <DatePickerWithRange date={selectedDateRange} setDate={setSelectedDateRange} />
      )}

      <Button onClick={clearFilters}>Clear</Button>
    </div>
    </div>
  );
};

export default TicketSearch;
