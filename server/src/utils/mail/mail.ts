// import nodemailer
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

// create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST || "",
  port: process.env.EMAIL_SMTP_PORT ? Number(process.env.EMAIL_SMTP_PORT) : 465,
  secure: process.env.EMAIL_SMTP_SECURE === "true", // convert string ke boolean
  auth: {
    user: process.env.EMAIL_SMTP_USER || "",
    pass: process.env.EMAIL_SMTP_PASS || "",
  },
  requireTLS: true,
});

// send email
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_SMTP_USER || "",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

// render email
export const renderEmail = (template: string, data: any): string => {
  const content = ejs.renderFile(
    path.join(__dirname, `./templates/${template}`),
    data
  );

  return content as string;
};
