import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import ExpenseRow from '../components/ExpenseRow';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';

export default function SearchScreen({ navigation }) {
  const { expenses, settings } = useApp();
  const theme = getTheme(settings.theme, useColorScheme() === 'dark');
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return expenses.slice(0, 50);
    return expenses.filter(e =>
      [e.description, e.category, e.payment, e.date, e.amount]
        .some(value => String(value ?? '').toLowerCase().includes(q))
    );
  }, [expenses, query]);

  return (
    <Screen theme={theme}>
      <Header title="Search Expenses" theme={theme} onBack={() => navigation.goBack()} />
      <TextInput value={query} onChangeText={setQuery} placeholder="Search by description, category..."
        placeholderTextColor={theme.muted} style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.card }]} />
      {results.map(item => <ExpenseRow key={item.id} item={item} theme={theme} hideAmount={settings.hideAmounts} />)}
      {!results.length && <Text style={{ color: theme.muted }}>No matching expenses.</Text>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: { height: 46, borderWidth: 1, borderRadius: 10, paddingHorizontal: 13, marginBottom: 10 },
});
