import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (
  patientEmail: string,
  patientName: string,
  appointmentNumber: string,
  doctorName: string,
  date: string,
  timeSlot: string,
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: patientEmail,
    subject: "Your Appointment is Confirmed!",
    html: `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="500" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; padding:32px; font-family:Arial, sans-serif;">
              
              <!-- Header -->
              <tr>
                <td style="padding-bottom:16px; border-bottom: 2px solid #e5e7eb;">
                  <h2 style="margin:0; color:#1d4ed8; font-size:22px;">Appointment Confirmed ✅</h2>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="padding: 20px 0 8px 0; color:#111827; font-size:15px;">
                  Dear <strong>${patientName}</strong>,
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:16px; color:#374151; font-size:14px;">
                  Your appointment has been confirmed. Here are your details:
                </td>
              </tr>

              <!-- Details Table -->
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; font-size:14px;">
                    <tr style="background-color:#eff6ff;">
                      <td style="padding:12px 16px; color:#6b7280; width:40%;">Appointment No</td>
                      <td style="padding:12px 16px; color:#111827; font-weight:bold;">${appointmentNumber}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px; color:#6b7280;">Doctor</td>
                      <td style="padding:12px 16px; color:#111827;">${doctorName}</td>
                    </tr>
                    <tr style="background-color:#eff6ff;">
                      <td style="padding:12px 16px; color:#6b7280;">Date</td>
                      <td style="padding:12px 16px; color:#111827;">${date}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px; color:#6b7280;">Time</td>
                      <td style="padding:12px 16px; color:#111827;">${timeSlot}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer Note -->
              <tr>
                <td style="padding-top:24px; color:#9ca3af; font-size:12px; border-top:1px solid #e5e7eb; margin-top:16px;">
                  You can track your appointment using your appointment number.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    `,
  };

  await transporter.sendMail(mailOptions);
};
