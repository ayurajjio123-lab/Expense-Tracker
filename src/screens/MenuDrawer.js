import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const menuItems = [
  ['⌂', 'Dashboard', 'home'],
  ['▣', 'Calendar', 'calendar'],
  ['▥', 'Analytics', 'analytics'],
  ['▣', 'Budget', 'budget'],
  ['▦', 'Categories', 'categories'],
  ['↻', 'Recurring Expenses', 'recurring'],
  ['⇅', 'Export / Import', 'data'],
  ['⌕', 'Search Expenses', 'search'],
  ['▣', 'Privacy & Security', 'settings'],
  ['◐', 'Appearance', 'settings'],
  ['⚒', 'Advanced Tools', 'advanced'],
  ['⚙', 'Settings', 'settings'],
  ['ⓘ', 'About', 'about'],
];

export default function MenuDrawer({ visible, onClose, navigation, theme }) {
  const go = type => {
    onClose();
    if (type === 'home') navigation.navigate('Tabs', { screen: 'Home' });
    else if (type === 'calendar') navigation.navigate('Tabs', { screen: 'Calendar' });
    else if (type === 'analytics') navigation.navigate('Tabs', { screen: 'Analytics' });
    else if (type === 'settings') navigation.navigate('Tabs', { screen: 'Settings' });
    else if (type === 'budget') navigation.navigate('Budget');
    else if (type === 'categories') navigation.navigate('Categories');
    else if (type === 'recurring') navigation.navigate('Recurring');
    else if (type === 'data') navigation.navigate('DataManagement');
    else if (type === 'search') navigation.navigate('Search');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.drawer, { backgroundColor: theme.card }]}>
          <View style={[styles.profile, { backgroundColor: theme.primary }]}>
            <View style={styles.avatar}><Text style={styles.avatarText}>R</Text></View>
            <View style={styles.profileText}>
              <Text style={styles.name}>Daily Expense Tracker</Text>
              <Text style={styles.email}>Professional expense manager</Text>
            </View>
            <Pressable onPress={onClose}><Text style={styles.close}>×</Text></Pressable>
          </View>

          <View style={styles.items}>
            {menuItems.map(([icon, label, type]) => (
              <Pressable key={label} onPress={() => go(type)} style={[styles.item, { backgroundColor: label === 'Dashboard' ? theme.primarySoft : 'transparent' }]}>
                <Text style={[styles.itemIcon, { color: theme.primary }]}>{icon}</Text>
                <Text style={[styles.itemText, { color: theme.text }]}>{label}</Text>
                {label === 'Advanced Tools' ? <Text style={{ color: theme.muted }}>⌄</Text> : null}
              </Pressable>
            ))}
          </View>
        </View>
        <Pressable style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row' },
  drawer: { width: 315, maxWidth: '82%', height: '100%', elevation: 20, zIndex: 2 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  profile: { minHeight: 105, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#147BEA', fontSize: 25, fontWeight: '900' },
  profileText: { flex: 1 },
  name: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  email: { color: '#DCEBFF', fontSize: 10, marginTop: 3 },
  close: { color: '#FFFFFF', fontSize: 28 },
  items: { padding: 10 },
  item: { minHeight: 43, borderRadius: 8, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemIcon: { width: 22, fontSize: 19, textAlign: 'center' },
  itemText: { flex: 1, fontSize: 13, fontWeight: '700' },
});
