# Product Requirements Document (PRD)

## Rands Helping Hands

## 1. Introduction

### 1.1 Purpose

This document defines the functional and technical requirements for the Rands Helping Hands web platform.

The platform will serve as the digital presence and operational hub for Rands Helping Hands, a companionship and home support service for older adults in Liverpool. It will enable potential clients and their families to discover the service, understand offerings, and make enquiries or book visits online.

### 1.2 Product Positioning

Rands Helping Hands is a care companionship business operated by Ruby, offering kind, reliable companionship for older adults. The web platform is designed as a single Next.js application that handles both the public-facing website and an internal admin area for managing bookings, client records, and service operations.

## 2. System Overview

The Rands Helping Hands platform enables:

- Public discovery of companionship services and their descriptions
- Online enquiry and booking request submission
- Client testimonials and trust-building content
- Admin management of bookings and client information
- Contact via phone, WhatsApp, and email directly from the site
- Service area visibility (Liverpool and surrounding areas)

## 3. System Objectives

The system aims to:

- Establish a professional online presence for the business
- Make it easy for families and older adults to understand available services
- Enable online enquiry and visit booking without requiring a phone call
- Provide an admin interface for Ruby to manage enquiries, bookings, and client records
- Build trust through testimonials, credentials (DBS checked), and a clear value proposition
- Support future growth such as online payments and scheduling

## 4. Stakeholders

| Stakeholder            | Role                                                                        |
| ---------------------- | --------------------------------------------------------------------------- |
| Ruby (Business Owner)  | Platform owner, primary admin, service provider                             |
| Older Adults (Clients) | Service recipients who may browse or be assisted by family                  |
| Family Members         | Primary decision-makers who research and book services on behalf of clients |
| General Public         | Visitors discovering the service through search or referrals                |

## 5. User Roles

The application uses abstract internal role codes following the coding guidelines.

### 5.1 CRIMSON

Full system control. This is Ruby (business owner).

Capabilities:

- Manage all bookings and enquiries
- View and manage client records
- Update service descriptions and pricing
- Manage testimonials content
- Access all reports and analytics
- Update business settings (contact info, availability, service areas)
- Manage other admin users if needed

### 5.2 AZURE

Operational assistant (future role for if Ruby hires help).

Capabilities:

- View and respond to enquiries
- Manage bookings and scheduling
- View client records
- Cannot modify business settings or service configurations

### 5.3 CLIENT

Public website visitor or registered client.

Capabilities:

- Browse services and information
- Submit enquiry or booking request
- View own booking history (if registered)
- Leave testimonials

Restrictions:

- Cannot access admin screens
- Cannot view other client records

## 6. Services Offered

The platform must clearly present the following service categories:

| Service                        | Description                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------- |
| Friendly Visits & Conversation | Regular companionship visits for social interaction and emotional support         |
| Help with Shopping & Errands   | Assistance with grocery shopping, picking up prescriptions, and running errands   |
| Accompaniment to Appointments  | Escorting clients to medical appointments, social events, or community activities |
| Walks & Light Activity         | Gentle walks and light physical activity to promote wellbeing                     |
| Light Household Help           | Tidying, simple meal preparation, and basic household tasks                       |

## 7. Key Value Propositions

The following must be prominently displayed on the public site:

- Over 3 years of hands-on care experience
- DBS checked
- Reliable, patient, and compassionate
- One-to-one personalised support
- Flexible visits to suit client needs
- Free initial visit available

## 8. Contact Information

The platform must display and link to:

- **Phone:** 07780346808
- **WhatsApp:** 07780346808 (with click-to-chat link)
- **Email:** rubybenjaminaboh@gmail.com

## 9. Public Website Pages

### 9.1 Landing / Home Page

- Hero section with business name, tagline, and call-to-action
- Brief introduction about Ruby and the service
- Overview of services offered
- Why Choose Us section
- Testimonials section
- Call-to-action for free initial visit
- Contact information and quick enquiry form

### 9.2 About Page

- Ruby's background and experience
- Mission statement: "I understand how important it is to feel safe, respected, and listened to. My goal is to provide not just help, but genuine companionship and peace of mind for both clients and their families."
- DBS checked badge and credentials
- Photo section

### 9.3 Services Page

- Detailed description of each service
- What to expect during a visit
- Flexible scheduling information
- Service area (Liverpool)

### 9.4 Testimonials Page

- Client and family testimonials
- Option for authenticated clients to submit testimonials (admin-approved before publishing)

### 9.5 Contact Page

- Contact form (name, email, phone, message, preferred contact method)
- Phone number with click-to-call
- WhatsApp click-to-chat button
- Email link
- Service area map (Liverpool)
- Business hours / availability

### 9.6 Book a Visit Page

