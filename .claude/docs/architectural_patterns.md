# Architectural Patterns

## State Management

### Context Providers
The app uses React Context for global state:

**ThemeContext** (`src/contexts/ThemeContext.tsx`):
- Manages light/dark theme with system preference detection
- Persists theme choice to AsyncStorage
- Provides `useTheme()` and `useColors()` hooks

**AppContext** (`src/contexts/AppContext.tsx`):
- Manages app settings and initialization state
- Provides `useApp()` and `useSettings()` hooks
- Handles loading and error states

### Provider Hierarchy
```
App.tsx:82-92
└── SafeAreaProvider
    └── AppProvider
        └── ThemeProvider
            └── AppContent
```

## Theme System

### Semantic Color Tokens
Colors are organized by purpose, not visual value:
- `background` - Main app background
- `surface` - Card/elevated backgrounds
- `textPrimary`, `textSecondary`, `textMuted` - Text hierarchy
- `success`, `warning`, `danger`, `info` - Semantic states

### Theme Definition
Both themes (`lightTheme`, `darkTheme`) defined in `src/theme/colors.ts:71-196`

### Using Theme in Components
```typescript
import { useColors } from '../contexts/ThemeContext';

const MyComponent = () => {
  const colors = useColors();
  return <View style={{ backgroundColor: colors.surface }} />;
};
```

## Configuration Pattern

### Centralized Config (`src/config/index.ts`)
All app constants in one place:
- `APP_CONFIG` - App metadata (lines 8-12)
- `DEFAULT_SETTINGS` - Initial settings (lines 17-36)
- `STORAGE_KEYS` - AsyncStorage keys (lines 43-49)
- `VALIDATION` - Form validation rules (lines 60-79)
- `KEYBOARD_SHORTCUTS` - Web shortcuts (lines 86-101)
- `FEATURES` - Feature flags (lines 109-115)

### Usage
```typescript
import { DEFAULT_SETTINGS, VALIDATION } from '../config';
```

## Component Architecture

### Screen Components
Full-screen views in `src/screens/`:
- Use `SafeAreaView` with `edges={['top']}`
- Access theme via `useColors()` hook
- Dynamic styles computed from theme colors

### Reusable Components
UI components in `src/components/`:
- Accept props via TypeScript interfaces
- Use `useColors()` for theme-aware styling
- Include accessibility props

### Feedback Components
- `LoadingSpinner` - Loading states (full-screen or inline)
- `ErrorView` - Error display with retry
- `EmptyState` - Empty data placeholder with action

## Validation Pattern

### Validator Functions (`src/utils/validation.ts`)
Composable validators that return `{ isValid, error }`:

```typescript
// Base validators
required('Field is required')
minLength(3, 'Too short')
maxValue(1000, 'Too large')

// Compose validators
const titleValidator = compose(
  required('Title required'),
  minLength(1),
  maxLength(100)
);

// Validate form
const errors = validateForm(values, {
  title: transactionTitle,
  amount: transactionAmount,
});
```

### Pre-built Validators
- `transactionAmount`, `transactionTitle`, `transactionNote`
- `budgetAmount`, `budgetName`
- `pin`

## Formatting Utilities (`src/utils/formatting.ts`)

### Currency
```typescript
formatCurrency(1234.56) // "$1,234.56"
formatCurrency(1500, { compact: true }) // "$1.5K"
formatTransactionAmount(50, true) // "-$50.00"
```

### Dates
```typescript
formatDate('2024-01-15', 'relative') // "Today" or "Jan 15"
formatDate('2024-01-15', 'long') // "January 15, 2024"
```

## Accessibility Pattern

### Props Helpers (`src/utils/accessibility.ts`)
```typescript
import { buttonA11yProps, switchA11yProps } from '../utils/accessibility';

<TouchableOpacity {...buttonA11yProps('Add item', 'Create new item')}>
<Switch {...switchA11yProps('Dark mode', isDark)} />
```

### Keyboard Shortcuts (Web)
Defined in `KEYBOARD_SHORTCUTS` config:
- `Alt+H` - Home
- `Alt+T` - Transactions
- `Alt+D` - Toggle theme
- `Alt+/` - Show shortcuts

## Styling Pattern

### Dynamic Styles
Create StyleSheet inside component for theme-dependent styles:
```typescript
const colors = useColors();
const dynamicStyles = StyleSheet.create({
  container: { backgroundColor: colors.background },
});
```

### Static Styles
Non-theme-dependent styles at file bottom:
```typescript
const styles = StyleSheet.create({
  header: { padding: 20 },
});
```

### Card Pattern
Consistent card styling across the app:
- `backgroundColor: colors.surface`
- `borderRadius: 12-24`
- `padding: 14-24`

## Error Handling

### Error State in Context
```typescript
const { state, setError, clearError } = useApp();
if (state.error) {
  return <ErrorView message={state.error.message} onRetry={clearError} />;
}
```

### Loading States
```typescript
const { isLoading } = useTheme();
if (isLoading) {
  return <LoadingSpinner fullScreen message="Loading..." />;
}
```

## Navigation Pattern

### Bottom Tab Navigation
Configured in `src/navigation/TabNavigator.tsx`:
- 5 tabs: Home, Transactions, Budget, Expenses, Settings
- Icon pattern: outline/filled based on focus state
- Theme-aware colors via `useColors()`

### Screen Props
All screens are functional components with `React.FC` type.
