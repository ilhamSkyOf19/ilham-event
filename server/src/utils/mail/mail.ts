// import nodemailer
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

// create transporter
// create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST || "",
  port: process.env.EMAIL_SMTP_PORT ? Number(process.env.EMAIL_SMTP_PORT) : 465,
  secure: process.env.EMAIL_SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_SMTP_USER || "",
    pass: process.env.EMAIL_SMTP_PASS || "",
  },
  requireTLS: true,
});

// DEBUG SMTP
transporter.verify((error, success) => {
  if (error) {
    console.log("🚨 SMTP ERROR:", error);
  } else {
    console.log("✅ SMTP READY TO SEND EMAIL");
  }
});

// send email
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    console.log("📧 SENDING EMAIL:");
    console.log("TO:", to);
    console.log("SUBJECT:", subject);
    console.log("HTML LENGTH:", html?.length);

    const result = await transporter.sendMail({
      from: process.env.EMAIL_SMTP_USER,
      to,
      subject,
      html,
    });

    console.log("✅ EMAIL SENT RESULT:", result);
  } catch (error) {
    console.log("🚨 SEND EMAIL ERROR:", error);
  }
};

// render email
export const renderEmail = async (
  template: string,
  data: any
): Promise<string> => {
  const content = await ejs.renderFile(
    path.join(__dirname, `./templates/${template}`),
    data
  );

  return content as string;
};
