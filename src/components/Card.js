import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Card({ title, value, children, theme, blue = false }) {
  return (
    <View style={[
      styles.card,
      { backgroundColor: blue ? theme.primary : theme.card, borderColor: theme.border },
    ]}>
      {title ? <Text style={[styles.title, { color: blue ? '#FFFFFF' : theme.muted }]}>{title}</Text> : null}
      {value !== undefined ? <Text style={[styles.value, { color: blue ? '#FFFFFF' : theme.text }]}>{value}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1 },
  title: { fontSize: 12, fontWeight: '800' },
  value: { fontSize: 20, fontWeight: '900', marginTop: 5 },
});
