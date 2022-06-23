import axios from 'axios';
import {Dispatch} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {BASE_URL} from 'src/utils';
export interface LoginAction {
  readonly type: 'ON_LOGIN';
  payload: string;
}

export interface StatusAction {
  readonly type: 'STATUS';
  payload: any;
}

export interface Logout {
  type: 'LOGOUT';
  //payload: UserModel;
}
export interface RETRIEVE_TOKEN_A {
  type: 'RETRIEVE_TOKEN';
  payload: any;
  role: any;
}
// export interface RETRIEVE_ROLE_A {
//   type: "RETRIEVE_ROLE";
//   payload: any;
// }
export interface changPassword {
  readonly type: 'CHANGE_PASSWORD';
  payload: string;
}
export interface changeName {
  readonly type: 'CHANGE_NAME';
  payload: string;
}
export interface changePhoneNumber {
  readonly type: 'CHANGE_PHONENUMBER';
  payload: string;
}
export interface RegisterAction{
  type:'ON_REGISTER';
  payload: string;
}
export type UserAction =
  | LoginAction
  | StatusAction
  | Logout
  | RETRIEVE_TOKEN_A
  | changPassword
  | changeName
  |changePhoneNumber
  | RegisterAction;
// | RETRIEVE_ROLE_A;

export const RegisterAPI=(email:string,username:string,password:string)=>{
  return async(dispatch:Dispatch<UserAction>)=>{
    try {
      const response=await axios.post(`${BASE_URL}api/register`,{
          email,username,password
      });
      const result=response.data;
       const {error, status, token, isAdmin} = result;
       if(status ==='ok'){
        const _token = token;
        await AsyncStorage.setItem('token', _token);
        await AsyncStorage.setItem('role', isAdmin);
        Alert.alert('OK','Successfully registered' , [
          {text: 'OK'},
        ]);
        dispatch({
          type: 'ON_REGISTER',
          payload: response.data,
        });
       }else{
        Alert.alert('Wrong Input', error, [
          {text: 'OK'},
        ]);
       }
    } catch (error) {
      console.log('Xảy ra lỗi' + error);
    }
  }
}
// we need to dispatch action
export const onLogin = (username: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.post(`${BASE_URL}api/login`, {
        username,
        password,
      });
      // console.log("res trả về: "+JSON.stringify(response.data));
      const result = response.data;
        console.log('respione---'+JSON.stringify(result));
      const {error, status, token, isAdmin} = result;
      
      if (status === 'ok') {
        const _token = token;
        await AsyncStorage.setItem('token', _token);
        await AsyncStorage.setItem('role', isAdmin);
        // await AsyncStorage.setItem("username", isAdmin);
        console.log('1/. userAction đã lưu token vào storage: ' + _token);
        dispatch({
          type: 'ON_LOGIN',
          payload: response.data,
        });
      } else if (status == 404) {
        console.log('loi ==' + status);
        console.log(error);

        Alert.alert('Wrong Input', 'Username or Password cannot be Empty.', [
          {text: 'OK'},
        ]);
      } else {
        console.log('loi ==' + status);
        console.log(error);

        Alert.alert('Thất bại', 'sai tai f khoản mat khau', [{text: 'OK'}]);
        // dispatch({
        // type: "STATUS",
        // payload:status,
        // });
      }
    } catch (error) {
      console.log('Xảy ra lỗi' + error);
      // dispatch({
      //   type: "STATUS",
      //   payload: "401",
      // });
    }
  };
};

export const UserLogout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const a = await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');

      console.log('Đã xóa Token ở UserLogout:' + a);
      
      const b = await AsyncStorage.getItem('token');
      console.log('item---:' + b);
      //const response = await axios.post<UserModel>(`${BASE_URL}mock-login`);
      dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      console.log('loi gi day ' + error);
    }
  };
};
export const onChangeName = (fullName: string) => {
  console.log('name là gì: ' + fullName);
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      // let config={
      //   url: "http://192.168.1.5:3000/api/change-fullname",
      //   headers: {
      //     Authorization: "Bearer " + token,
      //   }
      //}
      const response = await axios.post(
        `${BASE_URL}api/change-fullname`,
        {fullName},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      const {status, error, FullNameUser} = response.data;
      //  console.log(response.data)
      //  console.log(FullNameUser)
      if (status == 'ok') {
        Alert.alert('Thành công', 'Đổi TEN thành công', [{text: 'OK'}]);
        
        dispatch({
          type: 'CHANGE_NAME',
          payload: FullNameUser,
        });
      } else {
        Alert.alert('Thất bại', error, [{text: 'OK'}]);
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const onChangPhoneNumber = (phoneNumber: string) => {
  console.log('phone là gì: ' + phoneNumber);
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      // let config={
      //   url: "http://192.168.1.5:3000/api/change-fullname",
      //   headers: {
      //     Authorization: "Bearer " + token,
      //   }
      //}
      const response = await axios.post(
        `${BASE_URL}api/change-phoneNumber`,
        {phoneNumber},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      const {status, error, PhoneNumbers} = response.data;
      //  console.log(response.data)
      //  console.log(FullNameUser)
      if (status == 'ok') {
        Alert.alert('Thành công', 'Đổi SDT thành công', [{text: 'OK'}]);
        dispatch({
          type: 'CHANGE_PHONENUMBER',
          payload: PhoneNumbers,
        });
      } else {
        Alert.alert('Thất bại', error, [{text: 'OK'}]);
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const onChangePassword = (password: string, newpassword: string) => {
  console.log('ĐÁ');
  console.log('passowrd' + password);
  console.log('REpassowrd' + newpassword);
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      //console.log("item99999---:" + getToken);
      const respone = await axios.post(
        `http://192.168.1.5:3000/api/change-password`,
        {
          token,
          password,
          newpassword,
        },
      );
      const {status, error} = respone.data;
      console.log(status);
      if (status == 'ok') {
        Alert.alert('Thành công', 'Đổi mật khẩu thành công', [{text: 'OK'}]);
        dispatch({
          type: 'CHANGE_PASSWORD',
          payload: 'hihi',
        });
      } else {
        Alert.alert('Thất bại', error, [{text: 'OK'}]);
        console.log(error);
      }
    } catch (e) {
      console.log(e);
    }
  };
};
