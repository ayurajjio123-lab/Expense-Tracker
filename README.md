# 💰 Daily Expense Tracker

A mobile-first expense tracking application built with **React Native and Expo**.  
Daily Expense Tracker helps users record, manage, search, and analyze their expenses through a clean and simple Android interface.

---

## 📱 Project Overview

Daily Expense Tracker is designed to make personal expense management simple and organized.

Users can:

- Add daily expenses
- Edit existing expenses
- Delete expenses
- Search expenses
- Organize expenses by category
- View expenses by date
- Track monthly budgets
- Analyze spending
- Manage recurring expenses
- Switch between light and dark themes
- Access different sections through a navigation drawer
- Store core expense data locally

The project is built with a **local-first approach**, so the main expense data does not require a custom backend server.

---

# ✨ Features

## 🏠 Dashboard

The dashboard provides a quick overview of spending.

Features include:

- Today's spending
- Monthly spending
- Expense summary
- Recent expenses
- Quick Add Expense
- Navigation menu

---

## ➕ Add Expense

Users can create a new expense by entering:

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








Project Structure


ExpenseTracker/
│
├── App.js
├── package.json
├── eas.json
├── README.md
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


