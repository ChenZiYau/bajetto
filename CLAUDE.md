# Bajetto

Personal finance management mobile app for budgeting, expense tracking, and financial analytics.

## Tech Stack

- **Framework**: React Native 0.81.5 with Expo ~54.0
- **Language**: TypeScript ~5.9
- **Navigation**: React Navigation v7 (bottom tabs + native stack)
- **UI**: React Native built-in components, Ionicons for icons
- **State**: React Context API (ThemeContext, AppContext)
- **Persistence**: AsyncStorage for settings and theme
- **Data**: Mock data layer (no backend integration yet)

## Project Structure

```
BajettoApp/
├── App.tsx                    # Root component with providers
├── index.ts                   # Expo entry point
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── BudgetCard.tsx     # Budget display with progress
│   │   ├── SummaryCard.tsx    # Stats card (compact/full)
│   │   ├── TransactionItem.tsx # Transaction list item
│   │   ├── SpendingChart.tsx  # Bar chart for trends
│   │   ├── ExpensePieChart.tsx # Donut chart breakdown
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   ├── ErrorView.tsx      # Error display with retry
│   │   ├── EmptyState.tsx     # Empty data placeholder
│   │   └── index.ts           # Barrel exports
│   ├── screens/               # Full-screen views
│   │   ├── HomeScreen.tsx     # Dashboard with balance
│   │   ├── TransactionScreen.tsx # Transaction list
│   │   ├── BudgetScreen.tsx   # Budget management
│   │   ├── ExpensesScreen.tsx # Expense analytics
│   │   ├── SettingsScreen.tsx # App settings + theme toggle
│   │   └── index.ts           # Barrel exports
│   ├── navigation/
│   │   └── TabNavigator.tsx   # Bottom tab navigator
│   ├── contexts/              # React Context providers
│   │   ├── ThemeContext.tsx   # Theme state + persistence
│   │   ├── AppContext.tsx     # App settings + state
│   │   └── index.ts           # Barrel exports
│   ├── theme/
│   │   └── colors.ts          # Light/dark theme definitions
│   ├── config/
│   │   └── index.ts           # App config, defaults, keyboard shortcuts
│   ├── utils/
│   │   ├── validation.ts      # Form validation utilities
│   │   ├── formatting.ts      # Currency, date, text formatters
│   │   ├── accessibility.ts   # A11y helpers, keyboard shortcuts
│   │   └── index.ts           # Barrel exports
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   └── data/
│       └── placeholder.ts     # Mock data + category mappings
├── assets/                    # App icons, splash screens
├── app.json                   # Expo configuration
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript config
```

## Key Files

| Purpose | Location |
|---------|----------|
| App entry + providers | `BajettoApp/App.tsx:82-92` |
| Theme context | `BajettoApp/src/contexts/ThemeContext.tsx` |
| App config + defaults | `BajettoApp/src/config/index.ts` |
| Color themes | `BajettoApp/src/theme/colors.ts` |
| Type definitions | `BajettoApp/src/types/index.ts` |
| Validation utilities | `BajettoApp/src/utils/validation.ts` |

## Commands

```bash
# Start development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Theme System

The app supports light/dark mode with system preference detection:
- **ThemeProvider** wraps the app (`App.tsx:86-88`)
- **useColors()** hook for accessing current theme colors
- **useTheme()** hook for theme mode and toggle functions
- Theme persists via AsyncStorage (`@bajetto/theme`)
- Semantic color tokens: `background`, `surface`, `textPrimary`, etc.

## Configuration

All defaults centralized in `src/config/index.ts`:
- `DEFAULT_SETTINGS` - Initial app settings
- `STORAGE_KEYS` - AsyncStorage key constants
- `VALIDATION` - Form validation rules
- `KEYBOARD_SHORTCUTS` - Web keyboard shortcuts (Alt+H, Alt+T, etc.)

## Accessibility

- All interactive elements have accessibility props
- Use `buttonA11yProps()`, `switchA11yProps()` from `src/utils/accessibility.ts`
- Keyboard shortcuts for web (defined in `KEYBOARD_SHORTCUTS`)

## Additional Documentation

| Topic | File |
|-------|------|
| Architecture & Design Patterns | `.claude/docs/architectural_patterns.md` |
