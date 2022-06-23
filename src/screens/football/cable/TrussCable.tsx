import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { FlatList, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector, useStore } from "react-redux";
import { ApplicationState } from "src/redux";
import { BASE_URL } from "src/utils";
import { setIdCableItem, setListCable } from "./cableSlice";
const data = [
  {
    nameGroup: "Hà Nội Club",
    timeSlot: "17:00-18:00",
    datetime: "20/05/2022",
    namePitch: "Huyen Anh",
    location: "Số 2 Hoàng Minh Giám, Trung Hòa, Cầu giấy, Hà Nội",
    price: "500.000",
    customer: "Hưng Vương",
    phone: "0961461262",
    message: "helo 123",
    nameGroup2: "...",
    content: "dá",
  },
  {
    nameGroup: "Viettel VTI",
    timeSlot: "17:00-18:00",
    datetime: "20/05/2022",
    namePitch: "Huyen Anh",
    location: "Số 2 Hoàng Minh Giám, Trung Hòa, Cầu giấy, Hà Nội",
    price: "500.000",
    customer: "Hưng Vương",
    phone: "0961461262",
    message: "helo 123",
    nameGroup2: "...",
    content: "dá",
  },
  {
    nameGroup: "Hùng Vương 355",
    timeSlot: "17:00-18:00",
    datetime: "20/05/2022",
    namePitch: "Huyen Anh",
    location: "Số 2 Hoàng Minh Giám, Trung Hòa, Cầu giấy, Hà Nội",
    price: "500.000",
    customer: "Hưng Vương",
    phone: "0961461262",
    message: "helo 123",
    nameGroup2: "...",
    content: "dá",
  },
  {
    nameGroup: "Thái Hà Thiển Tôn Kem",
    timeSlot: "17:00-18:00",
    datetime: "20/05/2022",
    namePitch: "Huyen Anh",
    location: "Số 2 Hoàng Minh Giám, Trung Hòa, Cầu giấy, Hà Nội",
    price: "500.000",
    customer: "Hưng Vương",
    phone: "0961461262",
    message: "helo 123",
    nameGroup2: "...",
    content: "dá",
  },
  {
    nameGroup: "Ha Noi Club",
    timeSlot: "17:00-18:00",
    datetime: "20/05/2022",
    namePitch: "Huyen Anh",
    location: "Số 2 Hoàng Minh Giám, Trung Hòa, Cầu giấy, Hà Nội",
    price: "500.000",
    customer: "Hưng Vương",
    phone: "0961461262",
    message: "helo 123",
    nameGroup2: "...",
    content: "dá",
  },
  {
    nameGroup: "Ha Noi Club",
    timeSlot: "17:00-18:00",
    datetime: "20/05/2022",
    namePitch: "Huyen Anh",
    location: "Số 2 Hoàng Minh Giám, Trung Hòa, Cầu giấy, Hà Nội",
    price: "500.000",
    customer: "Hưng Vương",
    phone: "0961461262",
    message: "helo 123",
    nameGroup2: "...",
    content: "dá",
  },
  {
    nameGroup: "Ha Noi Club",
    timeSlot: "17:00-18:00",
    datetime: "20/05/2022",
    namePitch: "Huyen Anh",
    location: "Số 2 Hoàng Minh Giám, Trung Hòa, Cầu giấy, Hà Nội",
    price: "500.000",
    customer: "Hưng Vương",
    phone: "0961461262",
    message: "helo 123",
    nameGroup2: "...",
    content: "dá",
  },
  {
    nameGroup: "Ha Noi Club",
    timeSlot: "17:00-18:00",
    datetime: "20/05/2022",
    namePitch: "Huyen Anh",
    location: "Số 2 Hoàng Minh Giám, Trung Hòa, Cầu giấy, Hà Nội",
    price: "500.000",
    customer: "Hưng Vương",
    phone: "0961461262",
    message: "helo 123",
    nameGroup2: "...",
    content: "dá",
  },
];
interface cableData{
 item:{
  namePitch:string,
  location:string,
  timeSlot:string,
dateTime:string,
  price:string,
  team:string,
  contact:string,
phoneNumber:string,
  message:string,
  team2:string,
  message2:string,
  isStatus:string,
  _id:string
 }
}
interface Props{
  route:{
    params:{
      idCable?: string
    }
  }
}

