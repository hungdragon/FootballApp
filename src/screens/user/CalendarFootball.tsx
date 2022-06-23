import * as React from "react";
import 'react-native-gesture-handler';
import { FlatList,StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal, Portal, useTheme } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import _ from 'lodash';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "src/redux";
import axios from "axios";
import { BASE_URL } from "src/utils";
import { setCustomerDetailData } from "./userSlice";
// export const data =[
//     {
//         id:1,
//         namePitch: "Sân thể thao Hưng Vương",
//         timeSlot: "Khung giờ : 15:00 - 16:30  Sân 5",
//         timeBooking: "Thứ 2 /22/11/2021",
//         date: "Thứ 2 /22/11/2021",
//         customerName:"hung van",
//         numberPhone:"0961",
//         comment:"anh day",
//         pricePitch:'350.000',
//         dataService:[
//          { 
//            nameService:'Thue bong',
//            codePrice:"25K/luot",
//            quantity:1
//           },
//          { 
//            nameService:'Cocacola',
//            codePrice:"25K/luot",
//            quantity:1
//           },
//          { 
//            nameService:'Cocacola',
//            codePrice:"25K/luot",
//            quantity:1
//           },
//         ],
//         location:'Địa chỉ : Số 2 đường Hoàng Minh Giám,Trung Hòa, Cầu  Giấy Hà Nội',
//         total: "785.000",
//         username:"hung4000"
//     },
// ]


interface Props{
  navigation:any
}

const CalendarFootball: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);
    const [datas, setListData] = React.useState([]);
    const [idDelete, setIdDelete] = React.useState<number>();
    const username =useSelector((state: ApplicationState)=>state.userState.username);
    const customerDetailData =useSelector((state: ApplicationState)=>state.userState.customerDetailData);
    const EmptyComponent=()=>{
      return(
        <View style={{height:200,justifyContent: 'center',alignItems: 'center'}}>
        <Text>{'Không có lịch nào !'}</Text>
        </View>
      )
    }
    // React.useEffect(() => {
    //   callApi();
    // },[])
   
    const showModal = (id: string) => {
      setVisible(true);
      console.log('9999999999999------', id);
      setIdDelete(id);
    };
    const hideModal = () => setVisible(false);
    const deleteItem = (id: string) => {
      const newdata = _.filter(datas, o => {
        return o._id !== id;
      });
      console.log(JSON.stringify(newdata)); 
      setListData(newdata);
      setVisible(false);
    };
    const RightAction=({id})=>{
        return(
            <TouchableOpacity onPress={()=>showModal(id)} style={{backgroundColor:'red',marginVertical:5,justifyContent:'center',alignItems: 'center',width:'20%',borderRadius:3}}>
             <View style={styles.btnDelete}>
                <AntDesignIcon name="delete" size={22} style={{ color: '#fff' }} />
              </View>
    
            </TouchableOpacity>
        )
    }
    const RenderItems=({item})=>{
        return <ListItem items={item} />;
    }
    const ListItem=({items})=>{
      console.log('89--',items._id);
        return(
           
            <TouchableOpacity onPress={() => navigation.navigate('CalendarFootballDetail',{id: items._id})}>
                    <Swipeable
                 renderRightActions={()=>(
                     <RightAction id={items._id}/>
                 )}
                >
                    <View style={styles.itemView}>
                        <Text style={{fontSize:20,fontWeight:'bold',padding:1}}>{items.namePitch}</Text>
                        <Text style={{fontSize:14,padding:1}}>{`Khung giờ: ${items.timeSlot}`}</Text>
                        <Text style={{fontSize:14,padding:1}}>{`Ngày: ${items.timeBooking}`}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:14,padding:1,fontWeight:'bold',marginTop:3}}>Tổng tiền:</Text>
                        <Text style={{fontSize:17,padding:1,fontWeight:'bold',color:'#CC0099'}}>{items.total}</Text>
                        </View>
                       
                    </View>
                </Swipeable>
            </TouchableOpacity>
           
        )
    }
  return (
      <GestureHandlerRootView style={{flex:1}}>
          <View style={styles.container}>
      <View style={styles.listView}>
            <FlatList
                data={customerDetailData}
                renderItem={RenderItems}
                ListEmptyComponent={EmptyComponent}
                showsVerticalScrollIndicator={false}
            />
      </View>
     
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[styles.modalView, { backgroundColor:'#fff' }]}>
        <Text style={styles.modalTitle}>
          Xóa lịch đặt sân
        </Text>
        <Text style={styles.modalMessage}>Bạn có chắc chắn muốn xóa lịch đặt sân này không?</Text>
        <View style={styles.btnView}>
            <View   style={styles.btnCancel}>
            <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text>HỦY</Text>
          </TouchableOpacity>
            </View>
            <View    style={styles.btnModalDelete}>
            <TouchableOpacity
            onPress={() => {
              deleteItem(idDelete);
            }}
         >
            <Text style={{ color:'#fff'}}>XOÁ</Text>
          </TouchableOpacity>
            </View>
        
        </View>
      </Modal>
     
     
  </View>
 

      </GestureHandlerRootView>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  listView:{
      flex: 1,
      marginHorizontal:15,
     // backgroundColor:'red'
     marginTop:20
  },
  itemView:{
    backgroundColor:'#fff',
    marginVertical:5,
    padding:5,
    paddingVertical:20,
    borderRadius:5
  },
  btnDelete:{

  },
  //Modal
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 16,
    height: 40,
  },
  modalMessage: {
    textAlign: 'center',
    fontSize: 14,
    height: 50,
  },
  btnView: {
   flexDirection: 'row',
  justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
  },
  btnCancel: {
    padding: 10,
   // backgroundColor: 'purple',
    width: '50%',
    justifyContent: 'center',
   alignItems: 'center',
  },
  btnModalDelete: {
    padding: 10,
    backgroundColor: 'red',
    width: '50%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
   
  },

});
export default CalendarFootball;
