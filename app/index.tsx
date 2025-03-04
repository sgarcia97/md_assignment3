import { StatusBar } from 'expo-status-bar';
import {useState} from "react"
import { StyleSheet, Text, View, TextInput } from 'react-native';
import DateFactApi from "../components/DateFactApi"
import MonthPicker from '../components/MonthPicker'

export default function App() {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isOKDate, setIsOKDate] = useState<boolean>(false);

  const validateDate = (day : string, month: string) => {
    const dayNumber = parseInt(day);
    const monthNumber = parseInt(month);
    
    // at least 1 field is empty
    if (!month || !day) {
      setError("Please provide a month and day value");
      return false;
    }

    // check if numeric / integer
    if (isNaN(dayNumber) || isNaN(monthNumber)) {
      setError("Please provide a valid number corresponding to month and day");
      return false;
    }

    // months can only be 1-12
    if (monthNumber < 1 || monthNumber > 12) {
      setError("Valid values for month (1-12)");
      return false;
    }

    // get valid days based on month, use leap year to include 2/29
    const validDays = new Date(2024, monthNumber, 0).getDate();

    // validate day
    if (dayNumber < 1 || dayNumber > validDays) {
      setError("Invalid day value Feb (1-29), Apr,Jun,Sep,Nov (1-30), others (1-31)");
      return false;
    }
    // return true if pass
    setError("");
    return true;
  };
  // day change handler
  const handleDayChange = (text: string) =>{
    const dayNumber = parseInt(text);
    // proceed to set day if empty or valid
    if (text === "" || (!isNaN(dayNumber) && month && validateDate(text, month))) {
      setDay(text);
    }
    // validate
    if (month && text) {
      const validated = validateDate(text, month);
      console.log(`validation(M): ${month} ${text}`);
      setIsOKDate(validated);
    } else {
      setIsOKDate(false);
    }
  };    
  // month change handler
  const handleMonthChange = (text: string) =>{
    const monthNumber = parseInt(text);
    // proceed to set month if empty or valid
    if (text === "" || (!isNaN(monthNumber) && month && validateDate(day, text))) {
      setMonth(text);
    }
    // validate
    setMonth(text);
    if (day && text) {
      const validated = validateDate(day, text);
      console.log(`validation(D): ${text} ${day}`);
      setIsOKDate(validated);
    } else {
      setIsOKDate(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Welcome to Date Facts</Text>
      <Text style={{textAlign:"center", color:"#999999"}}>Enter the month and day to generate a date fact</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Month</Text>
        <TextInput style={styles.input} placeholder="Enter Month" value={month} onChangeText={handleMonthChange} keyboardType="numeric" maxLength={2}/>
        <Text style={{textAlign:"center", padding:5}}>OR</Text>
        <MonthPicker setMonth={setMonth} month={month}/>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Day</Text>
        <TextInput style={styles.input} placeholder="Enter day" onChangeText={handleDayChange} keyboardType="numeric" maxLength={2}/>
      </View>
      { error ? <Text style={styles.error}>{error}</Text> : null }
      {isOKDate && (
          <DateFactApi month={month} day={day} />
        )}
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
    fontWeight:800,
    fontSize:20,
    textAlign:"center"
  },
  label:{
    color:"#999999"
  },
  input:{
    backgroundColor:"#eaeaea",
    paddingInline:20,
    borderRadius:5
  },
  inputWrapper:{
    marginBlock:10
  },
  error: {
    color: 'red',
    marginTop: 5
}

});
