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
import Toast from 'react-native-toast-message';

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#05348E'
    },
    wrapper: {
      paddingHorizontal: 20,
      paddingTop: 120
    },
    OtpHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  })

  const onSubmit = async () => {
    const email = await AsyncStorage.getItem('email');
    if (opt.length == 5) {
      const verifyOtpLoad = await verifyOtp({
        email: email,
        otp: opt
      })
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
      Toast.show({
        type: 'error',
        text1: 'Maximum limit exceeded',
        text2: 'Exceeded the maximum number of OTP requests per hour.',
        text1Style: {
          fontFamily: 'Montserrat-Regular'
        },
        text2Style: {
          fontFamily: 'Montserrat-Bold'
        },
      });
    }
    else {
      setLoader(false)
      optInput.current.clear()
    }
  };




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor={'#05348E'} />
        <View style={styles.wrapper}>
          <View style={styles.OtpHeader}>
            <TouchableOpacity>
              <AntDedign name='left' size={18} color={'#69BE25'} />
            </TouchableOpacity>
            <TextC text={"Enter code"} size={22} style={{ color: "#69BE25" }} font={'Montserrat-Bold'} />
            <View style={{ width: 22 }}></View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 30, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <TextC text={"We’ve sent an Email with an activation"} size={16} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextC text={"code to your account"} size={16} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
              <TextC text={emailState} size={16} style={{ color: "#69BE25", textAlign: 'center', marginLeft: 4, width: 140 }} font={'Montserrat-Bold'} ellipsizeMode={"tail"} numberOfLines={1} />
            </View>
          </View>


          <View style={{ paddingHorizontal: 10, paddingTop: 30 }}>
            <OtpInput ref={optInput} focusColor={'#69BE25'}
              inputsContainerStyle={{
                color: '#69BE25'
              }}
              theme={{ pinCodeContainerStyle: { backgroundColor: 'white', borderWidth: 1, borderColor: otpError ? 'red' : '#69BE25', width: 55 } }}
              numberOfDigits={5} onTextChange={(text) => {
                setOtpError(false)
                setOtp(text)
                setWrongOtp(false)
              }} />
          </View>
        </View>


        {wrongOtop &&
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 30 }}>
            <TextC text={"Wrong code, please try again"} size={15} style={{ color: "#69BE25", textAlign: 'center', marginLeft: 4 }} font={'Montserrat-Regular'} />
          </View>}


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 20 }}>

          {isActive ?
            <>
              <TextC text={"Send code again"} size={15} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
              <TextC text={`00:${seconds}`} size={15} style={{ color: "#69BE25", textAlign: 'center', marginLeft: 3 }} font={'Montserrat-Bold'} />
            </> :
            <>
              <TextC text={"I didn’t receive a code"} size={15} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
              {!loader ?
                <TouchableOpacity onPress={ResetOtp} disabled={OtpVerificationReducer?.loading}>
                  <TextC text={"Resend"} size={15} style={{ color: "#69BE25", textAlign: 'center', marginLeft: 4 }} font={'Montserrat-Bold'} />
                </TouchableOpacity> :
                <ActivityIndicator style={{ marginLeft: 5 }} color={"#69BE25"} />
              }
            </>
          }

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
          <ButtonC disabled={OtpVerificationReducer?.loading || loader} loading={OtpVerificationReducer?.loading} title="Verify" bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} onPress={onSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

function mapStateToProps({ OtpVerificationReducer }) {
  return { OtpVerificationReducer };
}
export default connect(mapStateToProps, VrifyOtpAction)(OtpScreen);