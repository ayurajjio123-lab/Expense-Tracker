import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LockScreen({ biometric, onUnlock }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔒</Text>
      <Text style={styles.title}>App Locked</Text>
      <Text style={styles.subtitle}>Unlock to continue.</Text>
      <Pressable onPress={onUnlock} style={styles.button}>
        <Text style={styles.buttonText}>{biometric ? 'Unlock' : 'Continue'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111820', alignItems: 'center', justifyContent: 'center', padding: 24 },
  icon: { fontSize: 46 },
  title: { color: '#FFFFFF', fontSize: 26, fontWeight: '900', marginTop: 12 },
  subtitle: { color: '#A8B6C4', marginTop: 5, marginBottom: 22 },
  button: { backgroundColor: '#147BEA', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: '900' },
});
