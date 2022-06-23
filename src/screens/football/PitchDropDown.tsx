import React, { useState } from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { ModalPicker } from 'components/ModalPicker';

const PitchDropDown: React.FC=()=>{
    // const [ chooseData, setchooseData]=useState('Select Item...');
    // const [ isModalVisible, setisModalVisible]=useState(false);

    // const changeModalVisibility=(bool:boolean):void=>{
    //     setisModalVisible(bool)
    // }
    // const setData=(option:string)=>{
    //     setchooseData(option)
    // }

    return(
        <View style={styles.container}>
            {/* <TouchableOpacity 
            onPress={()=>changeModalVisibility(true)}
            style={styles.touchableOpacity}
            >
                <Text style={styles.text}>{chooseData}</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                  animationType='fade'
                  visible={isModalVisible}
                  onRequestClose={()=>changeModalVisibility(false)}
            >
              <ModalPicker
                changeModalVisibility={changeModalVisibility}
                setData={setData}
              />
            </Modal> */}
            <Text>213123</Text>

        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20',
    },
    text:{
        marginVertical: 20,
        fontSize: 25
    },
    touchableOpacity:{
        backgroundColor: 'orange',
        alignSelf: 'stretch'
    }
})
export default PitchDropDown;