import AsyncStorage from '@react-native-async-storage/async-storage';
const EXPENSES='expense_tracker_expenses_v1';
const SETTINGS='expense_tracker_settings_v1';
export async function loadExpenses(){ try{return JSON.parse(await AsyncStorage.getItem(EXPENSES)||'[]')}catch{return[]}}
export async function saveExpenses(data){await AsyncStorage.setItem(EXPENSES,JSON.stringify(data));}
export async function loadSettings(){ try{return JSON.parse(await AsyncStorage.getItem(SETTINGS)||'{}')}catch{return{}}}
export async function saveSettings(data){await AsyncStorage.setItem(SETTINGS,JSON.stringify(data));}
export async function clearAll(){await AsyncStorage.multiRemove([EXPENSES,SETTINGS]);}
