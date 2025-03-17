// "use client";

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import pb from "@/lib/pocketbase";
// import { useRouter } from 'next/navigation';

// export function MarkResolvedButton({ 
//   ticketId, 
//   currentStatus 
// }: { 
//   ticketId: string, 
//   currentStatus: string 
// }) {
//   const [status, setStatus] = useState(currentStatus);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleMarkResolved = async () => {
//     try {
//       setIsLoading(true);
      
//       await pb.collection("tickets").update(ticketId, { 
//         status: "RESOLVED"
//       });
      
//       setStatus("RESOLVED");
//       router.refresh();
//     } catch (error) {
//       console.error("Failed to mark ticket as resolved:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button 
//       onClick={handleMarkResolved} 
//       disabled={isLoading || status === "RESOLVED"}
//     >
//       {isLoading ? "Updating..." : 
//        status === "RESOLVED" ? "Marked ticket as Resolved" : 
//        "Mark ticket as resolved"}
//     </Button>
//   );
// }

"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import pb from "@/lib/pocketbase";
import { useRouter } from 'next/navigation';

export function MarkResolvedButton({ 
  ticketId, 
  currentStatus 
}: { 
  ticketId: string, 
  currentStatus: string 
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTicketStatusChange = async (newStatus: string) => {
    try {
      setIsLoading(true);
      
      await pb.collection("tickets").update(ticketId, { 
        status: newStatus
      });
      
      setStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error(`Failed to update ticket status to ${newStatus}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatusButton = () => {
    switch(status) {
      case "OPEN":
        return (
          <Button 
            onClick={() => handleTicketStatusChange("RESOLVED")} 
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Mark ticket as resolved"}
          </Button>
        );
      case "RESOLVED":
        return (
          <Button 
            onClick={() => handleTicketStatusChange("OPEN")} 
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Reopen the ticket"}
          </Button>
        );
      default:
        return null;
    }
  };

  return renderStatusButton();
}