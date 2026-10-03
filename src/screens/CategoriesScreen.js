import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { getTheme } from '../utils/theme';

export default function CategoriesScreen({ navigation }) {
  const { categories, deleteCategory } = useApp();
  const theme = getTheme(useApp().settings.theme, useColorScheme() === 'dark');

  return (
    <Screen theme={theme}>
      <Header title="Categories" theme={theme} onBack={() => navigation.goBack()} />
      {categories.map(item => <View key={item.id} style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={[styles.icon, { backgroundColor: theme.primarySoft }]}><Text>{item.icon}</Text></View>
        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Pressable onPress={() => Alert.alert('Delete category?', item.name, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => deleteCategory(item.id) },
        ])}><Text style={{ color: theme.primary }}>›</Text></Pressable>
      </View>)}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 55, borderWidth: 1, borderRadius: 10, padding: 9, marginBottom: 7, flexDirection: 'row', alignItems: 'center' },
  icon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  name: { flex: 1, marginLeft: 10, fontWeight: '800' },
});
