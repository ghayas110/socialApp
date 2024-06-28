import { SafeAreaView, StyleSheet, StatusBar, View, Dimensions, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import InputC from '../components/inputs/index';
import ButtonC from '../components/button/index';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AntDedign from "react-native-vector-icons/AntDesign"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as LoginUserAction from "../store/actions/UserLogin/index";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextC from '../components/text/text';
import { ResposiveSize } from '../components/constant';
import { Button } from 'react-native-elements';
import { useToast } from '../components/Toast/ToastContext';


const LogIn = ({ onLogin, LoginReducer, loginUser }) => {
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const { showToast } = useToast();



  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },

  });
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
      width: windowWidth - ResposiveSize(30)
    },
    inputWrapper: {
      width: windowWidth - ResposiveSize(30)
    },
    gobackBtn: {
      width: windowWidth * 0.08,
      height: windowHeight * 0.04,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    titleWrapper: {
      width: windowWidth - ResposiveSize(30),
      paddingVertical: windowHeight * 0.05
    },
    titleTextFirst: {
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: ResposiveSize(45),
      color: 'white',
      lineHeight: ResposiveSize(45)
    },
    titleTextSecond: {
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: ResposiveSize(45),
      color: '#69BE25',
      lineHeight: ResposiveSize(45)
    },

    secondInputWrapper: {
      paddingTop: windowHeight * 0.02
    },
    forgotPasswordWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: windowWidth * 0.08,
      paddingTop: windowHeight * 0.015,
      width: windowWidth - ResposiveSize(40)
    },
    loginBtnWrapper: {
      paddingTop: windowHeight * 0.03,
    },
    haveAccoundWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: windowHeight * 0.015,
    },
  })

  const onSubmit = async (data) => {
    const LoginStart = await loginUser({
      email: data.email,
      password: data.password
    })
    console.log(LoginStart)
    if (LoginStart?.message == "Login successful") {
      await AsyncStorage.removeItem('Token');
      await AsyncStorage.setItem('Token', LoginStart.access_token);
      onLogin()
    }
    else if (LoginStart?.message == "Invalid Email or Password") {
      showToast('Check your email and password, try again', "Invalid Email or Password", "red", "mail", "#fff2f2")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor={'#05348E'} />
        <View style={styles.bodyWrapper}>
          <View style={styles.header}>
            <Pressable style={styles.gobackBtn} onPress={navigation.goBack}>
              <AntDedign name='left' size={ResposiveSize(20)} color={'#69BE25'} />
            </Pressable>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleTextFirst}>Hey,</Text>
            <Text style={styles.titleTextSecond}>Welcome</Text>
            <Text style={styles.titleTextSecond}>Back</Text>
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
            <View style={styles.secondInputWrapper}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <InputC label={"Password"} error={errors?.password?.message} value={value} onChangeText={onChange} placeholder={"Your password"} secureTextEntry={true} />
                )}
                name="password"
              />
            </View>
          </View>


          <View style={styles.forgotPasswordWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
              <TextC text={'Forgot password?'} style={{ color: 'white' }} size={ResposiveSize(11)} font={"Montserrat-Regular"} />
            </TouchableOpacity>
          </View>

          <View style={styles.loginBtnWrapper}>
            <ButtonC title="Login" disabled={LoginReducer?.loading} loading={LoginReducer?.loading} bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} onPress={handleSubmit(onSubmit)} />
          </View>

          <View style={styles.haveAccoundWrapper}>
            <TextC text={'Don’t have an account?'} style={{ color: 'white' }} size={ResposiveSize(11)} font={"Montserrat-Regular"} /><TouchableOpacity onPress={() => navigation.navigate('SignUp')}><TextC text={'Sign up'} style={{ color: '#69BE25', marginLeft: 5 }} size={ResposiveSize(11)} font={"Montserrat-Regular"} /></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

function mapStateToProps({ LoginReducer }) {
  return { LoginReducer };
}
export default connect(mapStateToProps, LoginUserAction)(LogIn);