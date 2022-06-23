import  React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
interface IRowInfomation{
    label:string;
    content:string;
    color?: string
}
const GeneralRow:React.FC<IRowInfomation>=({label,content,color})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label||'...'}</Text>
            <Text style={[styles.content,{color: color}]}>{content||'...'}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {flexDirection: "row",marginHorizontal:10,paddingVertical:5},
    label: {  fontSize: Platform.OS === 'ios'?12:16,flexWrap:'wrap'},
    content: { fontSize: Platform.OS === 'ios'?12:16,flexWrap:'wrap'},
})
export default GeneralRow;