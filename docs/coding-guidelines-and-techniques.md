# ISCE Digital Concept - Frontend Engineering Standards & Guidelines

**Work Address:** tech.divine101@gmail.com  
**Guideline Owner:** Onyekachukwu Divine

---

## Table of Contents

1. [Technology Stack](#10-technology-stack)
2. [Project Folder Structure Rules](#20-project-folder-structure-rules)
3. [Naming Conventions](#30-naming-conventions)
4. [State Management](#40-state-management)
5. [Error Handling](#50-error-handling)
6. [API Integration Strategy](#60-api-integration-strategy)
7. [Git Branching Strategy & Commit Standards](#70-git-branching-strategy--commit-standards)
8. [Pull Request Standards](#80-pull-requests-standards)
9. [Security Headers](#90-security-headers-in-the-application)
10. [DevSecOps](#100-devsecops)
11. [Conclusion](#110-conclusion)

---

## 1.0. Technology Stack

- **Framework:** NextJS
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Component Library:** ShadCN
- **Theming:** Mandatory light mode and dark mode support
- **Form Validation:** Zod
- **Authentication & Session Management:** Better Auth

### 1.1. UI Foundation Requirements

All applications must be built as themeable applications from the start.

Requirements:

- Support both light mode and dark mode
- Use semantic color tokens instead of hardcoded page-specific colors where possible
- Ensure forms, tables, cards, dialogs, sheets, navigation, charts, and empty states render correctly in both themes
- Use ShadCN as the baseline component system for reusable UI primitives
- Keep reusable UI primitives in `/components/ui`
- Prefer composition around generated ShadCN components instead of editing them heavily

### 1.2. ShadCN and Theme Setup Standard

Baseline expectations for new projects:

- Initialize ShadCN early in the project lifecycle
- Add a theme provider at the app root
- Persist theme preference for returning users
- Provide a visible theme toggle in authenticated application areas
- Define and use shared CSS variables or semantic tokens for background, foreground, border, card, muted, and accent states

Recommended setup commands in pnpm-based projects:

```bash
pnpm dlx shadcn@latest init
pnpm add next-themes lucide-react
```

---

## 2.0. Project Folder Structure Rules

```
/project
  /docs
  /actions
    /dashboard.ts
  /app
    /api
    /(auth)
    /(public)
    /(protected)
  /components
    /forms
    /pages
    /shared
    /skeletons
    /ui
  /hooks
  /lib
    /store
    /services
      /company.services.ts
    /schemas
    /types
    /context
    /utils.ts
    /consts.ts
  .env
```

### 2.1. Folder Responsibilities

#### `/actions` folder
**Use when:**
- Creating server action functions
- Action is triggered directly from a React Component
- Public API endpoint is not needed
- It's internal app logic

**Example:**
```typescript
"use server"
export async function createDashboard(data: FormData) {
  // validate with Zod
  // save to DB
}
```

#### `/docs` folder
**Use for:**
- Architecture decisions
- Product logic explanations
- Onboarding notes
- Feature implementations

#### `/app/api` folder
**Use when:**
- You need public endpoints
- You need webhooks
- Third-party integrations call your app
- You are building REST APIs

#### `/app/(auth)` folder
**Use for authentication pages:**
- Login page
- Register page
- Forgot password
- Reset password

#### `/app/(public)` folder
**Use for public pages (without login):**
- Landing page
- About page

#### `/app/(protected)` folder
**Use for authenticated application pages:**
- Dashboard page
- Projects page
- Settings page
- Admin page

#### `/components/forms` folder
**Use for:**
- All form components
- Register form
- Sign in form

#### `/components/pages` folder
**Use for:**
- Components related to pages in the application

**Example:**
- `/dashboard/dashboardHeader.ts`
- `/dashboard/dashboardCard.ts`

#### `/components/shared` folder
**Use for:**
- Reusable components across pages

**Examples:**
- `navbar.tsx`
- `sidebar.tsx`
- `footer.tsx`
- `empty-state.tsx`

#### `/components/skeletons` folder
**Use for:**
- Loading states for components

**Examples:**
- `table-skeleton.tsx`
- `card-skeleton.tsx`

#### `/components/ui` folder
**Use for:**
- Contain the shadcn/ui components

#### `/components/shared` and theming responsibility
**Also use for:**
- Theme toggle components
- Global theme-aware navigation elements
- Reusable layout wrappers that must behave correctly in light and dark mode

#### `/hooks` folder
**Use for:**
- Custom hooks

**Examples:**
- `usePagination.ts`
- `useDebounce.ts`
- `useMobile.ts`

#### `/lib/schemas` folder
**Use for:**
- Creating Zod schemas
- API validation schemas
- DB validation schemas

#### `/lib/context` folder
**Use for:**
- React Context providers

**Examples:**
- `authContext.ts`
- `themeContext.ts`

**Theme rule:**
- Theme provider or theme context should be initialized close to the root layout so both public and protected routes inherit consistent theming behavior

#### `/lib/store` folder
**Use when:**
- Managing complex global state
- Avoiding excessive prop drilling
- State needs to be accessed across unrelated components

**Examples:**
- `auth.store.ts`
- `ui.store.ts`
- `modal.store.ts`

**Benefit:** Lightweight global state without provider nesting

#### `/lib/utils.ts` file
**Use for:**
- Utility helpers

**Examples:**
- Date formatters
- String helpers
- Number formatting

#### `/lib/types` folder
**Use for:**
- Shared TypeScript types and interfaces

#### `/lib/services` folder
**Use for:**
- Database operations/direct database calls

**Example:**
```typescript
import { db } from "@/lib/prisma";

export async function createCompany(data: CreateCompanyDTO) {
  return prisma.company.create({ data });
}

export async function getCompanyById(id: string) {
  return prisma.company.findUnique({ where: { id } });
}
```

#### `/lib/consts.ts` file
**Use for:**
- Fixed values that do not change during runtime
- Values reused across the application

**Examples:**
- Navbar links constants
- Sidebar links constants
- Enum-like values
- Centralizing all backend services base URLs and endpoint paths

#### `.env` file
**Use for:**
- Store sensitive credentials
- Configure external service URLs
- Manage environment-based behavior (dev, staging, production)
- Prevent hardcoding secrets into source code

---

## 3.0. Naming Conventions

Naming conventions ensure consistency, readability, and scalability across the codebase. They reduce confusion, improve team collaboration, make refactoring safer, and maintain predictable file organization.

### 3.1. Folder

**Use lowercase for folders:**
```
/components
/actions
/lib
/hooks
```

**Use kebab-case for multi-word folders:**
```
/protected-routes
/api-services
```

**❌ Avoid:**
```
/ProtectedRoutes
/apiServices
```

### 3.2. File

**Use lowercase and kebab-case for multi-word files:**
```
user-card.tsx
create-event-form.tsx
dashboard-header.tsx
```

### 3.3. Hooks

**Use camelCase for files in the hooks folder. Each file should start with `use`:**
```
useAuth.ts
usePagination.ts
useDebounce.ts
```

**❌ Avoid:**
```
UseAuth.ts
authHook.ts
```

### 3.4. Server Actions

**Use camelCase with verb first naming:**
```
createEvent.ts
updateUser.ts
deleteChat.ts
```

**Inside the file:**
```typescript
export async function createEvent() {}
```

### 3.5. Services

**Domain-based naming with `.service.ts` extension:**
```
event.service.ts
user.service.ts
chat.service.ts
```

**❌ Avoid:**
```
eventService.ts
EventService.ts
```

### 3.6. Constants

**Use UPPERCASE and uppercase with underscores for multi-worded names:**
```
APP_NAME
MAX_UPLOAD_SIZE
PAGINATION_LIMIT
```

### 3.7. Types & Interfaces

**Use PascalCase and descriptive naming:**

**Form Values:**
```
RegisterFormValues
LoginFormValues
```

**Interfaces:**
```
IDashboardHeaders
ISidebarItems
```

**Types:**
```
NotificationType
EventType
```

**Component Props:**
```
UserCardProps
ComponentProps
```

### 3.8. Variables

**Use camelCase for variables:**
```
userId
eventData
isLoading
hasPermission
```

### 3.9. Boolean

**Always prefix with `is`, `has`, `should`, or `can`:**
```
isAuthenticated
hasAccess
shouldRedirect
canEdit
```

### 3.10. Role Naming

**Use abstract role names that don't suggest capacity or hierarchy.** Only the system should know what each role means. This approach enhances security by obscuring role structure from external observers.

**Principle:**
- ❌ **Avoid descriptive role names** like: `admin`, `superAdmin`, `moderator`, `viewer`, `manager`
- ✅ **Use abstract names** that are system-defined and non-hierarchical

**Example Implementation:**

```typescript
// Abstract role names - only the system knows what each means
// CRIMSON (Tier 1): Full system access, mandatory 2FA
// AZURE (Tier 2): Manage charges, revenue heads, assessments
// EMERALD (Tier 3): Verify properties, view reports
// OBSIDIAN (Tier 4): View-only staff access
// PROPERTY_OWNER (Tier 5): Owner portal access only (default)

enum UserRole {
  CRIMSON = "CRIMSON",
  AZURE = "AZURE",
  EMERALD = "EMERALD",
  OBSIDIAN = "OBSIDIAN",
  PROPERTY_OWNER = "PROPERTY_OWNER",
}
```

**Benefits:**

1. **Enhanced Security** - Role structure is not obvious from code inspection
2. **Flexibility** - Easy to reorganize permissions without changing role names
3. **Obfuscation** - Reduces attack surface by hiding role capabilities
4. **Scalability** - Abstract names don't conflict with business terminology

**Guidelines:**

1. Use UPPERCASE for role names
2. Avoid numbers in role names (use sequential naming like colors instead)
3. Document role permissions internally in comments or dedicated documentation
4. Use consistent naming patterns (e.g., gemstone names, color names)
5. Never expose role hierarchy in the role name itself
6. Keep role names concise (1-2 words maximum)

**Additional Examples:**

```typescript
// Using gemstone names
enum UserRole {
  DIAMOND = "DIAMOND",    // Highest privileges
  RUBY = "RUBY",          // High privileges
  SAPPHIRE = "SAPPHIRE",  // Medium privileges
  QUARTZ = "QUARTZ",      // Low privileges
  GUEST = "GUEST",        // Default/Lowest
}

// Using color names
enum UserRole {
  PLATINUM = "PLATINUM",
  GOLD = "GOLD",
  SILVER = "SILVER",
  BRONZE = "BRONZE",
  IRON = "IRON",
}
```

**Security Note:** Keep a separate, internal document mapping role names to permissions. This document should NOT be committed to version control and should be securely stored in your secrets management system.

### 3.11. Models

**Database models should be named in PascalCase:**
```
User
Event
ChatRoom
```

**Fields should be named in camelCase:**
```
createdAt
updatedAt
isVerified
cleanName
```

### 3.12. Component Structure

**Components should be named in kebab-case for multi-word names:**
```
dashboard-header.tsx
event-stats-card.tsx
user-profile-section.tsx
```

**Inside the component, use PascalCase for function names:**
```typescript
export const DashboardHeader = () => {
  return()
}
```

### 3.13. Schemas

**All schemas should be named in camelCase and end with the word "Schema":**
```
createUserSchema
updateEventSchema
loginSchema
```

**Files should be named in kebab-case for multi-word names:**
```
create-user-schema.ts
update-event-schema.ts
login-schema.ts
```

---

## 4.0. State Management

State management defines how application states are handled across the system to ensure:
- Predictability
- Scalability
- Performance
- Separation of concerns

### Layered State Strategy

1. **Local UI State** - `useState`
2. **Shared UI State** - Custom hooks
3. **Global Application State** - React Context
4. **Server State** - Server Actions/API
5. **Persistent State** - Database

### 4.1. Local Component State

**Used for:**
- Modal open/close
- Form inputs (temporary)
- Toggle switches
- Dropdown visibility
- Storing data

**Example:**
```typescript
const [isOpen, setIsOpen] = useState(false);
```

**Rules:**
- If the state is used in only one component → keep it local
- Do not globalize simple UI states

### 4.2. Form State Management

**The form uses:**
- React Hook Form
- Zod for validation

### 4.3. Server State

**Server state includes:**
- Database data
- API response
- Authenticated user data
- Paginated lists

**Important:** Server state is NOT stored permanently in React state.

**Instead:**
- Use Server Components when possible
- Use Server Actions for mutations
- Fetch fresh data when needed

### 4.4. Global State

**Global state is only used when:**
- Multiple distant components need access
- It represents app-wide data
- It doesn't belong to the database

**Examples:**
- Auth context
- Theme mode
- User session
- Sidebar collapsed state

**Storage:** Global contexts are stored in `/lib/context`

**Example:**
```typescript
<AuthProvider>
  <App />
</AuthProvider>
```

---

## 5.0. Error Handling

Handling errors consistently across applications to ensure:
- Clear user feedback
- Predictable behavior
- Secure error exposure
- Easier debugging
- Clean separation of responsibilities

### 5.1. Error Handling Layers

#### 1. UI Layers

**Responsibilities:**
- Displays friendly messages
- Does NOT expose technical errors
- Does NOT handle business logic

**Example:**
```typescript
try {
  await createEvent(data);
  toast.success("Event created successfully");
} catch (error) {
  toast.error("Something went wrong. Please try again.");
}
```

**Important:** UI shows user-safe messages only.

**Never show:**
- Stack traces
- Database errors
- Raw backend responses

#### 2. Server Actions

**Responsibilities:**
- Validate input
- Catch service errors
- Throw structured errors

**Example:**
```typescript
export async function createEventAction(data: CreateEventDTO) {
  try {
    return await createEvent(data);
  } catch (error) {
    throw new Error("Failed to create event");
  }
}
```

**Important:**
- Actions return controlled errors
- They do not leak database-level details

#### 3. Service Layer

**Responsibilities:**
- Should throw meaningful errors

**Example:**
```typescript
export async function deleteEvent(id: string) {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    throw new Error("Event not found");
  }
  if (event.isLocked) {
    throw new Error("Event cannot be deleted");
  }
  return prisma.event.delete({ where: { id } });
}
```

**Important:**
- Do not return `null` silently
- Do not swallow errors
- Display error messages based on action performed

#### 4. API Routes

**Responsibilities:**
- API routes return structured responses

**Example:**
```typescript
return NextResponse.json(
  { error: "Event not found" },
  { status: 404 }
);
```

**Standard status codes:**
- `400` → Bad request
- `401` → Unauthorized
- `403` → Forbidden
- `404` → Not found
- `500` → Internal server error

---

## 6.0. API Integration Strategy

The strategy used to integrate APIs and how the frontend communicates with backend services in a structured, scalable, and maintainable way.

### Ensuring

- Centralized API configuration
- Consistent request handling
- Predictable error handling
- Clean separation of concerns
- Environment flexibility

### External Service Communication

The project communicates with external services using:
1. Environment-based base URLs
2. Centralized endpoint constants
3. A structured service/request layer
4. Controlled usage inside actions and components

### 6.1. Base URL Configuration

All base URLs are defined using environment variables.

**Example:**
```typescript
export const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
```

### 6.2. Centralized Endpoint Definitions

All endpoint paths are defined in a constants file.

**Example:**
```typescript
export const URLS = {
  events: {
    create: "/events/create",
    update: "/events/{id}/update",
  },
};
```

### 6.3. API Request Layer

Use native fetch functions for server components and server actions, and axios in client components.

#### GET Requests

**Using native fetch:**
```typescript
export const getUser = async () => {
  const url = "https://api.example.com/user";
  const BEARER = "your_token_here";

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
```

**Using axios:**
```typescript
import axios from "axios";

export const getUser = async () => {
  const url = "https://api.example.com/user";
  const BEARER = "your_token_here";

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${BEARER}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
```

#### POST Requests

**Using native fetch:**
```typescript
type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (payload: CreateUserPayload) => {
  const url = "https://api.example.com/users";
  const BEARER = "your_token_here";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
```

**Using axios:**
```typescript
import axios from "axios";

type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (payload: CreateUserPayload) => {
  const url = "https://api.example.com/users";
  const BEARER = "your_token_here";

  try {
    const res = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${BEARER}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
```

### 6.4. Environment Variables

After including the `.env` file in `.gitignore` (to prevent pushing to GitHub), organize the `.env` file as follows:

```bash
# Server-only
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=super_secret_key

# Exposed to browser
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_APP_NAME=MyApp
```

**Access contents:**
```typescript
process.env.NEXT_PUBLIC_API_URL
```

---

## 7.0. Git Branching Strategy & Commit Standards

Defining how version control is structured to ensure:
- Clean collaboration
- Predictable release flow
- Easier debugging
- Safe production deployments
- Clear project history

### 7.1. Branching Strategy

#### `release` branch
**Purpose:** Production-ready code  
**Environment:** Production

**Rules:**
1. Production-code only
2. Protected branch
3. No direct pushes
4. Only merged via Pull Requests
5. Disable branch deletion
6. Disable force pushes
7. Require at least 1 approval
8. Only `main` can merge into `release`

#### `pre-release` branch
**Purpose:** Staging / Pre-production branch  
**Environment:** Staging

**Rules:**
1. Protected branch
2. No direct pushes
3. Only merged via Pull Requests
4. Must pass integration testing
5. Must pass QA validation
6. Only `beta` can merge into `pre-release`

#### `main` branch
**Purpose:** Developer onboarding & default pull branch  
**Environment:** Development

**Rules:**
1. Development branch
2. New developers clone/pull from `main`
3. Not used for production deployment
4. Latest approved development setup
5. Contains test databases and development backend URLs

#### `beta` branch
**Purpose:** Feature integration branch  
**Environment:** Test

**Rules:**
1. Pull Requests required
2. No direct pushes
3. Cross-feature testing happens here
4. Feature branches merge here first

### 7.2. Feature Branch Naming Convention

**Syntax:**
```
type/scope-short-description
```

| Type | Purpose |
|------|---------|
| `feature` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring |
| `chore` | Maintenance / configurations |
| `docs` | Documentation updates |
| `style` | UI adjustments |
| `test` | Adding / updating tests |

**Examples:**
```
feature/auth-login-flow
feature/dashboard-pagination
fix/navbar-mobile-overflow
refactor/api-service-layer
docs/frontend-architecture-update
chore/update-eslint-config
```

**Branch naming rules:**
1. Use lowercase only
2. Use hyphens for separations
3. Keep it short and descriptive
4. Never use spaces
5. Never use camelCase

### 7.3. Commit Messages

Follow conventional commits format

**Syntax:**
```
type(scope): short description
```

**Examples:**
```
feat(auth): implement login with next-auth
fix(dashboard): resolve pagination state issue
refactor(api): centralize axios instance
docs(architecture): add authentication strategy section
chore(env): add runtime env validation
```

**Commit Message Rules:**
1. Use lowercase for type
2. Use present tense (not past tense)
3. Keep description under 72 characters
4. Do not end with a period
5. Be specific

**❌ Bad commit messages:**
```
fixed stuff
update
changes
bug fix
working on dashboard
```

### 7.4. Multi-line Commit Messages

**Example:**
```
feat(auth): implement role-based session handling

- add role to JWT callback
- update middleware permission check
- protect admin routes
```

**Use when:**
1. Large features
2. Complex refactors
3. Breaking changes

---

## 8.0. Pull Requests Standards

Each pull request must:
1. Target `pre-release` branch
2. Have a clear title following commit format
3. Include a short description of:
   - What was changed
   - Why it was changed
   - Any breaking changes

### 8.1. Merge Rules

1. No direct commits to `main`
2. Require PR review
3. Squash and merge recommended for clean history

### 8.2. Release Tagging

**Examples:**
```
v1.0.0
v1.1.0
v1.1.1
```

**Follow semantic versioning:**
1. **Major** → Breaking change
2. **Minor** → New feature
3. **Patch** → Bug fix

---

## 9.0. Security Headers in the Application

Security headers help protect your web application by instructing browsers to enforce safe behaviors and reduce attack vectors like XSS, clickjacking, or MIME sniffing.

### 9.1. Recommended Security Headers

| Header | Purpose |
|--------|---------|
| **Content-Security-Policy (CSP)** | Controls which scripts, styles, images, and other resources can load on your site; prevents XSS attacks |
| **X-Content-Type-Options: nosniff** | Prevents the browser from MIME type sniffing, reducing drive-by attacks |
| **X-Frame-Options: DENY** | Prevents your pages from being framed, mitigating clickjacking |
| **X-XSS-Protection: 1; mode=block** | Basic XSS protection (legacy, mostly for old browsers) |
| **Strict-Transport-Security (HSTS)** | Forces the browser to only use HTTPS |
| **Referrer-Policy: no-referrer** | Prevents sensitive URL data from leaking via the Referer header |
| **Permissions-Policy** | Controls access to browser features like camera, microphone, geolocation, etc. |
| **Cross-Origin-Opener-Policy** | Prevents cross-origin attacks |
| **Cross-Origin-Embedder-Policy** | Improves isolation for secure cross-origin resources |

### 9.2. Implementing in NextJS

You can configure headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), camera=(), microphone=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};
```

**Notes:**
- `source: "/(.*)"` ensures all routes get the headers
- Adjust CSP (Content-Security-Policy) depending on your scripts, images, or third-party services

### 9.3. Middleware Enforcements

For stricter control, you can enforce certain headers via Next.js middleware:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "no-referrer");
  return res;
}
```

### 9.4. Recommendations

1. Always use HTTPS. Combine with HSTS for max security.
2. Review CSP carefully; overly strict policies can break third-party scripts.
3. Test headers in browser dev tools → Network → Headers.
4. Update headers as your app adds new features or integrates third-party scripts.
5. Consider tools like Mozilla Observatory or securityheaders.com to validate headers.

---

## 10.0. DevSecOps

DevSecOps integrates security practices into the development and operations pipeline, ensuring that security is not an afterthought but embedded throughout the entire development lifecycle. This section outlines best practices and standards for implementing DevSecOps in our NextJS application.

### 10.1. Security in Development

#### Code Quality & Static Analysis

**Use ESLint with security plugins:**
```json
{
  "eslintConfig": {
    "extends": [
      "next/core-web-vitals",
      "plugin:security/recommended"
    ],
    "plugins": ["security"]
  }
}
```

**Perform regular code reviews:**
- Every PR must be reviewed by at least one team member
- Reviewers should check for security vulnerabilities
- Use automated tools to catch common issues

**TypeScript strict mode:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

#### Dependency Management

**Keep dependencies updated:**
```bash
npm audit
npm audit fix
npm outdated
```

**Use lock files:**
- Commit `package-lock.json` to version control
- Ensures reproducible builds across environments

**Scan for vulnerabilities:**
```bash
# Using npm audit
npm audit

# Using Snyk
snyk test

# Using OWASP Dependency-Check
dependency-check --project "ISCE Digital" --scan .
```

**Prevent supply chain attacks:**
- Review dependencies before adding them
- Use npm scripts to verify package integrity
- Monitor for abandoned packages

#### Secrets Management

**Never commit secrets:**

❌ **Bad:**
```typescript
const API_KEY = "sk_live_abc123xyz";
const DATABASE_URL = "postgresql://user:password@host/db";
```

✅ **Good:**
```typescript
const API_KEY = process.env.API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
```

**Environment variables configuration:**
- Use `.env.local` for local development (git-ignored)
- Use `.env.example` to document required variables
- Store secrets in secure vaults (AWS Secrets Manager, HashiCorp Vault)

**Rotate secrets regularly:**
- Schedule quarterly secret rotation
- Update all services when secrets change
- Monitor for unauthorized access attempts

### 10.2. Security in Build & Deployment

#### Build Pipeline Security

**Use signed commits:**
```bash
git config --global user.signingkey <GPG_KEY_ID>
git commit -S -m "feat: secure feature"
```

**Automated security checks in CI/CD:**

```yaml
# .github/workflows/security.yml
name: Security Checks

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run ESLint
        run: npm run lint:security
      
      - name: Dependency audit
        run: npm audit --audit-level=moderate
      
      - name: SAST Scan
        run: npm run security:scan
      
      - name: Build verification
        run: npm run build
```

**Container security:**
- Scan Docker images for vulnerabilities
- Use minimal base images
- Don't run containers as root

#### Code Signing

**Sign releases:**
```bash
# Tag with signature
git tag -s v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

**Verify signatures:**
```bash
git tag -v v1.0.0
```

### 10.3. Security in Runtime

#### Input Validation & Sanitization

**Always validate user input:**
```typescript
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12).regex(/[A-Z]/).regex(/[0-9]/),
  name: z.string().min(2).max(100),
});

export async function createUser(data: unknown) {
  const validated = createUserSchema.parse(data);
  // Safe to use validated data
}
```

**Sanitize output to prevent XSS:**
```typescript
import DOMPurify from "dompurify";

export function SafeHTML({ html }: { html: string }) {
  const sanitized = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

#### Authentication & Authorization

**Enforce strong authentication:**
- Mandatory 2FA for users with elevated privileges
- Implement account lockout after failed attempts
- Use secure session management

**Example with Better Auth:**
```typescript
import { betterAuth } from "better-auth";

const auth = betterAuth({
  database: {
    type: "postgresql",
    url: process.env.DATABASE_URL,
  },
  plugins: [
    twoFactor({
      issuer: process.env.NEXT_PUBLIC_APP_NAME,
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update every day
  },
});
```

**Authorization checks:**
```typescript
"use server"
import { auth } from "@/lib/auth";

export async function deleteUser(userId: string) {
  const session = await auth.api.getSession();
  
  // Check if user has permission
  if (session?.user.role !== UserRole.CRIMSON) {
    throw new Error("Unauthorized");
  }
  
  // Safe to proceed
  return await deleteUserService(userId);
}
```

#### Rate Limiting

**Implement rate limiting:**
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
});

export async function apiHandler(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "";
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }
  
  // Process request
}
```

#### Logging & Monitoring

**Log security events:**
```typescript
export async function logSecurityEvent(
  event: string,
  userId: string,
  details: Record<string, any>
) {
  const timestamp = new Date().toISOString();
  
  // Log to secure audit trail
  await db.auditLog.create({
    data: {
      event,
      userId,
      details: JSON.stringify(details),
      timestamp,
      ipAddress: getClientIp(),
      userAgent: getUserAgent(),
    },
  });
}
```

**Monitor for suspicious activity:**
- Failed login attempts
- Unusual data access patterns
- Permission escalation attempts
- API abuse

### 10.4. Security Testing

#### Penetration Testing

**Schedule regular pen tests:**
- Quarterly internal security reviews
- Annual third-party penetration tests
- Post-deployment verification

**Test common vulnerabilities:**
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Authentication bypass
- Authorization flaws

#### Vulnerability Scanning

**Automated vulnerability scanning:**
```bash
# Using OWASP ZAP
zaproxy -cmd -quickurl https://app.example.com

# Using Snyk
snyk test --severity-threshold=high
```

**Security headers validation:**
```bash
# Using securityheaders.com API or lighthouse
npm run audit:headers
```

#### Security Testing in CI/CD

```yaml
# .github/workflows/security-test.yml
name: Security Tests

on: [pull_request]

jobs:
  security-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: DAST Scan
        run: npm run security:dast
      
      - name: API Security Test
        run: npm run security:api
      
      - name: Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
```

### 10.5. Compliance & Auditing

#### Security Checklist

Before every release, verify:

- [ ] All dependencies are up-to-date
- [ ] No hardcoded secrets in codebase
- [ ] Security headers are configured correctly
- [ ] HTTPS is enforced
- [ ] Input validation is in place
- [ ] Error handling doesn't leak sensitive info
- [ ] Authentication & authorization are tested
- [ ] Rate limiting is enabled
- [ ] Logging & monitoring are active
- [ ] All security tests passed
- [ ] Code reviewed by security-conscious team member

#### Audit Trail

**Maintain comprehensive audit logs:**
```typescript
interface AuditLog {
  id: string;
  event: string;
  userId: string;
  resource: string;
  action: "CREATE" | "READ" | "UPDATE" | "DELETE";
  changes: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  status: "SUCCESS" | "FAILURE";
  errorMessage?: string;
}
```

**Audit log retention:**
- Retain logs for minimum 12 months
- Store logs securely (encrypted)
- Regular backup procedures
- Immutable audit trail

#### Compliance Standards

**Follow industry standards:**
- **OWASP Top 10** - Web application security risks
- **NIST Cybersecurity Framework** - Security best practices
- **SOC 2 Type II** - Security & availability controls
- **GDPR/CCPA** - Data protection regulations
- **PCI DSS** - Payment card industry standards

### 10.6. Incident Response

#### Security Incident Plan

**Have an incident response process:**

1. **Detection** - Identify security incident
2. **Containment** - Isolate affected systems
3. **Investigation** - Understand scope & impact
4. **Eradication** - Remove threat
5. **Recovery** - Restore systems
6. **Post-Incident** - Lessons learned

#### Security Contact

**Maintain security contact:**
- Email: security@your-domain.com
- Responsible disclosure policy
- Response time: < 24 hours

#### Post-Incident Actions

```typescript
interface IncidentResponse {
  id: string;
  date: Date;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  description: string;
  affectedUsers: number;
  rootCause: string;
  remediation: string;
  preventionMeasures: string[];
  lessonsLearned: string;
}
```

### 10.7. Security Training

**Team security awareness:**
- Quarterly security training for all developers
- Phishing simulation exercises
- Secure coding best practices
- Password management
- Social engineering awareness

**Resources:**
- OWASP WebGoat (interactive security learning)
- PluralSight security courses
- Internal knowledge base
- Regular security briefings

---

## 11.0. Conclusion

This documentation establishes the engineering standards and technical principles that guide how we build, review, deploy, and maintain frontend applications. It is not just a set of rules — it is a framework for delivering reliable, secure, scalable, and maintainable software.

By adhering to the defined coding practices, API integration standards, security configurations, Git branching strategy, commit message conventions, and DevSecOps practices, we ensure:

1. Consistency across the codebase
2. Reduced technical debt
3. Easier onboarding for new engineers
4. Improved collaboration across teams
5. Faster debugging and safer deployments
6. Long-term product scalability
7. Proactive security posture
8. Compliance with industry standards

### Key Principles

Engineering discipline directly impacts product quality. Clean architecture, secure configurations, structured branching, and meaningful commit history are not optional — they are foundational to building systems that can grow without breaking.

**Every engineer is responsible for upholding these standards.** Code reviews, pull request discipline, testing practices, documentation updates, and security vigilance must reflect the expectations outlined here.

### Living Document

This document should evolve alongside the product. As new tools, frameworks, or patterns are introduced, this guide must be updated to reflect best practices and organizational standards.

### Our Goal

**Build software that is secure, scalable, readable, and built to last.**

---

## Contact & Review

**Work Address:** tech.divine101@gmail.com  
**Owner:** Onyekachukwu Divine  

*This documentation is up for review and corrections.*