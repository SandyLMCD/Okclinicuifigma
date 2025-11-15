# Migration Guide: From Figma Make to Standard React Project

This guide will help you migrate the vet clinic system from Figma Make to your standard React project.

## Overview

The main difference between Figma Make and standard React projects is the import syntax. Figma Make uses versioned imports (e.g., `@radix-ui/react-dialog@1.1.6`), while standard React projects use regular imports (e.g., `@radix-ui/react-dialog`).

## Step 1: Install Required Dependencies

First, install all required npm packages in your React project:

```bash
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip

npm install class-variance-authority clsx tailwind-merge lucide-react

npm install cmdk embla-carousel-react input-otp react-day-picker react-hook-form react-resizable-panels recharts sonner vaul

npm install next-themes
```

## Step 2: Update Import Statements in UI Components

You need to remove version numbers from all imports in the `/components/ui/` directory. Here's a find-and-replace pattern:

**Find (Regex):**

```
from "([^"]+)@[\d.]+
```

**Replace with:**

```
from "$1
```

Or manually replace these patterns:

- `@radix-ui/react-*@X.X.X` → `@radix-ui/react-*`
- `lucide-react@X.X.X` → `lucide-react`
- `class-variance-authority@X.X.X` → `class-variance-authority`
- `react-hook-form@X.X.X` → `react-hook-form`
- `react-day-picker@X.X.X` → `react-day-picker`
- `embla-carousel-react@X.X.X` → `embla-carousel-react`
- `recharts@X.X.X` → `recharts`
- `cmdk@X.X.X` → `cmdk`
- `vaul@X.X.X` → `vaul`
- `input-otp@X.X.X` → `input-otp`
- `react-resizable-panels@X.X.X` → `react-resizable-panels`
- `sonner@X.X.X` → `sonner`
- `next-themes@X.X.X` → `next-themes`

## Step 3: Files Already Ready to Copy

The following files can be copied directly **without any modifications**:

### Main Application Files:

- `/App.tsx` ✓
- `/components/AdminDashboard.tsx` ✓
- `/components/BalancePage.tsx` ✓
- `/components/BookingPage.tsx` ✓
- `/components/CheckoutPage.tsx` ✓
- `/components/InvoicesPage.tsx` ✓
- `/components/LoginPage.tsx` ✓
- `/components/Navigation.tsx` ✓
- `/components/PasswordResetPage.tsx` ✓
- `/components/ProfilePage.tsx` ✓
- `/components/ServicesPage.tsx` ✓
- `/components/SignupPage.tsx` ✓

### Styles:

- `/styles/globals.css` ✓

## Step 4: Files That Need Import Updates

All files in `/components/ui/` need their imports updated:

- accordion.tsx
- alert-dialog.tsx
- alert.tsx
- aspect-ratio.tsx
- avatar.tsx
- badge.tsx
- breadcrumb.tsx
- **button.tsx** (already updated in Figma Make, but needs version removal)
- calendar.tsx
- card.tsx
- carousel.tsx
- chart.tsx
- checkbox.tsx
- collapsible.tsx
- command.tsx
- context-menu.tsx
- **dialog.tsx** (already updated in Figma Make, but needs version removal)
- drawer.tsx
- dropdown-menu.tsx
- form.tsx
- hover-card.tsx
- input-otp.tsx
- input.tsx
- label.tsx
- menubar.tsx
- navigation-menu.tsx
- pagination.tsx
- popover.tsx
- progress.tsx
- radio-group.tsx
- resizable.tsx
- scroll-area.tsx
- select.tsx
- separator.tsx
- sheet.tsx
- sidebar.tsx
- skeleton.tsx
- slider.tsx
- sonner.tsx
- switch.tsx
- table.tsx
- tabs.tsx
- textarea.tsx
- toggle-group.tsx
- toggle.tsx
- tooltip.tsx
- use-mobile.ts
- utils.ts

## Step 5: Quick Migration Script

If you're comfortable with command-line tools, you can use this script to update all files:

```bash
# In your project root, run:
find components/ui -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/@\([0-9]\+\.[0-9]\+\.[0-9]\+\)"/"/g'
```

Or for Windows (PowerShell):

```powershell
Get-ChildItem -Path "components/ui" -Filter *.tsx | ForEach-Object {
    (Get-Content $_.FullName) -replace '@[\d.]+\"', '\"' | Set-Content $_.FullName
}
```

## Step 6: Special Considerations

### 1. `sonner` import (toast notifications)

The toast import pattern is different:

```typescript
// Change this:
import { toast } from "sonner@2.0.3";

// To this:
import { toast } from "sonner";
```

### 2. `react-hook-form` import

Keep the version in the import as specified:

```typescript
// This should remain:
import { ... } from "react-hook-form@7.55.0"

// Or use the standard:
import { ... } from "react-hook-form"
```

### 3. ImageWithFallback component

The `/components/figma/ImageWithFallback.tsx` is a protected system file in Figma Make. If you're migrating to a standard React project, you may need to either:

- Copy it from your existing project structure
- Create a simple placeholder image component
- Or simply use regular `<img>` tags if this component isn't used in your custom pages

## Step 7: Testing Checklist

After migration, test these features:

- [ ] Login/Signup pages render correctly
- [ ] Navigation works between all pages
- [ ] Profile page displays user and pet information
- [ ] Booking page calendar and time selection work
- [ ] Services page shows all services
- [ ] Checkout page processes mock payments
- [ ] Balance page shows transaction history
- [ ] **Invoices page displays and filters correctly** (NEW)
- [ ] **Admin dashboard loads and tabs switch properly** (NEW)
- [ ] Admin login works (email: admin@pawcare.com)
- [ ] All dialogs/modals open and close properly
- [ ] All tables display data correctly
- [ ] All form inputs work as expected

## Step 8: Admin Access

To access the admin dashboard:

- **Email:** admin@pawcare.com
- **Password:** any password (e.g., "admin123")

The system detects the admin email and routes to the admin dashboard instead of the regular user interface.

## Summary

1. ✅ Install all npm dependencies
2. ✅ Copy all files from `/components/` (except `/components/ui/`)
3. ✅ Copy `/App.tsx`
4. ✅ Copy `/styles/globals.css`
5. ⚠️ Update imports in `/components/ui/` files (remove version numbers)
6. ✅ Test all features

The application includes:

- User authentication (login/signup/password reset)
- Profile management with pet information
- Service selection and booking
- Checkout and payment processing
- Balance and transaction history
- **Invoice tracking with payment status** (NEW)
- **Full admin dashboard with management tools** (NEW)

All features use mock data and are ready for backend integration with Supabase or your preferred backend.