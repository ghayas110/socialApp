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
import TextC from '../components/text/text';
import { ResposiveSize, global } from '../components/constant';
import { useToast } from '../components/Toast/ToastContext';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({ insertUser, RegisterUserReducer, getAllAirline }) => {
  const { showToast } = useToast();
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [allAirLine, setAllAirLine] = useState()
  useEffect(() => {
    LoadAirLine()
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
        showToast({
          title: "Email already exists",
          message: "Email already exists.Please try again.",
          iconColor: "red",
          iconName: "mail",
          bg: "#fff2f2"
        })
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
  const LoadAirLine = async () => {
    const loadAllAirLineDetail = await getAllAirline()
    setAllAirLine(loadAllAirLineDetail?.data)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: global.primaryColor
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
      justifyContent: 'space-between',
    },
    titleWrapper: {
      width: windowWidth - ResposiveSize(30),
      paddingTop: windowHeight * 0.05
    },
    titleTextFirst: {
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: ResposiveSize(50),
      color: global.white,
      lineHeight: ResposiveSize(50)
    },
    titleTextSecond: {
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: ResposiveSize(50),
      color: global.secondaryColor,
      lineHeight: ResposiveSize(50)
    },
    secondInputWrapper: {
      paddingTop: windowHeight * 0.02
    },
    termsWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    haveAccoundWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: windowHeight * 0.01,
      paddingBottom: windowHeight * 0.05,
    },
    submitBtnWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: ResposiveSize(8)
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      width: windowWidth * 0.8,
      height: windowHeight * 0.56,
      backgroundColor: '#7891C2',
      borderRadius: ResposiveSize(20),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingHorizontal: ResposiveSize(20),
      paddingVertical: ResposiveSize(20),
    },
    modalTextHeading: {
      fontFamily: 'Montserrat-Bold',
      fontSize: ResposiveSize(13),
      color: global.white,
    }
  })
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor={global.primaryColor} />
        <View style={styles.bodyWrapper}>
          <View style={styles.header}>
            <Pressable onPress={navigation.goBack}>
              <AntDedign name='left' size={ResposiveSize(20)} color={global.secondaryColor} />
            </Pressable>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <AntDedign name='infocirlceo' size={ResposiveSize(20)} color={global.secondaryColor} />
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              presentationStyle={'overFullScreen'}
              statusBarTranslucent={true}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ paddingBottom: ResposiveSize(15), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <AntDedign name='infocirlceo' size={ResposiveSize(12)} color={global.white} />
                      <TextC size={ResposiveSize(18)} text={"Form Info"} style={{ color: global.white, marginLeft: 5 }} font={"Montserrat-Bold"} />
                    </View>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <AntDedign name='close' size={ResposiveSize(22)} color={global.white} />
                    </Pressable>
                  </View>

                  <View style={{ paddingBottom: ResposiveSize(15) }}>
                    <TextC text={"User name"} size={ResposiveSize(11)} style={{ color: global.white }} font={"Montserrat-Bold"} />
                    <TextC size={ResposiveSize(12)} text={"user name is required."} style={{ color: global.white }} font={"Montserrat-Regular"} />
                  </View>

                  <View style={{ paddingBottom: ResposiveSize(15) }}>
                    <TextC text={"Air line"} size={ResposiveSize(11)} style={{ color: global.white }} font={"Montserrat-Bold"} />
                    <TextC size={ResposiveSize(12)} text={"air line is required."} style={{ color: global.white }} font={"Montserrat-Regular"} />
                  </View>

                  <View style={{ paddingBottom: ResposiveSize(15) }}>
                    <TextC text={"Position"} size={ResposiveSize(11)} style={{ color: global.white }} font={"Montserrat-Bold"} />
                    <TextC size={ResposiveSize(12)} text={"position is required."} style={{ color: global.white }} font={"Montserrat-Regular"} />
                  </View>

                  <View style={{ paddingBottom: ResposiveSize(15) }}>
                    <TextC text={"Email"} sty size={ResposiveSize(11)} style={{ color: global.white }} font={"Montserrat-Bold"} />
                    <TextC size={ResposiveSize(12)} text={"email is required."} style={{ color: global.white }} font={"Montserrat-Regular"} />
                  </View>

                  <View style={{ paddingBottom: ResposiveSize(15) }}>
                    <TextC text={"Email"} sty size={ResposiveSize(11)} style={{ color: global.white }} font={"Montserrat-Bold"} />
                    <TextC size={ResposiveSize(12)} text={"Email is required."} style={{ color: global.white }} font={"Montserrat-Regular"} />
                  </View>

                  <View style={{ paddingBottom: ResposiveSize(15) }}>
                    <TextC text={"Password"} size={ResposiveSize(11)} style={{ color: global.white }} font={"Montserrat-Bold"} />
                    <TextC size={ResposiveSize(12)} text={"Password must be 8+ characters."} style={{ color: global.white }} font={"Montserrat-Regular"} />
                  </View>

                  <View style={{ paddingBottom: ResposiveSize(15) }}>
                    <TextC text={"Terms & privacy"} size={ResposiveSize(11)} style={{ color: global.white }} font={"Montserrat-Bold"} />
                    <TextC size={ResposiveSize(12)} text={"Accept terms & privacy policy."} style={{ color: global.white }} font={"Montserrat-Regular"} />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleTextFirst}>Let's, <Text style={styles.titleTextSecond}>get</Text></Text>
            <Text style={styles.titleTextSecond}>started</Text>
          </View>
          <View style={styles.secondInputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <InputC label={"User name"} max={20} error={errors?.userName?.message} value={value} onChangeText={onChange} placeholder={"User name"} secureTextEntry={false} />
              )}
              name="userName"
            />
          </View>
          <View style={styles.secondInputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <SelectC label={"Air line"} data={allAirLine} placeholder={'Select airline'} error={errors?.airline?.message} value={value} onChangeText={onChange} secureTextEntry={false} />
              )}
              name="airline"
            />
          </View>
          <View style={styles.secondInputWrapper}>
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
          <View style={styles.secondInputWrapper}>
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
          <View style={styles.secondInputWrapper}>
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
          <View style={styles.termsWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: ResposiveSize(8) }}>
                  <CheckBox
                    containerStyle={{ backgroundColor: "transparent", margin: 0, padding: 0 }}
                    checked={value}
                    size={ResposiveSize(16)}
                    checkedColor={global.white}
                    onPress={() => onChange(!value)}
                  />
                  <TextC text={'I accept the terms and privacy policy'} style={{ color: errors?.termsOfService?.message == undefined ? global.white : 'red' }} font={"Montserrat-Light"} size={ResposiveSize(11)} />
                </View>
              )}
              name="termsOfService"
            />
          </View>
          <View style={styles.submitBtnWrapper}>
            <ButtonC title="Sign Up" bgColor={global.secondaryColor} disabled={RegisterUserReducer?.loading} loading={RegisterUserReducer?.loading} TextStyle={{ color: global.primaryColorDark }} onPress={handleSubmit(onSubmit)} />
          </View>

          <View style={styles.haveAccoundWrapper}>
            <TextC text={'Already have an account?'} style={{ color: global.white }} size={ResposiveSize(11)} font={"Montserrat-Regular"} /><TouchableOpacity onPress={() => navigation.navigate('Login')}><TextC text={'Login'} style={{ color: global.secondaryColor, marginLeft: ResposiveSize(5) }} size={ResposiveSize(11)} font={"Montserrat-Bold"} /></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

function mapStateToProps({ RegisterUserReducer }) {
  return { RegisterUserReducer };
}
export default connect(mapStateToProps, UserRegisterAction)(SignUp);