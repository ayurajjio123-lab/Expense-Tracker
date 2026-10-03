import React from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';
import { money } from '../utils/date';

export default function RecurringScreen({ navigation }) {
  const { recurring, deleteRecurring } = useApp();
  const theme = getTheme(useApp().settings.theme, useColorScheme() === 'dark');

  return (
    <Screen theme={theme}>
      <Header title="Recurring Expenses" theme={theme} onBack={() => navigation.goBack()} />
      {recurring.length ? recurring.map(item => <View key={item.id} style={[styles.row, { borderColor: theme.border, backgroundColor: theme.card }]}>
        <View style={[styles.icon, { backgroundColor: theme.primarySoft }]}><Text>↻</Text></View>
        <View style={styles.main}><Text style={[styles.name, { color: theme.text }]}>{item.name}</Text><Text style={{ color: theme.muted }}>{money(item.amount)} · {item.frequency}</Text></View>
        <Pressable onPress={() => deleteRecurring(item.id)}><Text style={{ color: theme.primary }}>Delete</Text></Pressable>
      </View>) : <Text style={{ color: theme.muted }}>No recurring expenses yet.</Text>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 60, borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 8, flexDirection: 'row', alignItems: 'center' },
  icon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  main: { flex: 1, marginLeft: 10 },
  name: { fontWeight: '900' },
});
