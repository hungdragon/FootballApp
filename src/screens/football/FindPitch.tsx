import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StatusBar,
} from "react-native";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "src/redux";
import { BASE_URL } from "src/utils";
import { setDataFind, setNameSearch } from "./FindPitchSlice";
import _ from "lodash";
import Geolocation from "react-native-geolocation-service";
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
import { getDistance, getPreciseDistance } from "geolib";
import LoadingApp from "src/components/LoadingApp";
import { setNamePitch } from "./Booking-Football/FootballSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { setCustomerDetailData, setNumberBooking } from "../user/userSlice";
import Notification from "../notifications";
import { useAppSelector } from "src/API";
interface Props {
  navigation: any;
  route: any;
}
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const FindPitch: React.FC<Props> = ({ navigation }) => {
  const data = useSelector(
    (state: ApplicationState) => state.findPitchState.data
  );
  const [dataFilter, setDataFilter] = useState<any>(data);
  const nameSearchPitch = useSelector(
    (state: ApplicationState) => state.findPitchState.name_search
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  // const username = useSelector(
  //   (state: ApplicationState) => state.userState.username
  // );

  const username=useAppSelector(state =>state.userState.username);
  const [currentLong, setCurrentLong] = useState("...");
  const [currentLat, setCurrentLat] = useState("...");
  const [locationStatus, setLocationStatus] = useState("");
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    callAPI();
    callApiBooking();
  }, []);
  const callApiBooking = async()=>{
    try {
        
      const response = await axios.post(
        `${BASE_URL}api/GETcustomer-detail`,
        {  
        username,
         }
      );
     /// console.log('123--',JSON.stringify(response.data));
     dispatch(setCustomerDetailData(response.data.data));
     const countBooking =response.data.size;
     dispatch(setNumberBooking(countBooking))
   //  Alert.alert(String(countBooking))
    } catch (error) {
      console.log('err',error);
    }
  }
  useMemo(() => {
    if (nameSearchPitch) {
      const newData = _.filter(data, (o: any) => {
        const itemData = o.pitchName
          ? o.pitchName.toUpperCase()
          : "".toUpperCase();
        const nameData = nameSearchPitch.toUpperCase();
        return itemData.indexOf(nameData) > -1;
      });
      setDataFilter(newData);
    } else {
     // callAPI();
       dispatch(setDataFind(data));
    }
  }, [nameSearchPitch]);

  const onRefresh = React.useCallback(() => {
    setGpsActive(true);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    dispatch(setNameSearch(null));
    callAPI();
  }, []);
  const callAPI = async () => {
    setLoading(true);
     await axios.get(`${BASE_URL}api/football-pitch-ad`, {
      timeout: 10 * 1000,
    }).then(response =>{
      dispatch(setDataFind(response.data.data));
    //  console.log('2222--',response.data.data);
      setDataFilter(response.data.data)
      setLoading(false)
    }).catch((error)=>{
      Alert.alert('Error',error)
      setLoading(false)
    }).finally(()=>{
      setLoading(false)
    });
  };
  const renderItem = ({ item }: any) => {
    const base64Image = `data:image/png;base64,${item.image}`;
    return (
      <TouchableOpacity
        // style={{ backgroundColor: 'rgba(0, 0, 0, .5)',zIndex:9999}}
        onPress={() => {
          navigation.navigate("PitchInfoScreen",{codeName:item.codeName});
          dispatch(setNamePitch(item?.pitchName))
        }}
      >
        <ImageBackground
          source={{ uri: base64Image }}
          imageStyle={{ borderRadius: 20 }}
          style={styles.pitch_element}
        >
          <View style={styles.time_block}>
           <View style={{borderRadius:20}}>
           <Text style={styles.text_time}>{item?.fullTimeSlot}</Text>
           </View>

            {item.km == null || undefined ? null : (
              <Text
                style={{
                  height: 35,
                  backgroundColor: "#fff",
                  padding: 7,
                  fontSize: Platform.OS === 'ios' ? 11 : 18,
                  borderRadius: 5,
                }}
              >
                {" "}
                <Text style={{ fontWeight: "bold" }}>{item.km}</Text> km{" "}
              </Text>
            )}
          </View>
          <View style={styles.address_block}>
            <View style={styles.address_left}>
              <Text
                style={{
                  fontSize: Platform.OS === 'ios' ? 14 : 18,
                  fontWeight: "bold",
                  color: "#fff",
                  textShadowRadius: 3,
                  textShadowColor: "black",
                }}
              >
                {item?.pitchName}
              </Text>
              <Text
                style={{
                  color: "#FAFAD2",
                  fontWeight: "800",
                  fontSize: Platform.OS === 'ios' ? 10 : 16,
                  textShadowRadius: 3,
                  textShadowColor: "black",
                  textShadowOffset: { width: -1, height: 0 },
                }}
              >
                {item?.location}
              </Text>
            </View>
            <View style={styles.address_right}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#00FFFF",
                  textShadowColor: "black",
                  textShadowRadius: 4,
                }}
              >
                Sân cỏ nhân tạo
              </Text>
              <Text
                style={{
                  fontSize: Platform.OS === 'ios' ? 12 : 16,
                  fontWeight: "bold",
                  color: "#FFD700",
                  textShadowColor: "black",
                  textShadowRadius: 4,
                }}
              >
             {item?.distancePrice}
              </Text>
            </View>
          </View>
        </ImageBackground>  
      </TouchableOpacity>
    );
  };
  const [gpsActive,setGpsActive]=useState(true);
  const nearestSearch = async () => {
    setLoading(true);
    setGpsActive(!gpsActive);
    if(gpsActive){
      console.log(gpsActive);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
         Alert.alert('Không có quyền');
         callAPI();
         setGpsActive(gpsActive);
        // return;
      }
      let km = 0;
      let location = await Location.getCurrentPositionAsync({});
      console.log('lat1',location.coords.latitude);
      console.log('long1',location.coords.longitude);
      setCurrentLat(JSON.stringify(location.coords.latitude));
      setCurrentLong(JSON.stringify(location.coords.longitude));
      // const calculatePreciseDistance = () => {
      //   var pdis = getDistance(
      //     { latitude: currentLat, longitude: currentLong },
      //     { latitude: 21.029589601988146, longitude:  105.85253991652326 }
      //   );
      //   const km = pdis / 1000;
      //   Alert.alert("aaa"+Math.round(km));
      // };
      const dataFilters = _.filter(dataFilter, (o: any) => {
       
        let aa = getDistance(
          { latitude: o.latitude, longitude: o.longitude },
          { latitude: location.coords.latitude, longitude: location.coords.longitude }
        );
        //console.log('aa là gì',aa);
        km = aa / 1000;
        //  Alert.alert("aaa"+Math.round(km));
        // const km=aa/1000;
            console.log('km--',km);
        return km < 20;
      });
      //console.log('8888',dataFilters);
      const dataConvert = dataFilters.map((item: any): any => {
        let aa = getDistance(
          { latitude: item.latitude, longitude: item.longitude },
          { latitude: location.coords.latitude, longitude: location.coords.longitude }
        );
        km = Math.round(aa / 1000*100)/100;
        return { km: km, ...item };
      });
      //console.log("72--", JSON.stringify(dataConvert));
      dispatch(setDataFind(dataConvert));
      setLoading(false);
    }else{
      callAPI();
    }
  };
  const EmptyComponent=()=>{
    return(
      <View style={{height:200,justifyContent: 'center',alignItems: 'center'}}>
      <Text>{'Không tìm thấy'}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
     <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
     <View style={{}}>
      <View style={styles.top_search}>
        <View style={styles.leftIconHeader}>
          {/* <Icon
            name="bell-o"
            size={22}
           
          /> */}
          <Notification />
        </View>
        <View style={styles.search_element}>
          <Icon name="search" size={20} style={{ marginLeft: 8,color:'gray' }} />
          <Text
            onPress={() => {
              navigation.navigate("SearchPitch");
              //Alert.alert("Search")
            }}
            style={{ width: "100%", paddingVertical: 5,color:'gray' }}
          >
           {!nameSearchPitch? 'Tìm kiếm...': nameSearchPitch}
          </Text>
        </View>
        <View style={styles.rightIconHeader}>
          <TouchableOpacity
            onPress={() => {
              nearestSearch();
              // calculatePreciseDistance();
            }}
          >
            <MaterialIcon
              name="crosshairs-gps"
              size={25}
              style={[!gpsActive?{color: 'blue'}:{color: 'black'}]}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* ----- */}
      <View style={styles.body_block}>
        <View style={{marginHorizontal: 10 }}>
          <Text>Kết quả tìm kiếm</Text>
        </View>
            {
              loading?(<LoadingApp/>):(  !nameSearchPitch ? (
                <FlatList
                showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={renderItem}
                  ListEmptyComponent={EmptyComponent}
                  keyExtractor={(item) => item.id}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                />
              ) : (
                <FlatList
                 showsVerticalScrollIndicator={false}
                  data={dataFilter}
                  renderItem={renderItem}
                  ListEmptyComponent={EmptyComponent}
                  keyExtractor={(item) => item.id}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                  
                />
              ))
            }
            <View style={{height:140}}/>
      </View>
     </View>
    </SafeAreaView>
  );
};
const { height } = Dimensions.get("screen");
const height_pitch = height * 0.25;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor:'#e5e5e5'
  },
  top_search: {
    height: "5%",
   // backgroundColor:'#e5e5e5',
    // backgroundColor:'blue',
    flexDirection: "row",
    justifyContent: "center",
    //alignItems: "flex-end",
    //backgroundColor: "red",
    width: "100%",
    marginVertical:10
  },
  leftIconHeader: {
   // backgroundColor: "blue",
    width: "10%",
  //  paddingVertical:5,
  //  marginVertical:5,
    justifyContent: "center",
    alignItems: "center",
    
  },
  search_element: {
    flexDirection: "row",
    backgroundColor: "#e5e5e5",
    borderColor:'gray',
    borderWidth:0.4,
    //width: height / 3,
    padding: 5,
    borderRadius: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "70%",
  },
  rightIconHeader: {
    width: "10%",
    // backgroundColor:'green',
    justifyContent: "center",
    alignItems: "center",
    //padding: 5,
  },
  // Phần 2
  body_block: {
   // backgroundColor:'#e5e5e5',
    flexDirection: "column",
    height: "100%",
    //backgroundColor: "blue",
  },
  list_pitch: {
    marginHorizontal: 10,

    //backgroundColor: "pink",
    borderRadius: 20,
    flexDirection: "column",
  },
  time_block: {
    height: height_pitch / 3,
    // backgroundColor:'gray',
    padding: 10,
    // backgroundColor:'red',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text_time: {
    backgroundColor: "#CC0066",
    height: 35,
    textAlign: "center",
    padding: 7,
    borderRadius: 30,
    color: "white",
    fontWeight: "bold",
    fontSize: Platform.OS === 'ios' ? 11 : 16
  },
  pitch_element: {
    marginVertical: 5,
    height: height_pitch,
    borderRadius: 20,
    // backgroundColor: "gray",
    marginHorizontal: 10,
    //flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, .5)",
    zIndex: -1,
  },
  address_block: {
    height: height_pitch / 1.6,
    flexDirection: "row",
    // backgroundColor: "red",
    alignItems: "flex-end",
    marginHorizontal: 10,
    // width:height_pitch/2

    //justifyContent: 'flex-end'
  },
  address_left: {
    width: "60%",
    // backgroundColor:'blue'
  },
  address_right: {
    width: "40%",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor:'green',
    //marginVertical:15
  },
});
export default FindPitch;
