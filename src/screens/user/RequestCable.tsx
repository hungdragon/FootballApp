import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from 'src/utils';
import _ from "lodash";
import { requestAuthorization } from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'src/redux';
import { useNavigation } from '@react-navigation/native';
import { setRequestCableData } from './userSlice';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
interface Props{
    route:{
        params:{
            idBack?:any;
        }
    }
}
const RequestCable: React.FC<Props>=({route})=>{
    const idBack= route.params?.idBack;
    const dispatch= useDispatch();
    const navigation= useNavigation();
    const username=useSelector((state: ApplicationState)=>state.userState.username);
    const status=useSelector((state: ApplicationState)=>state.cableState.status);
    useEffect(()=>{
        callApi();
    },[idBack])
    const [dataRequest,setDataRequest]=useState<any>([])
    const callApi = async()=>{
        try {
          
            const response = await axios.get(
              `${BASE_URL}api/get-cableList`,
              { timeout: 10 * 1000 }
            );
           
            const data=response.data.dataFilter;
            const dataFilter=_.filter(data,o=>{
               return   o.username===username && o.isStatus ==='pending';
            })

            setDataRequest(dataFilter);
            dispatch(setRequestCableData(dataFilter));
           
          } catch (error) {
            console.log('err',error);
          }
    }
    const RenderItems=({item}:any)=>(
        <View style={styles.item}>
          <View style={styles.itemLeft}>
      
            <Text style={styles.nameTeam}>
                {item?.team2}
            </Text>
            <Text style={styles.message}>
            {item?.message2+'...'}
            </Text>
       
          </View>
          <View style={styles.itemRight}>
          <TouchableOpacity onPress={()=>{navigation.navigate('RequestCableDetail' as never,{id: item._id} as never)}}>
              <AntDesignIcon name="arrowright" size={25}/>
              </TouchableOpacity>
          </View>
        
        </View>
    )
    const RenderEmptyItems=()=>{
        return(
            <View style={{backgroundColor:'#e5e5e5',height:200,justifyContent:'center',alignItems:'center'}}>
                <Text>{'Không có dữ liệu'}</Text>
            </View>
        )
    }
    return(
        <View style={styles.container}>
            <View style={styles.listRequest}>
                <FlatList
                    data={dataRequest}
                    renderItem={RenderItems}
                    ListEmptyComponent={RenderEmptyItems}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#e5e5e5',
        paddingVertical:15
    },
    listRequest:{
        marginHorizontal:15,
        borderRadius:5,
       // backgroundColor:'white'
    },
    item:{
        height:80,
        backgroundColor:'white',
        paddingHorizontal:10,
        borderRadius: 5,
        elevation:3,
        flexDirection: 'row',
        marginVertical:5
    },
    itemLeft:{
        justifyContent: 'center',
        width:'85%'
    },
    itemRight:{
        justifyContent: 'center',
    },
    nameTeam:{
        fontSize:22
    },
    message:{},
})
export default RequestCable;