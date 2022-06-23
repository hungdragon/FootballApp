import React, { useState } from "react";
import { View,Picker } from "react-native";
import AppDropdownPicker from "src/components/AppDropdownPicker";

const Test: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("java");

  const [items, setItems] = useState([
    { label: "Sân 5", value: "san5" },
    { label: "Sân 7", value: "san7" },
    { label: "lechyee", value: "lechyee" },
  ]);

  //  const [typeSearch, setTypeSearch] = React.useState('Sân 5');
  return (
    <View
      style={{
         backgroundColor:'#FFF',
        width: "40%",
        marginLeft: 15,
        padding: "2%",
       // borderWidth:1 ,
        height:52,
        borderRadius:10,
        elevation:10
        
       
      }}
    >
      <Picker
        selectedValue={selectedValue}
        style={{ height: 40, width: 150, }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Sân 5" value="san5" />
        <Picker.Item label="Sân 7" value="san7" />
      </Picker>
    </View>
  );
};
export default Test;
