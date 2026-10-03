import React from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';

function ThemeBox({ value, current, label, onPress, theme }) {
  return <Pressable onPress={onPress} style={[styles.themeBox, { backgroundColor: current === value ? theme.primarySoft : theme.card, borderColor: current === value ? theme.primary : theme.border }]}>
    <Text style={{ fontSize: 20 }}>{label === 'Light' ? '☀' : label === 'Dark' ? '◐' : '⚙'}</Text>
    <Text style={{ color: theme.text, fontSize: 11, fontWeight: '800', marginTop: 5 }}>{label}</Text>
  </Pressable>;
}

export default function SettingsScreen() {
  const { settings, setSettings } = useApp();
  const theme = getTheme(settings.theme, useColorScheme() === 'dark');
  const update = patch => setSettings(current => ({ ...current, ...patch }));

  return (
    <Screen theme={theme}>
      <Header title="Settings" theme={theme} onBack={() => {}} />

      <Text style={[styles.section, { color: theme.primary }]}>Appearance</Text>
      <Text style={[styles.label, { color: theme.text }]}>Theme</Text>
      <View style={styles.themeRow}>
        <ThemeBox value="light" current={settings.theme} label="Light" onPress={() => update({ theme: 'light' })} theme={theme} />
        <ThemeBox value="dark" current={settings.theme} label="Dark" onPress={() => update({ theme: 'dark' })} theme={theme} />
        <ThemeBox value="system" current={settings.theme} label="System" onPress={() => update({ theme: 'system' })} theme={theme} />
      </View>

      <View style={styles.switchRow}>
        <Text style={[styles.label, { color: theme.text }]}>Hide Amounts</Text>
        <Switch value={settings.hideAmounts} onValueChange={value => update({ hideAmounts: value })} />
      </View>

      <Text style={[styles.section, { color: theme.primary }]}>Budget</Text>
      <View style={styles.budgetRow}>
        <Text style={[styles.label, { color: theme.text }]}>Monthly Budget</Text>
        <TextInput value={String(settings.budget)} keyboardType="decimal-pad"
          onChangeText={value => update({ budget: Number(value.replace(/[^0-9.]/g, '')) || 0 })}
          style={[styles.budgetInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.card }]} />
      </View>

      <Text style={[styles.section, { color: theme.primary }]}>Security</Text>
      <View style={styles.switchRow}><Text style={[styles.label, { color: theme.text }]}>App Lock</Text><Switch value={settings.appLock} onValueChange={value => update({ appLock: value })} /></View>
      <View style={styles.switchRow}><Text style={[styles.label, { color: theme.text }]}>Biometric Authentication</Text><Switch value={settings.biometric} onValueChange={value => update({ biometric: value })} /></View>

      <Text style={[styles.section, { color: theme.primary }]}>Notifications</Text>
      <View style={styles.switchRow}><Text style={[styles.label, { color: theme.text }]}>Daily Reminder</Text><Switch value={settings.dailyReminder} onValueChange={value => update({ dailyReminder: value })} /></View>
      <View style={styles.switchRow}><Text style={[styles.label, { color: theme.text }]}>Reminder Time</Text><Text style={{ color: theme.muted }}>{settings.reminderTime}</Text></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { fontSize: 13, fontWeight: '900', marginTop: 15, marginBottom: 7 },
  label: { fontSize: 13, fontWeight: '700' },
  themeRow: { flexDirection: 'row', gap: 8 },
  themeBox: { flex: 1, minHeight: 70, borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  switchRow: { minHeight: 52, borderBottomWidth: 1, borderBottomColor: '#DCE4EC', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  budgetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  budgetInput: { width: 125, height: 42, borderWidth: 1, borderRadius: 9, paddingHorizontal: 10, textAlign: 'right' },
});
