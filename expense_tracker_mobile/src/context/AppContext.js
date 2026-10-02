import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import {loadExpenses,saveExpenses,loadSettings,saveSettings} from '../storage/storage';
const C=createContext(null);
export function AppProvider({children}){
 const [expenses,setExpenses]=useState([]); const [settings,setSettings]=useState({theme:'system',hideAmounts:false,budget:15000,appLock:false}); const [ready,setReady]=useState(false);
 useEffect(()=>{(async()=>{const e=await loadExpenses();const st=await loadSettings();setExpenses(e);setSettings(s=>({...s,...st}));setReady(true)})()},[]);
 useEffect(()=>{if(ready)saveExpenses(expenses)},[expenses,ready]); useEffect(()=>{if(ready)saveSettings(settings)},[settings,ready]);
 const addExpense=e=>setExpenses(x=>[{...e,id:Date.now().toString()},...x]);
 const updateExpense=e=>setExpenses(x=>x.map(i=>i.id===e.id?e:i)); const deleteExpense=id=>setExpenses(x=>x.filter(i=>i.id!==id));
 const value=useMemo(()=>({expenses,settings,setSettings,addExpense,updateExpense,deleteExpense,ready}),[expenses,settings,ready]);
 return <C.Provider value={value}>{children}</C.Provider>;
}
export const useApp=()=>useContext(C);
