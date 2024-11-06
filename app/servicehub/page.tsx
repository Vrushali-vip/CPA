import pb from "@/lib/pocketbase";
import { getServerSession } from "next-auth";

import { TicketListItem } from "./types";
import TicketForm from "./TicketForm";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import Link from "next/link";


export default async function ServiceHub() {

    const session = await getServerSession(authOptions);
    let tickets: TicketListItem[] = [];
    try {
        
        tickets = await pb.collection("tickets").getFullList<TicketListItem>({
            expand: "title,created,status,id,description",
            filter: `customer.id="${session?.user?.id}"`,
            sort: "-created",
        });
        
    } catch (error) {
        console.log(error);
    }


    return (
        <main className="min-h-screen">
            <div className="p-4 lg:px-8">
                <h1 className="text-xl font-bold">Service Hub for {session?.user.sub}</h1>
            </div>
            <div className="p-4 lg:px-8 flex justify-between items-center">
                <h2 className="font-bold">Tickets</h2>
                <TicketForm/> 
            </div>
            <div className="p-4 lg:px-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    tickets.map((t) => (
                        <Link key={t.id} href={`/servicehub/${t.id}`} className="border rounded p-4">
                            <h3>{t.title}</h3>
                            <p className=" text-muted-foreground line-clamp-1">{t.description}</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs">{new Date(t.created).toLocaleString()}</span>
                                <span className={`text-xs border rounded-md px-2 py-1 status-${t.status} `}>{t.status}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </main>
    )
}