const TrussCable: React.FC<Props> = ({route}) => {
  let id = route.params?.idCable;
    const dispatch = useDispatch();
    const dataList=useSelector((state: ApplicationState)=>state.cableState.listCable);
    const status=useSelector((state: ApplicationState)=>state.cableState.status);
    const signal=useSelector((state: ApplicationState)=>state.cableState.signal);
    // const id=useSelector((state: ApplicationState)=>state.cableState.idCableItem);
   // const [data,setData]=useState(dataList);
    React.useEffect(()=>{
      callApi();
    },[id,signal])
    const callApi= async()=>{
        try {
          
          const response = await axios.get(
            `${BASE_URL}api/get-cableList`,
            { timeout: 10 * 1000 }
          );
          // console.log("data4---", response.data.footballPitch);
         // setData(response.data.dataFilter)
          console.log('AA--',JSON.stringify(response.data.dataFilter));
          dispatch(setListCable(response.data.dataFilter));
        } catch (error) {
          console.log('err',error);
        }
    }
    const EmptyComponent=()=>{
      return(
        <View style={{height:200,justifyContent: 'center',alignItems: 'center'}}>
        <Text>{''}</Text>
        </View>
      )
    }
    const navigation=useNavigation();
    const RenderItems=({item}:cableData)=>(
      <View style={{ marginBottom: 10, }}>
                  <View style={styles.cable_wrapper}>
                    <View style={styles.left}>
                      <Text style={{ fontWeight: "bold",fontSize:16 ,textAlign:"center"}}>{item.team}</Text>
                    </View>
                    <View style={styles.mid}>
                      <View style={styles.mid_wrap}>
                      <Text
                          style={{
                            textAlign: "center",
                            color:'black'
                           
                          }}
                        >
                          {item.dateTime}
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "red",
                            fontSize: 22,
                          }}
                        >
                          {"VS"}
                        </Text>
                        <Text>{item.timeSlot}</Text>
                      </View>
                    </View>
                    <View style={styles.right}>
                          {
                            item.isStatus=='pending'?(
                              <Text>{'Chờ phản hồi'}</Text>
                            ):(item.isStatus=='ok'?(
                              <Text style={{fontWeight:'bold',fontSize:16}}>{item?.team2}</Text>
                            ):( <View style={styles.right_wrap}>
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 22,
                                  fontWeight: "bold",
                                  color: "orange",
                                }}
                              >
                                {"???"}
                              </Text>
                                <TouchableOpacity onPress={()=>{navigation.navigate('CableDetail' as never); dispatch(setIdCableItem(item._id))}}>
                                <Text
                                style={{ color: "blue", textDecorationLine: "underline",fontWeight:'bold' ,}}
                              >
                                {"Bắt kèo ngay"}
                              </Text>
                                </TouchableOpacity>
                            </View>))
                          }
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      backgroundColor: "#fff",
                      paddingBottom: 5,
                    //  elevation:10
                    }}
                  >
                    <Text>{item.location}</Text>
                  </View>
                </View>
    )
    const wait = (timeout:any) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
      callApi();
    }, []);
  return (
    <View style={styles.container}>
        <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <View style={styles.wrapp}>
        <FlatList
          data={dataList}
          showsVerticalScrollIndicator={false}
          renderItem={RenderItems}
          keyExtractor={item => item._id}
          ListEmptyComponent={EmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:15,
    backgroundColor:"#e5e5e5"
  },
  wrapp: {
    width: "100%",
    paddingHorizontal: 10,
    elevation: 10,
   
  },
  cable_wrapper: {
    // marginHorizontal:10,
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    padding: 10,
    //elevation: 10,
    borderTopLeftRadius:5,
    borderTopRightRadius:5
  },
  left: {
    width: "38%",
    justifyContent: "center",
    alignItems: "center",
  },
  mid: {
    width: "24%",
    justifyContent: "center",
    alignItems: "center",
  },
  mid_wrap: {},
  right: {
    width: "38%",
    justifyContent: "center",
    alignItems: "center",
  },
  right_wrap: {},
});
export default TrussCable;
