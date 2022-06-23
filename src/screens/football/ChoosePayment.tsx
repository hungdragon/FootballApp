import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Images from "src/themes";
interface Props{
    navigation:any;
    route:any;
}
const ChoosePayment: React.FC<Props> = ({navigation, route}) => {
    const {ID_goback,Total}=route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TouchableOpacity style={styles.cardView} onPress={()=>{   navigation.replace('CardFormPayment', {ID_goback: ID_goback,Total:Total}) }}>
        <Image source={Images.card} style={{width:40,height:25}}/>
          <Text style={styles.titleCard}>Master Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardView}>
            <Image source={Images.momo} style={{width:25,height:25,marginHorizontal:5}}/>
          <Text style={styles.titleCard}>Ví Momo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardView}>
          <FontAwesomeIcon
            name="credit-card-alt"
            size={22}
            style={{ marginHorizontal: 5 }}
          />
          <Text style={styles.titleCard}>Master Card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
  form: {
    width: "80%",
    // backgroundColor:'red'
  },
  cardView: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 3,
   
    alignItems: "center",
  },
  titleCard: {
    fontSize: 16,
   
  },
});
export default ChoosePayment;
