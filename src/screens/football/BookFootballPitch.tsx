// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
//   ScrollView,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as Animatable from 'react-native-animatable';

// import AppDropdownPicker from 'src/components/AppDropdownPicker';
// import Test from '../user/test';
// interface Props {
//   navigation: any;
//   route: any;
// }
// const DATA_CARD = [
//   {
//     time: '06:00-07:00',
//     id: 1,
//     TimeStart: 6,
//   },
//   {
//     time: '07:00-08:00',
//     id: 2,
//     TimeStart: 7,
//   },
//   {
//     time: '08:00-09:00',
//     id: 3,
//     TimeStart: 8,
//   },
//   {
//     time: '09:00-10:00',
//     id: 4,
//     TimeStart: 9,
//   },
//   {
//     time: '10:00-11:00',
//     id: 5,
//     TimeStart: 10,
//   },
//   {
//     time: '11:00-12:00',
//     id: 6,
//     TimeStart: 11,
//   },
//   {
//     time: '15:00-16:00',
//     id: 7,
//     TimeStart: 15,
//   },
//   {
//     time: '16:00-17:00',
//     id: 8,
//     TimeStart: 16,
//   },
//   {
//     time: '17:00-18:00',
//     id: 9,
//     TimeStart: 17,
//   },
//   {
//     time: '18:00-19:00',
//     id: 10,
//     TimeStart: 18,
//   },
//   {
//     time: '19:00-20:00',
//     id: 11,
//     TimeStart: 19,
//   },
//   {
//     time: '24:00-01:00',
//     id: 12,
//     TimeStart: 24,
//   },
// ];
// const BookFootballPitch: React.FC<Props> = ({ navigation, route }) => {
//   const [selectedPitch, setSelectedPitch] = useState('Sân 5 người');
//   const today = new Date();

//   // console.log("today => ",today)
//   let tomorrow = new Date();
//   let tomorrow1 = new Date();
//   let tomorrow2 = new Date();
//   let tomorrow3 = new Date();
//   let currentDate = today.getDate();
//   // console.log(currentDate)
//   tomorrow.setDate(today.getDate() + 1);
//   tomorrow1.setDate(today.getDate() + 2);
//   tomorrow2.setDate(today.getDate() + 3);
//   tomorrow3.setDate(today.getDate() + 4);
//   // console.log(tomorrow.getDate());
//   // console.log(tomorrow1.getDate());
//   // console.log(tomorrow2.getDate());
//   // console.log(tomorrow3.getDate());
//   //returns the tomorrow date
//   // console.log("tomorrow => ",tomorrow)
//   //  console.log( tomorrow.getDate())
//   const DATA = [
//     {
//       id: 1,
//       day: currentDate,
//     },
//     {
//       id: 2,
//       day: tomorrow.getDate(),
//     },
//     {
//       id: 3,
//       day: tomorrow1.getDate(),
//     },
//     {
//       id: 4,
//       day: tomorrow2.getDate(),
//     },
//   ];
//   const [selectedId, setSelectedId] = useState(0);

//   let getHour = new Date().getHours();
//   //console.log('hours ' + getHour);
//   const length = DATA.length;
//   var colorBB = '#696969';

//   var colorBBa = '#696969';
//   const prevDate = () => {
//     setSelectedId(selectedId === 0 ? 0 : selectedId - 1);
//     console.log(selectedId);
//   };
//   if (selectedId === 0) {
//     colorBBa = selectedId ? '#DCDCDC' : 'gray';
//   }
//   // const backgroundColor = selectedId ? "#6e3b6e" : "#fff";
//   const nextDate = () => {
//     setSelectedId(selectedId === length - 1 ? length - 1 : selectedId + 1);
//     console.log(selectedId);
//   };
//   if (selectedId === length - 1) {
//     // Alert.alert("123")
//     colorBB = selectedId ? '#DCDCDC' : 'gray';
//   }
//   React.useEffect(() => {
//     if (route.params?.ID_goback) {
//       console.warn(route.params?.ID_goback);
//     }
//   }, [route.params?.ID_goback]);

//   // DROPDOWN
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState('');
//   const [items, setItems] = useState([
//     { label: 'Apple', value: 'apple' },
//     { label: 'Banana', value: 'banana' },
//     { label: 'lechyee', value: 'lechyee' },
//   ]);

//   const [typeSearch, setTypeSearch] = React.useState('45234');
//   return (
//     <View style={Styles.container}>
//       <View style={{ flexDirection: 'row', }}>
//         <Test />
//         <View style={Styles.calendar}>
//           <View style={Styles.calendar_block}>
//             <TouchableOpacity onPress={prevDate}>
//               <Icon
//                 name="chevron-left"
//                 size={22}

//                 style={[Styles.btn_navigation, { color: colorBBa }]}
//               />
//             </TouchableOpacity>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 width: '30%',
//                 // backgroundColor:'red',
//                 justifyContent: 'center',
//               }}>
//               {DATA.map((item, index) => {
//                 return (
//                   <Text key={index} style={{ fontSize: 18 }}>
//                     {index === selectedId && item.day}
//                   </Text>
//                 );
//               })}
//               <TouchableOpacity>
//                 <Icon
//                   name="calendar"
//                   size={16}
//                   style={{ color: 'black', padding: 3 }}

