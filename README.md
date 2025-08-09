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
