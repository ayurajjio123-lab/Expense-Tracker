import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import ExpenseRow from '../components/ExpenseRow';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';
import { money, todayKey } from '../utils/date';
import MenuDrawer from './MenuDrawer';

export default function HomeScreen({ navigation }) {
  const { expenses, settings, deleteExpense } = useApp();
  const theme = getTheme(settings.theme, useColorScheme() === 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const today = todayKey();
  const todayRows = expenses.filter(e => e.date === today);
  const month = today.slice(0, 7);
  const year = today.slice(0, 4);
  const todayTotal = todayRows.reduce((s, e) => s + Number(e.amount || 0), 0);
  const monthTotal = expenses.filter(e => String(e.date).startsWith(month)).reduce((s, e) => s + Number(e.amount || 0), 0);
  const yearTotal = expenses.filter(e => String(e.date).startsWith(year)).reduce((s, e) => s + Number(e.amount || 0), 0);
  const show = value => settings.hideAmounts ? '••••' : money(value);

  const remove = id => Alert.alert('Delete expense?', 'This expense will be removed from this device.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: () => deleteExpense(id) },
  ]);

  return (
    <>
      <Screen theme={theme}>
        <Header
          title="Daily Expense Tracker"
          subtitle={new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          theme={theme}
          onMenu={() => setMenuOpen(true)}
          notification
        />

        <View style={styles.grid}>
          <View style={styles.half}><Card theme={theme} title="Today" value={show(todayTotal)} blue /></View>
          <View style={styles.half}><Card theme={theme} title="This Month" value={show(monthTotal)} blue /></View>
          <View style={styles.half}><Card theme={theme} title="This Year" value={show(yearTotal)} blue /></View>
          <View style={styles.half}><Card theme={theme} title="Total Entries" value={todayRows.length} blue /></View>
        </View>

        <Pressable onPress={() => navigation.navigate('Add')} style={[styles.add, { backgroundColor: theme.primary }]}>
          <Text style={styles.addText}>＋ Add Expense</Text>
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Today's Expenses</Text>
          <Pressable onPress={() => navigation.navigate('Search')}>
            <Text style={[styles.viewAll, { color: theme.primary }]}>View All</Text>
          </Pressable>
        </View>

        <View style={[styles.list, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {todayRows.length ? todayRows.slice(0, 10).map(item => (
            <ExpenseRow
              key={item.id}
              item={item}
              theme={theme}
              hideAmount={settings.hideAmounts}
              onEdit={expense => navigation.navigate('Add', { expense })}
              onDelete={remove}
            />
          )) : <Text style={{ color: theme.muted, padding: 14 }}>No expenses added today.</Text>}
        </View>
      </Screen>

      <MenuDrawer visible={menuOpen} onClose={() => setMenuOpen(false)} navigation={navigation} theme={theme} />
    </>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  half: { width: '50%', paddingHorizontal: 3 },
  add: { height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 2, marginBottom: 18 },
  addText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '900' },
  viewAll: { fontSize: 12, fontWeight: '800' },
  list: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 10 },
});
