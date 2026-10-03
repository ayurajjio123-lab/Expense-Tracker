# Daily Expense Tracker — Exact UI/UX V2

This package is a source-code replacement for the app UI layer.

## Fixed design rule

The supplied reference image is the visual specification. Do not redesign the visible UI.

Preserved:
- Light mode: white background + blue cards/buttons
- Dark/Night mode: dark background + blue accents
- Top-left hamburger menu on the Home screen
- Left-side drawer
- Bottom navigation
- 2x2 blue summary cards
- Add Expense button
- Today's Expenses section
- Reference-style Add Expense, Budget, Analytics, Calendar, Categories,
  Recurring Expenses, Data Management, Search and Settings layouts

## Critical integration rule

Keep the existing working Android/Expo setup:
- F:\ExpenseTracker
- Expo SDK 54
- React Native 0.81.5
- Java 17
- Gradle 8.14.3
- existing android/ directory
- existing package.json and lockfile

Only replace App.js and the source files in src/ after taking a backup.

## Apply

PowerShell:

Copy-Item F:\ExpenseTracker F:\ExpenseTracker_Backup_ExactUI -Recurse

Then copy this package's App.js and src folder into F:\ExpenseTracker.

Start:

cd F:\ExpenseTracker
npx expo start --dev-client --clear

Press `a`.

## What was fixed

- Menu button is NOT a floating top-right button.
- Home menu button is in the TOP-LEFT.
- Drawer opens from the LEFT.
- Drawer navigation uses the correct root/Tab navigation structure.
- Budget -> Settings uses the nested Settings tab correctly.
- No `Alert.prompt`.
- Expense amount validation is included.
- Date format validation is included.
- AsyncStorage reads have fallbacks.
- New source uses UTF-8 text rather than the previously corrupted `â‚¹`/`Ã—` strings.
- Files are separated by component/context/storage/utils/screen.

## Honest scope

No source package can be guaranteed bug-free without running it in the user's exact project/emulator. This package is structured to remove the known code/navigation issues, but integration must still be tested screen-by-screen.

Some advanced integrations shown in the reference (real PDF/Excel export, real biometric authentication, scheduled notifications, receipt picker) require the existing Expo packages and native APIs to be wired to their final actions. The UI is kept separate from those services so they can be connected without changing the reference layout.
