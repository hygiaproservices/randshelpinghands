# Implementation Plan

## Rands Helping Hands

This document outlines the phased implementation plan for building the Rands Helping Hands web platform following the coding guidelines and techniques defined in the project documentation.

---

## Phase 0: Project Scaffolding & Configuration

### 0.1 Initialize Next.js Project

```bash
pnpm create next-app@latest randshelpinghands --typescript --tailwind --eslint --app --src-dir=false
```

### 0.2 Install Core Dependencies

```bash
pnpm add prisma @prisma/client better-auth zod react-hook-form @hookform/resolvers
pnpm add next-themes lucide-react
pnpm add resend                          # Email notifications
pnpm add leaflet react-leaflet           # Service area map
pnpm add -D @types/leaflet
```

### 0.3 Initialize ShadCN

```bash
pnpm dlx shadcn@latest init
```

Install required ShadCN components incrementally as needed:

```bash
pnpm dlx shadcn@latest add button card input textarea label dialog sheet table badge calendar form toast select tabs separator avatar dropdown-menu
```

### 0.4 Set Up Project Folder Structure

Following the coding guidelines:

```
/
├── /docs
│   ├── prd.md
│   ├── implementation-plan.md
│   ├── how-it-works.md
│   └── coding-guidelines-and-techniques.md
├── /actions
│   ├── createEnquiry.ts
│   ├── updateEnquiry.ts
│   ├── createBooking.ts
│   ├── updateBooking.ts
│   ├── createClient.ts
│   ├── updateClient.ts
│   ├── createTestimonial.ts
│   ├── updateTestimonial.ts
│   └── updateSettings.ts
├── /app
│   ├── /api
│   │   ├── /webhooks
│   │   └── /auth/[...all]
│   ├── /(auth)
│   │   ├── /login
│   │   └── /forgot-password
│   ├── /(public)
│   │   ├── /page.tsx              (Home / Landing)
│   │   ├── /about
│   │   ├── /services
│   │   ├── /testimonials
│   │   ├── /contact
│   │   └── /book-a-visit
│   ├── /(protected)
│   │   ├── /dashboard
│   │   ├── /enquiries
│   │   ├── /bookings
│   │   ├── /clients
│   │   ├── /testimonials-manage
│   │   └── /settings
│   ├── layout.tsx
│   └── globals.css
├── /components
│   ├── /forms
│   │   ├── contact-form.tsx
│   │   ├── booking-form.tsx
│   │   ├── enquiry-response-form.tsx
│   │   ├── client-form.tsx
│   │   ├── testimonial-form.tsx
│   │   └── login-form.tsx
│   ├── /pages
│   │   ├── /home
│   │   ├── /about
│   │   ├── /services
│   │   ├── /dashboard
│   │   ├── /enquiries
│   │   ├── /bookings
│   │   └── /clients
│   ├── /shared
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── empty-state.tsx
│   │   ├── whatsapp-button.tsx
│   │   └── service-card.tsx
│   ├── /skeletons
│   │   ├── table-skeleton.tsx
│   │   ├── card-skeleton.tsx
│   │   └── page-skeleton.tsx
│   └── /ui
│       └── (shadcn components)
├── /hooks
│   ├── useDebounce.ts
│   ├── usePagination.ts
│   └── useMobile.ts
├── /lib
│   ├── /schemas
│   │   ├── enquiry-schema.ts
│   │   ├── booking-schema.ts
│   │   ├── client-schema.ts
│   │   ├── testimonial-schema.ts
│   │   └── settings-schema.ts
│   ├── /services
│   │   ├── enquiry.service.ts
│   │   ├── booking.service.ts
│   │   ├── client.service.ts
│   │   ├── testimonial.service.ts
│   │   ├── settings.service.ts
│   │   └── email.service.ts
│   ├── /types
│   │   ├── enquiry.ts
│   │   ├── booking.ts
│   │   ├── client.ts
│   │   └── testimonial.ts
│   ├── /context
│   │   └── auth-context.ts
│   ├── /store
│   │   ├── ui.store.ts
│   │   └── sidebar.store.ts
│   ├── prisma.ts
│   ├── auth.ts
│   ├── utils.ts
│   └── consts.ts
├── /prisma
│   └── schema.prisma
├── .env
├── .env.example
├── middleware.ts
├── next.config.ts
└── tailwind.config.ts
```

### 0.5 Configure Environment Variables

**.env.example:**

```bash
# Database
DATABASE_URL=

# Authentication
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# Email (Resend)
RESEND_API_KEY=

# Public
NEXT_PUBLIC_APP_NAME=Rands Helping Hands
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_CONTACT_PHONE=07780346808
NEXT_PUBLIC_CONTACT_EMAIL=rubybenjaminaboh@gmail.com
NEXT_PUBLIC_CONTACT_WHATSAPP=07780346808
```

