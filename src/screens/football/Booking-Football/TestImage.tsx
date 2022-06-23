import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { BASE_URL } from "src/utils";
import axios from "axios";
const TestImage: React.FC = () => {
  const [data, setData] = useState<any>();
  const [imgArray, setImgArray] = useState<any>([]);
  useEffect(() => {
    callApi();
  }, []);
  console.log("666", data);
  const callApi = async () => {
    const code = "ha";
    const res = await axios.get(`${BASE_URL}api/football-detail?code=${code}`);
    setData(res.data);
    setImgArray(res.data.imgArray);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{data?.code_name}</Text>
      {imgArray.map((item: any,index: number) => {
          let base64=`data:image/png;base64,${item.img}`
          return(
             <View key={index} >
                  <Image  style={{width:200,height:200}} source={{uri:base64}}/>
             </View>
          )
      })}
        <Text>{data?.code_name}</Text>
    </View>
  );
};
export default TestImage;
