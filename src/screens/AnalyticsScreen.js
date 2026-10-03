import React, { useMemo } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';
import { money, monthKey } from '../utils/date';

export default function AnalyticsScreen({ navigation }) {
  const { expenses, settings } = useApp();
  const theme = getTheme(settings.theme, useColorScheme() === 'dark');
  const current = expenses.filter(e => String(e.date).startsWith(monthKey()));
  const total = current.reduce((s, e) => s + Number(e.amount || 0), 0);
  const days = new Set(current.map(e => e.date)).size || 1;
  const average = total / days;
  const byCategory = useMemo(() => {
    const map = {};
    current.forEach(e => { map[e.category || 'Other'] = (map[e.category || 'Other'] || 0) + Number(e.amount || 0); });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [current]);
  const max = byCategory[0]?.[1] || 1;

  return (
    <Screen theme={theme}>
      <Header title="Analytics" theme={theme} onBack={() => navigation.goBack()} />
      <Text style={[styles.month, { color: theme.text }]}>October 2026⌄</Text>
      <View style={styles.grid}>
        {[
          ['Total Spent', money(total)],
          ['Average / Day', money(average)],
          ['Highest Day', money(Math.max(...current.map(e => Number(e.amount || 0)), 0))],
          ['Top Category', byCategory[0]?.[0] || '—'],
        ].map(([label, value]) => <View key={label} style={[styles.stat, { backgroundColor: theme.primarySoft }]}><Text style={{ color: theme.muted, fontSize: 10 }}>{label}</Text><Text style={[styles.statValue, { color: theme.text }]}>{value}</Text></View>)}
      </View>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Category Distribution</Text>
        {byCategory.map(([name, value]) => <View key={name} style={styles.category}>
          <View style={styles.categoryLine}><Text style={{ color: theme.text, fontWeight: '700' }}>{name}</Text><Text style={{ color: theme.muted }}>{Math.round(value / total * 100) || 0}%</Text></View>
          <View style={[styles.track, { backgroundColor: theme.border }]}><View style={[styles.bar, { backgroundColor: theme.primary, width: `${Math.max(4, value / max * 100)}%` }]} /></View>
        </View>)}
      </View>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Daily Spending</Text>
        <View style={styles.chart}>{Array.from({ length: 12 }, (_, i) => <View key={i} style={styles.column}><View style={[styles.chartBar, { backgroundColor: theme.primary, height: 15 + (i % 5) * 14 }]} /><Text style={{ color: theme.muted, fontSize: 8 }}>{i + 1}</Text></View>)}</View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  month: { alignSelf: 'center', fontSize: 12, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  stat: { width: '48%', padding: 11, borderRadius: 9 },
  statValue: { fontWeight: '900', marginTop: 4 },
  card: { borderWidth: 1, borderRadius: 12, padding: 13, marginTop: 10 },
  title: { fontSize: 13, fontWeight: '900' },
  category: { marginTop: 12 },
  categoryLine: { flexDirection: 'row', justifyContent: 'space-between' },
  track: { height: 7, borderRadius: 4, overflow: 'hidden', marginTop: 5 },
  bar: { height: '100%' },
  chart: { height: 150, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingTop: 20 },
  column: { alignItems: 'center', justifyContent: 'flex-end', height: '100%' },
  chartBar: { width: 9, borderRadius: 3 },
});
