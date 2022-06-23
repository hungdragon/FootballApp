import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Images from 'themes/index';
import Login from './Login';
import SignUp from './Register';


const Tab = createMaterialTopTabNavigator();

const Styles = StyleSheet.create({
  containerImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  Logo: {
    width: 200,
    height: 200,
  },
  Form: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: 'white',
  },
});

const LoginHome = () => {
  return (
    <View style={{backgroundColor: 'white'}}>
       <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" />
      <View style={Styles.containerImage}>
        <Image source={Images.Logo} style={Styles.Logo} />
      </View>
      <View style={Styles.Form}>
        <Tab.Navigator>
          <Tab.Screen name="Đăng nhập" component={Login} />
          <Tab.Screen name="Đăng ký" component={SignUp} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default LoginHome;
