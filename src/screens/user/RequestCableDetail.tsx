import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import _ from "lodash";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "src/redux";
import { BASE_URL } from "src/utils";
import { setSignal, setStatus } from "../football/cable/cableSlice";
import { setCountCable, setRequestCableData } from "./userSlice";
interface Props{
  route:{
    params:{
      id:any;
    }
  }
}
const RequestCableDetail: React.FC<Props> = ({route}) => {

  const id =route.params?.id
  console.log('hhh--',id);
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const data=useSelector((state:ApplicationState)=>state.userState.requestCableData);
  const countCable=useSelector((state: ApplicationState)=>state.userState.countCable);
  //  const id =data[0]?._id;
  // console.log('rrrr---',JSON.stringify(data));
  const newData =_.filter(data, o=>{
    return o._id ===id
  })

  const senRequestApprove = async () => {
   
      const statusRequest = "ok";
      const response = await axios.post(
        `${BASE_URL}api/update-cable?status=${statusRequest}&id=${id}`,
        { time: 10 * 1000 }
      );

      const { status, error } = response.data;
      if (status === "ok") {
        try {
          dispatch(setStatus("ok"));
         // dispatch( setCountCable(countCable-1))
         dispatch(setSignal(id));
          Alert.alert("Thành công", "Chien luon", [
            { text: "OK", onPress: () =>{ navigation.navigate('RequestCable' as never,{ idBack: id} as never) }},
          ]);
        } catch (error) {
          console.log("err", error);
        }
      } else {
        Alert.alert("Thất bại", "Gửi yêu cầu thất bại", [{ text: "OK" }]);
      }
   
  };
  const senRequestReject = async () => {
   
    const statusRequest = "open";
    const response = await axios.post(
      `${BASE_URL}api/update-cable?status=${statusRequest}&id=${id}`,
      { time: 10 * 1000 }
    );

    const { status, error } = response.data;
    if (status === "ok") {
      try {
        dispatch(setStatus("ok"));
      //  dispatch( setCountCable(countCable-1))
        dispatch(setSignal(id));
        Alert.alert("Thành công", "Bắt đội thành công", [
          { text: "OK", onPress: () =>{ navigation.navigate('RequestCable' as never,{ idBack: id} as never) }},
        ]);
      } catch (error) {
        console.log("err", error);
      }
    } else {
      Alert.alert("Thất bại", "Gửi yêu cầu thất bại", [{ text: "OK" }]);
    }
   
  };
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.header}>
            <Text>{ }</Text>
            <Text style={styles.title}>CÁP ĐỘI</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="close" size={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewContent}>
            <Text style={styles.textTeam}> Tên đội bóng: {newData[0]?.team2}</Text>
            <Text style={styles.textTeam}> Số điện thoại: {newData[0]?.phoneNumber}</Text>
            <Text  style={styles.textTeam}> Nội dụng: {newData[0]?.message2}</Text>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity   onPress={senRequestReject}>
            <Text style={styles.btnReject}>Từ chối</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={senRequestApprove}>
            <Text  style={styles.btnApprove}>Chấp nhận</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  modalView: {
    flex: 0.45,
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 10,
    elevation: 10,
  },
  header: {
    marginHorizontal: 15,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection:'row'
  },
  title:{
      fontSize:26,
      marginLeft:20
  },
  viewContent:{
    //  backgroundColor:'red',
      marginHorizontal:30,
      marginVertical:10,
      flex:.8
  },
  textTeam:{
    fontSize:16,
    marginVertical:5
  },
  footer:{
    marginHorizontal:30,
   // backgroundColor:'pink',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  btnReject:{
    backgroundColor:'#e5e5e5',
    padding:10,
    width:110,
    textAlign:'center',
    borderRadius:15,
    fontWeight:'bold'
  },
  btnApprove:{
    backgroundColor:'green',
    padding:10,
    width:110,
    textAlign:'center',
    borderRadius:15,
    color:'white',
    fontWeight:'bold'
  }
});
export default RequestCableDetail;
