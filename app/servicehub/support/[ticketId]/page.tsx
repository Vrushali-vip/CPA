import pb, { getImageUrl } from "@/lib/pocketbase";
import { Ticket, TicketComment } from "../../types"
import FullScreenImage from "@/components/custom/FullScreenImage";
import CommentForm from "./CommentForm";
import GoBack from "@/components/custom/GoBack";
import UpdateTicketStatus from "../UpdateTicketStatus";


export const revalidate = 0;
export default async function TicketById({ params }: { params: { ticketId: string } }) {
    const [ticket, comments] = await Promise.all([
        pb.collection("tickets").getOne<Ticket>(params.ticketId, {
            expand: "customer,support",
            fields: "id,title,status,description,created,attachments,expand,customer,customer.id,customer.name,customer.avatar,support,support.id,support.name,support.role,support.sub",
        }),
        pb.collection("ticket_comments").getFullList<TicketComment>({
            filter: `ticket.id="${params.ticketId}"`,
            expand: "user",
            fields: "id,ticket,user,content,created,attachments,expand,user.id,user.name",
            sort: "created",
            $autoCancel: false
        }),
    ]);

    return (
        <main className="min-h-screen p-4 lg:px-8 flex justify-center items-center">
            <div className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-6 mr-2">
                    <GoBack />
                    <UpdateTicketStatus ticketId={ticket.id} />
                </div>
                <div className="space-y-6">
                    <div className="p-6 bg-gray-800 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            ticket.expand.customer.avatar
                                                ? pb.files.getUrl(ticket.expand.customer, ticket.expand.customer.avatar)
                                                : "/default-avatar.png"
                                        }
                                        alt={ticket.expand.customer.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold">{ticket.expand.customer.name}</h2>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold mt-2">{ticket.title}</p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        {new Date(ticket.created)
                                            .toLocaleString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true,
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                            .replace(/,/g, "")
                                            .replace("am", "AM")
                                            .replace("pm", "PM")}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-200 mt-2 flex items-center gap-2">
                                    <span className={`text-xs border rounded-md px-2 py-1 status-${ticket.status}`}>
                                        {ticket.status}
                                    </span>
                                    <span className="w-2 h-2 inline-block"></span>
                                    {ticket.id}
                                </p>
                                <p className="mt-6 whitespace-pre-wrap">{ticket.description}</p>
                            </div>
                        </div>
                        {ticket.attachments.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                                {ticket.attachments.map((attachment) => (
                                    <FullScreenImage
                                        key={attachment}
                                        src={getImageUrl("tickets", params.ticketId, attachment)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
                        {comments.map((comment) => (
                            <div key={comment.id} className="p-4 bg-gray-800 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={
                                                comment.expand?.user?.avatar
                                                    ? pb.files.getUrl(comment.expand.user, comment.expand.user.avatar)
                                                    : "/default-avatar.png"
                                            }
                                            alt={comment.expand?.user?.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-sm text-white-600 font-semibold">{comment.expand?.user?.name}</p>
                                            <p className="text-xs text-gray-400 mt-1">{comment.expand?.user?.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {new Date(comment.created)
                                            .toLocaleString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true,
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                            .replace(/,/g, "")
                                            .replace("am", "AM")
                                            .replace("pm", "PM")}
                                    </p>
                                </div>
                                <p className="mt-6 whitespace-pre-wrap">{comment.content}</p>
                                {comment.attachments.length > 0 && (
                                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {comment.attachments.map((attachment) => (
                                            <FullScreenImage
                                                key={attachment}
                                                src={getImageUrl("ticket_comments", comment.id, attachment)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <CommentForm ticketId={params.ticketId} />
                </div>
            </div>
        </main>
    );
}

