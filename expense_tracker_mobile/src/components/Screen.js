import React from 'react'; import {SafeAreaView,ScrollView,StyleSheet,View} from 'react-native';
export default function Screen({children}){return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.content}>{children}</ScrollView></SafeAreaView>};
const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#0B0F0D'},content:{padding:16,paddingBottom:40}});
