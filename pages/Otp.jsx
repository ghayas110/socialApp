import { SafeAreaView, StyleSheet, StatusBar, View, Dimensions, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
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


const OtpScreen = ({ verifyOtp, OtpVerificationReducer }) => {
  const navigation = useNavigation()
  const [opt, setOtp] = useState("")
  const [emailState, setEmailState] = useState("")
  const [otpError, setOtpError] = useState(false)

  useEffect(() => {
    const emailreciver = async () => {
      const email = await AsyncStorage.getItem('email')
      setEmailState(email)
    }
    emailreciver()
  })


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
        setOtp("")
        navigation.navigate('CheckIn')
      }
      else if(verifyOtpLoad.message == "Invalid OTP"){
        Toast.show({
          type: 'error',
          text1: 'Invalid OTP',
          text2: 'Please check the OTP and try again',
          text1Style:{
            fontFamily:'Montserrat-Regular'
          },
          text2Style:{
            fontFamily:'Montserrat-Bold'
          },
        });
      }
      console.log(verifyOtpLoad)
    }
    else {
      setOtpError(true)
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
            <OtpInput focusColor={'#69BE25'}
              inputsContainerStyle={{
                color: '#69BE25'
              }}
              theme={{ pinCodeContainerStyle: { backgroundColor: 'white', borderWidth: 1, borderColor: otpError ? 'red' : '#69BE25', width: 55 } }}
              numberOfDigits={5} onTextChange={(text) => setOtp(text)} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 30 }}>
          <TextC text={"I didn’t receive a code"} size={15} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
          <TouchableOpacity>
            <TextC text={"Resend"} size={15} style={{ color: "#69BE25", textAlign: 'center', marginLeft: 4 }} font={'Montserrat-Bold'} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
          <ButtonC loading={OtpVerificationReducer?.loading} title="Verify" bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} onPress={onSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

function mapStateToProps({ OtpVerificationReducer }) {
  return { OtpVerificationReducer };
}
export default connect(mapStateToProps, VrifyOtpAction)(OtpScreen);