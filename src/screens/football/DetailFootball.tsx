import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconFeather from "react-native-vector-icons/Feather";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Images from "themes/index";
import { ApplicationState } from "src/redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  setContact,
  setPhone,
  setPricePitch,
  setTimeSlot,
} from "./cable/cableSlice";
import { useAppSelector } from "src/API";
import moment from "moment";
import "moment/locale/vi";
const DetailsFootball: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const fullName = useAppSelector((state) => state.userState.fullName);
  const phoneNumber = useAppSelector((state) => state.userState.phoneNumber);
  const namePitch = useAppSelector((state) => state.footbalState.namePitch);
  //const timeBooking = useAppSelector((state) => state.footbalState.timeBooking);
  const dispatch = useDispatch();
  const currentDate =moment().format('L')
  const { id, price, time } = route.params;
  const [nameCustomer, setNameCustomer] = useState(fullName);
  // const [phoneCustomer, setPhoneCustomer] = useState(phoneNumber);
  const [content, setContent] = useState("...");
  const [sdt, setSdt] = useState(phoneNumber);
  // const money = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //console.log('666--',money);
  const discount = 15.0;
  const Total = price - discount;
  console.log(Total.toFixed(3));
  useEffect(() => {

  }, []);

  const textInputChange = (value: any) => {
    setNameCustomer(value);
  };
  const contentInputChange = (value: any) => {
    setContent(value);
  };
  const setPhoneNumber = (value: any) => {
    setSdt(value);
  };
  function next() {
    dispatch(setContact(nameCustomer));
    dispatch(setPhone(sdt));
    dispatch(setPricePitch(Total.toFixed(3)));
    dispatch(setTimeSlot(time));
    navigation.navigate("PaymentScreen", {
      ID_next: id,
      pricess: Total.toFixed(3),
      time: time,
      nameCustomer: nameCustomer,
      content: content,
      sdt: sdt,
    });
  }
  return (
    <View>
      <StatusBar backgroundColor="green" barStyle="dark-content" />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView>
          <View style={styles.Header}>
            <View style={styles.backView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IconFeather
                  style={{
                    fontSize: 22,
                    color: "#fff",
                    paddingVertical: 5,
                    fontWeight: "bold",
                  }}
                  name="arrow-left"
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: Platform.OS === "ios" ? 14 : 16,
                  padding: 5,
                  color: "#fff",
                  marginLeft: 15,
                  fontWeight: "bold",
                }}
              >
                {namePitch}
              </Text>
            </View>
            <View style={styles.text_Date}>
              <IconFontAwesome
                style={{ paddingVertical: 5, fontSize: 20 }}
                name="calendar"
                color="white"
              />
              <Text
                style={{
                  height: 30,
                  fontSize: Platform.OS === "ios" ? 16 : 20,
                  marginLeft: 5,
                  color: "white",
                  padding: 2,
                }}
              >
                {currentDate}
              </Text>
            </View>
          </View>
          <View style={styles.Body_block}>
            <View style={styles.body_wrap}>
              <View style={styles.top_block}>
                <IconAntDesign
                  name="clockcircleo"
                  color="black"
                  style={{
                    paddingVertical: 6,
                    fontSize: 20,
                    paddingHorizontal: 3,
                  }}
                />
                <Text style={styles.text_timeFootball}>{time}</Text>
                <Image
                  source={Images.Icon_san_dau}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <View style={styles.input_info}>
                  <Text style={{ paddingVertical: 5 }}>
                    <IconAntDesign name="user" style={{ fontSize: 18 }} />
                  </Text>
                  <TextInput
                    style={{ width: "96%", paddingHorizontal: 5 }}
                    onChangeText={(val) => textInputChange(val)}
                    placeholder="Nhập tên"
                  >
                    {fullName}
                  </TextInput>
                </View>
                <View style={styles.input_info}>
                  <Text style={{ paddingVertical: 5 }}>
                    <IconFontAwesome name="phone" style={{ fontSize: 18 }} />
                  </Text>
                  <TextInput
                    style={{ width: "96%", paddingHorizontal: 5 }}
                    onChangeText={(val) => setPhoneNumber(val)}
                    placeholder="Nhập số điện thoại"
                  >
                    {sdt}
                  </TextInput>
                </View>
                <TextInput
                  placeholder="Thông tin thêm"
                  multiline={true}
                  numberOfLines={4}
                  style={styles.input_info_area}
                  onChangeText={(val) => contentInputChange(val)}
                ></TextInput>

                <View style={styles.input_info_2}>
                  <View style={styles.input_info_2_1}>
                    <Text>Tiền sân</Text>
                    <Text style={{ fontWeight: "bold", marginRight: 3 }}>
                      {price}
                    </Text>
                  </View>
                  <View style={styles.input_info_2_1}>
                    <Text style={styles.input_info_2_0}>Được giảm giá</Text>
                    <View style={styles.input_info_2_2}>
                      <Text style={{ marginVertical: 5 }}>15.000</Text>
                      <Text
                        style={{
                          borderLeftWidth: 1,
                          borderLeftColor: "gray",
                          marginHorizontal: 5,
                          textAlign: "right",
                        }}
                      ></Text>
                      <Text style={{ marginVertical: 5, fontWeight: "bold" }}>
                        %
                      </Text>
                    </View>
                  </View>
                  <View style={styles.input_info_2_1}>
                    <Text style={styles.input_info_2_0}>Tổng tiền</Text>
                    <Text style={styles.input_info_2_3}>
                      {Total.toFixed(3)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              {/* <Text style={styles.btn_ss} onPress={()=>navigation.navigate('NavigationBack',{ix:5})}> ĐẶT SÂN</Text> */}
              <Text style={styles.btn_ss} onPress={() => next()}>
                {" "}
                ĐẶT SÂN
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  Header: {
    height: "40%",
    backgroundColor: "green",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  text_Date: {
    flexDirection: "row",
    backgroundColor: "#006400",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 5,

    //marginTop: 10,
  },

  // Body
  Body_block: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: -170,
    borderRadius: 10,
    elevation: 20,
  },
  body_wrap: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 5,
  },
  top_block: {
    flexDirection: "row",
  },
  text_timeFootball: {
    fontSize: Platform.OS === "ios" ? 12 : 15,
    color: "black",
    marginBottom: 15,
    //marginVertical: 5,
    marginVertical: Platform.OS === "ios" ? 6 : 5,
    marginEnd: 3,
    fontWeight: "bold",
  },
  input_info: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 8,
  },
  input_info_area: {
    height: 100,
    textAlignVertical: "top",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 8,
  },
  input_info_2: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 8,
  },
  input_info_2_0: {
    paddingVertical: 6,
  },
  input_info_2_1: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    //alignItems:'flex-start'
    marginEnd: 30,
  },
  input_info_2_2: {
    flexDirection: "row",
    //marginVertical:10,
    // justifyContent:'space-between',
    //alignItems:'flex-start'
    //marginEnd:30,
    paddingHorizontal: 6,
    //paddingVertical:6,
    width: "40%",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "flex-end",
  },
  input_info_2_3: {
    flexDirection: "row",
    //marginVertical:10,
    // justifyContent:'space-between',
    //alignItems:'flex-start'
    //marginEnd:30,
    paddingHorizontal: 6,
    paddingVertical: 6,
    width: "40%",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "gray",
    textAlign: "right",
    color: "red",
  },
  btn_ss: {
    justifyContent: "center",
    backgroundColor: "green",
    color: "white",
    borderRadius: 30,
    paddingVertical: 15,
    textAlign: "center",
    marginHorizontal: 60,
    marginBottom: 20,
  },
  //back
  backView: {
    flexDirection: "row",
    marginHorizontal: 15,
    paddingVertical: 10,
  },
});
export default DetailsFootball;
