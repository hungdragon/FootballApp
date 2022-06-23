import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconFeather from 'react-native-vector-icons/Feather';
//import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import { ApplicationState, onLogin } from 'src/redux';
import { BASE_URL } from 'src/utils';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import axios from 'axios';
import Images from 'themes/index';
import { changeUserName, setIsAdmin, setToken } from '../user/userSlice';
import { useAppSelector } from 'src/API';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  form: {
    flexDirection: 'column',
    margin: 20,
    //backgroundColor:'blue'
  },
  Body: {
    flexDirection: 'column',
    // height:400,
    backgroundColor: 'green',
  },
  Title: {
    // backgroundColor:'blue',
    fontSize: 25,
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,
    borderRadius: 20,
    width: 250,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  text_user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    width: 250,
    padding: 5,
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,

    borderWidth: 1,

    borderColor: 'gray',
  },
  text_pass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    width: 250,
    padding: 5,
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,

    borderWidth: 1,

    borderColor: 'gray',
  },
  ButtonText: {
    fontSize: 13,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
    marginStart: 10,
    marginEnd: 10,
  },
  OtherLoginView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  Other_Logo: {
    width: 50,
    height: 50,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 12,
    textAlign: 'center',
  },
});
type Props = {
  title: string;
  navigation: any;
  signIn: any;
};
const Login: React.FC<Props> = ({navigation}) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const dispatch = useDispatch();
  const isToken = useAppSelector(state=>state.userState.token);
  //console.log("loi gi " + error);
  console.log('token o login' + isToken);
  const onTapLogin = async () => {
    const username =data.username;
    const password =data.password;
    console.log('pp',username,password);
    await axios.post(`${BASE_URL}api/login`, {
      username,
      password,
    }).then(async (response: any) => {
      const {error, status, token, isAdmin,username} =response.data;
   
      if(status === 'ok') {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('role', isAdmin);
        dispatch(setToken(token))
        dispatch(changeUserName(username))
        dispatch(setIsAdmin(isAdmin));
       // Alert.alert('OK', 'Successfully registered', [{text: 'OK'}]);
      // navigation.navigate('Navigation' as never);
    } else if (status === 401) {
      Alert.alert('Lỗi', error, [{text: 'OK'}]);
    } else {
      Alert.alert('Lỗi', error, [{text: 'OK'}]);
    }
    }).catch((error) => {
      console.log('Xảy ra lỗi' + error);
      console.log('ERRR' + error);
     })
   // dispatch(onLogin(data.username, data.password));
   // console.log(data.username);
  };
  const textInputChange = (val: string) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
      console.log(data.username);
    }
    // console.log('username: ',data.username )
  };
  const handleValidUser = (val: any) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const handlePasswordChange = (val: any) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
    // console.log('password: '+ data.password)
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {/* <Text style={styles.Title}>😀😀😀</Text> */}
        </View>
        <View style={styles.form}>
          <View style={styles.text_user}>
            <TextInput
              style={{flex: 1}}
              autoCapitalize="none"
              placeholder="Tài khoản"
              onChangeText={val => textInputChange(val)}
            />
          </View>

          <View style={styles.text_pass}>
            <TextInput
              placeholder="Mật khẩu"
              style={{flex: 1}}
              onChangeText={val => handlePasswordChange(val)}
              secureTextEntry={data.secureTextEntry ? true : false}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <IconFeather name="eye-off" color="grey" size={20} />
              ) : (
                <IconFeather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              onTapLogin();
            }}>
            <Text style={styles.ButtonText}>Đăng nhập ➜</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.OtherLoginView}>
          <View>
            <TouchableOpacity>
              <Image source={Images.Fb} style={styles.Other_Logo} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={Images.gg} style={styles.Other_Logo} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Image source={Images.tw} style={styles.Other_Logo} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Login;
