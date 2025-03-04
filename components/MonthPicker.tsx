import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native" 
import { useState } from "react"
import Months from './Months'

type PickerType = {
    setMonth: (value:string) => void;
    month:string;
}
const MonthPicker = ({setMonth, month}:PickerType) => {
    const [dropdown, setDropdown] = useState(false)
    const [selected, setSelected] = useState(false)
    return(
        <>
        <TouchableHighlight style={{borderRadius:5}} onPress={()=>setDropdown(!dropdown)}>
            <View style={styles.picker}><Text style={styles.pickertext}>Select month  {dropdown ? `-` : `+`}</Text></View>
        </TouchableHighlight>
        {dropdown && 
        <View style={styles.dropdown}>
        {
            Months.map((m,i)=>{
                let ii = i+1;
                let test = ''
                    if(month === ii.toString()){
                
                    }
                
                return <TouchableOpacity key={i} onPress={()=>{setMonth(ii.toString()); setDropdown(false);}}><View style={styles.datepicker}><Text style={styles.pickertext}>{(month === ii.toString()) && "\u2713"}  {m}</Text></View></TouchableOpacity>
            })
        }
        </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    dropdown:{
        backgroundColor:"#eaeaea",
        borderRadius:5,
        marginTop:2
    },
    picker:{
        padding:10,
        color:'#000000',
        borderRadius:5,
        backgroundColor:'#bababa',
      
    },
    col:{
        color:"#0000FF"
    },
    pickertext:{
        color:'#000000',
        textAlign:"center",
        fontWeight:700
    },
    datepicker:{
        padding:5,
        cursor:"pointer"
    }
})

export default MonthPicker;