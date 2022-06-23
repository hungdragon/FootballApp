import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';

import {useDispatch,useSelector} from 'react-redux';
import { ApplicationState } from 'src/redux';
import { BASE_URL } from 'src/utils';
import { setBayUpData, setCocaData, setCode, setComment, setMarData, setPriceFootball, setProductServiceData, setReviveData, setTimeSlot, setTotalCustomer } from './Booking-Football/FootballSlice';
import _ from "lodash";
import moment from 'moment';
import "moment/locale/vi";
import { ScrollView } from 'react-native-gesture-handler';
import { useAppSelector } from 'src/API';
import AppHeader from 'src/components/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
const PaymentScreen: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const [currentDate, setCurrentDate] = useState('');
  const {ID_next,pricess,time,nameCustomer, content,sdt,codeService,codePrice,price} = route.params;
  const [idNext,setIdNext]=useState(ID_next);
  const [pricest,setPrice]=useState(pricess);
  const [times,setTime]=useState(time);
  const [nameCustomers,setNameCustomer]=useState(nameCustomer);
  const [contents,setContent]=useState(content);
  const [sdts,setSdt]=useState(sdt);
  const [data, setData] = React.useState('');
   const namePitch=useAppSelector(state=>state.footbalState.namePitch)
   const timeBooking=useAppSelector(state=>state.footbalState.timeBooking)
   const isToday=moment().format('L');
  // console.warn(II);
  const code =useAppSelector(state=>state.footbalState.code)
  const productServiceDATA =useAppSelector(state=>state.footbalState.productServiceData)
  const cocaData =useAppSelector(state=>state.footbalState.cocaData)
  const bayUpData =useAppSelector(state=>state.footbalState.bayUpData)
  const reviveData =useAppSelector(state=>state.footbalState.reviveData)
  const marData =useAppSelector(state=>state.footbalState.marData)
  const id =useAppSelector(state=>state.footbalState.id)
  const dispatch = useDispatch();
  const back= useCallback( async (total:number) => {
    // var axios = require('axios');

    // var config = {
    //   method: 'post',
    //   url: `${BASE_URL}api/data-pitch-update?code=${code}&id=${id}&idSlot=${idNext}`,
    //   headers: { }
    // };
    
    // axios(config)
    // .then(function (response:any) {
    //   console.log(JSON.stringify(response.data));
    //   const aa = navigation.navigate('BookFootballPitch', {ID_goback: idNext}); // truyền lại về View A
    //   console.log(Alert.alert(
    //    'Đặt sân thành công !'
    //     ))
    // })
    // .catch( (error: any)=> {
    //   console.log(error);
    // });
   //  navigation.replace('CardFormPayment', {ID_goback: idNext,Total:total}); // truyền lại về View A
     navigation.navigate('ChoosePayment', {ID_goback: idNext,Total:total}); // truyền lại về View A
     dispatch(setTotalCustomer(total.toFixed(3)))
     dispatch(setComment(contents))
     dispatch(setTimeSlot(times))
     dispatch(setPriceFootball(pricest))
    // const pitchName ='ha'
    // const response = await axios.post(`${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${code}`,{time: 10*1000})
    // console.log('data4---',response.data.footballPitch);
    //  console.log('cmmm---');
    // dispatch(setData(response.data.footballPitch))
    // dispatch(setCode(code))
  },[])
  const kk= JSON.stringify(productServiceDATA);
  const hh= JSON.stringify(cocaData);
  const jj= JSON.stringify(bayUpData);
  const pp= JSON.stringify(reviveData);
  const ll= JSON.stringify(marData);
    console.log('kk------',kk);
    console.log('hh------',hh);
    console.log('jj------',jj);
    console.log('pp------',pp);
    console.log('ll------',ll);
  //const [collage,setCollage]=useState(false);
  const pricePP=Number(price);//tien nuoc uong
  
  console.log(codeService);
  const [text, setText] = React.useState('');
  const hasUnsavedChanges = Boolean(text);
  React.useEffect(() => {
    if (codeService) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    console.log('1---',Total);
    console.log('2---',Number(pricePP));
     if(codeService=='coca') {
      //setAddCoca(addCoca+1);
      setTotal(Total+pricePP)
     }
     else if(codeService=='7up'){
     // setAdd7up(add7up+1);
      setTotal(Total+pricePP)
     }
     else if(codeService=='revive'){
     // setAddRevive(addRevive+1);
      setTotal(Total+pricePP)
     }else{
     // setAddMar(addMar+1);
      setTotal(Total+pricePP)
     }
    }
   
    navigation.addListener('beforeRemove', (e:any) => {
      const action = e.data.action;
      setText('1');
      if (hasUnsavedChanges) {
       Alert.alert('12321');
      }

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Xác nhận!',
        'Bạn có muốn thoát !',
        [
          { text: "Hủy", style: 'cancel', onPress: () => {
         // return;
          }},
          {
            text: 'Đồng ý',
            style: 'default',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              dispatch(setProductServiceData([]));
              dispatch(setReviveData([]))
              dispatch(setCocaData([]))
              dispatch(setBayUpData([]))
              dispatch(setMarData([]))
              navigation.dispatch(action)
            },
          },
        ]
      );
    })





    // const backAction = () => {
    //   Alert.alert("Xác nhận!", "Bạn có muốn thoát !", [
    //     {
    //       text: "Hủy",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "Đồng ý", onPress: () =>{
    //       navigation.navigate('PitchInfoScreen',{id:idNext,price: pricess,time:time})
    //         dispatch(setProductServiceData([]));
    //         dispatch(setReviveData([]))
    //         dispatch(setCocaData([]))
    //         dispatch(setBayUpData([]))
    //         dispatch(setMarData([]))
    //     } }
    //   ]);
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
      
    //   "hardwareBackPress",
    //   backAction
    // );
    // return () => backHandler.remove();
    
  }, [codeService,navigation]);
  const [addCoca,setAddCoca]=useState<number>(1);
  const [addRevive,setAddRevive]=useState<number>(1);
  const [add7up,setAdd7up]=useState<number>(1);
  const [addMar,setAddMar]=useState<number>(1);
   const pricePitchParse=Number(pricest)
   const [Total,setTotal]=useState<number>(pricePitchParse);
   const handleRevive=(code:string,prices:number)=>{
    console.log('price77--',prices);
    if(addRevive===1||addRevive===0){
     // setCollage(false);
      setTotal(Total-prices);
      navigation.setParams({codeService: null});
      const arr_new=_.filter(productServiceDATA, (o: any) => {
        return o.codeService!=code;
      })
      console.log('arr',JSON.stringify(arr_new));
      dispatch(setProductServiceData(arr_new))
      dispatch(setReviveData([]))
    }else{
      console.log('price77--',prices);
      setTotal(Total-prices);
      setAddRevive(addRevive-1)
      const arr_new=_.filter(reviveData, (o: any) => {
        return o.codeService===code;
      })
      let quantity = arr_new[0].quantity;
      quantity = quantity-1;
      const obj={...arr_new[0],quantity:quantity}
     // const objData={...productServiceDATA,...arr_new[0],quantity:quantity}
      console.log('ppp--',arr_new,quantity);
      dispatch(setReviveData([obj]))
    }
    
   }
   const handleCoca=(code:string,prices:number)=>{
     console.log('price88--',prices);
    if(addCoca===1||addCoca===0){
     // setCollage(false);
      setTotal(Total-prices);
      navigation.setParams({codeService: null});
      const arr_new=_.filter(productServiceDATA, (o: any) => {
        return o.codeService!=code;
      })
      console.log('arr',JSON.stringify(arr_new));
      dispatch(setProductServiceData(arr_new))
      dispatch(setCocaData([]))
    }else{
      console.log('price88--',prices);
      const arr_new=_.filter(cocaData, (o: any) => {
        return o.codeService===code;
      })
      setTotal(Total-prices);
      setAddCoca(addCoca-1)
      let quantity = arr_new[0].quantity;
      quantity = quantity-1;
      const obj={...arr_new[0],quantity:quantity}
      console.log('ppp--',arr_new,quantity);
      dispatch(setCocaData([obj]))
    }
    
   }
   const handle7up=(code:string,prices:number)=>{
     console.log('price88--',prices);
    if(add7up===1||add7up===0){
     // setCollage(false);
      setTotal(Total-prices);
      navigation.setParams({codeService: null});
      const arr_new=_.filter(productServiceDATA, (o: any) => {
        return o.codeService!=code;
      })
      console.log('arr',JSON.stringify(arr_new));
      dispatch(setProductServiceData(arr_new))
      dispatch(setBayUpData([]))
    }else{
      console.log('price88--',prices);
      setTotal(Total-prices);
      setAdd7up(add7up-1)
      const arr_new=_.filter(bayUpData, (o: any) => {
        return o.codeService===code;
      })
      let quantity = arr_new[0].quantity;
      quantity = quantity-1;
      const obj={...arr_new[0],quantity:quantity}
      console.log('ppp--',arr_new,quantity);
      dispatch(setBayUpData([obj]))
    }
    
   }
   const handleMar=(code:string,prices:number)=>{
     console.log('price88--',prices);
    if(addMar===1||addMar===0){
     // setCollage(false);
      setTotal(Total-prices);
      navigation.setParams({codeService: null});
      const arr_new=_.filter(productServiceDATA, (o: any) => {
        return o.codeService!=code;
      })
      console.log('arr',JSON.stringify(arr_new));
      dispatch(setProductServiceData(arr_new))
      dispatch(setMarData([])) 
    }else{
      console.log('price88--',prices);
      setTotal(Total-prices);
      setAddMar(addMar-1)
      const arr_new=_.filter(marData, (o: any) => {
        return o.codeService===code;
      })
       let quantity = arr_new[0].quantity;
       quantity = quantity-1;
       const obj={...arr_new[0],quantity:quantity}
      // console.log('ppp--',arr_new,quantity);
       dispatch(setMarData([obj]))  
    }
    
   }
   ///----------------------------------------------------------------
   const handeCocaAdd=(code:string,prices:number)=>{

    setAddCoca(addCoca+1);
    setTotal(Total+prices)
    const arr_new=_.filter(cocaData, (o: any) => {
      return o.codeService===code;
    })
    let quantity = arr_new[0].quantity;
    quantity = quantity+1;
    const obj={...arr_new[0],quantity:quantity}
    console.log('ppp--',arr_new,quantity);
    dispatch(setCocaData([obj]))
   }
   const handeReviveAdd=(code:string,prices:number)=>{

    setAddRevive(addRevive+1);
    setTotal(Total+prices)
    const arr_new=_.filter(reviveData, (o: any) => {
      return o.codeService===code;
    })
    let quantity = arr_new[0].quantity;
    quantity = quantity+1;
    const obj={...arr_new[0],quantity:quantity}
   // const objData={...productServiceDATA,...arr_new[0],quantity:quantity}
    console.log('ppp--',arr_new,quantity);
    dispatch(setReviveData([obj]))
   }
   const hande7upAdd=(code:string,prices:number)=>{

    setAdd7up(add7up+1);
    setTotal(Total+prices)
    const arr_new=_.filter(bayUpData, (o: any) => {
      return o.codeService===code;
    })
    let quantity = arr_new[0].quantity;
    quantity = quantity+1;
    const obj={...arr_new[0],quantity:quantity}
    console.log('ppp--',arr_new,quantity);
    dispatch(setBayUpData([obj]))
    }
   
   const handeMarAdd=(code:string,prices:number)=>{

    setAddMar(addMar+1);
    setTotal(Total+prices)
    const arr_new=_.filter(marData, (o: any) => {
      return o.codeService===code;
    })
     let quantity = arr_new[0].quantity;
     quantity = quantity+1;
     const obj={...arr_new[0],quantity:quantity}
    // console.log('ppp--',arr_new,quantity);
     dispatch(setMarData([obj]))    
   }
  const renderAddSL=(code:string,price:string)=>{
    const prices=Number(price);
    console.log('88--',prices);
    console.log(Total);
      if(code==='coca'){
        return (
          <View style={styles.service_view_right}>
          <View style={styles.right_view}>
            <View style={styles.right_view_view}>
            <TouchableOpacity onPress={    ()=>{handleCoca(code,prices) }
            }>
              <Text style={[styles.right_btn,{fontSize:28}]}>-</Text>
              </TouchableOpacity >
            </View>
            <View style={styles.right_view_view}>
              <Text style={styles.right_btn}>{addCoca}</Text>
            </View>
            <View style={styles.right_view_view1}>
            <TouchableOpacity onPress={() =>{handeCocaAdd(code,prices)}}>
              <Text style={[styles.right_btn,{fontSize:22}]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )
      }
      if(code==='revive'){
        return(
          <View style={styles.service_view_right}>
          <View style={styles.right_view}>
            <View style={styles.right_view_view}>
            <TouchableOpacity onPress={() =>{
               handleRevive(code,prices)
            }}>
              <Text style={[styles.right_btn,{fontSize:28}]}>-</Text>
              </TouchableOpacity >
            </View>
            <View style={styles.right_view_view}>
              <Text style={styles.right_btn}>{addRevive}</Text>
            </View>
            <View style={styles.right_view_view1}>
            <TouchableOpacity onPress={() =>{handeReviveAdd(code,prices)}}>
              <Text style={[styles.right_btn,{fontSize:22}]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )
      }
      if(code==='7up'){
        return(
          <View style={styles.service_view_right}>
          <View style={styles.right_view}>
            <View style={styles.right_view_view}>
            <TouchableOpacity onPress={() =>{
               handle7up(code,prices)
            }}>
              <Text style={[styles.right_btn,{fontSize:28}]}>-</Text>
              </TouchableOpacity >
            </View>
            <View style={styles.right_view_view}>
              <Text style={styles.right_btn}>{add7up}</Text>
            </View>
            <View style={styles.right_view_view1}>
            <TouchableOpacity onPress={() =>{hande7upAdd(code,prices)}}>
              <Text style={[styles.right_btn,{fontSize:22}]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )
      }
      if(code==='mar'){
        return(
          <View style={styles.service_view_right}>
          <View style={styles.right_view}>
            <View style={styles.right_view_view}>
            <TouchableOpacity onPress={() =>{
               handleMar(code,prices)
            }}>
              <Text style={[styles.right_btn,{fontSize:28}]}>-</Text>
              </TouchableOpacity >
            </View>
            <View style={styles.right_view_view}>
              <Text style={styles.right_btn}>{addMar}</Text>
            </View>
            <View style={styles.right_view_view1}>
            <TouchableOpacity onPress={() =>{handeMarAdd(code,prices)}}>
              <Text style={[styles.right_btn,{fontSize:22}]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )
      }
  }
  return (
    <SafeAreaView  style={styles.container}>
      <AppHeader title={namePitch} color='green' colortext='#fff'/>
      <View style={styles.Headers}/>
      <View style={styles.Body_block}>
       <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.body_wrap}>
          <View style={styles.body_top_view}>
            <Text
              style={[
                styles.title_payment,
                {fontSize: Platform.OS === 'ios' ? 16 : 22, fontWeight: 'bold', paddingVertical: 10},
              ]}>
              Chi tiết thanh Toán
            </Text>
            <Text style={styles.title_payment}>Khung giờ: {times}</Text>
            <Text style={styles.title_payment}>Sân: {namePitch}</Text>
            <Text style={styles.title_payment}>
              Ngày: {isToday}, {moment().format('dddd')}
            </Text>
            <Text style={styles.title_payment}>------</Text>
        
          </View>
          <View style={styles.body_body_view}>
            <View style={styles.body_body_left}>
              <Text style={styles.body_body_text}>Khách hàng:</Text>
              <Text style={styles.body_body_text}>Số điện thoại:</Text>
              <Text style={styles.body_body_text}>Ngày đặt:</Text>
              <Text style={styles.body_body_text}>Thông tin thêm:</Text>
              <Text style={styles.body_body_text}>Tiền sân:</Text>
            </View>
            <View style={styles.body_body_right}>
              <Text style={styles.body_body_text}>{nameCustomers}</Text>
              <Text style={styles.body_body_text}>{sdts}</Text>
              <Text style={styles.body_body_text}>{timeBooking}</Text>
              <Text style={styles.body_body_text}>{contents}</Text>
              <Text
                style={[
                  styles.body_body_text,
                  {fontWeight: 'bold', color: 'red',marginTop: Platform.OS === 'ios' ? 25 : 0,},
                ]}>
            {pricest}
              </Text>
            </View>
          </View>

         {
       
            productServiceDATA.length>0 ?(
              productServiceDATA?.map((item:any,index:any)=>{
                return(
                  <View key={index} style={styles.service_view}>
              <View style={styles.service_view_left}>
                <Text style={{fontWeight: 'bold'}} >
                 {`${item.nameService}`}
                </Text>
                <Text >{`${item.codePrice}`}</Text>
              </View>
               {renderAddSL(item.codeService,item.price)}
            </View>
                )
              })
             
            ):(null)
          
         }

          <View style={styles.footer_view}>
            <View style={styles.footer_wrap}>
              <TouchableOpacity onPress={()=>{navigation.navigate('ProductService');}}>
              <Text style={styles.footer_btn}>Thêm sản phẩm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      
      </ScrollView>
      </View>
      <View style={styles.payment_view}>
        <View style={styles.payment_view_left}>
          <Text style={{  fontSize: Platform.OS ==='ios'? 12:16,}}>Tổng thanh toán</Text>
          <Text style={{fontWeight: 'bold', color: 'red'}}>đ {Total.toFixed(3)}</Text>
        </View>
        <View style={styles.payment_view_right}>
          <TouchableOpacity onPress={() => back(Total)}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: Platform.OS ==='ios'? 12:16,
                marginHorizontal: 10,
              }}>
              Thanh toán
            </Text>
          </TouchableOpacity>
        </View>
      
      </View>
  
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    //  backgroundColor:'red',
   flex: 1
  },
  Headers: {
     width: '100%',
     height: '28%',
     backgroundColor: 'green',
     borderBottomLeftRadius: 40,
     borderBottomRightRadius: 40,
   //  position: 'absolute',
  },
  // Body
  Body_block: {
    height: 500,
    position: 'absolute',
    top: '12%',
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderRadius: 10,
    elevation: 20,
  },
  body_wrap: {
    marginHorizontal: 10,
    justifyContent: 'center',
    //alignItems: 'center',
   // marginBottom: 20
  },
  body_top_view: {
    // backgroundColor:'red',
    alignItems: 'center',
    marginVertical: 10,
  },
  title_payment: {
    paddingVertical: 2,
    
  },
  body_body_view: {
    // backgroundColor:'green',
    flexDirection: 'row',
  },
  body_body_left: {
    //  backgroundColor:'red',
    width: '50%',
    padding: 5,
  },
  body_body_right: {
    //  backgroundColor:'green',
    width: '50%',
    padding: 5,
  },
  body_body_text: {
    padding: 7,
  },

  /// service
  service_view: {
    // backgroundColor:'red',
    flexDirection: 'row',
  },
  service_view_left: {
    // backgroundColor:'green',
    width: '47%',
    padding: 5,
    marginLeft: 10,
  },
  service_view_right: {
    //  backgroundColor:'red',
    width: '50%',
    justifyContent: 'center',
  },
  right_view: {
    // backgroundColor:'blue',
    flexDirection: 'row',
    //backgroundColor:'green',
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    borderRadius: 10,
    //justifyContent: 'center',
    height: 40,
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  right_view_view: {
    // borderRightWidth:1,
    width: '33%',
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right_view_view1: {
    // borderRightWidth:1,
    width: '33%',
    // borderRightWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right_btn: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // footer

  footer_view: {
    // backgroundColor:'pink',
    marginVertical: 10,
    marginBottom: 20,
  },
  footer_wrap: {
    marginHorizontal: 40,
    // justifyContent:'center',8i
    // backgroundColor:'red',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  footer_btn: {
    textAlign: 'center',
    padding: 8,
    color: 'green',
  },
  payment_view: {
    // backgroundColor:'pink',
    position: 'absolute',
    bottom: Platform.OS ==='ios'? 4:0,
    height: '8%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
  },
  payment_view_left: {
    width: '70%',
    // backgroundColor:'red',
    alignItems: 'flex-end',
    padding: 10,
  },
  payment_view_right: {
    backgroundColor: 'orange',
    width: '30%',
    justifyContent: 'center',
  },
});
export default PaymentScreen;
