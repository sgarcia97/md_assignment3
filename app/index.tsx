import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import DateFactApi from "../components/DateFactApi";
import MonthPicker from "../components/MonthPicker";
import Months from "../components/Months";

export default function App() {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isOKDate, setIsOKDate] = useState<boolean>(false);

  const validateDate = (day: string, month: string) => {
    const dayNumber = parseInt(day);
    const monthNumber = parseInt(month);
    // at least 1 field is empty
    if (!month || !day) {
      setError("Please provide a month and day value");
      return false;
    }
    // check if numeric / integer
    if (isNaN(dayNumber) || isNaN(monthNumber)) {
      setError("Please provide a valid number for month and day");
      return false;
    }
    // months can only be 1-12
    if (monthNumber < 1 || monthNumber > 12) {
      setError("Month must be between 1 and 12");
      return false;
    }
    // use a leap year for 2/29
    const validDays = new Date(2024, monthNumber, 0).getDate();
    // validate day
    if (dayNumber < 1 || dayNumber > validDays) {
      const monthName = Months[monthNumber - 1];
      setError(`Invalid day for ${monthName}. Valid range is 1-${validDays}.`);
      return false;
    }

    setError("");
    return true;
  };
  // day change handler
  const handleDayChange = (text: string) => {
    setDay(text);
    if (month && text) {
      const validated = validateDate(text, month);
      setIsOKDate(validated);
    } else {
      setIsOKDate(false);
    }
  };
  // month change handler
  const handleMonthChange = (text: string) => {
    setMonth(text);
    if (day && text) {
      const validated = validateDate(day, text);
      setIsOKDate(validated);
    } else {
      setIsOKDate(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Date Facts</Text>
      <Text style={{ textAlign: "center", color: "#999999" }}>
        Enter the month and day to generate a date fact
      </Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Month</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Month"
          value={month}
          onChangeText={handleMonthChange}
          keyboardType="numeric"
          maxLength={2}
        />
        <Text style={{ textAlign: "center", padding: 5 }}>OR</Text>
        <MonthPicker setMonth={handleMonthChange} month={month} />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Day</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter day"
          value={day}
          onChangeText={handleDayChange}
          keyboardType="numeric"
          maxLength={2}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isOKDate && <DateFactApi month={month} day={day} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
  },
  label: {
    color: "#999999",
  },
  input: {
    backgroundColor: "#eaeaea",
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  inputWrapper: {
    marginVertical: 10,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
});
