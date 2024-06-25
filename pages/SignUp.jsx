import { SafeAreaView, StyleSheet, StatusBar, View, Modal, Text, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputC from '../components/inputs/index';
import ButtonC from '../components/button/index';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AntDedign from "react-native-vector-icons/AntDesign"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import SelectC from '../components/select';
import * as UserRegisterAction from "../store/actions/UserRegister/index";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import TextC from '../components/text/text';
import baseUrl from '../store/config.json'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({ insertUser, RegisterUserReducer }) => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [flight, setFlight] = useState([])

  useEffect(() => {
    getAirlines()
  }, [])

  const schema = yup.object().shape({
    userName: yup
      .string()
      .required('User name is required'),
    airline: yup
      .number()
      .required('Air line is required'),
    position: yup
      .string()
      .required('Position is required'),
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be 8+ characters.'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    termsOfService: yup.boolean().oneOf([true], 'Accept terms & privacy policy.').required().default(false)
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: '',
      airline: '',
      position: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: false,
    },
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#05348E'
    },
    titleWrapper: {
      paddingHorizontal: 20,
    },
    titleTextFirst: {
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: 42,
      color: 'white',
      lineHeight: 50
    },
    titleTextSecond: {
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: 42,
      color: '#69BE25',
      lineHeight: 50
    },
    privacyText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 13,
      color: 'white',
    },
    errorArea: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
    },
    socialLoginBtn: {
      height: 48,
      width: 48,
      backgroundColor: 'white',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginHorizontal: 3
    },
    bottomSheetContent: {
      height: 50,
      width: "100%",
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomSheetContentTextOne: {
      fontSize: 13,
      fontFamily: 'Montserrat-Regular',
      flexDirection: 'row',
      alignItems: 'center',
      color: 'white'
    },
    bottomSheetContentTextTwo: {
      fontSize: 13,
      fontFamily: 'Montserrat-Regular',
      color: '#69BE25',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
      width: windowWidth * 0.7,
      height: windowHeight * 0.5,
      backgroundColor: '#7891C2',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    modalTextHeading: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 13,
      color: 'white',
    }
  })
  const onSubmit = async (data) => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.setItem('email', data.email);
      const Responce = await insertUser({
        user_name: data?.userName,
        email: data?.email,
        password: data?.password,
        user_type: data?.position,
        airline: data?.airline
      })
      if (Responce == 'Signup successfull') {
        navigation.navigate('Otp')
      }
      else if (Responce == 'Email already exists') {
        Toast.show({
          type: 'error',
          text1: 'Email already exist',
          text2: 'Please change the email address.',
          text1Style: {
            fontFamily: 'Montserrat-Regular'
          },
          text2Style: {
            fontFamily: 'Montserrat-Bold'
          },
        });
      }
    } catch (e) {
      console.log(e)
    }
  };
  const Positions = [
    { title: 'FLIGHT ATTENDANT', icon: 'emoticon-happy-outline' },
    { title: 'PILOT', icon: 'emoticon-cool-outline' },
    { title: 'TECHNICIAN', icon: 'emoticon-lol-outline' },
  ];

  const getAirlines = async () => {
    try {
      const response = await fetch(`${baseUrl.baseUrl}/airline/GetAllAirlines`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': baseUrl.apiKey,
        },
      });
      const res = await response.json()
      setFlight(res?.data)
    }
    catch (error) {
      console.log(error)
    }
  }



 



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor={'#05348E'} />
        <View style={{ paddingTop: 40, paddingBottom: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity>
            <AntDedign name='left' size={22} color={'#69BE25'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <AntDedign name='infocirlceo' size={22} color={'#69BE25'} />
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDedign name='infocirlceo' size={16} color={'white'} />
                    <TextC size={18} text={"Form Info"} style={{ color: 'white', marginLeft: 5 }} font={"Montserrat-Bold"} />
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <AntDedign name='close' size={22} color={'white'} />
                  </TouchableOpacity>
                </View>

                <View style={{ paddingBottom: 15 }}>
                  <TextC text={"User name"} style={{ color: 'white' }} font={"Montserrat-Bold"} />
                  <TextC size={12} text={"user name is required."} style={{ color: 'white' }} font={"Montserrat-Regular"} />
                </View>

                <View style={{ paddingBottom: 15 }}>
                  <TextC text={"Air line"} style={{ color: 'white' }} font={"Montserrat-Bold"} />
                  <TextC size={12} text={"air line is required."} style={{ color: 'white' }} font={"Montserrat-Regular"} />
                </View>

                <View style={{ paddingBottom: 15 }}>
                  <TextC text={"Position"} style={{ color: 'white' }} font={"Montserrat-Bold"} />
                  <TextC size={12} text={"position is required."} style={{ color: 'white' }} font={"Montserrat-Regular"} />
                </View>

                <View style={{ paddingBottom: 15 }}>
                  <TextC text={"Email"} style={{ color: 'white' }} font={"Montserrat-Bold"} />
                  <TextC size={12} text={"email is required."} style={{ color: 'white' }} font={"Montserrat-Regular"} />
                </View>

                <View style={{ paddingBottom: 15 }}>
                  <TextC text={"Email"} style={{ color: 'white' }} font={"Montserrat-Bold"} />
                  <TextC size={12} text={"Email is required."} style={{ color: 'white' }} font={"Montserrat-Regular"} />
                </View>

                <View style={{ paddingBottom: 15 }}>
                  <TextC text={"Password"} style={{ color: 'white' }} font={"Montserrat-Bold"} />
                  <TextC size={12} text={"Password must be 8+ characters."} style={{ color: 'white' }} font={"Montserrat-Regular"} />
                </View>

                <View style={{ paddingBottom: 15 }}>
                  <TextC text={"Terms & privacy"} style={{ color: 'white' }} font={"Montserrat-Bold"} />
                  <TextC size={12} text={"Accept terms & privacy policy."} style={{ color: 'white' }} font={"Montserrat-Regular"} />
                </View>


              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTextFirst}>Let's, <Text style={styles.titleTextSecond}>get</Text></Text>
          <Text style={styles.titleTextSecond}>started</Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <InputC label={"User name"} error={errors?.userName?.message} value={value} onChangeText={onChange} placeholder={"User name"} secureTextEntry={false} />
            )}
            name="userName"
          />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <SelectC label={"Air line"} data={flight} placeholder={'Select airline'} error={errors?.airline?.message} value={value} onChangeText={onChange} secureTextEntry={false} />
            )}
            name="airline"
          />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <SelectC label={"Position"} data={Positions} placeholder={'Select position'} error={errors?.position?.message} value={value} onChangeText={onChange} secureTextEntry={false} />
            )}
            name="position"
          />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <InputC label={"Email"} error={errors?.email?.message} value={value} onChangeText={onChange} placeholder={"Your email"} secureTextEntry={false} />
            )}
            name="email"
          />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
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
        <View style={{ paddingHorizontal: 20, paddingTop: 10, }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <InputC label={'Confirm password'} error={errors?.confirmPassword?.message} value={value} onChangeText={onChange} placeholder={"Repeat password"} secureTextEntry={true} />
            )}
            name="confirmPassword"
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <CheckBox
                  // containerStyle={{backgroundColor:'red'}}
                  title="I accept the terms and privacy policy"
                  containerStyle={{ backgroundColor: "transparent" }}
                  fontFamily={'Montserrat-Bold'}
                  textStyle={{ color: errors?.termsOfService?.message == undefined ? 'white' : 'red', fontSize: 12 }}
                  checked={value}
                  checkedColor='white'
                  onPress={() => onChange(!value)}
                />
              </View>
            )}
            name="termsOfService"
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
          <ButtonC title="Sign Up" bgColor={'#69BE25'} loading={RegisterUserReducer?.loading} TextStyle={{ color: '#002245' }} onPress={handleSubmit(onSubmit)} />
        </View>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetContentTextOne}>Already have an account? </Text><TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.bottomSheetContentTextTwo}>Log in</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

function mapStateToProps({ RegisterUserReducer }) {
  return { RegisterUserReducer };
}
export default connect(mapStateToProps, UserRegisterAction)(SignUp);