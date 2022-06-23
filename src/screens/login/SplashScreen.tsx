import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import Images from 'src/themes';
interface Props{
    navigation:any,
}
const SplashScreen:React.FC<Props> = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" />
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duration={1500}
            source={Images.Logo}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Chào mừng bạn đến với chúng tôi.</Text>
            <Text style={styles.text}>Những trận đấu đỉnh cao !</Text>
            <View style={styles.button}>
            <TouchableOpacity   onPress={()=>{navigation.navigate('LoginHome')}}>
                <View
                  
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Đăng nhập</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#228B22'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
      backgroundColor: '#0ACCCC',
     
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});