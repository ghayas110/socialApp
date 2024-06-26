import { StyleSheet, Text, View, Image, ImageBackground, StatusBar, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import TextC from '../components/text/text';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const LoginSwitcher = () => {
  const navigation = useNavigation()
  const sliderWidth = windowWidth * 0.79
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overLayWrapper: {
      width: windowWidth,
      height: "100%",
      position: 'relative',
      backgroundColor: 'rgba(5,52,142,0.1)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextWrapper: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    ButtonWrapper: {
      position: 'absolute',
      bottom: 0,
      width: windowWidth,
      paddingBottom: windowHeight * 0.06,
      flexDirection: 'column',
      alignItems: 'center',
    },
    LoginSlider: {
      width: sliderWidth,
      backgroundColor: '#002245',
      height: windowHeight * 0.07,
      borderRadius: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      position:'relative',
    },
    LoginSliderLeft: {
      width: sliderWidth * 0.5,
      height: windowHeight * 0.07,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

    },
    LoginSliderRight: {
      width: sliderWidth * 0.5,
      height: windowHeight * 0.07,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })


  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ImageBackground source={require('../assets/icons/welcomeBanner.jpg')} style={styles.container}>
        <View style={styles.overLayWrapper}>
          <View style={styles.TextWrapper}>
            <TextC text={"Social"} font={'Montserrat-ExtraBold'} size={windowWidth * 0.16} style={{ lineHeight: windowWidth * 0.17, color: '#05348E' }} />
            <TextC text={"Crew"} font={'Montserrat-ExtraBold'} size={windowWidth * 0.16} style={{ lineHeight: windowWidth * 0.16, color: '#05348E' }} />
            <TextC text={"Team."} font={'Montserrat-ExtraBold'} size={windowWidth * 0.16} style={{ lineHeight: windowWidth * 0.15, color: '#05348E' }} />
          </View>


          <View style={styles.ButtonWrapper}>
            <View style={{ paddingBottom: 30 }} >
              <TextC text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."} font={'Montserrat-Thin'} size={windowWidth * 0.035} style={{ color: '#FFFFFF', textAlign: 'center', width: windowWidth * 0.7 }} />
            </View>
            <View style={styles.LoginSlider}>
              <View style={styles.LoginSliderLeft}>
                <TextC text={'Login'} style={{ color: 'white' }} font={'Montserrat-Bold'}/>
              </View>
              <View style={styles.LoginSliderRight}>
                <TextC text={'SignUp'} style={{ color: 'white' }} font={'Montserrat-Bold'}/>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default LoginSwitcher

