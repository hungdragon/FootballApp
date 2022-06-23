import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'src/redux';
import { BASE_URL } from 'src/utils';
import { setBayUpData, setCocaData, setCode, setData, setMarData, setProductServiceData, setReviveData } from './Booking-Football/FootballSlice';

export const STRIPE_PUBLISHABLE_KEY = "pk_test_51L2FeuEGlf2MpvsqV3NU67h6g9i4Tz0MaoSi2Bkfw1QQFFCbXIsbikV5GZDqxTKScYiwRdVgLsAWozzmIlaXXeiU00oL5EftrG";
export const Secret_key = "sk_test_51L2FeuEGlf2MpvsqO9u79C1cFzHWlIR5TMFrW1x0pHp2nEGt9eWCVtJ23lrEcCKubSIqIjEZ8Fq82OmAx4vm16Dt00dbb14zWO"

// create a component
const CURRENCY = 'USD';
let CARD_TOKEN: null = null;


const getCreditCardToken=(creditCardData: any)=>{
  // alert()
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
  then(response => response.json())
  .catch((error)=>console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
 function subscribeUser(creditCardToken:any){
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};
interface Props{
    navigation:any;
    route:any;
}
const CardFormPayment: React.FC<Props> = ({navigation,route}) => {
    const navigationss=useNavigation()
    // React.useEffect(() => {

    //     navigation.addListener('',(e:any)=>{
    //         e.preventDefault();
    //           Alert.alert(
    //       'Discard changes?',
    //       'You have unsaved changes. Are you sure to discard them and leave the screen?',
    //       [
    //         { text: "Don't leave", style: 'cancel', onPress: () => { } },
    //         {
    //           text: 'Discard',
    //           style: 'destructive',
    //           // If the user confirmed, then we dispatch the action we blocked earlier
    //           // This will continue the action that had triggered the removal of the screen
    //           onPress: () => navigationss.goBack()
    //         },
    //       ]
    //     );
    //     })
    // },[navigation])
    const [modalVisible, setModalVisible] = useState(false);
    const {ID_goback,Total}=route.params;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const code = useSelector(
        (state: ApplicationState) => state.footbalState.code
      );
    //  const productServiceDATA =useSelector((state: ApplicationState)=>state.footbalState.productServiceData)
      const id = useSelector((state: ApplicationState) => state.footbalState.id);

      console.log('code---:',code); // code nagy "2206"
      console.log('id---:',code); // id collection
      console.log('ID_goback---:',code); // cai nay la id khung gio

  const [CardInput, setCardInput] = React.useState({valid:false})

  const back = useCallback(async () => {
    var axios = require("axios");

    var config = {
      method: "post",
      url: `${BASE_URL}api/data-pitch-update?code=${code}&id=${id}&idSlot=${ID_goback}`,
      headers: {},
    };

    axios(config)
      .then(function (response: any) {
        console.log(JSON.stringify(response.data));
    //     const aa = navigation.navigate("BookFootballPitch", {
    //       ID_goback: ID_goback,
    //     }); // truyền lại về View A
    //    // console.log(Alert.alert("Đặt sân thành công !"));
    // dispatch(setProductServiceData([]));
    // dispatch(setReviveData([]))
    // dispatch(setCocaData([]))
    // dispatch(setBayUpData([]))
    // dispatch(setMarData([]))
      })
      .catch((error: any) => {
        console.log(error);
      });
    const pitchName = "ha";
    const response = await axios.post(
      `${BASE_URL}api/data-pitch?idPitch=${pitchName}&code=${code}`,
      { time: 10 * 1000 }
    );
    console.log("data4---", response.data?.footballPitch);
    console.log("cmmm---");
    dispatch(setData(response.data?.footballPitch));
    dispatch(setCode(code));
  }, []);
  const onSubmit = async () => {
   
    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      Alert.alert('Các trường thông tin không được bỏ trống');
      return false;
    }

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        Alert.alert("creditCardToken error");
        return;
      }
    } catch (e) {
      console.log("e",e);
      return;
    }
    // Send a request to your server with the received credit card token
    const { error }:any = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
        Alert.alert(error)
    } else {
      setLoading(true);
      let pament_data = await charges()
      console.log('pament_data', pament_data);
      if(pament_data.status == 'succeeded')
      {
     //   Alert.alert("Thanh toán thành công:"+Total+"với ID"+ID_goback);
        back();
        navigation.replace('ModalPayment',{ID_goback:ID_goback,Total:Total})
        setLoading(false);
      }
      else{
        Alert.alert('Thanh toán thất bại');
        setLoading(false);
      }
    }
  };



  const charges = async () => {

    const card = {
        'amount': 50, 
        'currency': CURRENCY,
        'source': CARD_TOKEN,
        'description': "Developers Sin Subscription"
      };

      return fetch('https://api.stripe.com/v1/charges', {
        headers: {
          // Use the correct MIME type for your server
          Accept: 'application/json',
          // Use the correct Content Type to send data to Stripe
          'Content-Type': 'application/x-www-form-urlencoded',
          // Use the Stripe publishable key as Bearer
          Authorization: `Bearer ${Secret_key}`
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(card)
          .map(key => key + '=' + card[key])
          .join('&')
      }).then(response => response.json());
  };
  


  const _onChange =(data:any) => {
    setCardInput(data)
  }

  return (
   <View style={{flex: 1}}>
   
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
        <Image 
        source={{uri:'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png'}}
        style={styles.ImgStyle}
        />
        <TouchableWithoutFeedback  onPress={()=>{Keyboard.dismiss()}}>
        <CreditCardInput 
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#fff"
        placeholderColor="#ccc"
        onChange={_onChange} />
           </TouchableWithoutFeedback>

        {
          loading ? (
            <View
          //  onPress={onSubmit}
            style={styles.button}>
              <Text
                style={styles.buttonText}>
              <ActivityIndicator size="small" color="yellow" />
              </Text>
            </View>
          ):(
            <TouchableOpacity 
            onPress={onSubmit}
            style={styles.button}>
              <Text
                style={styles.buttonText}>
                Thanh toán
              </Text>
            </TouchableOpacity>
          )
        }
    </View>
 
   </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button : {
    backgroundColor:'#2471A3',
    width:150,
    height:45,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:5
  },
  buttonText : {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  inputContainerStyle : {
    backgroundColor:'#fff',
    borderRadius:5
  },
  inputStyle : {
    backgroundColor:'#222242',
    paddingLeft:15,
    borderRadius:5,
    color:'#fff'
  },
  labelStyle : {
    marginBottom:5,
    fontSize:12
  },

  //dsfdsf
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttons: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
 
});

//make this component available to the app
export default CardFormPayment;
