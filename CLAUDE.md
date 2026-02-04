# Bajetto

Personal finance management mobile app for budgeting, expense tracking, and financial analytics.

## Tech Stack

- **Framework**: React Native 0.81.5 with Expo ~54.0
- **Language**: TypeScript ~5.9
- **Navigation**: React Navigation v7 (bottom tabs + native stack)
- **UI**: React Native built-in components, Ionicons for icons
- **State**: Local component state only (useState)
- **Data**: Mock data layer (no backend integration yet)

## Project Structure

```
BajettoApp/
├── App.tsx                    # Root component with NavigationContainer
├── index.ts                   # Expo entry point
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── BudgetCard.tsx     # Budget display with progress bar
│   │   ├── SummaryCard.tsx    # Stats card (compact/full variants)
│   │   ├── TransactionItem.tsx # Transaction list item
│   │   ├── SpendingChart.tsx  # Bar chart for monthly trends
│   │   ├── ExpensePieChart.tsx # Donut chart for expense breakdown
│   │   └── index.ts           # Barrel exports
│   ├── screens/               # Full-screen views
│   │   ├── HomeScreen.tsx     # Dashboard with balance overview
│   │   ├── TransactionScreen.tsx # Transaction list with filters
│   │   ├── BudgetScreen.tsx   # Budget management
│   │   ├── ExpensesScreen.tsx # Expense analytics
│   │   ├── SettingsScreen.tsx # App settings
│   │   └── index.ts           # Barrel exports
│   ├── navigation/
│   │   └── TabNavigator.tsx   # Bottom tab navigator setup
│   ├── theme/
│   │   └── colors.ts          # Color palette and shadows
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   └── data/
│       └── placeholder.ts     # Mock data and category mappings
├── assets/                    # App icons, splash screens
├── app.json                   # Expo configuration
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript config
```

## Key Files

| Purpose | Location |
|---------|----------|
| App entry & theme setup | `BajettoApp/App.tsx:8-35` |
| Navigation config | `BajettoApp/src/navigation/TabNavigator.tsx:46-74` |
| Type definitions | `BajettoApp/src/types/index.ts:1-57` |
| Color system | `BajettoApp/src/theme/colors.ts:1-43` |
| Category icons/names | `BajettoApp/src/data/placeholder.ts:268-294` |

## Commands

```bash
# Start development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Categories

The app supports 11 expense/income categories defined in `src/types/index.ts:3-14`:
- Expense: food, transport, shopping, entertainment, bills, health, education, other
- Income: salary, freelance, investment

Category icons and display names are mapped in `src/data/placeholder.ts:268-294`.

## Current State

This is a **prototype/demo app** with:
- Complete UI implementation
- Mock data only (no persistence)
- No authentication
- No backend API integration

## Additional Documentation

When working on specific areas, check these files:

| Topic | File |
|-------|------|
| Architecture & Design Patterns | `.claude/docs/architectural_patterns.md` |
