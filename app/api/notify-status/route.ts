import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    try {
        const { ticketId, newStatus, customerEmail, customerName, ticketTitle } = await request.json();
        
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const ticketUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/servicehub/${ticketId}`;
        const emailBody = `
            <p>Hello <strong>${customerName}</strong>,</p>
            <p>The status of your ticket has been updated:</p>
                <p>TICKET ID: #${ticketId}</p>
                <p>TITLE: ${ticketTitle}</p>
                <p>STATUS: ${newStatus}</p>
            <p>View your ticket here: <a href="${ticketUrl}" target="_blank">View Ticket</a></p>
        `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: customerEmail,
            subject: `Ticket #${ticketId} Status Updated to ${newStatus}`,
            html: emailBody,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending status update notification:", error);
        return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
    }
}