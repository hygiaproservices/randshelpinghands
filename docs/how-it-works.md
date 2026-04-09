# How It Works

## Rands Helping Hands

This document explains how the Rands Helping Hands platform works from the perspective of each user type — public visitors, clients/families, and the admin (Ruby).

---

## 1. Public Visitor Experience

### 1.1 Discovering the Service

A visitor arrives at the Rands Helping Hands website, typically through:

- Google search (e.g. "companionship for elderly Liverpool")
- A referral or shared link
- A flyer or business card with the website URL

### 1.2 Browsing the Website

The visitor sees a welcoming landing page with:

- A clear description of who Ruby is and what services are offered
- A list of available services (friendly visits, shopping help, accompaniment, walks, light household help)
- Trust indicators (DBS checked, 3+ years experience, personalised one-to-one support)
- Testimonials from existing clients and families
- Contact details (phone, WhatsApp, email)

The visitor can navigate to dedicated pages for more detail:

- **About** — Ruby's background, mission, and credentials
- **Services** — Full descriptions of each service offering
- **Testimonials** — What other clients and families say
- **Contact** — Full contact form and details
- **Book a Visit** — Request a free initial visit or regular service

### 1.3 Making an Enquiry

The visitor fills out the **contact form** with:

- Their name
- Email address
- Phone number (optional)
- A message describing what they need
- Preferred contact method (phone, email, or WhatsApp)

They click **Submit**. The system:

1. Validates the form fields
2. Saves the enquiry to the database
3. Sends an email notification to Ruby
4. Shows a confirmation message: _"Thank you for your enquiry. Ruby will be in touch shortly."_

### 1.4 Booking a Visit

For visitors ready to schedule, the **Book a Visit** page provides a form with:

- Client name
- Contact details
- Relationship to the client (self, family member, carer)
- Service type requested (dropdown of available services)
- Preferred date (calendar picker)
- Preferred time
- Additional notes

After submission, the system:

1. Validates the form
2. Saves the booking request as **Pending**
3. Notifies Ruby via email
4. Shows confirmation: _"Your visit request has been submitted. Ruby will confirm your appointment shortly."_

### 1.5 Quick Contact Options

At any point, the visitor can:

- **Click the phone number** to call directly
- **Click the WhatsApp button** (floating on all pages) to start a chat
- **Click the email address** to open their email client

---

## 2. Ruby's Admin Experience

### 2.1 Logging In

Ruby navigates to the admin login page and signs in with her email and password. The system authenticates her via Better Auth and redirects to the admin dashboard.

### 2.2 Dashboard Overview

The dashboard shows Ruby an at-a-glance summary:

- **New Enquiries** — Count of unread enquiry submissions
- **Upcoming Bookings** — Bookings confirmed for the coming days
- **Total Clients** — Number of registered clients
- **Recent Activity** — Latest enquiries and bookings

### 2.3 Managing Enquiries

When a new enquiry arrives:

1. Ruby sees it in the **Enquiries** section with status **New**
2. She opens the enquiry to view the full message and contact details
3. She contacts the person via their preferred method (phone, WhatsApp, or email)
4. She updates the status to **Responded** and optionally adds internal notes
5. Once resolved, she marks it as **Closed**

### 2.4 Managing Bookings

When a booking request arrives:

1. Ruby sees it in the **Bookings** section with status **Pending**
2. She reviews the requested service, date, and time
3. She contacts the client or family member to confirm
4. She updates the status to **Confirmed**
5. On the day, she completes the visit
6. After the visit, she marks the booking as **Completed** and adds visit notes

Ruby can also:

- View bookings in a **calendar view** to plan her schedule
- **Create bookings manually** when arranging visits by phone
- **Cancel bookings** if plans change
- **Link bookings to client records** for visit history tracking

### 2.5 Managing Client Records

Over time, Ruby builds a client database:

1. When a new client starts receiving visits, Ruby creates a **Client Record** with:
   - Name and contact details
   - Address
   - Next of kin information
   - Medical notes (allergies, mobility, conditions)