//                 />
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity
//               onPress={nextDate}
//             >
//               <Icon
//                 name="chevron-right"
//                 size={22}
//                 style={[Styles.btn_navigation, { color: colorBB }]}

//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       <ScrollView style={Styles.Pitch_container}>
//         {DATA_CARD.map((item, index) => (
//           <View key={index} style={Styles.Pitch_wrap}>
//             <View style={Styles.Pitch_element}>
//               <Text style={Styles.Time_Football}>{item.time}</Text>

//               {route.params?.ID_goback === item.id ? (
//                 <Animatable.View animation="flash" duration={1000}>
//                   <TouchableOpacity onPress={() => { Alert.alert('da dat san') }}>
//                     <Icon
//                       name="soccer-ball-o"
//                       style={[Styles.Icon_Football, { color: 'purple' }]}
//                     />
//                   </TouchableOpacity>
//                 </Animatable.View>
//               ) : getHour === item.TimeStart ? (
//                 <Icon
//                   name="soccer-ball-o"
//                   style={[Styles.Icon_Football, { color: 'green' }]}
//                 />
//               ) : getHour < item.TimeStart ? (
//                 <TouchableOpacity
//                   onPress={() => {
//                     navigation.navigate('DetailsFootball', { id: item.id });
//                   }}>
//                   <Icon
//                     name="plus"
//                     style={[Styles.Icon_Football, { color: 'gray' }]}
//                   />
//                 </TouchableOpacity>
//               ) : (
//                 <Icon
//                   name="close"
//                   style={[Styles.Icon_Football, { color: 'red' }]}
//                 />
//               )}
//             </View>
//           </View>
//         ))}

//       </ScrollView>

//       <View style={Styles.footer_container}>
//         <View style={Styles.footer_wrap}>
//           <View style={Styles.footer_element}>
//             <Icon name="dot-circle-o" style={Styles.dot_status_playing} />
//             <Text>Đang chơi</Text>
//           </View>
//           <View style={Styles.footer_element}>
//             <Icon name="dot-circle-o" style={Styles.dot_status_payed} />
//             <Text>Đã thanh toán </Text>
//           </View>
//         </View>
//       </View>
//     </View>

//   );
// };
// const { height } = Dimensions.get('screen');
// const height_pitch = height * 0.25;
// const Styles = StyleSheet.create({
//   container: {
//     // backgroundColor: 'red',
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     // backgroundColor:'blue',
//     // backgroundColor: 'red',
//     // height: 200
//   },
//   header_typePitch: {
//     width: '50%',
//     justifyContent: 'center',
//     // backgroundColor:"red"
//     zIndex: 1,
//   },
//   _typePitch: {
//     // width: "80%",
//     backgroundColor: 'white',
//     margin: 10,
//     paddingVertical: 2,
//     borderRadius: 10,
//     elevation: 10,
//     // backgroundColor:"blue",
//     marginHorizontal: 20,
//   },
//   // Calendar
//   calendar: {
//     width: '55%',
//     //   backgroundColor: "green",
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     marginLeft: 20,

//     zIndex: 0,
//     padding: 10
//   },
//   calendar_block: {
//     flexDirection: 'row',
//     width: '55%',
//     backgroundColor: 'white',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 10,
//     elevation: 10,
//     marginHorizontal: 20,
//     // overflow:'hidden',
//   },
//   dayofMonth: {
//     backgroundColor: 'orange',
//     padding: 8,
//     margin: 5,
//     marginVertical: 5,
//     borderRadius: 80,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   btn_navigation: {
//     // margin:5
//   },

//   /// Book Football Pitch
//   Pitch_container: {
//     //  backgroundColor: "red",
//     flexDirection: 'row',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     marginTop: 20,
//     zIndex: 0,
//   },
//   Pitch_wrap: {
//     flexDirection: 'row',
//     margin: 8,
//   },
//   Pitch_element: {
//     //  backgroundColor: "pink",
//     justifyContent: 'center',
//     alignItems: 'center',
//     //padding:5,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     elevation: 20,
//     width: height / 8,
//     height: height / 7.5,
//     padding: 5,
//   },
//   Time_Football: {
//     fontWeight: 'bold',
//     //paddingVertical:5,
//     // marginHorizontal:5,
//     fontSize: 16,
//     justifyContent: 'center',
//   },
//   Icon_Football: {
//     fontSize: 35,
//     paddingVertical: 5,
//     marginTop: 8,
//     // elevation:50,
//     color: '#C0C0C0',
//   },
//   //FOOTER END

//   footer_container: {
//     backgroundColor: 'white',
//     height: height_pitch / 4,
//     justifyContent: 'center',
//     // alignItems: 'flex-end',
//     elevation: 1,
//     // opacity:.5
//     marginVertical: 5,
//   },
//   footer_wrap: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
//   footer_element: {
//     flexDirection: 'row',
//   },
//   dot_status_playing: {
//     padding: 3,
//     color: 'green',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   dot_status_payed: {
//     padding: 3,
//     color: 'purple',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });
// export default BookFootballPitch;
