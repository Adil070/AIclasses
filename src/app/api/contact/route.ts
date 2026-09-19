import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getAdminDb } from "@/lib/firebase/admin";

interface ContactPayload {
  name?: string;
  contact?: string;
  courseInterested?: string;
  message?: string;
  company?: string; // honeypot — real visitors never fill this
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, contact, courseInterested = "", message, company } = body;

  // Honeypot tripped — pretend success so bots don't learn otherwise.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !contact?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, contact info, and message are required." },
      { status: 400 }
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD are not configured.");
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 500 }
    );
  }

  const createdAt = new Date().toISOString();

  try {
    await getAdminDb().collection("contactSubmissions").add({
      name: name.trim(),
      contact: contact.trim(),
      courseInterested: courseInterested.trim(),
      message: message.trim(),
      createdAt,
    });
  } catch (err) {
    console.error("Failed to log contact submission to Firestore:", err);
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    await transporter.sendMail({
      from: `"Website Query" <${gmailUser}>`,
      to: receiver,
      replyTo: contact.trim(),
      subject: `New enquiry from ${name.trim()}${courseInterested ? ` — ${courseInterested}` : ""}`,
      text: [
        `Name: ${name.trim()}`,
        `Contact: ${contact.trim()}`,
        courseInterested ? `Course interested in: ${courseInterested.trim()}` : "",
        "",
        "Message:",
        message.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
