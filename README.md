src\app\(auth)\sign-up\page.tsx
(
feat(sign-up): build sign-up page with full form validation and username check

- Components used:
  - Form, FormField, FormItem, FormLabel, FormControl, FormMessage (react-hook-form + custom UI)
  - Input (custom UI component)
  - Button (custom UI component)
  - Loader2 icon (lucide-react) for loading indicator
  - toast (custom toast notification hook)
- Integrated react-hook-form with Zod schema for validation (username, email, password)
- Added debounce logic for username field to reduce API calls
- Implemented GET request to /api/check-username-unique for username availability
- Displayed success/error state for username field dynamically
- On submit: POST request to /api/sign-up, show toast messages, redirect to verification page
- Styling handled via TailwindCSS utility classes
- )

src/app/(auth)/verify/[username]
implement account verification page with form validation and API integration

- Built responsive verification page using React, Tailwind CSS, and Next.js App Router
- Integrated dynamic route params via useParams from next/navigation
- Added programmatic navigation using useRouter from next/navigation
- Implemented form handling with react-hook-form and zod schema validation via zodResolver
- Displayed success and error notifications using sonner toast
- Added input handling with ShadCN UI Input, Form, FormControl, FormField, FormItem, FormLabel, and FormMessage components
- Used ShadCN UI Button for submission actions
- Connected verification form to backend via axios POST request
- Applied ApiResponse type for strong TypeScript typing
- Ensured error handling with AxiosError generic type casting
- Styled layout using Tailwind utility classes for responsive design
- Included form reset after successful verification and route redirect to /sign-in

src/app/(auth)/sign-in/page.tsx
implement SignInForm with validation, NextAuth integration, and responsive UI

- Created sign-in page using React, TypeScript, and Next.js App Router
- Implemented form state management with react-hook-form
- Added schema-based validation using zod and zodResolver
- Integrated authentication via next-auth's signIn API with credentials provider
- Displayed toast notifications using sonner for success and error feedback
- Included form fields for Email/Username and Password using ShadCN UI Input, Form, FormField, FormItem, FormLabel, and FormMessage components
- Styled page layout with Tailwind CSS for a responsive, centered form design
- Added full-width ShadCN UI Button for form submission
- Provided navigation to sign-up page using Next.js Link
- Configured router-based navigation with useRouter for redirecting to dashboard on success
- Set defaultValues in useForm for controlled inputs
- Applied shadowed card-style container with rounded corners for polished UI
