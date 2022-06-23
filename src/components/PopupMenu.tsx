
import * as React from 'react';
import { Menu, Provider, useTheme } from 'react-native-paper';

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
// import { relativeApi } from 'features/relative/relativeApi';
// import { setIdSelect } from 'features/relative/relativeSlice';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign'
interface Props {
  id: number;
}
const PopupMenu: React.FC<Props> = props => {
  const navigation = useNavigation();
  const { id } = props;
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [typePitch,setTypePitch]=React.useState('Sân 5');
  return (
  
      <>
        <View style={{backgroundColor:'#fff',padding:17,borderRadius:10,elevation:3}}>
            <TouchableOpacity onPress={()=>{setVisible(!visible)}}>
                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <Text>{typePitch} </Text>
                <Text> <AntDesign name="caretdown" size={14}/></Text>
                </View>
            </TouchableOpacity>
        </View>
        {
            visible?(
             <View style={{elevation:3,zIndex:11,position: 'absolute',bottom: -100,width:'100%',borderRadius:3,backgroundColor:'#FFF'}}>
                   <TouchableOpacity onPress={()=>{setVisible(!visible); setTypePitch('Sân 5')}} style={{padding:15,borderBottomWidth:0.5,borderBottomColor: '#e5e5e5'}}>
                    <Text>
                    {'Sân 5'}
                    </Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{setVisible(!visible); setTypePitch('Sân 7')}} style={{padding:15}}>
                    <Text>
                    {'Sân 7'}
                    </Text>
                   </TouchableOpacity>
             </View>
            ):(null)
        }
      </>
 
  
  );
};
const styles = StyleSheet.create({
  btnPopupEdit: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: '#e5e5e5',
  },
  iconEdit: {
    marginEnd: 10,
  },
  btnPopupDelete: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
export default PopupMenu;
