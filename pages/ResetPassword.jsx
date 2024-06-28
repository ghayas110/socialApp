import { SafeAreaView, StyleSheet, StatusBar, View, Dimensions, Text, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ButtonC from '../components/button/index';
import AntDedign from "react-native-vector-icons/AntDesign"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import TextC from '../components/text/text';


import * as ForgotPasswordAction from "../store/actions/ForgotPassword/index";
import { connect } from "react-redux";




import { ResposiveSize } from '../components/constant';
import InputC from '../components/inputs';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';




const OtpScreen = ({ sendEmail, ForgotPasswordReducer }) => {
  const navigation = useNavigation()
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },

  });

  const onSubmit = async (data) => {
    const sentemailLoad = await sendEmail({
      email: data.email
    })
    if (sentemailLoad.message == "Password reset email sent.") {
      navigation.navigate('Login')
    }
    else {

    }
    console.log(sentemailLoad, 'sadsds')
  }

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
      paddingVertical: windowHeight * 0.03,
      paddingHorizontal: windowHeight * 0.03
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
              <TextC text={"Forgot Password"} size={ResposiveSize(22)} style={{ color: "#69BE25" }} font={'Montserrat-Bold'} />
              <View style={{ width: ResposiveSize(20) }}></View>
            </View>


            <View style={styles.centerContentWrapper}>
              <TextC text={"Enter your email address and we'll send you a link to reset your password."} size={ResposiveSize(12)} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
            </View>
          </View>



          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <InputC label={"Email address"} error={errors?.email?.message} value={value} onChangeText={onChange} placeholder={"helloworld@gmail.com"} secureTextEntry={false} />
              )}
              name="email"
            />
          </View>

          <View style={styles.loginBtnWrapper}>
            <ButtonC title="Send" disabled={ForgotPasswordReducer?.loading} loading={ForgotPasswordReducer?.loading} bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

function mapStateToProps({ ForgotPasswordReducer }) {
  return { ForgotPasswordReducer };
}
export default connect(mapStateToProps, ForgotPasswordAction)(OtpScreen);