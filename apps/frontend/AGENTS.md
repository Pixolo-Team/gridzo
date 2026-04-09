<!-- BEGIN:nextjs-agent-rules -->

# Next.js App – Copilot Instructions & Coding Standards

This document defines **mandatory coding rules** for all Next.js repositories.

All contributors (**human or AI**) must follow these rules strictly.

This repository is built for **production-grade applications**.  
Code quality, consistency, and clarity are **non-negotiable**.

These rules ensure:

- predictable architecture
- consistent naming
- maintainable services
- scalable frontend code
- AI-generated code that matches repository standards

If generated code violates these rules, **it must be considered incorrect even if it works**.

---

# 1. Import Rules (MANDATORY)

Always use the **project alias `@/`** for imports.

Relative imports introduce fragile dependencies and must never be used.

### ✅ Correct

```ts
import { getUsersRequest } from "@/services/user.service";
import { formatCurrencyService } from "@/services/format-currency.service";
import { UserCard } from "@/components/user-card";
```

### ❌ Incorrect

```ts
import { getUsers } from "../../services/user.service";
import { UserCard } from "../../../components/user-card";
```

---

# 2. File Naming Rules

All file names must follow **kebab-case**.

File names must clearly describe their responsibility.

### ✅ Correct

```
user.service.ts
user-profile.request.ts
create-user.service.ts
user-list.page.tsx
```

### ❌ Incorrect

```
UserService.ts
GetUsers.ts
UserProfile.ts
```

### Special Rule

Only **UI component files (`.tsx`)** may use **PascalCase**.

All other files must use **kebab-case**.

---

# 3. Function Naming Rules

All function names must:

- start with a **verb**
- use **camelCase**
- clearly describe the action

### ✅ Correct

```
getUsersRequest()
createUserService()
formatCurrencyService()
validateEmailService()
```

### ❌ Incorrect

```
users()
UserCreate()
currencyFormatter()
```

---

# 4. API Request Functions

Any function that performs an **API / HTTP / database call** must end with **Request**.

This applies to:

- REST APIs
- GraphQL calls
- Supabase queries
- external APIs
- internal backend calls

### ✅ Correct

```
getUsersRequest()
createUserRequest()
updateUserProfileRequest()
deleteUserRequest()
```

### ❌ Incorrect

```
fetchUsers()
loadUsers()
getUsers()
usersApi()
```

---

# 5. Service Layer Rules

All **business logic must live inside service files**.

Service functions must end with **Service**.

Services must **never directly call UI components**.

### ✅ Correct

```
createUserService()
mapUserListingService()
validatePasswordService()
calculateCartTotalService()
```

### ❌ Incorrect

```
createUser()
userMapper()
passwordValidator()
calculateCart()
```

---

# 6. Data Type Naming Rules (STRICT)

ALL data structures must end with **Data**.

Applies to:

- interfaces
- types
- DTOs
- API responses
- domain models

### ✅ Correct

```ts
interface UserData {}
interface UserProfileData {}
type AuthenticationResponseData = {};
```

### ❌ Incorrect

```ts
interface User {}
interface UserProfile {}
type ProductItem = {};
```

---

# 7. JSDoc Comments (MANDATORY)

Every exported function **must include a JSDoc comment**.

Minimum requirement: **one-line explanation**.

### ✅ Correct

```ts
/**
 * Fetches all users with pagination
 */
export async function getUsersRequest() {}
```

### ❌ Incorrect

```ts
export async function getUsersRequest() {}
```

---

# 8. Commenting Rules

Comments must explain **WHY**, not **WHAT**.

Use comments for:

- complex logic
- business rules
- integrations
- edge cases

### ✅ Good

```ts
// External ID ensures idempotent sync with Stripe
```

### ❌ Bad

```ts
// increment i
i++;
```

---

# 9. Console Logs (STRICT)

Console statements must **never exist in committed code**.

Forbidden:

```
console.log
console.error
console.warn
console.debug
```

Allowed only during **local debugging**.

All console logs must be **removed before commit**.

---

# 10. Error Handling Rules

Errors must **always be handled explicitly**.

