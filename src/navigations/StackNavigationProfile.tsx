import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from 'screens/user/Profile';
import ChangePassword from 'src/screens/user/ChangePassword';
import EditProfile from 'src/screens/user/EditProfile';
import EditScreen from 'src/components/EditScreen';
import PitchDropDown from 'src/screens/football/PitchDropDown';
import ModalPayment from 'src/components/ModalPayment';
import CreateCable from 'src/screens/football/cable/CreateCable';
import RequestCable from 'src/screens/user/RequestCable';
import RequestCableDetail from 'src/screens/user/RequestCableDetail';
import BottomNavigation from './BottomNavigation';
import { StatusBar } from 'react-native';
import CalendarFootball from 'src/screens/user/CalendarFootball';
import CalendarFootballDetail from 'src/screens/user/CalendarFootballDetail';

const Stack = createNativeStackNavigator();

const StackNavigationProfile = () => {
  return (

   <>
      <StatusBar
    translucent
    backgroundColor="rgba(0,0,0,0)"
    barStyle="dark-content"
  />
    <Stack.Navigator>
     
     <Stack.Screen
       name="Profile"
       component={Profile}
       options={{headerShown: false}}
     />
     <Stack.Screen
       name="EditProfile"
       component={EditProfile}
       options={{headerShown: false}}
     />
     <Stack.Screen name="ChangePassword" component={ChangePassword} />
     <Stack.Screen name="EditScreen" component={EditScreen} />
     <Stack.Screen name="ModalPayment"  options={{
         // title: "Sân cỏ VH",
         // headerStyle: {
         //   backgroundColor: "#32CD32",
         // },
         headerShown: false,
       }} component={ModalPayment} />
     {/* <Stack.Screen name="PitchDropDown" component={PitchDropDown} /> */}
     {/* <Stack.Screen name="SingleFootball" component={SingleFootball} options={{headerShown: false}} />  */}
     {/* <Stack.Screen name="Navigation" component={Navigation} /> */}
     {/* <Stack.Screen name="DetailsFootball" component={DetailsFootball}  options={{headerShown: false}}/> */}
     {/* <Stack.Screen name="SingleFootballBB" component={SingleFootball} />  */}
     {/* <Stack.Screen name="NavigationBack" component={Navigation} /> */}
     {/* <Stack.Screen name="SingleFootball" component={SingleFootball} />  */}
       
     <Stack.Screen name="CreateCable"  options={{
        //  title: "Sân cỏ VH",
         // headerStyle: {
         //   backgroundColor: "#32CD32",
         // },
         headerShown: false,
       }} component={CreateCable} />
     <Stack.Screen name="RequestCable"  options={{
         title: "Yêu cầu cáp kèo",
         headerStyle: {
           backgroundColor: "#32CD32",
         },
        
       }} component={RequestCable} />
     <Stack.Screen name="RequestCableDetail"  options={{
        /// title: "Yêu cầu cáp kèo",
        headerShown: false,
         // headerStyle: {
         //   backgroundColor: "#32CD32",
         // },
        
       }} component={RequestCableDetail} />
     <Stack.Screen name="CalendarFootball"  options={{
        title: "Lịch đặt sân",
       // headerShown: false,
         headerStyle: {
           backgroundColor: "#32CD32",
         },
        
       }} component={CalendarFootball} />
     {/* <Stack.Screen name="TabViewExample" component={TabViewExample} /> */}
     <Stack.Screen name="CalendarFootballDetail"  options={{
        title: "Lịch đặt sân",
       // headerShown: false,
         headerStyle: {
           backgroundColor: "#32CD32",
         },
        
       }} component={CalendarFootballDetail} />
     {/* <Stack.Screen name="TabViewExample" component={TabViewExample} /> */}
   </Stack.Navigator>
   </>
  );
};
export default StackNavigationProfile;
