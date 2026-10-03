import React from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';
import { money, monthKey } from '../utils/date';

export default function BudgetScreen({ navigation }) {
  const { expenses, settings } = useApp();
  const theme = getTheme(settings.theme, useColorScheme() === 'dark');
  const total = expenses.filter(e => String(e.date).startsWith(monthKey())).reduce((s, e) => s + Number(e.amount || 0), 0);
  const budget = Number(settings.budget) || 0;
  const remaining = Math.max(budget - total, 0);
  const ratio = budget > 0 ? Math.min(total / budget, 1) : 0;

  return (
    <Screen theme={theme}>
      <Header title="Budget" theme={theme} onBack={() => navigation.goBack()} />
      <View style={[styles.top, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View><Text style={[styles.small, { color: theme.muted }]}>Monthly Budget</Text><Text style={[styles.big, { color: theme.text }]}>{money(budget)}</Text></View>
        <Pressable onPress={() => navigation.navigate('Tabs', { screen: 'Settings' })}><Text style={[styles.edit, { color: theme.primary }]}>Edit</Text></Pressable>
      </View>
      <View style={styles.row}>
        <View style={styles.half}><Text style={[styles.small, { color: theme.muted }]}>Spent</Text><Text style={[styles.amount, { color: theme.text }]}>{money(total)}</Text></View>
        <View style={styles.half}><Text style={[styles.small, { color: theme.muted }]}>Remaining</Text><Text style={[styles.amount, { color: theme.success }]}>{money(remaining)}</Text></View>
      </View>
      <View style={[styles.track, { backgroundColor: theme.border }]}><View style={[styles.bar, { backgroundColor: theme.success, width: `${ratio * 100}%` }]} /></View>
      <Text style={[styles.percent, { color: theme.muted }]}>{(ratio * 100).toFixed(1)}% used</Text>
      <View style={[styles.suggestion, { backgroundColor: theme.primarySoft }]}><Text style={{ fontSize: 20 }}>💡</Text><View><Text style={[styles.bold, { color: theme.text }]}>Daily Suggestion</Text><Text style={{ color: theme.muted }}>{money(remaining / Math.max(new Date().getDate(), 1))} per day to stay on track</Text></View></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { padding: 15, borderRadius: 12, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between' },
  small: { fontSize: 11 },
  big: { fontSize: 22, fontWeight: '900', marginTop: 4 },
  edit: { padding: 8, fontWeight: '800' },
  row: { flexDirection: 'row', marginTop: 14, gap: 10 },
  half: { flex: 1, padding: 13, borderRadius: 12, backgroundColor: 'rgba(127,150,180,0.08)' },
  amount: { fontSize: 18, fontWeight: '900', marginTop: 5 },
  track: { height: 10, borderRadius: 5, overflow: 'hidden', marginTop: 18 },
  bar: { height: '100%', borderRadius: 5 },
  percent: { fontSize: 11, marginTop: 5 },
  suggestion: { marginTop: 18, padding: 14, borderRadius: 12, flexDirection: 'row', gap: 10 },
  bold: { fontWeight: '900' },
});
