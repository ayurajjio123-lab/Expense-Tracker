import React from 'react'; import {View,Text,StyleSheet} from 'react-native';
export default function Card({title,value,children}){return <View style={s.card}><Text style={s.title}>{title}</Text>{value!==undefined&&<Text style={s.value}>{value}</Text>}{children}</View>}
const s=StyleSheet.create({card:{backgroundColor:'#151A17',borderRadius:18,padding:16,marginBottom:12,borderWidth:1,borderColor:'#252D28'},title:{color:'#A8B5AD',fontSize:13},value:{color:'#F4FFF7',fontSize:25,fontWeight:'800',marginTop:5}});
