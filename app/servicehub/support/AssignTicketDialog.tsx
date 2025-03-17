// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { TicketListItemForSupport, UserListItem } from "../types";
// import pb from "@/lib/pocketbase";
// import { toast } from "@/hooks/use-toast";  // Import the toast hook

// type AssignTicketDialogProps = {
//   supportUsers: UserListItem[];
//   ticketId: TicketListItemForSupport["id"] | undefined;
//   open: boolean;
//   setOpen: (state: boolean) => void;
// };

// export default function AssignTicketDialog({
//   supportUsers,
//   ticketId,
//   open,
//   setOpen,
// }: AssignTicketDialogProps) {
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleAssignTicket = async (ticketId: string, userId: string) => {
//     try {
//       setLoading(true);
//       await pb.collection("tickets").update(ticketId, {
//         support: userId,
//       });
//       toast({ title: "Ticket assigned successfully!", description: "" });
//       setOpen(false);
//     } catch (error) {
//       console.error("Error assigning ticket:", error);
//       toast({ title: "Failed to assign ticket.", description: "Please try again.", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!selectedUserId || !ticketId) {
//       toast({ title: "Please select a support user.", description: "" });
//       return;
//     }
//     await handleAssignTicket(ticketId, selectedUserId);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[500px] mx-auto p-6 rounded-md shadow-md">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <DialogHeader>
//             <DialogTitle className="text-lg font-medium">Assign Ticket: {ticketId}</DialogTitle>
//             <DialogDescription className="text-md">
//               Select a support user to assign this ticket to.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4">
//             <div className="flex flex-col mt-20">
//               <Label htmlFor="support-user" className="mb-2">
//                 Support User
//               </Label>
//               <Select onValueChange={(value) => setSelectedUserId(value)}>
//                 <SelectTrigger className="w-full border rounded-md">
//                   <SelectValue placeholder="Select a support user" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {supportUsers.map((user) => (
//                     <SelectItem key={user.id} value={user.id}>
//                       {user.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <DialogFooter className="flex justify-end space-x-4">
//             <Button type="button" variant="outline" onClick={() => setOpen(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Assigning..." : "Assign Ticket"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TicketListItemForSupport, UserListItem } from "../types";
import pb from "@/lib/pocketbase";
import { toast } from "@/hooks/use-toast";  

type AssignTicketDialogProps = {
  supportUsers: UserListItem[];
  ticketId: TicketListItemForSupport["id"] | undefined;
  open: boolean;
  setOpen: (state: boolean) => void;
};

export default function AssignTicketDialog({
  supportUsers,
  ticketId,
  open,
  setOpen,
}: AssignTicketDialogProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAssignTicket = async (ticketId: string, userId: string) => {
    try {
      setLoading(true);
      await pb.collection("tickets").update(ticketId, {
        support: userId,
      });
      toast({ title: "Ticket assigned successfully!", description: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error assigning ticket:", error);
      toast({ title: "Failed to assign ticket.", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUserId || !ticketId) {
      toast({ title: "Please select a support user.", description: "" });
      return;
    }
    await handleAssignTicket(ticketId, selectedUserId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] mx-auto p-6 rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">Assign Ticket: {ticketId}</DialogTitle>
            <DialogDescription className="text-md">
              Select a support user to assign this ticket to.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex flex-col mt-20">
              <Label htmlFor="support-user" className="mb-2">
                Support User
              </Label>
              <Select onValueChange={(value) => setSelectedUserId(value)}>
                <SelectTrigger className="w-full border rounded-md">
                  <SelectValue placeholder="Select a support user" />
                </SelectTrigger>
                <SelectContent>
                  {supportUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Assigning..." : "Assign Ticket"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}