Never swallow errors silently.

Errors must return a **predictable structure**.

### ✅ Correct

```ts
return { data: null, error };
```

or

```ts
throw new Error("Failed to create user");
```

### ❌ Incorrect

```ts
catch (error) {
  return null
}
```

---

# 11. Global Variables & Constants Rule

Global variables and constants must always be used instead of hardcoding values.

Reusable values must be defined in global files such as:

```
src/constants
src/config
src/globals
```

Examples include:

- pagination sizes
- API URLs
- default filters
- environment configuration
- reusable limits

### ✅ Correct

```ts
const PAGE_SIZE = DEFAULT_PAGE_SIZE;
```

### ❌ Incorrect

```ts
const PAGE_SIZE = 10;
```

Hardcoding repeated values inside components or services is **not allowed**.

---

# 12. General Code Quality Rules

Code must prioritize:

- clarity
- maintainability
- predictability

Guidelines:

- keep functions small
- avoid deeply nested logic
- prefer readability over clever code
- remove unused variables
- avoid premature optimization

---

# 13. React Component Structure Rules (MANDATORY)

All React function components must follow a **strict internal structure order**.

This ensures:

- predictable component layout
- consistent readability
- maintainable components

---

## Component Structure Order

Inside a React component, code must appear in this order:

1. Navigation
2. Context
3. Refs
4. States
5. Helper Functions
6. UseEffects

---

## Required Section Comments

Each component must contain these comments:

```ts
// Define Navigation

// Define Context

// Define Refs

// Define States

// Helper Functions

// Use Effects
```

---

## Example

```tsx
/** Tournaments Page */
export default function Tournaments() {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define Refs
  const hasFetchedRef = useRef<boolean>(false);

  // Define States
  const [items, setItems] = useState<ItemData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper Functions
  /**
   * Fetch items from API
   */
  const fetchItems = async () => {
    const { data, error } = await getItemsRequest();

    if (error) {
      setIsLoading(false);
      return;
    }

    setItems(data ?? []);
    setIsLoading(false);
  };

  // Use Effects
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchItems();
  }, []);

  return <div>Example</div>;
}
```

---

# 14. Next.js Built-in Component Rules

Next.js provides optimized components that must be used.

---

# Image Component Rule

Images must use **Image from `next/image`**.

### Import

```ts
import Image from "next/image";
```

### Correct

```tsx
<Image
  src="/images/banner.jpg"
  alt="Tournament banner"
  width={800}
  height={400}
/>
```

### Incorrect

```tsx
<img src="/images/banner.jpg" />
```

`<img>` is allowed only for **external HTML or third-party content**.

---

# Link Navigation Rule

Internal navigation must use **Link from `next/link`**.

### Import

```ts
import Link from "next/link";
```

### Correct

```tsx
<Link href="/football-tournaments">View Tournaments</Link>
```

### Incorrect

```tsx
<a href="/football-tournaments">
```

Use `<a>` only for **external links**.

---

# Router Navigation Rule

Programmatic navigation must use **router.push()**.

### Import

```ts
import { useRouter } from "next/navigation";
```

### Example

```ts
const router = useRouter();

router.push("/dashboard");
```

Use router navigation when:

- redirecting after API calls
- redirecting after login
- navigation triggered inside functions

---

# Navigation Rule Summary

| Scenario                | Method      |
| ----------------------- | ----------- |
| UI navigation           | Link        |
| Programmatic navigation | router.push |
| External links          | `<a>`       |
| Images                  | Image       |

---

# 15. AI (Copilot) Generation Rules

When generating code, AI tools must:

- follow all naming conventions
- match existing project patterns
- use service + request architecture

AI must **never introduce**:

- unused variables
- commented-out code
- console logs
- inconsistent naming
- new architectural patterns

If unclear, AI must **ask for clarification instead of guessing**.

---

# Final Rule (Non-Negotiable)

If code does not follow these rules, it is **incorrect even if it works**.

These standards ensure:

- predictable architecture
- scalable services
- consistent naming
- production-grade reliability

All contributors must follow these rules **without exception**.

<!-- END:nextjs-agent-rules -->
