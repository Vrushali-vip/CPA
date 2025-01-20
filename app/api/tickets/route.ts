import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";
import pb from "@/lib/pocketbase";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";

export async function POST(request: NextRequest) {
  const fd = await request.formData();
  const session = await getServerSession(authOptions);

  const filesAttached = fd.get("files_attached") as string;
  const attachments: FormDataEntryValue[] = [];
  for (let i = 0; i < Number(filesAttached); i++) {
    attachments.push(fd.get(`attachments_${i}`) as FormDataEntryValue);
  }

  try {
    const ticket = await pb.collection("tickets").create({
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      customer: session?.user.id,
      topic: fd.get("topic") as string,
      issue: fd.get("issue") as string,
      subIssue: fd.get("subIssue") as string,
      status: "OPEN",
      email: fd.get("email") as string,
      attachments,
    });

    const customer = await pb.collection("users").getOne(session?.user.id || "");
    const ticketUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/servicehub/${ticket.id}`;

    const emailSubject = `Ticket #${ticket.id} Created Successfully`;
    const emailBody = `
      <p>Hello <strong>${customer.name}</strong>,</p>
      <p>Your ticket has been successfully created with the following details:</p>
      
      <p>TICKET ID: #${ticket.id}</p>
      <p>TITLE: ${ticket.title}</p>
      <p>TOPIC: ${ticket.topic}</p>
      <p>STATUS: ${ticket.status}</p>
      
      <p>Click here to view your ticket: <a href="${ticketUrl}" target="_blank">View Ticket</a></p>
      <p>We'll get back to you as soon as possible.</p>
    `;

    await sendEmail({
      to: customer.email,
      subject: emailSubject,
      html: emailBody,
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Error creating ticket or sending email:", error);
    return NextResponse.json({ error: "Ticket could not be created." });
  }
}
