import {Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Images from 'themes/index';
import {View} from 'react-native';
import Hello from 'components/Hello';
import FindPitch from 'src/screens/football/FindPitch';
import StackNavigationProfile from './StackNavigationProfile';
import Test from 'src/screens/user/test';
import TestImage from 'src/screens/football/Booking-Football/TestImage';
import StackNavigationCable from './StackNavigationCable';
import Profile from 'src/screens/user/Profile';
import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const Navigation: React.FC = () => {
  const navigation =useNavigation();
  return (
   <>
     <StatusBar
    translucent
    backgroundColor="rgba(0,0,0,0)"
    barStyle="dark-content"
  />
    <Tab.Navigator
    
    screenOptions={{headerShown: false, tabBarActiveTintColor: '#e91e63',}}>
    <Tab.Screen
      name="Home"
      options={{
      
        tabBarIcon: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
         
              <IconFontAwesome name="home" size={30} style={{color:'#00BFFF'}} />
           
          </TouchableOpacity>
        ),
      }}
      // component={FindPitch}
      component={FindPitch}
    />
    {/* <Tab.Screen
      name="Đặt sân"
      options={{
        tabBarIcon: () => (
          <Image
            source={Images.Icon_san_dau}
            style={{width: 30, height: 30}}
          />
        ),
      }}
      // component={Datsan}
      component={View}
    /> */}
      <Tab.Screen
      name="user"
     
      options={{
        title: 'Cá nhân',
        tabBarIcon: () => (
          <TouchableOpacity onPress={() => navigation.navigate('user' as never)}>
           
              <IconFontAwesome name="user" size={40} color="#4B0082" />
            
          </TouchableOpacity>
        ),
      }}
      //   component={Navigation_Profile}
      component={StackNavigationProfile}
    />
    <Tab.Screen
      name="Cable"
      options={{
        title: "Cáp đội ",
        tabBarIcon: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Cable' as never)}>
             <Image
            source={Images.Icon_san_dau}
            style={{width: 30, height: 30}}
          />
          </TouchableOpacity>
        ),
      }}
      //component={PitchDropDown}
      component={StackNavigationCable}
    />
  
  </Tab.Navigator>
   </>
  );
};

export default Navigation;
