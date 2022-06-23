import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import IconAntDesign from "react-native-vector-icons/AntDesign";
import React, { useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import GridFootball from "./components/GridFootball";
import HeaderFootball from "./components/HeaderFootball";
import FooterFootball from "./components/FooterFootball";
import axios from "axios";
import { BASE_URL } from "src/utils";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "src/redux";
import IconFeather from "react-native-vector-icons/Feather";
import {
  setCode,
  setData,
  setDay,
  setId,
  setTimeBooking,
} from "./FootballSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import "moment/locale/vi";
import Test from "src/screens/user/test";
import * as Animatable from "react-native-animatable";

import PopupMenu from "src/components/PopupMenu";
import AppHeader from "src/components/AppHeader";
import { useAppSelector } from "src/API";
interface Props {
  navigation: any;
  route: {
    params:{
      ID_goback: number;
    }
  }
}
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const BookFootballPitch: React.FC<Props> = ({ navigation, route }) => {
  const idPitch =useAppSelector(state=>state.footbalState.codeNamePitch);
  const  ID_goback  = route.params?.ID_goback;
  const isToday=moment().format('L'); //Ngay hom nay
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const namePitch =useAppSelector(state=> state.footbalState.namePitch)
 // console.log("ccc99", ID_goback);
  const [days, setDays] = useState(moment());
  const [selectedId, setSelectedId] = useState(0);
  const length = 6;
  let getHour = new Date().getHours();
  let btn_ColorNext = "#696969";
  let btn_ColorPrev = "#696969";
  if (selectedId === 0) {
    btn_ColorPrev = selectedId ? "#DCDCDC" : "gray";
  }
  if (selectedId === length - 1) {
    btn_ColorNext = selectedId ? "#DCDCDC" : "gray";
  }
  let a = moment().format("LL"); // 24 tháng 7 năm 2018
  a.localeCompare("vi");
  moment().startOf("hour").fromNow(); // 23 phút trước
  const dataPitch = useSelector(
    (state: ApplicationState) => state.footbalState.data
  );
  const codeNewDay = useSelector(
    (state: ApplicationState) => state.footbalState.code
  );
  const [dateBooked, setDateBooked]=useState(moment().format('L'));
  console.log('dateBooked---',dateBooked);
  // sinh Code
  const dd =moment().format('DD');
  const mm =moment().format('MM');
  const codeToday = String(dd+mm);
  console.log('code Today: ', codeToday);
  //NEXT DAY
  const nextDay = () => {
    setSelectedId(selectedId === length - 1 ? length - 1 : selectedId + 1);
    if (selectedId >= 5) {
      console.log(Alert.alert("Không thể Next được !"));
    } else {
      setDays(moment(days).add(1, "days"));
    // console.log(days.format("LLL"));
     const tomorrow= moment(days).add(1, "days").format('L')
     console.log('121--------',moment(days).add(1, "days").format('L'))
     const mm=moment(days).add(1, "days").format('L');
     const mmSplice=mm.slice(3,5);
     console.log('ss--',mmSplice);
      dispatch(setTimeBooking(tomorrow))
      const dayF = moment(days).add(1, "days").format("DD");
      const dayM = days.format("MM");
      const dayCode = dayF + mmSplice;
      //console.log("dayF", dayCode);
      setDateBooked(tomorrow);
      //  dispatch(setDay(dayCode));
      callAPI(dayCode,tomorrow);
      console.log("đã gọi: ", dayCode);

    }
  };
  // PREV DAY
  const prevDate = () => {
    setSelectedId(selectedId === 0 ? 0 : selectedId - 1);
    console.log("ID---" + selectedId);
    if (selectedId <= 0) {
      console.log(Alert.alert("Không thể Prev được !"));
    } else {
      console.log('v1--',days.locale("vi").format("LLL"));
      setDays(moment(days).subtract(1, "days"));
      const prevDay=moment(days).subtract(1, "days").format("L");
      dispatch(setTimeBooking(days.locale("vi").format("LLL")));
      const dayF = moment(days).subtract(1, "days").format("DD");
      const mm=moment(days).subtract(1, "days").format('L');
      const mmSplice=mm.slice(3,5);
      const dayCode = dayF + mmSplice;
      console.log('vv--',mmSplice);
      /// console.log("dayFF", dayCode);
      // dispatch(setDay(dayCode));
      setDateBooked(mm);
      callAPI(dayCode,prevDay);
      console.log("đã prev: ", dayCode);
    }
  };
  useEffect(() => {
    console.log('davaoday');
    
    callAPI_ONECE();
    
  },[route.params?.ID_goback]);
  /// thay codeName va them typePitch
  const callAPI_ONECE = async () => {
    const dateTime= days.format("L")
    setLoading(true);
   
    const response = await axios.post(
      `${BASE_URL}api/data-pitch?idPitch=${idPitch}&code=${codeToday}&typePitch=${valueTypePitch}&dateTime=${dateTime}&pitchName=${namePitch}`,
      { time: 10 * 1000 }
    );
    // console.log('data4---',response.data.footballPitch);
    dispatch(setData(response.data.footballPitch));
    dispatch(setCode(codeToday));
    dispatch(setId(response.data._id));
    setLoading(false);
   
  };
  const callAPI = async (dayCode: string,tomorrow:string) => {
    setLoading(true);
    // const dateTime= days.format("L")
    setTimeout(async () => {
      console.log("999999999999999");
    }, 2000);
    console.log("code99", dayCode);
   // const pitchName = "ha";
    await axios.post(
      `${BASE_URL}api/data-pitch?idPitch=${idPitch}&code=${dayCode}&typePitch=${valueTypePitch}&dateTime=${tomorrow}&pitchName=${namePitch}`,
      { time: 10 * 1000 }
    ).then((response)=>{
       // console.log("data4---", response.data.footballPitch);
    dispatch(setData(response.data.footballPitch));
    dispatch(setCode(dayCode));
    dispatch(setId(response.data._id));
    setLoading(false);
    }).catch((Err)=>{
       console.log('ERR0R FF',Err);
      setLoading(false)
       
    }).finally(()=>{
      setLoading(false)
    })
   
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    const dateTime= days.format("L")
    // console.log("ma code --", codeNewDay);
    wait(2000).then(() => setRefreshing(false));
    const pitchName = "ha";
    const response = await axios.post(
      `${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${codeNewDay}&typePitch=${valueTypePitch}&dateTime=${dateTime}&pitchName=${namePitch}`,
      { time: 10 * 1000 }
    );
    dispatch(setData(response.data.footballPitch));
    dispatch(setId(response.data._id));
    dispatch(setCode(codeNewDay));
  };

  // useMemo(async () => {
  //   console.log("code888888", codeNewDay);
  //   const pitchName = "ha";
  //   const response = await axios.post(
  //     `${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${codeNewDay}`,
  //     { time: 10 * 1000 }
  //   );
  //    console.log("data4---", response.data.footballPitch);
  //   dispatch(setData(response.data.footballPitch));
  // }, [ route.params?.ID_goback]);
  console.disableYellowBox = true;
  console.log("code--:", codeToday);
  console.log("codeNew--:", codeNewDay);
//---------------------------------------------------------------------------------------
  const [visible, setVisible] = React.useState(false);
  const [typePitch,setTypePitch]=React.useState('Sân 5');
  const [valueTypePitch,setValueTypePitch]=React.useState('5');
  console.log('valueTypepitch---',valueTypePitch);
  return (
      <SafeAreaView style={Styles.container}>
        <StatusBar backgroundColor='#e5e5e5'  barStyle="dark-content"/> 
        <AppHeader title={namePitch}/>
        <View style={Styles.containerWrap}>
        <View style={{ flexDirection: "row",justifyContent:'space-between',width:'100%' }}>
          <View style={{flex:1}}>
          <View style={{backgroundColor:'#fff',padding:17,borderRadius:10,elevation:3}}>
            <TouchableOpacity onPress={()=>{setVisible(!visible)}}>
                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <Text>{typePitch} </Text>
                <Text> <AntDesign name="caretdown" size={14}/></Text>
                </View>
            </TouchableOpacity>
        </View>
        {
            visible?(
             <View style={{elevation:3,zIndex:11,position: 'absolute',bottom: -100,width:'100%',borderRadius:3,backgroundColor:'#FFF'}}>
                   <TouchableOpacity onPress={()=>{
                    setVisible(!visible);
                     setTypePitch('Sân 5');
                     setValueTypePitch('5');
                     console.log(valueTypePitch);
                     callAPI(codeNewDay,dateBooked);
                     }} style={{padding:15,borderBottomWidth:0.5,borderBottomColor: '#e5e5e5'}}>
                    <Text>
                    {'Sân 5'}
                    </Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{setVisible(!visible); setTypePitch('Sân 7');setValueTypePitch('7');console.log(valueTypePitch); callAPI(codeNewDay,dateBooked);}} style={{padding:15}}>
                    <Text>
                    {'Sân 7'}
                    </Text>
                   </TouchableOpacity>
             </View>
            ):(null)
        }
          </View>
          {/* <Test /> */}
          <View style={Styles.calendar}>
            <View style={Styles.calendar_block}>
              <TouchableOpacity onPress={prevDate}>
                <Icon
                  name="chevron-left"
                  size={22}
                  style={[Styles.btn_navigation, { color: btn_ColorPrev }]}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  // backgroundColor:'red',
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>{days.format("DD")}</Text>

                <Icon
                  name="calendar"
                  size={16}
                  style={{ color: "black", padding: 3 }}
                />
              </View>
              <TouchableOpacity onPress={nextDay}>
                <Icon
                  name="chevron-right"
                  size={22}
                  style={[Styles.btn_navigation, { color: btn_ColorNext }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        </View>
      
    
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
           // opacity: 0.1,
          // backgroundColor:"blue"
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) :
      <ScrollView
        //contentContainerStyle={{backgroundColor:"#e5e5e5"}}
        style={{backgroundColor:'#e5e5e5' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={Styles.Pitch_container}>
          {dataPitch.map((item: any, index: any) => (
            <View key={index} style={Styles.Pitch_wrap}>
              <View style={Styles.Pitch_element}>
                <Text style={Styles.Time_Football}>{item.timeSlot}</Text>

                {item.timeEnd<=getHour && codeToday === codeNewDay ? (
                  <Animatable.View animation="flash" duration={1000}>
                    <Icon
                      name="close"
                      style={[Styles.Icon_Football, { color: "red" }]}
                    />
                  </Animatable.View>
                ) : getHour < item.timeStart &&
                  item.status === "payed" &&
                  codeToday == codeNewDay ? (
                  // <Icon
                  //   name="soccer-ball-o"
                  //   style={[Styles.Icon_Football, { color: "green" }]}
                  // />
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("da dat san");
                    }}
                  >
                    <Icon
                      name="soccer-ball-o"
                      style={[Styles.Icon_Football, { color: "purple" }]}
                    />
                  </TouchableOpacity>
                ) : item.timeStart <= getHour <= item.timeEnd &&
                  item.status == "payed" &&
                  codeToday == codeNewDay ? (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("đang chơi...");
                    }}
                  >
                    <Icon
                      name="soccer-ball-o"
                      style={[Styles.Icon_Football, { color: "green" }]}
                    />
                  </TouchableOpacity>
                ) : item.status === "pending" && codeToday != codeNewDay ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("DetailsFootball", {
                        id: item.id,
                        nanmePitch: namePitch,
                        price: item.price,
                        time: item.timeSlot,
                      });
                    }}
                  >
                    <Icon
                      name="plus"
                      style={[Styles.Icon_Football, { color: "gray" }]}
                    />
                  </TouchableOpacity>
                ) : item.status === "payed" && codeToday != codeNewDay ? (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("đã có người đặt sân này!");
                    }}
                  >
                    <Icon
                      name="soccer-ball-o"
                      style={[Styles.Icon_Football, { color: "purple" }]}
                    />
                  </TouchableOpacity>
                ) :  (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('EE--',dateBooked);
                      dispatch(setTimeBooking(dateBooked));
                      navigation.navigate("DetailsFootball", {
                        id: item.id,
                        nanmePitch: namePitch,
                        price: item.price,
                        time: item.timeSlot,
                      });
                    }}
                  >
                    <Icon
                      name="plus"
                      style={[Styles.Icon_Football, { color: "gray" }]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      } 
      <FooterFootball />
      </SafeAreaView> 

  );
};
const { height } = Dimensions.get("screen");
const height_pitch = height * 0.25;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
  //  backgroundColor:'red'
  backgroundColor:'#e5e5e5'
   
  },
  containerWrap:{
    marginHorizontal: 20,
  //  backgroundColor:'blue',
    flexDirection:'row',
    justifyContent:'space-evenly'
    
  },

  header: {
    flexDirection: "row",
    // backgroundColor:'blue',
    // backgroundColor: 'red',
    // height: 200
  },
  backView: {
    flexDirection: "row",
    marginHorizontal:15,
    paddingVertical:10
  },
  header_typePitch: {
    width: "50%",
    justifyContent: "center",
    // backgroundColor:"red"
    
  },
  _typePitch: {
    // width: "80%",
    backgroundColor: "white",
    margin: 10,
    paddingVertical: 2,
    borderRadius: 10,
    elevation: 10,
    // backgroundColor:"blue",
    marginHorizontal: 20,
  },
  // Calendar
  calendar: {
   // justifyContent: 'space-between',
   justifyContent:'flex-end',
   flexDirection: 'row',
  },
  calendar_block: {
    flexDirection: "row",
    width: "65%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    elevation: 10,
   paddingHorizontal: 20,
    // overflow:'hidden',
  },
  dayofMonth: {
    backgroundColor: "orange",
    padding: 8,
    margin: 5,
    marginVertical: 5,
    borderRadius: 80,
    fontWeight: "bold",
    color: "#fff",
  },
  btn_navigation: {
    // margin:5
  },

  /// Book Football Pitch
  Pitch_container: {
   // flex:1,
    //  backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 20,
   // position: "absolute",
  // backgroundColor:'#e5e5e5'
  
  },
  Pitch_wrap: {
    flexDirection: "row",
    margin: 8,
    
  },
  Pitch_element: {
    //  backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    //padding:5,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
    width: Platform.OS==='ios'? height / 7: height / 8,
    height: Platform.OS==='ios'? height / 6.5: height / 7.5,
   // height: height / 7.5,
    padding: 5,
  },
  Time_Football: {
    fontWeight: "bold",
    //paddingVertical:5,
    // marginHorizontal:5,
   // fontSize: 16,
    justifyContent: "center",
    fontSize: Platform.OS === 'ios' ? 10 : 16
  },
  Icon_Football: {
    fontSize: 35,
    paddingVertical: 5,
    marginTop: 8,
    // elevation:50,
    color: "#C0C0C0",
  },
  btnPopupEdit: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: '#e5e5e5',
  },
  iconEdit: {
    marginEnd: 10,
  },
  btnPopupDelete: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
export default BookFootballPitch;
