"use client";

import { TicketListItemForSupport, UserListItem } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssignTicketDialog from "./AssignTicketDialog";
import { useState, useEffect } from "react";
import TicketSearch from "./TicketSearch";
import { useSearchParams, useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";

type SupportDashboardGridProps = {
  supportUsers: UserListItem[];
  assignedTickets: TicketListItemForSupport[];
  unassignedTickets: TicketListItemForSupport[];
};

export default function SupportDashboardGrid({
  supportUsers,
  assignedTickets,
  unassignedTickets,
}: SupportDashboardGridProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short", // Short month name (e.g., Jan, Feb)
      year: "numeric"
    });
  };
  

  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTicketIdToAssign, setSelectedTicketIdToAssign] = useState<string | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState<string>(searchParams.get("name") || "");
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get("status") || "ALL");
  const [periodFilter, setPeriodFilter] = useState<string>(searchParams.get("period") || "ALL");
  const [customerFilter, setCustomerFilter] = useState<string>(searchParams.get("customer") || "ALL");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined);
  const [filteredAssignedTickets, setFilteredAssignedTickets] = useState<TicketListItemForSupport[]>(assignedTickets);
  const [filteredUnassignedTickets, setFilteredUnassignedTickets] = useState<TicketListItemForSupport[]>(unassignedTickets);

  const allCustomers = Array.from(
    new Map(
      [...assignedTickets, ...unassignedTickets].map((ticket) => [
        ticket.expand?.customer?.id || "unknown",
        { id: ticket.expand?.customer?.id || "unknown", name: ticket.expand?.customer?.name || "Unknown" },
      ])
    ).values()
  );

  function handleAssignDialogOpenChange(open: boolean) {
    if (!open) {
      setSelectedTicketIdToAssign(undefined);
    }
  }

  const clearFilters = () => {
    setNameFilter("");
    setStatusFilter("ALL");
    setCustomerFilter("ALL");
    setPeriodFilter("ALL");
    setSelectedDateRange(undefined);
    updateURLParams({ name: "", status: "ALL", customer: "ALL", period: "ALL" });
  };

  const updateURLParams = (params: { name: string; status: string; customer: string; period: string }) => {
    const query = new URLSearchParams();
    if (params.name) query.set("name", params.name);
    if (params.status && params.status !== "ALL") query.set("status", params.status);
    if (params.customer && params.customer !== "ALL") query.set("customer", params.customer);
    if (params.period && params.period !== "ALL") query.set("period", params.period);
    router.push(`?${query.toString()}`);
  };

  const filterByPeriod = (ticketDate: string | Date) => {
    const currentDate = new Date();
    const ticketCreatedDate = new Date(ticketDate);

    const currentTimestamp = currentDate.getTime();
    const ticketTimestamp = ticketCreatedDate.getTime();

    switch (periodFilter) {
      case "this-week": {
        const currentDay = new Date(currentTimestamp).getDay(); 
        const startOfWeekTimestamp = currentTimestamp - currentDay * 24 * 60 * 60 * 1000 + 1 * 24 * 60 * 60 * 1000; 
        const endOfWeekTimestamp = startOfWeekTimestamp + 6 * 24 * 60 * 60 * 1000 - 1; 
        return ticketTimestamp >= startOfWeekTimestamp && ticketTimestamp <= endOfWeekTimestamp;
      }
    
      case "last-week": {
        const currentDay = new Date(currentTimestamp).getDay(); 
        const endOfLastWeekTimestamp = currentTimestamp - currentDay * 24 * 60 * 60 * 1000 - 1; 
        const startOfLastWeekTimestamp = endOfLastWeekTimestamp - 6 * 24 * 60 * 60 * 1000 + 1; 
        return (
          ticketTimestamp >= startOfLastWeekTimestamp &&
          ticketTimestamp <= endOfLastWeekTimestamp
        );
      }
    
      case "this-month": {
        const currentDate = new Date(currentTimestamp);
        const startOfMonthTimestamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime();
        const endOfMonthTimestamp = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999).getTime();
        return ticketTimestamp >= startOfMonthTimestamp && ticketTimestamp <= endOfMonthTimestamp;
      }
    
      case "last-month": {
        const currentDate = new Date(currentTimestamp);
        const startOfLastMonthTimestamp = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1).getTime();
        const endOfLastMonthTimestamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0, 23, 59, 59, 999).getTime();
        return (
          ticketTimestamp >= startOfLastMonthTimestamp &&
          ticketTimestamp <= endOfLastMonthTimestamp
        );
      }
    
      case "last-3-months": {
        const threeMonthsAgoTimestamp = currentTimestamp - 3 * 30 * 24 * 60 * 60 * 1000; // Approximation: 3 months = 90 days
        return ticketTimestamp >= threeMonthsAgoTimestamp;
      }
    
      case "last-6-months": {
        const sixMonthsAgoTimestamp = currentTimestamp - 6 * 30 * 24 * 60 * 60 * 1000; // Approximation: 6 months = 180 days
        return ticketTimestamp >= sixMonthsAgoTimestamp;
      }
      case "last-year": {
        const currentDate = new Date(currentTimestamp);
        const startOfLastYearTimestamp = new Date(currentDate.getFullYear() - 1, 0, 1).getTime(); // January 1st of last year
        const endOfLastYearTimestamp = new Date(currentDate.getFullYear() - 1, 11, 31, 23, 59, 59, 999).getTime(); // December 31st of last year
        return (
          ticketTimestamp >= startOfLastYearTimestamp &&
          ticketTimestamp <= endOfLastYearTimestamp
        );
      }
      case "date_range":
        if (!selectedDateRange || !selectedDateRange.from || !selectedDateRange.to) return true;
        return (
          ticketCreatedDate >= selectedDateRange.from && ticketCreatedDate <= selectedDateRange.to
        );
      default:
        return true;
    }
  };

  useEffect(() => {
    const filterTickets = (tickets: TicketListItemForSupport[]) => {
      return tickets.filter((ticket) => {
        const nameMatch = ticket.title.toLowerCase().includes(nameFilter.toLowerCase());
        const statusMatch = statusFilter === "ALL" || ticket.status === statusFilter;
        const customerMatch =
          customerFilter === "ALL" || ticket.expand?.customer?.id === customerFilter;
        const periodMatch = filterByPeriod(ticket.created);
        return nameMatch && statusMatch && customerMatch && periodMatch;
      });
    };

    setFilteredAssignedTickets(filterTickets(assignedTickets));
    setFilteredUnassignedTickets(filterTickets(unassignedTickets));
  }, [nameFilter, statusFilter, customerFilter, periodFilter, selectedDateRange, assignedTickets, unassignedTickets]);

  useEffect(() => {
    updateURLParams({ name: nameFilter, status: statusFilter, customer: customerFilter, period: periodFilter });
  }, [nameFilter, statusFilter, customerFilter, periodFilter]);

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="mb-6">
        <TicketSearch
        
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          customerFilter={customerFilter}
          setCustomerFilter={setCustomerFilter}
          periodFilter={periodFilter}
          setPeriodFilter={setPeriodFilter}
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          clearFilters={clearFilters}
          customers={allCustomers}
        />
      </div>

      <Tabs defaultValue="assigned" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="space-x-2 w-full bg-background">
              <TabsTrigger
                value="assigned"
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Assigned Tickets
              </TabsTrigger>
              <TabsTrigger
                value="unassigned"
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Unassigned Tickets
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="assigned"
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-0"
          >
            {filteredAssignedTickets.map((ticket) => (
              <div key={ticket.id} className="hover:shadow-lg transition-shadow">
                <div className="p-4 bg-gray-800 shadow-sm h-full">
                  <h1 className="text-lg md:text-xl font-semibold mb-3 line-clamp-2">
                    {ticket.title.split(" ").slice(0, 3).join(" ")}
                  </h1>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">Status: {ticket.status}</p>
                    <p className="text-sm">Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
                    <p className="text-sm">Created: {formatDate(ticket.created)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                    <Button
                      onClick={() => setSelectedTicketIdToAssign(ticket.id)}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto flex-1 sm:flex-initial min-w-[120px] justify-center"
                    >
                      Assign Ticket
                    </Button>
                    <Link
                      href={`/servicehub/support/${ticket.id}`}
                      className="w-full sm:w-auto flex-1 sm:flex-initial"
                    >
                      <Button
                        className="w-full min-w-[120px] justify-center"
                        size="sm"
                      >
                        View Ticket
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent
            value="unassigned"
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-0"
          >
            {filteredUnassignedTickets.map((ticket) => (
              <div key={ticket.id} className="hover:shadow-lg transition-shadow">
                <div className="p-4 bg-gray-800 shadow-sm h-full">
                  <h1 className="text-lg md:text-xl font-semibold mb-3 line-clamp-2">
                    {ticket.title.split(" ").slice(0, 3).join(" ")}
                  </h1>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">Status: {ticket.status}</p>
                    <p className="text-sm">Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
                    <p className="text-sm">Created: {formatDate(ticket.created)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                    <Button
                      onClick={() => setSelectedTicketIdToAssign(ticket.id)}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto flex-1 sm:flex-initial min-w-[120px] justify-center"
                    >
                      Assign Ticket
                    </Button>
                    <Link
                      href={`/servicehub/support/${ticket.id}`}
                      className="w-full sm:w-auto flex-1 sm:flex-initial"
                    >
                      <Button
                        className="w-full min-w-[120px] justify-center"
                        size="sm"
                      >
                        View Ticket
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
      </Tabs>

      <AssignTicketDialog
        open={selectedTicketIdToAssign !== undefined}
        setOpen={handleAssignDialogOpenChange}
        ticketId={selectedTicketIdToAssign}
        supportUsers={supportUsers}
      />
    </div>
  );
}
