import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { money, prettyDate } from '../utils/date';

export default function ExpenseRow({ item, theme, hideAmount, onEdit, onDelete }) {
  return (
    <View style={[styles.row, { borderBottomColor: theme.border }]}>
      <View style={[styles.circle, { backgroundColor: theme.primarySoft }]}>
        <Text style={styles.icon}>{item.icon || '•'}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.category, { color: theme.text }]}>{item.category || 'Other'}</Text>
        <Text numberOfLines={1} style={[styles.desc, { color: theme.muted }]}>
          {item.description || 'No description'} • {item.payment || 'Cash'} • {prettyDate(item.date)}
        </Text>
      </View>
      <View style={styles.amountBox}>
        <Text style={[styles.amount, { color: theme.text }]}>
          {hideAmount ? '••••' : money(item.amount)}
        </Text>
        {item.time ? <Text style={[styles.time, { color: theme.muted }]}>{item.time}</Text> : null}
      </View>
      {onEdit ? <Pressable onPress={() => onEdit(item)}><Text style={{ color: theme.primary }}>Edit</Text></Pressable> : null}
      {onDelete ? <Pressable onPress={() => onDelete(item.id)}><Text style={styles.delete}>×</Text></Pressable> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 64, flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderBottomWidth: 1, gap: 8 },
  circle: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 19 },
  info: { flex: 1 },
  category: { fontWeight: '800', fontSize: 14 },
  desc: { fontSize: 11, marginTop: 3 },
  amountBox: { alignItems: 'flex-end', minWidth: 55 },
  amount: { fontWeight: '900', fontSize: 13 },
  time: { fontSize: 10, marginTop: 2 },
  delete: { color: '#E14B4B', fontSize: 25 },
});
