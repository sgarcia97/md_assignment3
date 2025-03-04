import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native" 
import { useState } from "react"
import Months from './Months'

type PickerType = {
    setMonth: (value:string) => void;
    month:string;
}
const MonthPicker = ({setMonth, month}:PickerType) => {
    const [dropdown, setDropdown] = useState(false)
    return(
        <>
        <TouchableHighlight onPress={()=>setDropdown(!dropdown)}>
            <View style={styles.picker}><Text style={styles.pickertext}>Select month  {dropdown ? `-` : `+`}</Text></View>
        </TouchableHighlight>
        {dropdown && 
        <View style={styles.dropdown}>
        {
            Months.map((month,i)=>{
                let ii = i+1;
                return <TouchableOpacity key={i} onPress={()=>{setMonth(ii.toString()); setDropdown(false);}} style={styles.datepicker}><Text style={styles.pickertext}>{month}</Text></TouchableOpacity>
            })
        }
        </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    dropdown:{
        backgroundColor:"#eaeaea"
    },
    picker:{
        padding:10,
        color:'#000000',
        backgroundColor:'#bababa',
      
    },
    pickertext:{
        color:'#000000',
        textAlign:"center"
    },
    datepicker:{
        padding:5,
        cursor:"pointer"
    }
})

export default MonthPicker;