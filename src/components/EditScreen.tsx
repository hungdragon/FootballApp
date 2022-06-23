import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, Button, TextInput, Alert, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import { setFullName, setPhoneNumber } from 'src/screens/user/userSlice';
import { BASE_URL } from 'src/utils';

interface Props {
  route: any;
  navigation: any;
}

const EditScreen: React.FC<Props> = ({navigation, route}) => {
  const props = route.params;
  console.log(props.id);

  const [textInput, setTextInput] = useState(props.name);
  const dispatch = useDispatch();
  const updateFullName=async(fullName:string)=>{
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}api/change-fullname`,{fullName},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      }
    );

    const {status, error, FullNameUser} = response.data;
    if (status == 'ok') {
      dispatch(setFullName(FullNameUser))
      Alert.alert('Thành công', 'Đổi Tên thành công', [{text: 'OK',onPress:()=>navigation.navigate('Profile')}]);
    }else{
      Alert.alert('Thất bại', error, [{text: 'OK'}]);
      console.log(error);
    }
  }
  const updatePhoneNumber=async(phoneNumber:string)=>{
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}api/change-phoneNumber`,{phoneNumber},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      }
    );

    const {status, error, PhoneNumbers} = response.data;
    if (status == 'ok') {
      dispatch(setPhoneNumber(PhoneNumbers))
      Alert.alert('Thành công', 'Đổi Số điện thoại thành công', [{text: 'OK',onPress:()=>navigation.navigate('Profile')}]);
    }else{
      Alert.alert('Thất bại', error, [{text: 'OK'}]);
      console.log(error);
    }
  }
  const back = () => {
    if (props.id === 1) {
       updateFullName(textInput);
    } else if (props.id === 2) {
      console.log('Email');
    } else if (props.id === 3) {
      updatePhoneNumber(textInput)
    } else {
      console.log('lỗi ID');
    }
  };
  return (
    <View style={{marginHorizontal: 20, marginVertical: 5}}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <Text>{props.title}</Text>
      <TextInput
        value={textInput}
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          marginTop: 10,
          borderRadius: 5,
          paddingHorizontal:5,
          padding: 2,
        }}
        onChangeText={setTextInput}
      />
      <Text style={{marginVertical: 5, fontSize: 12, marginBottom: 15}}>
      {props.label}
      </Text>
      <Button
        title="Lưu thay đổi"
        onPress={() => {
          back();
        }}></Button>
    </View>
  );
};
export default EditScreen;
