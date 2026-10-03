import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Header({ title, subtitle, theme, onMenu, onBack, notification = false }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.left}>
        {onMenu ? (
          <Pressable onPress={onMenu} hitSlop={10} style={styles.iconButton}>
            <Text style={[styles.menu, { color: theme.text }]}>☰</Text>
          </Pressable>
        ) : (
          <Pressable onPress={onBack} hitSlop={10} style={styles.iconButton}>
            <Text style={[styles.back, { color: theme.text }]}>‹</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.center}>
        <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: theme.muted }]}>{subtitle}</Text> : null}
      </View>

      <View style={styles.right}>
        {notification && <Text style={[styles.bell, { color: theme.text }]}>♧</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { minHeight: 60, flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  left: { width: 46, alignItems: 'flex-start' },
  center: { flex: 1, alignItems: 'center' },
  right: { width: 46, alignItems: 'flex-end' },
  iconButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  menu: { fontSize: 25, lineHeight: 28 },
  back: { fontSize: 35, lineHeight: 35, fontWeight: '300' },
  title: { fontSize: 18, fontWeight: '900' },
  subtitle: { fontSize: 12, marginTop: 2 },
  bell: { fontSize: 23 },
});
