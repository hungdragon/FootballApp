import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import moment from "moment";
import "moment/locale/vi";
import { BASE_URL } from "src/utils";
import { setCode, setData, setId, setTimeBooking } from "../FootballSlice";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "src/redux";
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
interface Props {
  navigation: any;
  route: any;
  namePitch: string;
}
const GridFootball: React.FC<Props> = ({ navigation, route, namePitch }) => {
  const dispatch=useDispatch();
  let TODAY = moment().format("llll");
  const isToday=moment().format('L');
  console.log('j--',isToday);
  const dataPitch = useSelector(
    (state: ApplicationState) => state.footbalState.data
  );
  let date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  var mm = date.getMonth() + 1;
  if (mm < 10) {
    mm = "0" + mm;
  }
  const code = String(day + mm);
  dispatch(setCode(code));
  const codeNew = useSelector(
    (state: ApplicationState) => state.footbalState.code
  );
  let getHour = new Date().getHours();
  useEffect(() => {
    callAPI();
  }, []);
  const callAPI = async () => {
    const pitchName = "ha";
    const response = await axios.post(
      `${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${codeNew}`,
      { time: 10 * 1000 }
    );
    dispatch(setData(response.data.footballPitch));
    dispatch(setCode(codeNew));
    dispatch(setId(response.data._id));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    console.log("ma code --", codeNew);
    wait(2000).then(() => setRefreshing(false));
    const pitchName = "ha";
    const response = await axios.post(
      `${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${codeNew}`,
      { time: 10 * 1000 }
    );
    dispatch(setData(response.data.footballPitch));
    dispatch(setId(response.data._id));
    dispatch(setCode(codeNew));
  }, []);
  console.log("777--", TODAY);
  return (
    <ScrollView
      contentContainerStyle={{ zIndex: -1 }}
      style={{ zIndex: -1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={Styles.Pitch_container}>
        {dataPitch.map((item: any, index: any) => (
          <View key={index} style={Styles.Pitch_wrap}>
            <View style={Styles.Pitch_element}>
              <Text style={Styles.Time_Football}>{item.timeSlot}</Text>

              {item.status == "payed" && getHour < item.timeStart ? (
                <Animatable.View animation="flash" duration={1000}>
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
                </Animatable.View>
              ) : item.timeStart <= getHour <= item.timeEnd &&
                item.status === "payed" ? (
                <Icon
                  name="soccer-ball-o"
                  style={[Styles.Icon_Football, { color: "green" }]}
                />
              ) : item.timeStart >= getHour && code == "0305" ? (
                <TouchableOpacity
                  onPress={() => {
                   
                    dispatch(setTimeBooking(isToday));
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
              ) : item.timeStart < getHour && code == "0305" ? (
                <Icon
                  name="close"
                  style={[Styles.Icon_Football, { color: "red" }]}
                />
              ) : item.timeStart >= getHour && code !== "0305" ? (
                <Icon
                  name="plus"
                  style={[Styles.Icon_Football, { color: "gray" }]}
                />
              ) : (
                <Icon
                  name="close"
                  style={[Styles.Icon_Football, { color: "red" }]}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default GridFootball;
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
    //   backgroundColor: "green",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: 20,

    zIndex: 0,
    padding: 10,
  },
  calendar_block: {
    flexDirection: "row",
    width: "55%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
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
    zIndex: -1,
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
