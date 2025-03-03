import { StatusBar } from 'expo-status-bar';
import {useState} from "react"
import { StyleSheet, Text, View, TextInput } from 'react-native';
import DateFactApi from "../components/DateFactApi"
import Months from "../components/Months";

export default function App() {
    const [month, setMonth] = useState<string>("")
    const [day, setDay] = useState<string>("")
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Welcome to Date Facts</Text>
      <Text>Enter the month and day to generate a date fact</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Month</Text>
        <TextInput style={styles.input} placeholder="Enter Month" onChangeText={month => setMonth(month)}/>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Day</Text>
        <TextInput style={styles.input} placeholder="Enter day" onChangeText={day=>setDay(day)}/>
      </View>
      <Text>Month: {month}</Text>
      <DateFactApi month={month} day={day}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding:20
  },
  title:{
    fontWeight:600,
    fontSize:20
  },
  label:{
    color:"#999999"
  },
  input:{
    backgroundColor:"#eaeaea",
    paddingInline:10
  },
  inputWrapper:{
    marginBlock:10
  }

});
