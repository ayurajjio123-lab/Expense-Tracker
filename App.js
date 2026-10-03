import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AppState, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider, useApp } from './src/context/AppContext';

import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import BudgetScreen from './src/screens/BudgetScreen';
import MenuDrawer from './src/screens/MenuDrawer';
import CategoriesScreen from './src/screens/CategoriesScreen';
import RecurringScreen from './src/screens/RecurringScreen';
import DataManagementScreen from './src/screens/DataManagementScreen';
import SearchScreen from './src/screens/SearchScreen';
import LockScreen from './src/screens/LockScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function Main() {
  const { settings, ready } = useApp();
  const systemDark = useColorScheme() === 'dark';
  const dark = settings.theme === 'dark' || (settings.theme === 'system' && systemDark);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (ready) setLocked(Boolean(settings.appLock));
  }, [ready, settings.appLock]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      if (state !== 'active' && settings.appLock) setLocked(true);
    });
    return () => sub.remove();
  }, [settings.appLock]);

  if (!ready) {
    return (
      <View style={[styles.loading, { backgroundColor: dark ? '#111820' : '#FFFFFF' }]}>
        <ActivityIndicator size="large" color="#147BEA" />
        <Text style={[styles.loadingText, { color: dark ? '#DDE7F0' : '#66717C' }]}>
          Loading your expenses…
        </Text>
      </View>
    );
  }

  if (locked) {
    return <LockScreen biometric={settings.biometric} onUnlock={() => setLocked(false)} />;
  }

  const theme = dark
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, primary: '#147BEA', background: '#111820', card: '#171F29', text: '#F7FAFC' } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: '#147BEA', background: '#FFFFFF', card: '#FFFFFF', text: '#111820' } };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Add" component={AddExpenseScreen} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Recurring" component={RecurringScreen} />
        <Stack.Screen name="DataManagement" component={DataManagementScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Menu" component={MenuDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 12 },
});