2. Each completed booking is linked to the client's profile
3. Ruby can view a client's **full visit history** at any time
4. Client records help Ruby provide personalised, consistent care

### 2.6 Managing Testimonials

When a client or family member submits a testimonial:

1. The testimonial appears in the admin panel with status **Pending**
2. Ruby reviews the content
3. She **approves** it to display on the public website, or **rejects** it
4. She can **edit** the testimonial content before approving (e.g. minor corrections)
5. She can mark testimonials as **Featured** to highlight them on the home page

### 2.7 Updating Settings

Ruby can update business configuration without developer help:

- Contact details
- Service descriptions
- Availability schedule
- Email notification preferences

---

## 3. System Flows

### 3.1 Enquiry Flow

```
Visitor fills contact form
        ↓
System validates input (Zod)
        ↓
Enquiry saved to database (status: NEW)
        ↓
Email notification sent to Ruby
        ↓
Visitor sees confirmation message
        ↓
Ruby opens enquiry in dashboard
        ↓
Ruby contacts visitor → marks as RESPONDED
        ↓
Resolution reached → marks as CLOSED
```

### 3.2 Booking Flow

```
Visitor fills booking form
        ↓
System validates input (Zod)
        ↓
Booking saved to database (status: PENDING)
        ↓
Email notification sent to Ruby
        ↓
Visitor sees confirmation message
        ↓
Ruby reviews booking request
        ↓
Ruby confirms with client → status: CONFIRMED
        ↓
Visit takes place
        ↓
Ruby adds visit notes → status: COMPLETED
```

### 3.3 Testimonial Flow

```
Client/family submits testimonial (via public page or prompted by Ruby)
        ↓
Testimonial saved (status: PENDING)
        ↓
Ruby reviews in admin panel
        ↓
Ruby approves → testimonial visible on public site
   OR
Ruby rejects → testimonial not displayed
```

### 3.4 Client Record Flow

```
New client's first booking is confirmed
        ↓
Ruby creates client record with details
        ↓
Bookings are linked to the client
        ↓
Visit history builds over time
        ↓
Ruby references history for personalised care
```

---

## 4. Notification System

| Event                         | Notification                | Recipient     |
| ----------------------------- | --------------------------- | ------------- |
| New enquiry submitted         | Email notification          | Ruby          |
| New booking request submitted | Email notification          | Ruby          |
| Booking confirmed by Ruby     | Confirmation email (future) | Client/Family |
| Testimonial submitted         | Dashboard alert             | Ruby          |

---

## 5. Key User Journeys Summary

### Journey 1: Family Member Finds Help for Parent

1. Searches "companionship service Liverpool" on Google
2. Lands on Rands Helping Hands website
3. Reads about services and sees DBS checked, 3+ years experience
4. Reads testimonials from other families
5. Fills out the booking form requesting a free initial visit
6. Receives confirmation on screen
7. Ruby calls to discuss needs and schedule the visit

### Journey 2: Older Adult Referred by Friend

1. Receives the website link or flyer from a friend
2. Visits the website and reads about Ruby
3. Clicks the WhatsApp button to start a chat
4. Arranges a visit directly through WhatsApp
5. Ruby creates the booking in the admin system

### Journey 3: Ruby's Daily Routine

1. Logs into the dashboard in the morning
2. Checks for new enquiries and responds
3. Reviews today's bookings on the calendar
4. Completes visits throughout the day
5. Returns home to mark bookings as completed and add notes
6. Checks for any new testimonials to approve

---

## 6. Platform Access Points

| User              | Access Point                                       | Auth Required |
| ----------------- | -------------------------------------------------- | ------------- |
| Public visitor    | Main website (all public pages)                    | No            |
| Client / Family   | Contact form, booking form, testimonial submission | No            |
| Ruby (CRIMSON)    | Admin dashboard, all management features           | Yes           |
| Assistant (AZURE) | Admin dashboard, enquiry and booking management    | Yes           |
