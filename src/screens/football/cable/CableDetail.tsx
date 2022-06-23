import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "src/redux";
import GeneralRow from "./component/GeneralRow";
import _ from "lodash";
import axios from "axios";
import { BASE_URL } from "src/utils";
import { useNavigation } from "@react-navigation/native";
import { setIdCableItem, setListCable, setStatus } from "./cableSlice";
interface Detail {
  namePitch: string;
  location: string;
  timeSlot: string;
  dateTime: string;
  price: string;
  team: string;
  contact: string;
  phoneNumber: string;
  message: string;
  team2: string;
  message2: string;
  isStatus: string;
  _id: string;
}
const CableDetail: React.FC = () => {
  const dispatch = useDispatch();
  const idProps = useSelector(
    (state: ApplicationState) => state.cableState.idCableItem
  );
  console.log("id99----", idProps);
  const dataList = useSelector(
    (state: ApplicationState) => state.cableState.listCable
  );
  const navigation = useNavigation();
  const [nameTeam, setNameTeam] = useState("");
  const [message, setMessage] = useState("");
  const dataFilter = _.filter(dataList, (o) => {
    return o._id === idProps;
  });
  const itemData: Detail = dataFilter[0];
  console.log("555--", JSON.stringify(dataFilter));
  const senRequest = async () => {
    if (nameTeam && message !== "") {
      const statusRequest = "pending";
      const response = await axios.post(
        `${BASE_URL}api/update-cable?status=${statusRequest}&id=${idProps}&nameTeam=${nameTeam}&message=${message}`,
        { time: 10 * 1000 }
      );

      const { status, error } = response.data;
      if (status === "ok") {
        try {
          dispatch(setStatus(statusRequest));
        
          Alert.alert("Thành công", "Gửi yêu cầu thành công", [
            { text: "OK", onPress: () =>{
              ///dispatch(setIdCableItem(idProps))
              navigation.navigate('Cables' as never, { idCable:idProps} as never)
            }
             }
          ]);
        } catch (error) {
          console.log("err", error);
        }
      } else {
        Alert.alert("Thất bại", "Gửi yêu cầu thất bại", [{ text: "OK" }]);
      }
    } else {
      Alert.alert("Thất bại", "Thông tin không được để trống", [
        { text: "OK" },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          {"Thông tin cáp kèo"}
        </Text>
      </View>
      <View style={styles.infomation}>
        <GeneralRow label="Tên sân: " content={itemData?.namePitch} />
        <GeneralRow label="Địa chỉ: " content={itemData?.location} />
        <GeneralRow label="Khung gờ: " content={itemData?.timeSlot} />
        <GeneralRow label="Ngày: " content={itemData?.dateTime} />
        <GeneralRow label="Tiền sân: " content={itemData?.price} />
        <GeneralRow label="Đội 1: " content={itemData?.team} />
        <GeneralRow label="Người liên hệ: " content={itemData?.contact} />
        <GeneralRow label="SĐT: " content={itemData?.phoneNumber} />
        <GeneralRow label="Nội dung: " content={itemData?.message} />
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_wrap}>
          <TextInput
            style={styles.txtName}
            placeholder="Tên đội bóng"
            onChangeText={(text) => {
              setNameTeam(text);
            }}
          />
          <TextInput
            style={styles.content}
            placeholder="Nội dung"
            numberOfLines={3}
            maxLength={50}
            onChangeText={(text) => {
              setMessage(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              senRequest();
            }}
            style={{padding:5}}
          >
            <Text style={styles.btnSend}>Gửi yêu cầu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
  },
  infomation: {
    paddingHorizontal: 15,
    width: "90%",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  footer_wrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  txtName: {
    backgroundColor: "#fff",
    width: 240,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  content: {
    backgroundColor: "#fff",
    width: 240,
    height: 80,
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  btnSend: {
    width: 100,
    backgroundColor: "orange",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    fontWeight:'bold',
    paddingHorizontal:5
  
  },
});
export default CableDetail;
