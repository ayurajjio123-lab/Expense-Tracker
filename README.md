# 💰 Daily Expense Tracker

A mobile-first personal expense tracking application built with **React Native and Expo**. Daily Expense Tracker helps users record, organize, search, and analyze their daily expenses through a clean and user-friendly Android interface.

The application is designed with a local-first approach, allowing core expense information to be stored locally on the device.

---

## 📱 Download Android APK

You can download and install the Android version of the application directly from this repository.

### ⬇️ Download APK

[**📲 Download Daily Expense Tracker APK**](./Daily-Expense-Tracker.apk)

> **Note:** The APK is intended for Android devices. Download the APK on your Android device and install it to try the application.

---

## ✨ Features

### 🏠 Dashboard

The dashboard provides a quick overview of the user's expenses and important spending information.

It includes:

- Today's expenses
- Monthly spending
- Expense summaries
- Recent expenses
- Quick Add Expense
- Navigation menu

---

### ➕ Add Expense

Users can add new expenses by entering important details such as:

- Amount
- Category
- Date
- Description

Example:

```text
Amount: ₹250
Category: Food
Date: 03 October 2026
Description: Lunch
...


# PROJECT STRUCTURE


Daily-Expense-Tracker/
│
├── App.js
├── package.json
├── eas.json
├── README.md
├── Daily-Expense-Tracker.apk
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.js
│   │   ├── Screen.js
│   │   ├── Card.js
│   │   └── ExpenseRow.js
│   │
│   ├── context/
│   │   └── AppContext.js
│   │
│   ├── storage/
│   │   └── storage.js
│   │
│   ├── utils/
│   │   ├── date.js
│   │   └── theme.js
│   │
│   └── screens/
│       ├── HomeScreen.js
│       ├── AddExpenseScreen.js
│       ├── BudgetScreen.js
│       ├── AnalyticsScreen.js
│       ├── CalendarScreen.js
│       ├── CategoriesScreen.js
│       ├── RecurringScreen.js
│       ├── DataManagementScreen.js
│       ├── SearchScreen.js
│       ├── SettingsScreen.js
│       ├── MenuDrawer.js
│       └── LockScreen.js
│
└── android/
    └──

