import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { fname, email, message } = await request.json();

    if (!fname || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send professional email
    await transporter.sendMail({
      from: `"${fname}" <${email}>`,
      to: process.env.EMAIL_USER, // Labels business email
      subject: `New Contact Form Submission - Labels`,
      text: `You have a new message from ${fname} (${email}):\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1a73e8;">Labels Printing Business</h2>
          <p><strong>From:</strong> ${fname} &lt;${email}&gt;</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
          <hr style="border: none; border-top: 1px solid #ccc;" />
          <p style="font-size: 0.9rem; color: #777;">This message was submitted via the Labels website contact form.</p>
        </div>
      `,
    });

    console.log("Contact form submitted:", fname, email, message);

    return NextResponse.json({
      message: "Contact form submitted successfully",
    });
  } catch (error: any) {
    console.error("Email Error:", error.message);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
