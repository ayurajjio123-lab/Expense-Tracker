# Daily Expense Tracker Mobile App

Expo React Native starter with separate modules for:
- Home dashboard
- Calendar/date search
- Add/edit/delete expenses
- Daily/monthly/yearly/custom-range totals
- Analytics
- Monthly budget
- CSV export/import
- Local-first storage
- Privacy settings and amount hiding
- Dark/light theme

## Run
1. Install Node.js LTS.
2. In this folder run `npm install`.
3. Run `npx expo start`.
4. Scan the QR code with Expo Go, or use an Android emulator.

Data is stored locally with AsyncStorage in this starter. PIN/biometric UI is included as settings groundwork; production biometric authentication should be wired to a platform secure-auth package before release.
