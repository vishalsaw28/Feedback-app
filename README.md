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

feat(dashboard): implement user dashboard with message management, profile link sharing, and settings control

- Built user dashboard page using React, TypeScript, and Next.js App Router
- Integrated session handling with next-auth's useSession to show personalized content
- Managed component state with useState and optimized data fetching using useCallback and useEffect
- Implemented form state for settings toggle with react-hook-form and zod validation via zodResolver
- Added ability to fetch and display messages from backend using axios
- Created message list rendering with MessageCard component for individual message display and deletion
- Enabled toggle for accepting messages using ShadCN UI Switch component, synced with backend API
- Added “Copy Your Unique Link” section with profile URL generation and clipboard copy functionality using navigator.clipboard
- Included ShadCN UI Button for actions and lucide-react icons (Loader2, RefreshCcw) for loading and refresh states
- Styled layout with Tailwind CSS, including responsive grid for messages and container card design
- Added refresh button with conditional spinner to fetch latest messages on demand
- Displayed toast notifications with sonner for all user interactions and API responses
- Included ShadCN UI Separator for clean section separation
- Handled API errors with type-safe AxiosError and displayed appropriate feedback

feat(home): implement landing page with autoplay carousel of messages

- Built responsive Home page using React, TypeScript, and Next.js App Router
- Added hero section with title and description introducing anonymous conversations
- Implemented carousel using ShadCN UI Carousel, CarouselContent, CarouselItem, CarouselNext, and CarouselPrevious components
- Integrated Embla Autoplay plugin for automatic slide transitions with 2-second delay
- Displayed message data from local messages.json for dynamic content rendering
- Used ShadCN UI Card, CardHeader, CardTitle, and CardContent for structured slide presentation
- Included Mail icon from lucide-react for visual enhancement of each message
- Applied Tailwind CSS for spacing, typography, and responsive layout across devices

feat(api/messages): add DELETE endpoint for removing user messages

- Implemented DELETE API route with Next.js App Router and dynamic route parameter for message ID
- Connected to MongoDB via dbConnect utility
- Used getServerSession with NextAuth authOptions to authenticate user sessions
- Performed secure message deletion using Mongoose updateOne with $pull operator
- Returned appropriate HTTP status codes and JSON responses for success, not found, and authentication errors
- Added error handling with console logging for server-side debugging
- Ensured type safety with NextAuth User type and Message model integration
