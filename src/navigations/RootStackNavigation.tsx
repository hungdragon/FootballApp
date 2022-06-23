import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "screens/user/Profile";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlightBase,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useMemo, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";
import { ApplicationState } from "src/redux";
import SplashScreen from "src/screens/login/SplashScreen";
import StackNavigationFootball from "./StackNavigationFootball";
import LoginTabs from "screens/login/LoginTabs";
import { BASE_URL } from "src/utils";
import {
  changeUserName,
  setCountCable,
  setCustomerDetailData,
  setFullName,
  setIsAdmin,
  setNumberBooking,
  setPhoneNumber,
  setToken,
} from "src/screens/user/userSlice";
import axios from "axios";
import { useAppSelector } from "src/API";
import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";
import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import { parse } from "date-fns";
const Stack = createNativeStackNavigator();
const RootStackNavigation = () => {
  const dispatch = useDispatch();
  // const {token, isLoading, isAdmin,username} = useSelector(
  //   (state: ApplicationState) => state.userReducer,
  // );
  console.disableYellowBox = true;
  // console.log('User name Login: ',username);
  // const callApiBooking = async(username: string)=>{
  //   try {
  //     const response = await axios.post(
  //       `${BASE_URL}api/GETcustomer-detail`,
  //       {
  //         username,
  //        }
  //     );
  //     //console.log('123--',JSON.stringify(response.data));
  //    dispatch(setCustomerDetailData(response.data));
  //    const countBooking =response.data.length;
  //    dispatch(setNumberBooking(countBooking))
  //    //console.log('so tran dat1:',countBooking);
  //  //  setListData(response.data)
  //   } catch (error) {
  //     console.log('err',error);
  //   }
  // }
  const isToken = useAppSelector((state) => state.userState.token);
  const isAdmin = useAppSelector((state) => state.userState.isAdmin);
 // const username = useAppSelector((state) => state.userState.username);
 // console.log('---username---', username)
  // const [tokens, setToken]=useState<string| null>('');
  // const [isAdmin, setIsAdmin]=useState<string| null>('');
 // const [usernameReload, setUserameReload]=useState('');
  const [loading, setLoading] = useState<boolean>(false);
  console.log("token fake: ", isToken);
  const CALL_API = async () => {
    const _token = await AsyncStorage.getItem("token");
    const _role = await AsyncStorage.getItem("role");
    if (!_token) {
      console.log("token in AsyncStore === null");
    } else {
      setLoading(true);
      dispatch(setToken(_token));
      dispatch(setIsAdmin(_role));
      console.log("Token123: " + _token);
      // dispatch({type: 'RETRIEVE_TOKEN', payload: _token, role: _role});
      setTimeout(async () => {
        await axios
          .get(`${BASE_URL}users/me`, {
            headers: {
              Authorization: "Bearer " + _token,
            },
          })
          .then((response) => {
            var { fullName, phoneNumber, username } = response.data;
            dispatch(setFullName(fullName));
            dispatch(setPhoneNumber(phoneNumber));
            console.log('uuu---',username);
            dispatch(changeUserName(username));
            callApi2(username);
          //  setUserameReload(username);
            //  callApiBooking(username);
            setLoading(false);
          })
          .catch((err) => {
            console.log("Err GET me: ", err);
            setLoading(false);
          });

      }, 1000);
    }
  };


  const callApi2= async(username:string)=>{
      // call API------------------------------------------------
      await axios
      .post(
        `${BASE_URL}api/GETcustomer-detail`,
       
       {username } 
      )
      .then((response) => {
            console.log('gg',JSON.stringify(response.data.dataFilter));
           dispatch(setCustomerDetailData(response.data.dataFilter))
        // const dataFake = [{timeBooking: '22/6/2022'}, {timeBooking: '23/6/2022'}, {timeBooking: '19/6/2022'}]
        // const dataFilter = _.filter(dataFake, (o) => {
        //   const timeBooking = _.get(o, 'timeBooking', '');
        //   const isAfterNow = moment(timeBooking, "DD/MM/YYYY").isAfter(
        //     moment()
        //   );
        //   console.log("---isAfterNow----", isAfterNow);
        // });
      })
      .catch((Err) => {
        console.log("Err Api 2: ", Err);
      });
    //API----------------------------------------------------
      
      await axios.get(
        `${BASE_URL}api/get-cableList`,
        { timeout: 10 * 1000 }
      ).then((response)=>{
        const data=response.data.dataFilter;
        console.log('mm---',data);
        console.log('username99--',username);
        const dataFilter= _.filter(data,o=>{
          console.log('aaaaaa');
          if( o.username===username && o.isStatus ==="pending"){
            return o;
          }
       })
     //  let cableCount=_.size(dataFilter)
     //  Alert.alert(String(cableCount));
      // console.log('So tran cap doi  theo User: ',cableCount);
      console.log('bbbbb');
      console.log('rr--',dataFilter);
      const cableCount =dataFilter.length;
      console.log('sl---',cableCount);
       dispatch(setCountCable(cableCount))
      }).catch((Err)=>{
        console.log('Err Api 3: ',Err);
      })
  }
  useEffect(() => {
    CALL_API();
  }, [!isToken]);
  if (loading) {
    return (
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  console.log("admin là gì: " + isAdmin);
  return (
    <>
      <StatusBar
        // translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <NavigationContainer>
        {console.log("gg====" + isToken)}
        {isToken === null || undefined ? (
          <Stack.Navigator>
            <Stack.Screen
              name="hi"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginHome"
              component={LoginTabs}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : isAdmin == "0" ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Navigation"
              component={StackNavigationFootball}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default RootStackNavigation;
