import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "navigations/BottomNavigation";
import FindPitch from "screens/football/FindPitch";
import DetailsFootball from "src/screens/football/DetailFootball";
import PaymentScreen from "src/screens/football/PaymentScreen";
import BookFootballPitch from "src/screens/football/Booking-Football";
import PitchInfoScreen from "src/screens/football/PitchInfoScreen";
import SearchPitch from "src/screens/football/SearchPitch";
import AddProductService from "src/screens/football/add-product-service/AddProductSevice";
import CardFormPayment from "src/screens/football/CardFormPayment";
import ModalPayment from "src/components/ModalPayment";
import CreateCable from "src/screens/football/cable/CreateCable";
import ChoosePayment from "src/screens/football/ChoosePayment";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();
const StackNavigationFootball: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  return (
   <>
    <StatusBar
    translucent
    backgroundColor="rgba(0,0,0,0)"
    barStyle="dark-content"
  />
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="findPitch"
        component={FindPitch}
        options={{ headerShown: false }}
      />
      {/* có cũng đc và ko có cũng đc FindPitch */}
      <Stack.Screen
        name="PitchInfoScreen"
        component={PitchInfoScreen}
        options={{
          // title: "Sân cỏ VH", headerStyle: {
          //     backgroundColor: '#32CD32',

          // },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookFootballPitch"
        component={BookFootballPitch}
        options={{
          // title: "Sân cỏ VH",
          // headerStyle: {
          //   backgroundColor: "#32CD32",
          // },
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="SingleFootball" component={SingleFootball} options={{headerShown: false}} />  */}
      {/* <Stack.Screen name="Navigation" component={Navigation} /> */}
      <Stack.Screen
        name="DetailsFootball"
        component={DetailsFootball}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "green",
          },
          title: "Thanh Toán",
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="SearchPitch"
        options={{
          headerShown: false,
        }}
        component={SearchPitch}
      />
        <Stack.Screen
        name="ProductService"
        component={AddProductService}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "green",
          },
          title: "Thêm sản phẩm - dịch vụ",
          headerTintColor: "#fff",
        }}
      />
        <Stack.Screen
        name="CardFormPayment"
        component={CardFormPayment}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "green",
          },
          title: "Thanh toán",
          headerTintColor: "#fff",
        }}
      />
        <Stack.Screen
        name="ChoosePayment"
        component={ChoosePayment}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "green",
          },
          title: "Phương Thức Thanh toán",
          headerTintColor: "#fff",
        }}
      />
        <Stack.Screen name="ModalPayment"  options={{
          // title: "Sân cỏ VH",
          // headerStyle: {
          //   backgroundColor: "#32CD32",
          // },
          headerShown: false,
        }} component={ModalPayment} />

        <Stack.Screen name="CreateCable"  options={{
          // title: "Sân cỏ VH",
          // headerStyle: {
          //   backgroundColor: "#32CD32",
          // },
          headerShown: false,
        }} component={CreateCable} />
     
      {/* <Stack.Screen name="TabViewExample" component={TabViewExample} /> */}
    </Stack.Navigator>
   </>
  );
};
export default StackNavigationFootball;
