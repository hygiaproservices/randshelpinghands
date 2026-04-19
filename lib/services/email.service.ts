import { Resend } from "resend";
import { APP_NAME, CONTACT } from "@/lib/consts";
import type { EnquiryFormValues } from "@/lib/schemas/enquiry-schema";
import type { BookingFormValues } from "@/lib/schemas/booking-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "R&S Helping Hands <noreply@randshelpinghands.co.uk>";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL!;

export async function sendEnquiryNotification(data: EnquiryFormValues) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Enquiry from ${data.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7d001a;">New Enquiry Received</h2>
        <p>You have a new enquiry via the ${APP_NAME} website.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Name</td>
            <td style="padding: 8px 12px;">${data.name}</td>
          </tr>
          <tr style="background: #f9f5ef;">
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Email</td>
            <td style="padding: 8px 12px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Phone</td><td style="padding: 8px 12px;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>` : ""}
          ${data.preferredContactMethod ? `<tr style="background: #f9f5ef;"><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Preferred Contact</td><td style="padding: 8px 12px;">${data.preferredContactMethod}</td></tr>` : ""}
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Message</td>
            <td style="padding: 8px 12px;">${data.message}</td>
          </tr>
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #666;">This enquiry has been saved to your dashboard.</p>
      </div>
    `,
  });
}

export async function sendBookingNotification(data: BookingFormValues) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Booking Request from ${data.clientName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7d001a;">New Booking Request</h2>
        <p>A new visit has been requested via the ${APP_NAME} website.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Client Name</td>
            <td style="padding: 8px 12px;">${data.clientName}</td>
          </tr>
          <tr style="background: #f9f5ef;">
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Phone</td>
            <td style="padding: 8px 12px;"><a href="tel:${data.contactPhone}">${data.contactPhone}</a></td>
          </tr>
          ${data.contactEmail ? `<tr><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Email</td><td style="padding: 8px 12px;"><a href="mailto:${data.contactEmail}">${data.contactEmail}</a></td></tr>` : ""}
          <tr style="background: #f9f5ef;">
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Relationship</td>
            <td style="padding: 8px 12px;">${data.relationship}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Service</td>
            <td style="padding: 8px 12px;">${data.serviceType}</td>
          </tr>
          <tr style="background: #f9f5ef;">
            <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Preferred Date</td>
            <td style="padding: 8px 12px;">${data.preferredDate}</td>
          </tr>
          ${data.preferredTime ? `<tr><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Preferred Time</td><td style="padding: 8px 12px;">${data.preferredTime}</td></tr>` : ""}
          ${data.notes ? `<tr style="background: #f9f5ef;"><td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Notes</td><td style="padding: 8px 12px;">${data.notes}</td></tr>` : ""}
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #666;">This booking request has been saved to your dashboard.</p>
      </div>
    `,
  });
}

export async function sendEnquiryConfirmation(data: EnquiryFormValues) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `We've received your enquiry — ${APP_NAME}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7d001a;">Thank You, ${data.name}</h2>
        <p>We've received your enquiry and will get back to you as soon as possible.</p>
        <p>If you need to reach us urgently, you can call us on <a href="tel:+44${CONTACT.PHONE.slice(1)}">${CONTACT.PHONE}</a> or <a href="${CONTACT.WHATSAPP_HREF}">message us on WhatsApp</a>.</p>
        <p style="margin-top: 24px;">Warm regards,<br/><strong>${APP_NAME}</strong></p>
      </div>
    `,
  });
}

export async function sendBookingConfirmation(
  data: BookingFormValues,
) {
  if (!data.contactEmail) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.contactEmail,
    subject: `Booking request received — ${APP_NAME}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7d001a;">Thank You, ${data.clientName}</h2>
        <p>We've received your booking request for <strong>${data.serviceType}</strong> on <strong>${data.preferredDate}</strong>.</p>
        <p>We'll be in touch shortly to confirm the details.</p>
        <p>If you need to reach us urgently, you can call us on <a href="tel:+44${CONTACT.PHONE.slice(1)}">${CONTACT.PHONE}</a> or <a href="${CONTACT.WHATSAPP_HREF}">message us on WhatsApp</a>.</p>
        <p style="margin-top: 24px;">Warm regards,<br/><strong>${APP_NAME}</strong></p>
      </div>
    `,
  });
}
