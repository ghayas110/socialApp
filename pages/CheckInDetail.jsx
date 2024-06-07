import { SafeAreaView, StyleSheet, StatusBar, View, Dimensions, Text } from 'react-native'
import React from 'react'
import SelectC from '../components/select/index';
import ButtonC from '../components/button/index';
import InputC from '../components/inputs/index';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AntDedign from "react-native-vector-icons/AntDesign"
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from '@rneui/themed';
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';



const SignUp = () => {
  const navigation = useNavigation()
  const width = useSharedValue(0);
  const schema = yup.object().shape({
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
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
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
      justifyContent: 'center'
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
      width: "100%",
      flexDirection: "row",
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: 22,
      paddingVertical: 20
    },
    bottomSheetContentTextOne: {
      fontSize: 12,
      fontFamily: 'Montserrat-Italic',
      flexDirection: 'row',
      alignItems: 'center',
      color:'white'
    },
  })
  const onSubmit = data => {
    console.log(data);
    alert('Form submitted successfully!');
  };
  const CloseError = () => {
    width.value = withTiming(0)
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor={'#05348E'} />
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity>
            <AntDedign name='arrowleft' size={32} color={'#69BE25'} />
          </TouchableOpacity>
          <View style={styles.errorArea}>
            <Animated.View
              style={{
                ...(Object.keys(errors).length == 0 ? { width: width.value = withTiming(0) } : { backgroundColor: width.value = withSpring(250) }),
                width,
                height: 35,
                backgroundColor: 'white',
                borderRadius: 30,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={CloseError}>
                <Entypo name='circle-with-cross' color={'#ff4f4f'} size={25} style={{ paddingHorizontal: 5 }} />
              </TouchableOpacity>
              <Text style={{ color: 'black', fontSize: 12, fontFamily: "Montserrat-Regular" }}>
                {errors?.email?.message ? errors?.email?.message :
                  errors?.password?.message ? errors?.password?.message :
                    errors?.confirmPassword?.message ? errors?.confirmPassword?.message :
                      errors?.termsOfService?.message ? errors?.termsOfService?.message : ""}</Text>
            </Animated.View>
          </View>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTextFirst}>Welcome,</Text>
          <Text style={styles.titleTextSecond}>Anthony T.</Text>
        </View>




        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <SelectC label={"Country"} error={errors?.email?.message} value={value} onChangeText={onChange} placeholder={"Your email"} secureTextEntry={false} />
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
              <SelectC label={"City"} error={errors?.email?.message} value={value} onChangeText={onChange} placeholder={"Your email"} secureTextEntry={false} />
            )}
            name="email"
          />
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 10, }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <InputC label={'How long is your layover ?'} error={errors?.confirmPassword?.message} value={value} onChangeText={onChange} placeholder={"25h"} secureTextEntry={false} />
            )}
            name="confirmPassword"
          />
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 15, paddingTop: 30 }}>
          <ButtonC title="Continue" bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} onPress={handleSubmit(onSubmit)} />
        </View>


        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetContentTextOne}>Disclaimer: This app will not show exact locations but just the city you are currently laying over in. </Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default SignUp