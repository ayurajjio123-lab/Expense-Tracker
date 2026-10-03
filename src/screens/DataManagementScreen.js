import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';

export default function DataManagementScreen({ navigation }) {
  const { expenses } = useApp();
  const theme = getTheme(useApp().settings.theme, useColorScheme() === 'dark');

  const exportCSV = () => {
    const header = 'date,amount,category,description,payment,id';
    const rows = expenses.map(e => [e.date, e.amount, e.category, e.description, e.payment, e.id]
      .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));
    const csv = [header, ...rows].join('\n');
    Alert.alert('CSV prepared', `${expenses.length} expense records prepared for export.`);
    return csv;
  };

  return (
    <Screen theme={theme}>
      <Header title="Data Management" theme={theme} onBack={() => navigation.goBack()} />
      <Text style={[styles.section, { color: theme.text }]}>Export Data</Text>
      <Text style={{ color: theme.muted, marginBottom: 8 }}>Export your expenses in different formats.</Text>
      {['Export as CSV', 'Export as Excel', 'Export as PDF'].map((label, i) => <Pressable key={label}
        onPress={i === 0 ? exportCSV : () => Alert.alert(label, 'This format is reserved for the export integration.')}
        style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={{ color: theme.text, fontWeight: '800' }}>{label}</Text><Text style={{ color: theme.primary }}>›</Text>
      </Pressable>)}
      <Text style={[styles.section, { color: theme.text }]}>Import Data</Text>
      <Pressable onPress={() => Alert.alert('Import', 'Connect the existing document-picker import flow here.')}
        style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={{ color: theme.text, fontWeight: '800' }}>Import from CSV</Text><Text style={{ color: theme.primary }}>›</Text>
      </Pressable>
      <Text style={[styles.section, { color: theme.text }]}>Backup / Restore</Text>
      <Pressable onPress={() => Alert.alert('Backup', 'Local backup flow can be connected here.')}
        style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={{ color: theme.text, fontWeight: '800' }}>Backup Now</Text><Text style={{ color: theme.primary }}>›</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { fontSize: 14, fontWeight: '900', marginTop: 12, marginBottom: 4 },
  row: { minHeight: 50, borderWidth: 1, borderRadius: 9, paddingHorizontal: 13, marginBottom: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
