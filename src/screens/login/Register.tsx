import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";
import { RegisterAPI } from "src/redux";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
  },
  form: {
    flexDirection: "column",
    margin: 20,
    //backgroundColor:'blue'
  },
  Body: {
    flexDirection: "column",
    // height:400,
    backgroundColor: "green",
  },
  Title: {
    // backgroundColor:'blue',
    fontSize: 25,
    fontWeight: "bold",
  },
  textInput: {
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,
    borderRadius: 20,
    width: 250,
    padding: 5,
    borderWidth: 1,

    borderColor: "gray",
  },
  ButtonText: {
    //fontFamily:'NunitoSasn-Black',
    fontSize: 13,
    textAlign: "center",
    color: "white",
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
    marginStart: 10,
    marginEnd: 10,
  },
  text_user: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    width: 250,
    padding: 5,
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,

    borderWidth: 1,

    borderColor: "gray",
  },
  text_pass: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    width: 250,
    padding: 5,
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,

    borderWidth: 1,

    borderColor: "gray",
  },
  text_email:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    width: 250,
    padding: 5,
    height: 50,
    // backgroundColor:'gray',
    marginTop: 10,

    borderWidth: 1,

    borderColor: "gray",
  }
});

type Props = {
  navigation: any;
};
const SignUp: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    re_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isRepassword: true,
    isEmail:false
  });
  const checkEmail=(val:string)=>{
    const isEmail=String(val)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if(isEmail){
     setData({
       ...data,
       email:val,
       isEmail:true
     })
    }else{
      setData({
        ...data,
        email:val,
        isEmail:false
      })
    }
  }
  const checkUsername = (value: string) => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        username: value,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: value,
        check_textInputChange: false,
        isValidUser: false,
      });
      console.log(data.username);
    }
    // console.log('username: ',data.username )
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const checkPassword = (val: any) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword:true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword:false
      });
    }
    // console.log('password: '+ data.password)
  };
  const checkRe_password = (val: any) => {
   if(val===data.password){
      setData({
        ...data,
        re_password:val,
        isRepassword:true
      });
    } else {
      setData({
        ...data,
        re_password:val,
        isRepassword:false
      });
    }
    // console.log('password: '+ data.password)
  };
  const dispatch = useDispatch();
  const onRegister=()=>{
   if( data.email===""||data.username===""||data.password==""||data.re_password===""){
     Alert.alert('nhap lai')
   }else{
      if(data.isValidUser && data.isValidPassword&&data.isEmail&&data.isRepassword){
       
        dispatch(RegisterAPI(data.email,data.username,data.password))
      //  navigation.navigate("Navigation");
      }else{
        Alert.alert('yeu cau nhap du cac truong')
      }
   }
  
  }
  return (
    <View style={styles.container}>
       <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" />
      <View style={styles.form}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {/* <Text style={styles.Title}>WELLCOME12😀</Text> */}
        </View>
        <View style={styles.form}>
        <View style={styles.text_email}>
        <TextInput  style={{flex:1}}    placeholder="Email" onChangeText={(val)=>{checkEmail(val)}} />
        {data.isEmail? <Animatable.View animation="bounceIn">
           <IconFeather name='check-circle' color='green' size={20}/>

         </Animatable.View>:null}
        </View>
        
          <View style={styles.text_user}>
            <TextInput
              style={{ flex: 1 }}
              autoCapitalize="none"
              placeholder="Tài khoản"
              onChangeText={(val) => checkUsername(val)}
            />
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red" }}>
                {" "}
                Username mus phai be 4 characters long
              </Text>
            </Animatable.View>
          )}

          {/* PASSWORD */}
          <View style={styles.text_pass}>
            <TextInput
              placeholder="Mật khẩu"
              style={{ flex: 1 }}
              onChangeText={(val) => checkPassword(val)}
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
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red" }}>
                {" password mus phai be 8 characters long "}
              </Text>
            </Animatable.View>
          )}
          <View style={styles.text_pass}>
            <TextInput
              placeholder="Nhap lai Mật khẩu"
              style={{flex: 1}}
              onChangeText={val => checkRe_password(val)}
              secureTextEntry={data.secureTextEntry ? true : false}
            />
          
          </View>
          {data.isRepassword? null:
           <Animatable.View animation="fadeInLeft" duration={500}>
             <Text style={{color:'red'}}>mk chua khop</Text>
           </Animatable.View>
           }
          <TouchableOpacity
            onPress={() => {
              onRegister();
           
            }}
          >
            <Text style={styles.ButtonText}>Đăng ký ➜</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SignUp;
