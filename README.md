# Daily Expense Tracker

Mobile-first expense tracker built with Expo React Native.

## Project structure

- `App.js` — app entry and navigation
- `src/screens/` — Home, Calendar, Add Expense, Analytics, Budget, Export, Settings
- `src/components/` — reusable UI components
- `src/context/` — application state
- `src/storage/` — local persistence
- `src/utils/` — date helpers
- `assets/` — app icon and web favicon
- `app.json` — Expo configuration
- `codemagic.yaml` — Android APK build workflow

## Run locally

```bash
npm install
npx expo start
```

## Codemagic

Keep `codemagic.yaml` in the repository root. The workflow installs dependencies, validates Expo config, generates the Android native project with Expo prebuild, and builds a release APK.

## Current functionality

Daily expenses, multiple expenses per date, date search/calendar, daily/monthly/yearly totals, date-range calculations, analytics, budgets, categories, recurring-expense data model, local storage, CSV export, and privacy settings.

## Notes

PIN/biometric app lock and CSV import require additional native/security implementation; they are not represented as fully implemented features.
