import {useState, useEffect} from "react";
import { TextInput, Text, ScrollView, View, StyleSheet } from "react-native";
type DateType = {
    month:string;
    day:string;
}
const DateFactApi = ({month, day}:DateType) => {
    const [fact, setFact] = useState([]);
    useEffect(()=>{

        const dateFact = async () => {
        const url = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key':   '1c748e4bddmsh876311cd7245492p1d7ce0jsnc8993ff39583',
                'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setFact(result)
        } catch (error) {
            console.error(error);
        }
        }
        dateFact();
    },[])

    return(
        <>
        <View>
            <Text>Fact</Text>
        </View>
        </>
    )
}

export default DateFactApi;
