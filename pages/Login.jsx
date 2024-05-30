import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import InputC from '../components/inputs/index';
import ButtonC from '../components/button/index';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {
  const scheme = useColorScheme();
  const width = Dimensions.get('window').width;
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must contain at least 8 characters'),
    userName: yup
      .string()
      .required('User name is required')
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: DefaultTheme.colors.background }),
    },
  })


  const onSubmit = data => {
    console.log(data);
    alert('Form submitted successfully!');
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: width - 40, paddingVertical: 10 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputC error={errors.userName} value={value} onChangeText={onChange} placeholder={"User name"} secureTextEntry={false} />
          )}
          name="userName"
        />
      </View>

      <View style={{ width: width - 40, paddingVertical: 10 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputC error={errors.email} value={value} onChangeText={onChange} placeholder={"Email"} secureTextEntry={false} />
          )}
          name="email"
        />
      </View>


      <View style={{ width: width - 40, paddingVertical: 10 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputC error={errors.password} value={value} onChangeText={onChange} placeholder={"Password"} secureTextEntry={true} />
          )}
          name="password"
        />
      </View>

      <View style={{ width: width - 40, paddingVertical: 10 }}>
        <ButtonC title="Register" bgColor={'#3797EF'} TextStyle={{ color: 'white' }} onPress={handleSubmit(onSubmit)} />
      </View>


      <View style={{ width: width - 40, paddingVertical: 20 }}>
        <ButtonC title={"Register With Facebook"} IsImage={true} Image={"../../assets/icons/facebook.png"} bgColor={'transparent'} TextStyle={{ color: '#3797EF' }} onPress={handleSubmit(onSubmit)} />
      </View>

    </SafeAreaView>
  )
}

export default Login

{/* <Button text={"Log in"} bgColor={"#3797EF"} loading={false} /> */ }
{/* <Button text={"Switch account"} bgColor={"transparent"} TextStyle={{ color: "#3797EF" }} loading={false} /> */ }