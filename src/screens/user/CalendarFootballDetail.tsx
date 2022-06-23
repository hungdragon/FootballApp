import moment from 'moment';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'src/redux';
// import { data } from './CalendarFootball';
import _ from "lodash";
export interface data{
    _id:string
    namePitch: string
    timeSlot: string
    timeBooking:string
    date:string
    customerName:string
    numberPhone:string
    comment:string
    pricePitch:string
    dataService:[
     { 
       nameService:string
       codePrice:string
       quantity:number
      },
    ],
    location:string
    total: string
    username:string
}
interface Props {
    route:any;
}
const CalendarFootballDetail: React.FC<Props> = ({route}) => {
     const id =route.params.id;
    console.log('id--11',id);
    const customerDetailData =useSelector((state: ApplicationState)=>state.userState.customerDetailData);
    const dataFilter=_.filter(customerDetailData,o=>{
        return o._id === id
    })
    const dataDetailItem :data=dataFilter[0];
    return(
        <View style={styles.container}>
        <View style={styles.Headers}></View>
       
        <ScrollView   showsVerticalScrollIndicator={false} style={styles.Body_block}>
          <View style={styles.body_wrap}>
            <View style={styles.body_top_view}>
              <Text
                style={[
                  styles.title_payment,
                  {fontSize: 22, fontWeight: 'bold', paddingVertical: 10},
                ]}>
              Chi tiết đặt sân
              </Text>
              <Text style={styles.title_payment}>Khung giờ: {dataDetailItem?.timeSlot}</Text>
              <Text style={styles.title_payment}>Sân: {dataDetailItem?.namePitch}</Text>
              <Text style={styles.title_payment}>
                {/* Ngày: {isToday}, {moment().format('dddd')} */}
                Ngày: {moment().format('L')}
              </Text>
              <Text style={styles.title_payment}>---</Text>
              {/* <Text style={styles.title_payment}>{idNext}</Text> */}
            </View>
            <View style={styles.body_body_view}>
              <View style={styles.body_body_left}>
                <Text style={styles.body_body_text}>Khách hàng:</Text>
                <Text style={styles.body_body_text}>Số điện thoại:</Text>
                <Text style={styles.body_body_text}>Ngày đặt:</Text>
                <Text style={styles.body_body_text}>Thông tin thêm:</Text>
                <Text style={styles.body_body_text}>Tiền sân:</Text>
                <Text style={styles.body_body_text}>Dịch vụ:</Text>
              </View>
              <View style={styles.body_body_right}>
                <Text style={[styles.body_body_text,{  textAlign:'center'}]}>{dataDetailItem?.customerName}</Text>
                <Text style={[styles.body_body_text,{  textAlign:'center'}]}>{dataDetailItem?.numberPhone}</Text>
                <Text style={[styles.body_body_text,{  textAlign:'center'}]}>{dataDetailItem?.timeBooking}</Text>
                <Text style={[styles.body_body_text,{  textAlign:'center'}]}>{dataDetailItem?.comment}</Text>
             
                <Text
                  style={[
                    styles.body_body_text,
                    {fontWeight: 'bold', color: 'red',textAlign:'center'},
                  ]}>
              {dataDetailItem?.pricePitch}
                </Text>
                {
         
         dataDetailItem?.dataService.length>0 ?(
            dataDetailItem?.dataService?.map((item:any,index:any)=>{
             return(
               <View key={index} style={styles.service_view}>
           <View style={styles.service_view_left}>
             <Text style={{fontWeight: 'bold'}} >
              {`${item.nameService}   x${item.quantity}`}
             </Text>
             <Text >{`(${item.codePrice})`}</Text>
           </View>
           
         </View>
             )
           })
          
         ):(null)
       
      } 
           
              </View>
            </View>
            <Text >{dataDetailItem?.location}</Text>
            <Text style={{fontWeight: 'bold',fontSize:20,marginVertical:15}} >{`Tổng tiền    `}
            <Text style={{fontWeight: 'bold',fontSize:25,color:'red'}}>{dataDetailItem?.total}</Text>
            </Text>
{/*   

  
            <View style={styles.footer_view}>
              <View style={styles.footer_wrap}>
                <TouchableOpacity onPress={()=>{}}>
                <Text style={styles.footer_btn}>Thêm sản phẩm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
  
        <ScrollView style={styles.payment_view}>
          <View style={styles.payment_view_left}>
            <Text>Tổng thanh toán</Text>
            <Text style={{fontWeight: 'bold', color: 'red'}}>đ {dataDetailItem.total}</Text>
          </View>
          <View style={styles.payment_view_right}>
            {/* <TouchableOpacity onPress={() => back(Total)}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 16,
                  marginHorizontal: 10,
                }}>
                Thanh toán
              </Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
       
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        //  backgroundColor:'red',
       // width: '100%',
       // height: '100%',
        alignItems: 'center',
        flex:0.8,
      },
      Headers: {
        width: '100%',
        height: '28%',
        backgroundColor: 'green',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        position: 'absolute',
      },
      // Body
      Body_block: {
         flex:1,
        width: '85%',
      //  position: 'absolute',
        top: '5%',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        // justifyContent:'center',
        // alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
        //marginBottom:40
      },
      body_wrap: {
        marginHorizontal: 10,
        justifyContent: 'center',
        //alignItems: 'center',
       // backgroundColor: 'blue'
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
      //  backgroundColor: 'red'
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
      //  backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center'
      },
      service_view_left: {
        // backgroundColor:'green',
        
        padding: 5,
        marginLeft: 10,
      },
      service_view_right: {
        //  backgroundColor:'red',
       
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
        bottom: 0,
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
})
export default CalendarFootballDetail