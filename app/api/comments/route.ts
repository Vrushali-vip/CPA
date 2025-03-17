// import { getServerSession } from "next-auth";
// import authOptions from "../auth/[...nextauth]/authOptions";
// import pb from "@/lib/pocketbase";
// import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(request: NextRequest) {
//     const fd = await request.formData();
//     const session = await getServerSession(authOptions);
//     pb.autoCancellation(false);

//     const files_attached = fd.get("files_attached") as string;
//     const attachments = [];
//     for (let i = 0; i < Number(files_attached); i++) {
//         attachments.push(fd.get(`attachments_${i}`));
//     }

//     try {
//         // Save the comment in PocketBase
//         const comment = await pb.collection("ticket_comments").create({
//             ticket: fd.get("ticket") as string,
//             content: fd.get("content") as string,
//             user: session?.user.id,
//             attachments: attachments,
//         });

//         // Fetch ticket details
//         const ticket = await pb.collection("tickets").getOne(fd.get("ticket") as string, {
//             expand: "customer,support", 
//             fields: "id,ticket,user,content,attachments,expand.user.id,expand.user.name,expand.support.id,expand.support.name,expand.support.email,expand.updated.id,expand.updated.name,customer,expand.customer.id,expand.customer.name,expand.customer.email",

//         });

//         // Debug fetched ticket
//         console.log("Fetched ticket data:", JSON.stringify(ticket, null, 2));

//         if (!ticket.expand) {
//             console.error("Ticket expand data is missing.");
//             return NextResponse.json({ error: "Ticket data is incomplete." });
//         }

        
//         // Determine recipient email
//         const isSupportUser = ticket.expand.support.id === session?.user.id;
//         const customerEmail = ticket.expand.customer.email || null;
//         const supportUserEmail = ticket.expand.support.email || null;
//         const ticketUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/servicehub/${ticket.id}`; 

//         if (!customerEmail && !supportUserEmail) {
//             console.error("Neither customer email nor support user email could be determined.");
//             return NextResponse.json({ error: "Recipient email could not be determined." });
//         }

//         const recipientEmail = isSupportUser ? customerEmail : supportUserEmail;

//         if (!recipientEmail) {
//             throw new Error("Recipient email could not be determined.");
//         }

//         const transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST,
//             port: parseInt(process.env.SMTP_PORT || "587"),
//             secure: process.env.SMTP_SECURE === "true",
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_PASS,
//             },
//         });
        

//         const emailSubject = isSupportUser
//             ? `Update on Your Ticket #${ticket.id}`
//             : `New Comment on Ticket #${ticket.id}`;
//         const recipientName = isSupportUser ? ticket.expand.customer.name : ticket.expand.support.name;

//         const emailBody = `
//             <p>Hello, <strong>${recipientName}</strong></p>
//             <p>There is a new comment on the ticket <strong>#${ticket.id}</strong>:</p>
//             <blockquote>${fd.get("content")}</blockquote>
//             <p>Click here for more details <a href="${ticketUrl}" target="_blank">View Ticket</a></p>
//         `;

//         const info = await transporter.sendMail({
//             from: process.env.SMTP_FROM,
//             to: recipientEmail,
//             subject: emailSubject,
//             html: emailBody,
//         });
        
//         console.log("Email sent:", info);
//         console.log("Recipient email:", recipientEmail);


//         return NextResponse.json(comment);
//     } catch (error) {
//         console.error("Error creating comment or sending email:", error);
//         return NextResponse.json({ error: "Comment could not be created or email not sent." });
//     }
// }

import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";
import pb from "@/lib/pocketbase";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";

export async function POST(request: NextRequest) {
  const fd = await request.formData();
  const session = await getServerSession(authOptions);
  pb.autoCancellation(false);

  const filesAttached = fd.get("files_attached") as string;
  const attachments: FormDataEntryValue[] = [];
  for (let i = 0; i < Number(filesAttached); i++) {
    attachments.push(fd.get(`attachments_${i}`) as FormDataEntryValue);
  }

  try {
    const comment = await pb.collection("ticket_comments").create({
      ticket: fd.get("ticket") as string,
      content: fd.get("content") as string,
      user: session?.user.id,
      attachments,
    });

    const ticket = await pb.collection("tickets").getOne(fd.get("ticket") as string, {
      expand: "customer,support",
      fields: "id,expand.customer.email,expand.customer.name,expand.support.email,expand.support.name",
    });

    if (!ticket.expand) {
      console.error("Ticket expand data is missing.");
      return NextResponse.json({ error: "Ticket data is incomplete." });
    }

    const isSupportUser = ticket.expand.support.id === session?.user.id;
    const recipientEmail = isSupportUser
      ? ticket.expand.customer.email
      : ticket.expand.support.email;

    if (!recipientEmail) {
      throw new Error("Recipient email could not be determined.");
    }

    const ticketUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/servicehub/${ticket.id}`;
    const emailSubject = isSupportUser
      ? `Update on Your Ticket #${ticket.id}`
      : `New Comment on Ticket #${ticket.id}`;
    const recipientName = isSupportUser
      ? ticket.expand.customer.name
      : ticket.expand.support.name;
    const emailBody = `
      <p>Hello, <strong>${recipientName}</strong></p>
      <p>There is a new comment on the ticket <strong>#${ticket.id}</strong>:</p>
      <blockquote>${fd.get("content")}</blockquote>
      <p>Click here for more details: <a href="${ticketUrl}" target="_blank">View Ticket</a></p>
    `;

    await sendEmail({
      to: recipientEmail,
      subject: emailSubject,
      html: emailBody,
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment or sending email:", error);
    return NextResponse.json({ error: "Comment could not be created or email not sent." });
  }
}
