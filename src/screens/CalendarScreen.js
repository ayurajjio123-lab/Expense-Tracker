import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import ExpenseRow from '../components/ExpenseRow';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';
import { money, todayKey } from '../utils/date';

export default function CalendarScreen({ navigation }) {
  const { expenses, settings } = useApp();
  const theme = getTheme(settings.theme, useColorScheme() === 'dark');
  const [selected, setSelected] = useState(todayKey());
  const days = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    const count = new Date(y, m + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => {
      const d = new Date(y, m, i + 1);
      return `${y}-${String(m + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
    });
  }, []);
  const rows = expenses.filter(e => e.date === selected);
  const total = rows.reduce((s, e) => s + Number(e.amount || 0), 0);

  return (
    <Screen theme={theme}>
      <Header title="Calendar" theme={theme} onBack={() => {}} />
      <Text style={[styles.month, { color: theme.text }]}>
        {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
      </Text>
      <View style={styles.week}>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(x => <Text key={x} style={{ color: theme.muted, fontSize: 9, width: '14.28%', textAlign: 'center' }}>{x}</Text>)}</View>
      <View style={styles.grid}>
        {days.map(date => {
          const active = date === selected;
          const has = expenses.some(e => e.date === date);
          const n = Number(date.slice(-2));
          return <Pressable key={date} onPress={() => setSelected(date)} style={[styles.day, { backgroundColor: active ? theme.primary : theme.card, borderColor: theme.border }]}>
            <Text style={{ color: active ? '#FFFFFF' : theme.text, fontWeight: '800' }}>{n}</Text>
            {has && <View style={[styles.dot, { backgroundColor: active ? '#FFFFFF' : theme.success }]} />}
          </Pressable>;
        })}
      </View>
      <View style={[styles.selected, { backgroundColor: theme.primarySoft }]}>
        <Text style={[styles.selectedDate, { color: theme.primary }]}>{selected}</Text>
        <Text style={{ color: theme.text, fontWeight: '900' }}>Total: {money(total)}</Text>
      </View>
      {rows.map(item => <ExpenseRow key={item.id} item={item} theme={theme} hideAmount={settings.hideAmounts} />)}
    </Screen>
  );
}

const styles = StyleSheet.create({
  month: { fontSize: 20, fontWeight: '900', textAlign: 'center', marginVertical: 8 },
  week: { flexDirection: 'row', marginBottom: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  day: { width: '13.7%', height: 44, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 5, height: 5, borderRadius: 3, marginTop: 3 },
  selected: { marginTop: 14, padding: 10, borderRadius: 9, flexDirection: 'row', justifyContent: 'space-between' },
  selectedDate: { fontWeight: '900' },
});
