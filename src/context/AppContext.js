import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  loadExpenses, saveExpenses, loadSettings, saveSettings,
  loadCategories, saveCategories, loadRecurring, saveRecurring
} from '../storage/storage';

const Context = createContext(null);

const DEFAULT_SETTINGS = {
  theme: 'light',
  hideAmounts: false,
  budget: 15000,
  appLock: false,
  biometric: false,
  dailyReminder: false,
  reminderTime: '19:00',
};

const DEFAULT_CATEGORIES = [
  { id: 'food', name: 'Food', icon: '🍴' },
  { id: 'travel', name: 'Travel', icon: '🚗' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'bills', name: 'Bills', icon: '🏠' },
  { id: 'health', name: 'Health', icon: '❤' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎮' },
  { id: 'other', name: 'Other', icon: '•••' },
];

export function AppProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [settings, setSettingsState] = useState(DEFAULT_SETTINGS);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [recurring, setRecurring] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [e, s, c, r] = await Promise.all([
          loadExpenses(), loadSettings(), loadCategories(), loadRecurring()
        ]);
        if (!active) return;
        setExpenses(Array.isArray(e) ? e : []);
        setSettingsState({ ...DEFAULT_SETTINGS, ...(s || {}) });
        setCategories(Array.isArray(c) && c.length ? c : DEFAULT_CATEGORIES);
        setRecurring(Array.isArray(r) ? r : []);
      } finally {
        if (active) setReady(true);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => { if (ready) saveExpenses(expenses).catch(() => {}); }, [expenses, ready]);
  useEffect(() => { if (ready) saveSettings(settings).catch(() => {}); }, [settings, ready]);
  useEffect(() => { if (ready) saveCategories(categories).catch(() => {}); }, [categories, ready]);
  useEffect(() => { if (ready) saveRecurring(recurring).catch(() => {}); }, [recurring, ready]);

  const setSettings = updater =>
    setSettingsState(current => typeof updater === 'function' ? updater(current) : updater);

  const addExpense = expense => {
    const amount = Number(expense.amount);
    if (!Number.isFinite(amount) || amount <= 0) return false;
    setExpenses(current => [
      { ...expense, amount, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
      ...current,
    ]);
    return true;
  };

  const updateExpense = expense => {
    const amount = Number(expense.amount);
    if (!Number.isFinite(amount) || amount <= 0) return false;
    setExpenses(current => current.map(item =>
      item.id === expense.id ? { ...expense, amount } : item
    ));
    return true;
  };

  const deleteExpense = id => setExpenses(current => current.filter(item => item.id !== id));

  const importExpenses = rows => {
    if (!Array.isArray(rows)) return;
    setExpenses(current => [
      ...rows,
      ...current.filter(old => !rows.some(next => next.id === old.id)),
    ]);
  };

  const addCategory = item =>
    setCategories(current => [...current, { ...item, id: `${Date.now()}` }]);

  const deleteCategory = id =>
    setCategories(current => current.filter(item => item.id !== id));

  const addRecurring = item =>
    setRecurring(current => [...current, { ...item, id: `${Date.now()}-${Math.random()}` }]);

  const deleteRecurring = id =>
    setRecurring(current => current.filter(item => item.id !== id));

  const value = useMemo(() => ({
    expenses, settings, categories, recurring, ready,
    setSettings, addExpense, updateExpense, deleteExpense, importExpenses,
    addCategory, deleteCategory, addRecurring, deleteRecurring,
  }), [expenses, settings, categories, recurring, ready]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useApp() {
  const value = useContext(Context);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}