### 0.6 Configure Security Headers

Add security headers to `next.config.ts` as specified in the coding guidelines (Section 9.0).

### 0.7 Set Up Prisma & Database Schema

Initialize Prisma:

```bash
pnpm dlx prisma init
```

### 0.8 Git Setup

```bash
git init
git checkout -b main
```

Create branches following the branching strategy:

```bash
git checkout -b beta
git checkout -b pre-release
git checkout -b release
git checkout main
```

---

## Phase 1: Database Schema & Authentication

### 1.1 Define Prisma Schema

Models required:

- **User** — Admin users with role codes (CRIMSON, AZURE)
- **Enquiry** — Contact form submissions
- **Booking** — Visit booking requests
- **Client** — Client records with personal details and notes
- **Testimonial** — Client testimonials with approval status
- **Settings** — Key-value business configuration
- **AuditLog** — Action logging for admin activities

Key schema considerations:

```prisma
enum UserRole {
  CRIMSON
  AZURE
}

enum EnquiryStatus {
  NEW
  RESPONDED
  CLOSED
}

enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

enum TestimonialStatus {
  PENDING
  APPROVED
  REJECTED
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  role      UserRole @default(AZURE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Enquiry {
  id                    String        @id @default(cuid())
  name                  String
  email                 String
  phone                 String?
  message               String
  preferredContactMethod String?
  status                EnquiryStatus @default(NEW)
  internalNotes         String?
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt
}

model Client {
  id          String    @id @default(cuid())
  name        String
  email       String?
  phone       String
  address     String?
  nextOfKin   String?
  medicalNotes String?
  bookings    Booking[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Booking {
  id              String        @id @default(cuid())
  clientName      String
  contactPhone    String
  contactEmail    String?
  relationship    String
  serviceType     String
  preferredDate   DateTime
  preferredTime   String?
  notes           String?
  status          BookingStatus @default(PENDING)
  visitNotes      String?
  client          Client?       @relation(fields: [clientId], references: [id])
  clientId        String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model Testimonial {
  id         String             @id @default(cuid())
  clientName String
  content    String
  rating     Int?
  status     TestimonialStatus  @default(PENDING)
  isFeatured Boolean            @default(false)
  createdAt  DateTime           @default(now())
  updatedAt  DateTime           @updatedAt
}

model Settings {
  id    String @id @default(cuid())
  key   String @unique
  value String
}
```

### 1.2 Set Up Better Auth

- Configure Better Auth with email/password provider
- Set up session management
- Create auth middleware for protected routes

### 1.3 Set Up Middleware

- Auth guard for `/(protected)` routes
- Security headers enforcement
- Role-based route protection

---

## Phase 2: Public Website

### 2.1 Shared Layout & Components

Build order:

1. Root layout with theme provider (next-themes)
2. Public layout with navbar and footer
3. Theme toggle component
4. WhatsApp floating button
5. Service card component
6. Responsive navigation (mobile hamburger menu)

### 2.2 Home / Landing Page

Sections to build:

1. Hero section — Business name, tagline, CTA button
2. Introduction — Brief about Ruby and the service
3. Services overview — Grid of service cards
4. Why Choose Us — Trust indicators (DBS checked, 3+ years, personalised, flexible)
5. Testimonials carousel — Featured testimonials
6. CTA section — Free initial visit offer
7. Contact bar — Phone, WhatsApp, email quick links

### 2.3 About Page

- Ruby's story and experience
- Mission statement
- Credentials and trust badges
- Photo section

### 2.4 Services Page

- Detailed service cards with descriptions
- What to expect section
- Service area information

### 2.5 Testimonials Page

- Grid or list of approved testimonials
- Submit testimonial form (optional, admin-approved)

### 2.6 Contact Page

- Contact form (Zod validation, server action submission)
- Contact details with click-to-call and click-to-WhatsApp
- Service area map (Leaflet)
- Business hours

### 2.7 Book a Visit Page

- Booking request form with:
  - Zod schema validation
  - Service type dropdown
  - Date picker (ShadCN calendar)
  - Time preference
  - Relationship selector
- Success confirmation message
- Free initial visit callout

---

## Phase 3: Admin Authentication & Dashboard Shell

### 3.1 Login Page

- Login form with email/password
- Zod validation
- Better Auth integration
- Redirect to dashboard on success

### 3.2 Protected Layout

- Sidebar navigation
- Header with user info and theme toggle
- Responsive sidebar (collapsible on mobile)

