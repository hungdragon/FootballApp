import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const FooterFootball: React.FC = () => {
  return (
    <View style={Styles.footer_container}>
      <View style={Styles.footer_wrap}>
        <View style={Styles.footer_element}>
          <Icon name="dot-circle-o" style={Styles.dot_status_playing} />
          <Text>Đang chơi</Text>
        </View>
        <View style={Styles.footer_element}>
          <Icon name="dot-circle-o" style={Styles.dot_status_payed} />
          <Text>Đã thanh toán </Text>
        </View>
      </View>
    </View>
  );
};
const { height } = Dimensions.get("screen");
const height_pitch = height * 0.25;
const Styles = StyleSheet.create({
  footer_container: {
    backgroundColor: "white",
    height: height_pitch / 4,
    justifyContent: "center",
    // alignItems: 'flex-end',
    elevation: 1,
    // opacity:.5
    
  },
  footer_wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footer_element: {
    flexDirection: "row",
  },
  dot_status_playing: {
    padding: 3,
    color: "green",
    fontWeight: "bold",
    fontSize: 14,
  },
  dot_status_payed: {
    padding: 3,
    color: "purple",
    fontWeight: "bold",
    fontSize: 14,
  },
});
export default FooterFootball;
