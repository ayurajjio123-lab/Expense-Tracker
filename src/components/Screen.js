import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export default function Screen({ children, theme, scroll = true }) {
  const content = scroll
    ? <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>{children}</ScrollView>
    : <View style={styles.content}>{children}</View>;

  return <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16, paddingBottom: 48 },
});
