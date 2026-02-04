# Architectural Patterns

## Component Architecture

### Screen Components
Full-screen views that handle their own state and layout. Each screen:
- Is a React functional component (`React.FC`)
- Uses `SafeAreaView` with `edges={['top']}` for safe area handling
- Contains its own `StyleSheet.create()` at the bottom of the file
- Imports mock data directly from `src/data/placeholder.ts`

Example: `BajettoApp/src/screens/HomeScreen.tsx:20-131`

### Reusable Components
Smaller UI components used across multiple screens:
- Accept props via TypeScript interfaces defined inline
- Export named exports (not default)
- Use barrel exports via `index.ts` files

Example: `BajettoApp/src/components/SummaryCard.tsx:6-17` (props interface)

## Navigation Pattern

**Bottom Tab Navigation** with 5 main screens:
- Home, Transactions, Budget, Expenses, Settings
- Configured in `BajettoApp/src/navigation/TabNavigator.tsx:46-74`

Icon pattern: Uses Ionicons with outline/filled variants based on focus state
- `TabNavigator.tsx:22-44` - Icon mapping function

## Theming Pattern

### Centralized Color System
All colors defined in `BajettoApp/src/theme/colors.ts`:
- Primary palette (lines 2-5)
- Background colors (lines 7-10)
- Text colors (lines 12-15)
- Semantic colors: success, warning, danger, info (lines 17-24)
- Category-specific colors (lines 26-34)
- Transaction colors: income (green), expense (red) (lines 40-42)

### Dark Theme
App uses a dark theme configured in `App.tsx:12-21`:
```
background: '#0F0F1A'
card: '#1A1A2E'
text: '#FFFFFF'
```

### Color with Alpha
Transparency is applied by appending hex alpha: `color + '20'` (12.5% opacity)

Example: `BajettoApp/src/screens/HomeScreen.tsx:72` - `colors.success + '20'`

## Styling Pattern

### Inline StyleSheets
Each component defines styles at the bottom using `StyleSheet.create()`:
```typescript
const styles = StyleSheet.create({
  container: { ... },
  // ...
});
```

### Card Pattern
Cards use consistent styling:
- `backgroundColor: colors.cardBackground`
- `borderRadius: 12-24` (smaller for list items, larger for main cards)
- `padding: 14-24`

Example: `BajettoApp/src/components/TransactionItem.tsx:61-69`

### Platform-Specific Adjustments
Use `Platform.OS` for iOS/Android differences:

Example: `BajettoApp/src/navigation/TabNavigator.tsx:84-86`
```typescript
height: Platform.OS === 'ios' ? 88 : 70
paddingBottom: Platform.OS === 'ios' ? 28 : 10
```

## Type System

### Core Interfaces
Defined in `BajettoApp/src/types/index.ts`:
- `Transaction` (lines 16-24)
- `Budget` (lines 26-33)
- `ExpenseSummary` (lines 35-41)
- `DashboardSummary` (lines 43-48)
- `SettingsOption` (lines 50-57)

### Category Type
Union type for all categories: `BajettoApp/src/types/index.ts:3-14`

### Component Props
Props interfaces defined inline in component files:
```typescript
interface ComponentNameProps {
  // props
}
export const ComponentName: React.FC<ComponentNameProps> = ({ ... }) => { ... }
```

## Data Layer Pattern

### Mock Data
All mock data in `BajettoApp/src/data/placeholder.ts`:
- `dashboardSummary` (lines 4-9)
- `recentTransactions` (lines 11-109)
- `budgets` (lines 111-160)
- `expenseSummary` (lines 162-205)
- `settingsOptions` (lines 207-266)

### Category Mappings
Lookup objects for category metadata:
- `categoryIcons`: Category to Ionicon name (`placeholder.ts:268-280`)
- `categoryNames`: Category to display name (`placeholder.ts:282-294`)

Usage: `BajettoApp/src/components/TransactionItem.tsx:18`

## Icon Pattern

Uses `@expo/vector-icons` Ionicons throughout:
- Import: `import { Ionicons } from '@expo/vector-icons'`
- Usage: `<Ionicons name="icon-name" size={24} color={colors.primary} />`
- Type casting for dynamic icons: `name={iconName as any}`

## Formatting Utilities

### Amount Formatting
Inline helper functions in components:
- Currency formatting with K/M suffixes: `SummaryCard.tsx:28-35`
- Sign prefix for transactions: `TransactionItem.tsx:21-23`

### Date Formatting
Relative date display (Today/Yesterday/Date): `TransactionItem.tsx:25-38`

## State Management

**Local State Only** - Uses React's `useState` hook:
- Filter states (search query, selected filters)
- UI states (active tabs, expanded sections)

No global state management library - data flows top-down from mock imports.
