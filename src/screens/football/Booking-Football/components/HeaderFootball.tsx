import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Test from "src/screens/user/test";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { setCode, setData, setDay, setTimeBooking } from "../FootballSlice";
import axios from "axios";
import { BASE_URL } from "src/utils";
import { ApplicationState } from "src/redux";
import IconFeather from "react-native-vector-icons/Feather";
interface Props {
  namePitch: string;
}
const HeaderFootball: React.FC<Props> = ({ namePitch }) => {
  const dispatch = useDispatch();
  const [days, setDays] = useState(moment());
  const [selectedId, setSelectedId] = useState(0);
  const length =6;
  var colorBB = "#696969";
  var colorBBa = "#696969";
  if (selectedId === 0) {
    colorBBa = selectedId ? "#DCDCDC" : "gray";
  }
  if (selectedId === length - 1) {
    colorBB = selectedId ? "#DCDCDC" : "gray";
  }
  moment.locale("vi");
  let a = moment().format("LL"); // 24 tháng 7 năm 2018
  a.localeCompare("vi");
  moment().startOf("hour").fromNow(); // 23 phút trước
//NEXT DAY
  const nextDay = () => {
    setSelectedId(selectedId === length - 1 ? length - 1 : selectedId + 1);
    if (selectedId >= 5) {
      console.log(Alert.alert(
          'Không thể Next được !'
         ))
    } else {
      setDays(moment(days).add(1, "days"));
     // console.log(days.format("LLL"));
      const dayF = moment(days).add(1, "days").format("DD");
      const dayM = days.format("MM");
      const dayCode = dayF + dayM;
      //console.log("dayF", dayCode);
    //  dispatch(setDay(dayCode));
      callAPI(dayCode);
      console.log('đã gọi: ',dayCode);
     
    }
  };

  const prevDate = () => {
    setSelectedId(selectedId === 0 ? 0 : selectedId - 1);
    console.log("ID---" + selectedId);
    if (selectedId <= 0) {
      console.log(Alert.alert(
        'Không thể Prev được !'
       ))
    } else {
      //console.log(days.locale("vi").format("LLL"));
      dispatch(setTimeBooking(days.locale("vi").format("LLL")));
      setDays(moment(days).subtract(1, "days"));
      const dayF = moment(days).subtract(1, "days").format("DD");
      const dayM = days.format("MM");
      const dayCode = dayF + dayM;
     /// console.log("dayFF", dayCode);
    // dispatch(setDay(dayCode));
      callAPI(dayCode);
      console.log('đã prev: ',dayCode);
    }
  };
  const callAPI = async (dayCode: string) => {
    const pitchName = "ha";
    const response = await axios.post(
      `${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${dayCode}`,
      { time: 10 * 1000 }
    );
   // console.log("data4---", response.data.footballPitch);
    dispatch(setData(response.data?.footballPitch));
    dispatch(setDay(dayCode));
  };
  return (
    <SafeAreaView>
     <View style={Styles.backView}>
            <IconFeather style={{fontSize: 22,color:'red',paddingVertical:5, fontWeight: "bold"}} name="arrow-left" />
            <Text style={{fontSize: 18,padding:4,color:'#fff',marginLeft:15,fontWeight:'bold'}}>{namePitch}</Text>
          </View>
      <View style={{ flexDirection: "row" }}>
        <Test />
        <View style={Styles.calendar}>
          <View style={Styles.calendar_block}>
            <TouchableOpacity onPress={prevDate}>
              <Icon
                name="chevron-left"
                size={22}
                style={[Styles.btn_navigation, { color: colorBBa }]}
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
                style={[Styles.btn_navigation, { color: colorBB }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HeaderFootball;
const { height } = Dimensions.get("screen");
const height_pitch = height * 0.25;
const Styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
  },
  header: {
    flexDirection: "row",
    // backgroundColor:'blue',
    // backgroundColor: 'red',
    // height: 200
  },
  header_typePitch: {
    width: "50%",
    justifyContent: "center",
    // backgroundColor:"red"
    zIndex: 1,
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
    width: "55%",
    //  backgroundColor: "green",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 20,

    zIndex: 0,
    // padding: 10,
  },
  backView: {
    flexDirection: "row",
    marginHorizontal:15,
    paddingVertical:10
  },
  calendar_block: {
    flexDirection: "row",
    width: "55%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    elevation: 10,
    marginHorizontal: 20,
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
    //  backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 20,
    zIndex: 0,
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
    elevation: 20,
    width: height / 8,
    height: height / 7.5,
    padding: 5,
  },
  Time_Football: {
    fontWeight: "bold",
    //paddingVertical:5,
    // marginHorizontal:5,
    fontSize: 16,
    justifyContent: "center",
  },
  Icon_Football: {
    fontSize: 35,
    paddingVertical: 5,
    marginTop: 8,
    // elevation:50,
    color: "#C0C0C0",
  },
  //FOOTER END

  footer_container: {
    backgroundColor: "white",
    height: height_pitch / 4,
    justifyContent: "center",
    // alignItems: 'flex-end',
    elevation: 1,
    // opacity:.5
    marginVertical: 5,
  },
  footer_wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footer_element: {
    flexDirection: "row",
  },
  dot_status_playing: {
    padding: 3,
    color: "green",
    fontWeight: "bold",
    fontSize: 14,
  },
  dot_status_payed: {
    padding: 3,
    color: "purple",
    fontWeight: "bold",
    fontSize: 14,
  },
});
