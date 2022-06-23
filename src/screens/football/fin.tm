import React, { useMemo } from "react";
import { Alert, RefreshControl, StatusBar } from "react-native";
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
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  navigation: any;
}
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const FindPitch: React.FC<Props> = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
       <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" />
      <View style={styles.top_search}>
        <View style={styles.leftIconHeader}>
          <Icon name ='bell-o' size={22} style={{paddingRight: 8,marginBottom:8}}/>
        </View>
        <View style={styles.search_element}>
          <Icon name="search" size={20} style={{marginLeft:8}} />
          <Text onPress={()=>Alert.alert('13')}  style={{width:'100%',paddingVertical:5}} >Search</Text>
        </View>
        <View style={styles.rightIconHeader}>
          <MaterialIcon name ='crosshairs-gps' size={25} style={{marginBottom:6}}/>
        </View>
      </View>
      {/* ----- */}
      <View style={styles.body_block}>
        <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
          <Text>Kết quả</Text>
        </View>
        <ScrollView 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        style={styles.list_pitch}>
          <TouchableOpacity onPress={() => {navigation.navigate('PitchInfoScreen')}}>
            <View style={styles.pitch_element}>
              <View style={styles.time_block}>
                <Text style={styles.text_time}>6h30-21h</Text>
              </View>
              <View style={styles.address_block}>
                <View style={styles.address_left}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Sân cỏ NHÂN TẠO
                  </Text>
                  <Text>Số 5 Huỳnh Thúc Kháng -Mai Dịch-Cầu Giấy-Hà Nội</Text>
                </View>
                <View style={styles.address_right}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Sân cỏ nhân tạo
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "orange",
                    }}
                  >
                    300.000-800.000
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.pitch_element}>
            <View style={styles.time_block}>
              <Text style={styles.text_time}>6h30-21h</Text>
            </View>
            <View style={styles.address_block}>
              <View style={styles.address_left}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Sân cỏ NHÂN TẠO
                </Text>
                <Text>Số 5 Huỳnh Thúc Kháng -Mai Dịch-Cầu Giấy-Hà Nội</Text>
              </View>
              <View style={styles.address_right}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Sân cỏ nhân tạo
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "orange" }}
                >
                  300.000-800.000
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.pitch_element}>
            <View style={styles.time_block}>
              <Text style={styles.text_time}>6h30-21h</Text>
            </View>
            <View style={styles.address_block}>
              <View style={styles.address_left}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Sân cỏ NHÂN TẠO
                </Text>
                <Text>Số 5 Huỳnh Thúc Kháng -Mai Dịch-Cầu Giấy-Hà Nội</Text>
              </View>
              <View style={styles.address_right}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Sân cỏ nhân tạo
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "orange" }}
                >
                  300.000-800.000
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.pitch_element}>
            <View style={styles.time_block}>
              <Text style={styles.text_time}>6h30-21h</Text>
            </View>
            <View style={styles.address_block}>
              <View style={styles.address_left}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Sân cỏ NHÂN TẠO
                </Text>
                <Text>Số 5 Huỳnh Thúc Kháng -Mai Dịch-Cầu Giấy-Hà Nội</Text>
              </View>
              <View style={styles.address_right}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Sân cỏ nhân tạo
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "orange" }}
                >
                  300.000-800.000
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.pitch_element}>
            <View style={styles.time_block}>
              <Text style={styles.text_time}>6h30-21h</Text>
            </View>
            <View style={styles.address_block}>
              <View style={styles.address_left}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Sân cỏ NHÂN TẠO
                </Text>
                <Text>Số 5 Huỳnh Thúc Kháng -Mai Dịch-Cầu Giấy-Hà Nội</Text>
              </View>
              <View style={styles.address_right}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Sân cỏ nhân tạo
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "orange" }}
                >
                  300.000-800.000
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const { height } = Dimensions.get("screen");
const height_pitch = height * 0.25;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    // backgroundColor:'red'
  },
  top_search: {
    height: "10%",
    // backgroundColor:'blue',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
     //backgroundColor: "red",
     width:'100%'
  },
  leftIconHeader:{
     // backgroundColor: "blue",
      width:'10%',
     
      justifyContent:'center',
      alignItems: "center",
  },
  search_element: {
    flexDirection: "row",
    backgroundColor: "gray",
    //width: height / 3,
    padding: 5,
    borderRadius: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    width:'70%'
  },
  rightIconHeader:{
    width:'10%',
  // backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    //padding: 5,

    
  },
  // Phần 2
  body_block: {
    flexDirection: "column",
    height: "90%",
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
  },
  text_time: {
    backgroundColor: "green",
    width: height * 0.1,
    textAlign: "center",
    padding: 7,
    borderRadius: 30,
    color: "white",
  },
  pitch_element: {
    marginVertical: 5,
    height: height_pitch,
    borderRadius: 20,
    backgroundColor: "gray",
    marginHorizontal: 10,
    //flexDirection: "row",
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
