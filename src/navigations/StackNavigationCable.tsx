
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrussCable from "src/screens/football/cable/TrussCable";
import CableDetail from "src/screens/football/cable/CableDetail";

const Stack = createNativeStackNavigator();
const StackNavigationCable: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cables"
        component={TrussCable}
        options={{
          // headerShown: false,
          title:"Cáp kèo ",
           headerStyle: {
             backgroundColor: "green",
          
             
           },
           headerTintColor: '#fff',
           headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25
          },
         }}
      />
 
      <Stack.Screen
        name="CableDetail"
        component={CableDetail}
        options={{
         // headerShown: false,
         title:"Chi tiết",
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigationCable;