- Booking request form with:
  - Client name
  - Contact details (phone, email)
  - Relationship to client (self, family member, carer)
  - Service type requested
  - Preferred date and time
  - Additional notes
- Confirmation message after submission
- Note about free initial visit

## 10. Admin Dashboard (Protected)

### 10.1 Dashboard Overview

- Total enquiries (new, responded, closed)
- Upcoming bookings count
- Recent activity feed
- Quick actions (view new enquiries, manage bookings)

### 10.2 Enquiry Management

- List all enquiries with status (new, responded, closed)
- View enquiry details
- Mark as responded or closed
- Add internal notes

### 10.3 Booking Management

- List all booking requests
- Booking statuses: pending, confirmed, completed, cancelled
- Calendar view of upcoming bookings
- Create booking manually
- Edit or cancel bookings

### 10.4 Client Records

- Client list with search and filter
- Client profile: name, contact details, address, next of kin, medical notes, visit history
- Add or edit client records
- View visit history per client

### 10.5 Testimonials Management

- View submitted testimonials
- Approve or reject testimonials for public display
- Edit testimonial content before publishing
- Mark as featured

### 10.6 Settings

- Business contact information
- Service area configuration
- Availability schedule
- Service descriptions and pricing
- Email notification preferences

## 11. Enquiry & Booking Workflow

### Step 1. Visitor Submits Enquiry or Booking

A visitor fills out the contact form or booking request form on the public site.

### Step 2. Notification

The system sends an email notification to Ruby's email address. The enquiry or booking appears in the admin dashboard.

### Step 3. Admin Review

Ruby reviews the enquiry or booking request in the admin dashboard.

### Step 4. Response

Ruby contacts the client via phone, WhatsApp, or email. She marks the enquiry as responded in the system.

### Step 5. Booking Confirmation

If a visit is agreed, Ruby creates or confirms the booking in the system with date, time, and service type.

### Step 6. Visit Completion

After the visit, the booking is marked as completed. Visit notes can be added to the client record.

## 12. Functional Requirements

The system must:

1. Display a public website with service information, about section, testimonials, and contact details.
2. Provide a contact form that sends enquiries to the admin dashboard and triggers email notifications.
3. Provide a booking request form with service type selection and preferred scheduling.
4. Allow admin users to manage enquiries with status tracking.
5. Allow admin users to manage bookings with status tracking and calendar view.
6. Allow admin users to manage client records with visit history.
7. Allow admin users to manage testimonials (approve, reject, feature).
8. Support responsive design for mobile, tablet, and desktop.
9. Support both light mode and dark mode.
10. Provide click-to-call, click-to-WhatsApp, and email links.
11. Support SEO optimisation for local search (Liverpool companionship services).
12. Send email notifications for new enquiries and booking requests.

## 13. Non-Functional Requirements

### Security

- Authentication via Better Auth for admin access
- Role-based access control using abstract role codes
- Encryption of data in transit (HTTPS)
- Security headers as defined in coding guidelines
- No exposure of client personal data on public pages

### Performance

The system should support:

- Fast page loads (under 2 seconds for public pages)
- SEO-friendly server-side rendering for public pages
- Optimised images and assets

### Availability

System uptime target should exceed 99%.

### Accessibility

- WCAG 2.1 AA compliance target
- Screen reader friendly navigation
- Sufficient colour contrast in both themes
- Keyboard navigable

## 14. Technology Stack

Following the coding guidelines strictly:

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN component library
- next-themes for light/dark mode
- Zod for form validation

### Backend

- Next.js Route Handlers for API endpoints
- Next.js Server Actions for secure server-side mutations
- Next.js middleware for auth and security headers
- Prisma ORM
- PostgreSQL

### Authentication

- Better Auth

### Supporting Services

- Email service (Resend or Nodemailer) for notifications
- Leaflet or Google Maps for service area display
- Vercel for hosting (recommended)

## 15. High-Level Modules

The initial release should include the following modules:

- Public website (home, about, services, testimonials, contact, book a visit)
- Authentication and role management
- Enquiry management
- Booking management
- Client record management
- Testimonials management
- Settings and configuration
- Email notifications

## 16. Future Enhancements

Potential future upgrades include:

- Online payment for services
- Automated scheduling and calendar sync
- SMS notifications
- Client portal for self-service booking
- Blog section with care tips and resources
- Integration with care management platforms
- Multi-staff scheduling and availability management
- Recurring booking automation

## 17. Success Metrics

The first production release should be measured against:

- Number of enquiries received through the website
- Enquiry-to-booking conversion rate
- Average response time to enquiries
- Number of completed bookings per month
- Client satisfaction (testimonial submissions)
- Website traffic and local search ranking
- Reduction in missed enquiries compared to phone-only operation
