import {useState, useEffect} from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
interface DateType {
    month:string;
    day:string;
}

const DateFactApi = ({month, day}:DateType) => {
    // fact state var of type responseData
    const [fact, setFact] = useState<string | null>(null);
    // loading state
    const [loading, setLoading] = useState<boolean>(false);
    // error state string, nullable
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        
        const dateFact = async () => {
            // do not process if incomplete
            if (!month || !day) return; 
            // start loading
            setLoading(true);
            setError(null);
            // fetch 
            const url = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '1c748e4bddmsh876311cd7245492p1d7ce0jsnc8993ff39583',
                    'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
                }
            };
            // try-catch for response
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.text();
                console.log(`data (${month},${day}): ${result}`);
                setFact(result);
            } catch (error) {
                const msg = error instanceof Error ? error.message : 'Unknown error occurred';;
                setError(msg);
                console.error(error);
            } finally {
                // end loading
                setLoading(false);
            }
        }
        dateFact();
    },[month, day]);

    return(
        <View>
        {loading && <ActivityIndicator/>}
        {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
        {fact && !loading && !error && (
            <>
            <Text style={{textAlign:"center"}}>Date Fact</Text>
            <Text style={styles.fact}>"{fact}"</Text>
            </>
        )}
        {!fact && !loading && !error && (
            <Text>No fact available</Text>
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    fact:{
        fontSize:25,
        fontWeight:800,
        textAlign:"center"
    }
})

export default DateFactApi;
