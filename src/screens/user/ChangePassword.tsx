import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Images from 'src/themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import { onChangePassword } from 'src/redux';

const ChangePassword: React.FC = () => {
  const [data, setData] = useState({
    password: '',
    newPassword: '',
    secureTextEntry: true,
  });
  const InputPassword = (value: string) => {
    setData({
      ...data,
      password: value,
    });
  };
  const InputNewPassword = (value: string) => {
    setData({
      ...data,
      newPassword: value,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const dispatch = useDispatch();
  return (
    <View style={Styles.container}>
      <View style={Styles.formChangePass}>
        <Text style={Styles.title}>Đổi mật khẩu</Text>
        <View>
          <TextInput
            onChangeText={val => InputPassword(val)}
            placeholder="mật khẩu cũ"
            style={Styles.txt_Input}
          />

          <View style={Styles.txt_Input}>
            <TextInput
              onChangeText={val => InputNewPassword(val)}
              secureTextEntry={data.secureTextEntry ? true : false}
              placeholder="mật khẩu mới"
              style={{fontSize: 18}}
            />
            <TouchableOpacity
              onPress={updateSecureTextEntry}
              style={{padding: 5}}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={Styles.btn_Change_View}>
          <TouchableOpacity
            style={Styles.btn_Change}
            onPress={() =>
              dispatch(onChangePassword(data.password, data.newPassword))
            }>
            <Text style={{color: 'white', textAlign: 'center'}}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.7,
    // backgroundColor:'red'
  },
  formChangePass: {
    //backgroundColor:'blue',
    width: '60%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  txt_Input: {
    fontSize: 18,
    marginVertical: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: 'grey',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn_Change_View: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  btn_Change: {
    color: 'white',
    backgroundColor: 'purple',
    textAlign: 'center',
    width: '50%',
    padding: 10,
    borderRadius: 5,
  },
});
export default ChangePassword;
