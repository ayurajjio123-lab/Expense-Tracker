import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  expenses: 'daily_expense_tracker_expenses_v4',
  settings: 'daily_expense_tracker_settings_v4',
  categories: 'daily_expense_tracker_categories_v4',
  recurring: 'daily_expense_tracker_recurring_v4',
};

async function read(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

async function write(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const loadExpenses = () => read(KEYS.expenses, []);
export const saveExpenses = value => write(KEYS.expenses, value);
export const loadSettings = () => read(KEYS.settings, {});
export const saveSettings = value => write(KEYS.settings, value);
export const loadCategories = () => read(KEYS.categories, []);
export const saveCategories = value => write(KEYS.categories, value);
export const loadRecurring = () => read(KEYS.recurring, []);
export const saveRecurring = value => write(KEYS.recurring, value);

export async function clearAll() {
  await AsyncStorage.multiRemove(Object.values(KEYS));
}
