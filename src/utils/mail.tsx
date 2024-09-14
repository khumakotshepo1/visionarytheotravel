import "server-only";

import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import EmailVerificationTemplate from "@/components/email-templates/email-verification";
import ResetPasswordTemplate from "@/components/email-templates/reset-password-template";

const transporter = createTransport({
  host: process.env.BREVO_HOST,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export const sendEmailVerification = async (email: string, token: string) => {
  const { VERCEL_PROJECT_PRODUCTION_URL } = process.env;

  try {
    const emailUrl = `http://${VERCEL_PROJECT_PRODUCTION_URL}/verify-email?token=${token}`;

    const emailHtml = await render(
      <EmailVerificationTemplate url={emailUrl} />
    );

    const emailOptions = {
      from: "Webmaster <support@aboutvibes.co.za>",
      to: email,
      subject: "Verify your email on ACT Admin Portal",
      html: emailHtml,
    };

    const emailResult = await transporter.sendMail(emailOptions);

    return emailResult;
  } catch (error) {
    return error;
  }
};

export const sendPasswordReset = async (email: string, token: string) => {
  try {
    const resetUrl = `http://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/auth/reset-password/new-password?token=${token}`;

    const resetHtml = await render(<ResetPasswordTemplate url={resetUrl} />);

    const resetOptions = {
      from: "Webmaster <support@aboutvibes.co.za>",
      to: email,
      subject: "Reset your password on ACT Admin Portal",
      html: resetHtml,
    };

    const resetResult = await transporter.sendMail(resetOptions);

    return resetResult;
  } catch (error) {
    return error;
  }
};
