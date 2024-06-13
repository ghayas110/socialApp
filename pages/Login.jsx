import { SafeAreaView, StyleSheet, StatusBar, View, Dimensions, Text } from 'react-native'
import React from 'react'
import InputC from '../components/inputs/index';
import ButtonC from '../components/button/index';
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


const LogIn = () => {
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
    titleWrapper: {
      paddingHorizontal: 20,
      paddingBottom: 10
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
      height: 50,
      width: "100%",
      position: 'absolute',
      top: Dimensions.get('window').height - 50,
      flexDirection: "row",
      alignItems: 'flex-start',
      justifyContent: 'center'
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
    forgotPassword: {
      color: 'white',
      fontFamily: 'Montserrat-Regular',
      fontSize: 12
    }
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
                  errors?.password?.message ? errors?.password?.message : ""}</Text>
            </Animated.View>


          </View>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTextFirst}>Hey,</Text>
          <Text style={styles.titleTextSecond}>Welcome</Text>
          <Text style={styles.titleTextSecond}>Back</Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
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

        <View style={{ paddingRight: 40, paddingBottom: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>

          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>




        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
          <ButtonC title="Sign In" bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} onPress={() => navigation.navigate('CheckIn')} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
          <Text style={styles.bottomSheetContentTextOne}>Don’t have an account? </Text><TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.bottomSheetContentTextTwo}>Sign up</Text></TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 0 }}>
          <TouchableOpacity style={styles.socialLoginBtn}>
            <FontAwesome name='facebook' size={22} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginBtn}>
            <AntDedign name='google' size={22} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginBtn}>
            <AntDedign name='apple1' size={22} color={'black'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default LogIn