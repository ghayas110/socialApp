import { SafeAreaView, StyleSheet, StatusBar, View, Dimensions, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ButtonC from '../components/button/index';
import AntDedign from "react-native-vector-icons/AntDesign"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import TextC from '../components/text/text';
import { OtpInput } from "react-native-otp-entry";
import * as VrifyOtpAction from "../store/actions/VerifyOtp/index";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResposiveSize } from '../components/constant';

const OtpScreen = ({ verifyOtp, OtpVerificationReducer, ResendOtp }) => {
  const optInput = useRef()
  const navigation = useNavigation()
  const [opt, setOtp] = useState("")
  const [emailState, setEmailState] = useState("")
  const [otpError, setOtpError] = useState(false)
  const [wrongOtop, setWrongOtp] = useState(false)
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;



  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    const emailreciver = async () => {
      const email = await AsyncStorage.getItem('email')
      setEmailState(email)
    }
    emailreciver()
  }, [])

  const onSubmit = async () => {
    const email = await AsyncStorage.getItem('email');
    if (opt.length == 5) {
      const verifyOtpLoad = await verifyOtp({
        email: email,
        otp: opt
      })
      console.log(verifyOtpLoad)
      if (verifyOtpLoad.message == "User Verified") {
        await AsyncStorage.removeItem('Token');
        await AsyncStorage.removeItem('UserName');
        await AsyncStorage.setItem('Token', verifyOtpLoad?.data?.access_token);
        await AsyncStorage.setItem('UserName', verifyOtpLoad?.data?.user_name);
        navigation.navigate('CheckIn')
        setOtp("")
      }
      else if (verifyOtpLoad.message == "Invalid OTP") {
        setWrongOtp(true)
        optInput.current.clear()
      }
    }
    else {
      setOtpError(true)
    }
  };


  const ResetOtp = async () => {
    setWrongOtp(false)
    setLoader(true)
    const resendOtp = await ResendOtp({
      email: emailState,
    })
    console.log(resendOtp, 'oooo')
    if (resendOtp.message == "OTP resent successfully") {
      setSeconds(60)
      setIsActive(true)
      setLoader(false)
      optInput.current.clear()
    }
    else if (resendOtp.message == "You have exceeded the maximum number of OTP requests per hour. Please try again later") {
      optInput.current.clear()
      setLoader(false)
      // Toast.show("Exceeded the maximum number of OTP requests per hour.")
    }
    else {
      setLoader(false)
      optInput.current.clear()
    }
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#05348E'
    },
    bodyWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: ResposiveSize(15)
    },
    header: {
      paddingTop: windowHeight * 0.06,
      width: windowWidth - ResposiveSize(30),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    contentWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: windowHeight * 0.1
    },
    centerContentWrapper: {
      paddingVertical: windowHeight * 0.03
    },
    inputWrapper: {
      paddingHorizontal: ResposiveSize(20)
    },
    loginBtnWrapper: {
      paddingTop: windowHeight * 0.03,
    },
    gobackBtn: {
      width: windowWidth * 0.08,
      height: windowHeight * 0.04,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  })


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor={'#05348E'} />
        <View style={styles.bodyWrapper}>
          <View style={styles.contentWrapper}>
            <View style={styles.header}>
              <Pressable style={styles.gobackBtn} onPress={navigation.goBack}>
                <AntDedign name='left' size={ResposiveSize(20)} color={'#69BE25'} />
              </Pressable>
              <TextC text={"Enter code"} size={ResposiveSize(22)} style={{ color: "#69BE25" }} font={'Montserrat-Bold'} />
              <View style={{ width: ResposiveSize(20) }}></View>
            </View>
            <View style={styles.centerContentWrapper}>
              <TextC text={"We’ve sent an Email with an activation"} size={ResposiveSize(12)} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextC text={"code to your account"} size={ResposiveSize(12)} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
                <TextC text={emailState} size={ResposiveSize(12)} style={{ color: "#69BE25", textAlign: 'center', marginLeft: ResposiveSize(4), width: ResposiveSize(100) }} font={'Montserrat-Bold'} ellipsizeMode={"tail"} numberOfLines={1} />
              </View>
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <OtpInput ref={optInput} focusColor={'#69BE25'}
              inputsContainerStyle={{
                color: '#69BE25',
              }}
              theme={{
                pinCodeTextStyle: { fontSize: ResposiveSize(29), fontFamily: 'Montserrat-Medium', color: 'black' },
                pinCodeContainerStyle: { backgroundColor: 'white', borderWidth: 1, borderColor: otpError ? 'red' : '#69BE25', width: ResposiveSize(45), height: ResposiveSize(55) },
              }}
              numberOfDigits={5} onTextChange={(text) => {
                setOtpError(false)
                setOtp(text)
                setWrongOtp(false)
              }} />
          </View>
          {wrongOtop &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: ResposiveSize(20), paddingTop: ResposiveSize(30) }}>
              <TextC text={"Wrong code, please try again"} size={ResposiveSize(15)} style={{ color: "#69BE25", textAlign: 'center', marginLeft: ResposiveSize(4) }} font={'Montserrat-Regular'} />
            </View>}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: ResposiveSize(20), paddingTop: ResposiveSize(20) }}>
            {isActive ?
              <>
                <TextC text={"Send code again"} size={ResposiveSize(11)} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
                <TextC text={`00:${seconds}`} size={ResposiveSize(11)} style={{ color: "#69BE25", textAlign: 'center', marginLeft: 3 }} font={'Montserrat-Bold'} />
              </> :
              <>
                <TextC text={"I didn’t receive a code"} size={ResposiveSize(11)} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
                {!loader ?
                  <TouchableOpacity onPress={ResetOtp} disabled={OtpVerificationReducer?.loading}>
                    <TextC text={"Resend"} size={ResposiveSize(11)} style={{ color: "#69BE25", textAlign: 'center', marginLeft: 4 }} font={'Montserrat-Bold'} />
                  </TouchableOpacity> :
                  <ActivityIndicator size={ResposiveSize(20)} style={{ marginLeft: ResposiveSize(5) }} color={"#69BE25"} />
                }
              </>
            }

          </View>
          <View style={styles.loginBtnWrapper}>
            <ButtonC title="Verify" disabled={OtpVerificationReducer?.loading || loader} loading={OtpVerificationReducer?.loading} bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} onPress={onSubmit} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

function mapStateToProps({ OtpVerificationReducer }) {
  return { OtpVerificationReducer };
}
export default connect(mapStateToProps, VrifyOtpAction)(OtpScreen);