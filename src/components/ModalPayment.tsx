import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { BASE_URL } from "src/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setBayUpData,
  setCocaData,
  setCode,
  setData,
  setMarData,
  setProductServiceData,
  setReviveData,
  setStatusPayment,
} from "src/screens/football/Booking-Football/FootballSlice";
import { ApplicationState } from "src/redux";
import moment from "moment";
import "moment/locale/vi";
import axios from "axios";
import { setCustomerDetailData, setNumberBooking } from "src/screens/user/userSlice";
import { useAppSelector } from "src/API";
interface Props {
  navigation: any;
  route: any;
}
const ModalPayment: React.FC<Props> = ({ navigation, route }) => {
  const { ID_goback, Total } = route.params;
  console.log('aaa---',ID_goback);
  const a =ID_goback
  const dispatch = useDispatch();
  const code = useSelector(
    (state: ApplicationState) => state.footbalState.code
  );
  const productServiceDATA =useSelector((state: ApplicationState)=>state.footbalState.productServiceData)
  const id = useSelector((state: ApplicationState) => state.footbalState.id);
   const gotoHome=()=>{
     callApi()
        navigation.navigate("home", {
           ID_goback: ID_goback,
         }); // truyền lại về View A
         
   }

   const customerName =useAppSelector(state=>state.userState.fullName);
   const numberPhone =useAppSelector(state=>state.userState.phoneNumber)
   const username =useAppSelector(state=>state.userState.username);

   const namePitch =useAppSelector(state=>state.footbalState.namePitch)
   const timeBooking=useAppSelector(state=>state.footbalState.timeBooking)
   const date=moment().format('L');
   const location=useAppSelector(state=>state.cableState.location)
   const total=useAppSelector(state=>state.footbalState.totalCustomer)
   const comment=useAppSelector(state=>state.footbalState.comment)
   const timeSlot=useAppSelector(state=>state.footbalState.timeSlot)
   const pricePitch=useAppSelector(state=>state.footbalState.priceFootball)

   const cocaData =useAppSelector(state=>state.footbalState.cocaData)
   const bayUpData =useAppSelector(state=>state.footbalState.bayUpData)
   const reviveData =useAppSelector(state=>state.footbalState.reviveData)
   const marData =useAppSelector(state=>state.footbalState.marData)
   const dataService=[...cocaData,...bayUpData,...reviveData,...marData];
   console.log(customerName,numberPhone,username,namePitch,timeBooking,date,location,total,comment);
  //  const callApiBooking = async()=>{
  //   try {
        
  //     const response = await axios.post(
  //       `${BASE_URL}api/GETcustomer-detail`,
  //       {  
  //       username,
  //        }
  //     );
  //     // console.log("data4---", response.data.footballPitch);
     
  //     console.log('123--',JSON.stringify(response.data));
  //    dispatch(setCustomerDetailData(response.data));
  //    const countBooking =response.data.length;
  //    dispatch( setNumberBooking(countBooking))
  //    console.log('so tran dat1:',countBooking);
  //  //  setListData(response.data)
  //   } catch (error) {
  //     console.log('err',error);
  //   }
  // }
   const callApi = async()=>{
  
  
      await axios.post(
        `${BASE_URL}api/customer-detail`,
        {  namePitch,
        timeSlot,
        timeBooking,
         date,
        customerName,
        numberPhone,
        comment,
        pricePitch,
        dataService,
        location,
        total,
        username,
         }
      ).then(()=>{
         dispatch(setProductServiceData([]))
        // dispatch(setProductServiceData([]));
        console.log('da xoa san pham');
        dispatch(setReviveData([]))
        dispatch(setCocaData([]))
        dispatch(setBayUpData([]))
        dispatch(setMarData([]))
      }).catch((err)=>{
        console.log('Err API product Service',err);
      })
    
     
    
   
      await axios
          .post(
            `${BASE_URL}api/GETcustomer-detail`,
           
           {username: 'hung4000' } 
          )
          .then((response) => {
                console.log('gg',JSON.stringify(response.data.dataFilter));
               dispatch(setCustomerDetailData(response.data.dataFilter))
               dispatch(setNumberBooking(response.data.size))
              // dispatch(setProductServiceData(productServiceDATA.length=0))
               // dispatch(setProductServiceData([]));
                // dispatch(setReviveData([]))
                // dispatch(setCocaData([]))
                // dispatch(setBayUpData([]))
                // dispatch(setMarData([]))

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
   }
  return (
    <View style={styles.container}>
      <View style={styles.modalBlock}>
        <View style={styles.modalWrap}>
          <Animatable.Text animation="bounceIn">
            <AntDesignIcon
              name="circledown"
              size={Platform.OS ==='ios'?30:50}
              style={{ color: "#00FF00" }}
            />
          </Animatable.Text>
          <Text style={styles.textSuccess}>
            {/* {"Thanh toán thành công" + Total + "---" + ID_goback} */}
            {"Thanh toán thành công"}
          </Text>
        </View>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('CreateCable',{  ID_goback: a});
           callApi();
        }}>
          <View style={styles.cableView}>
            <AntDesignIcon
              name="pluscircle"
              size={20}
              style={{ color: "orange" }}
            />
            <Text style={styles.textCable}>Tạo cáp kèo</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.goHome}>
          <TouchableOpacity
            onPress={() => {
              gotoHome();
             // callApiBooking();
            }}
          >
            <Text style={styles.textHome}>Đi đến trang chủ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "gray",
  },
  modalBlock: {
    height: 200,
    width: 300,
    backgroundColor: "#FFF",
    elevation: 20,
    borderRadius: 10,
  },
  modalWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.8,
    //flexWrap:'wrap'
  },
  textSuccess: {
    fontSize: Platform.OS ==='ios'? 12:20,
    marginLeft: 3,
  },
  cableView: {
    flexDirection: "row",
    //justifyContent: 'center',
    alignItems: "center",
    marginHorizontal: 40,
  },
  textCable: {
    marginLeft: 3,
  },
  goHome: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 30,
  },
  textHome: {
    color: "red",
    textDecorationLine: "underline",
  },
});

export default ModalPayment;