### 3.3 Dashboard Overview Page

- Stats cards: Total enquiries, new enquiries, upcoming bookings, total clients
- Recent enquiries list
- Upcoming bookings list
- Quick action buttons

---

## Phase 4: Enquiry Management

### 4.1 Enquiry List Page

- Table with columns: name, email, date, status
- Filter by status (new, responded, closed)
- Search by name or email
- Pagination

### 4.2 Enquiry Detail / Response

- View full enquiry details
- Update status
- Add internal notes
- Action buttons (mark responded, close)

### 4.3 Email Notification

- Send email to Ruby when new enquiry arrives
- Use Resend or Nodemailer via server action

---

## Phase 5: Booking Management

### 5.1 Booking List Page

- Table with columns: client name, service type, date, status
- Filter by status
- Search and pagination

### 5.2 Booking Detail Page

- View full booking details
- Update status (confirm, complete, cancel)
- Add visit notes after completion
- Link to client record

### 5.3 Calendar View

- Monthly calendar showing confirmed bookings
- Click on date to view bookings for that day

### 5.4 Manual Booking Creation

- Form for admin to create bookings directly
- Link to existing client or create new

---

## Phase 6: Client Records

### 6.1 Client List Page

- Table with search and filter
- Columns: name, phone, total visits, last visit date

### 6.2 Client Profile Page

- Personal details (name, contact, address, next of kin)
- Medical notes section
- Visit history (linked bookings)
- Edit client details

### 6.3 Create / Edit Client

- Client form with Zod validation
- Link existing bookings to client

---

## Phase 7: Testimonials Management

### 7.1 Testimonials Admin List

- Table showing all submitted testimonials
- Filter by status (pending, approved, rejected)
- Quick approve/reject actions

### 7.2 Testimonial Detail

- View and edit content
- Approve or reject
- Toggle featured status

---

## Phase 8: Settings & Configuration

### 8.1 Settings Page

- Business information (name, contact details)
- Service descriptions
- Availability schedule
- Email notification preferences
- All changes saved via server actions

---

## Phase 9: SEO, Performance & Polish

### 9.1 SEO

- Meta tags and Open Graph for all public pages
- Structured data (LocalBusiness schema)
- Sitemap generation
- robots.txt
- Target keywords: "companionship Liverpool", "home companion elderly Liverpool", "elderly care Liverpool"

### 9.2 Performance

- Image optimisation with next/image
- Lazy loading for below-fold content
- Server components where possible
- Loading skeletons for dynamic content

### 9.3 Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Colour contrast compliance in both themes
- Screen reader testing

### 9.4 Responsive Design

- Mobile-first approach
- Test on common breakpoints (320px, 768px, 1024px, 1440px)
- Floating WhatsApp button on mobile

---

## Phase 10: Testing & Deployment

### 10.1 Testing

- Form validation testing (all Zod schemas)
- Auth flow testing
- Admin CRUD operations
- Email notification delivery
- Responsive design testing
- Accessibility audit
- Security header verification

### 10.2 Deployment

- Deploy to Vercel
- Configure custom domain
- Set up environment variables in Vercel dashboard
- Configure PostgreSQL (Neon, Supabase, or Vercel Postgres)
- Set up DNS records
- SSL certificate (automatic with Vercel)

### 10.3 Post-Launch

- Monitor error logs
- Set up analytics (Vercel Analytics or Google Analytics)
- Gather initial feedback from Ruby
- Iterate on admin UX based on usage

---

## Implementation Priority Summary

| Priority | Phase    | Description                         | Estimated Complexity |
| -------- | -------- | ----------------------------------- | -------------------- |
| P0       | Phase 0  | Project scaffolding & configuration | Low                  |
| P0       | Phase 1  | Database schema & authentication    | Medium               |
| P0       | Phase 2  | Public website (all pages)          | Medium               |
| P1       | Phase 3  | Admin dashboard shell               | Medium               |
| P1       | Phase 4  | Enquiry management                  | Medium               |
| P1       | Phase 5  | Booking management                  | High                 |
| P2       | Phase 6  | Client records                      | Medium               |
| P2       | Phase 7  | Testimonials management             | Low                  |
| P2       | Phase 8  | Settings & configuration            | Low                  |
| P3       | Phase 9  | SEO, performance & polish           | Medium               |
| P3       | Phase 10 | Testing & deployment                | Medium               |

---

## Dependencies

- PostgreSQL database must be provisioned before Phase 1
- Better Auth configuration must be complete before Phase 3
- Email service (Resend) API key required before Phase 4
- Domain name must be acquired before Phase 10 deployment
