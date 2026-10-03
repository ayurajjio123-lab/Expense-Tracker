import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';
import { todayKey } from '../utils/date';

export default function AddExpenseScreen({ navigation, route }) {
  const { settings, categories, addExpense, updateExpense } = useApp();
  const theme = getTheme(settings.theme, useColorScheme() === 'dark');
  const existing = route?.params?.expense;
  const [amount, setAmount] = useState(existing ? String(existing.amount) : '');
  const [category, setCategory] = useState(existing?.category || categories[0]?.name || 'Food');
  const [description, setDescription] = useState(existing?.description || '');
  const [payment, setPayment] = useState(existing?.payment || 'UPI');
  const [date, setDate] = useState(existing?.date || todayKey());

  useEffect(() => {
    if (!existing) return;
    setAmount(String(existing.amount ?? ''));
    setCategory(existing.category || 'Food');
    setDescription(existing.description || '');
    setPayment(existing.payment || 'UPI');
    setDate(existing.date || todayKey());
  }, [existing]);

  const submit = () => {
    const numeric = Number(amount);
    if (!Number.isFinite(numeric) || numeric <= 0) return Alert.alert('Invalid amount', 'Enter an amount greater than zero.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return Alert.alert('Invalid date', 'Use YYYY-MM-DD.');
    const payload = { ...(existing || {}), amount: numeric, category, description: description.trim(), payment, date };
    const ok = existing ? updateExpense(payload) : addExpense(payload);
    if (ok) navigation.goBack();
  };

  return (
    <Screen theme={theme}>
      <Header title={existing ? 'Edit Expense' : 'Add Expense'} theme={theme} onBack={() => navigation.goBack()} />
      <Text style={[styles.label, { color: theme.text }]}>Amount</Text>
      <TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="₹ 250"
        placeholderTextColor={theme.muted} style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.card }]} />

      <Text style={[styles.label, { color: theme.text }]}>Category</Text>
      <View style={styles.chips}>
        {categories.map(c => <Pressable key={c.id} onPress={() => setCategory(c.name)}
          style={[styles.chip, { backgroundColor: category === c.name ? theme.primary : theme.card, borderColor: theme.border }]}>
          <Text style={{ color: category === c.name ? '#FFFFFF' : theme.text }}>{c.icon} {c.name}</Text>
        </Pressable>)}
      </View>

      <Text style={[styles.label, { color: theme.text }]}>Description</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Lunch at college"
        placeholderTextColor={theme.muted} style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.card }]} />

      <Text style={[styles.label, { color: theme.text }]}>Payment Method</Text>
      <View style={styles.chips}>
        {['UPI', 'Cash', 'Card', 'Bank'].map(p => <Pressable key={p} onPress={() => setPayment(p)}
          style={[styles.chip, { backgroundColor: payment === p ? theme.primary : theme.card, borderColor: theme.border }]}>
          <Text style={{ color: payment === p ? '#FFFFFF' : theme.text }}>{p}</Text>
        </Pressable>)}
      </View>

      <Text style={[styles.label, { color: theme.text }]}>Date</Text>
      <TextInput value={date} onChangeText={setDate} placeholder="2026-10-03"
        placeholderTextColor={theme.muted} style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.card }]} />

      <Pressable onPress={submit} style={[styles.button, { backgroundColor: theme.primary }]}>
        <Text style={styles.buttonText}>{existing ? 'Save Changes' : 'Add Expense'}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 12, fontWeight: '800', marginTop: 12, marginBottom: 6 },
  input: { minHeight: 50, borderWidth: 1, borderRadius: 10, paddingHorizontal: 13, fontSize: 15 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: { borderWidth: 1, paddingVertical: 9, paddingHorizontal: 10, borderRadius: 9 },
  button: { marginTop: 22, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '900' },
});
