import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import InputC from '../components/inputs';
import Button from '../components/button';



const SignUp = () => {
  const scheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal:20,
      justifyContent: 'center',
      alignItems: 'center',
      ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: DefaultTheme.colors.background }),
    },
  
  })
  return (
    <SafeAreaView style={styles.container}>
        <InputC placeholder={"User Name"} secureTextEntry={false}/>
        <InputC placeholder={"Password"} secureTextEntry={true}/>
        <Button text={"Log in"} bgColor={"#3797EF"} loading={false}/>
        <Button text={"Switch account"} bgColor={"transparent"} TextStyle={{color:"#3797EF"}} loading={false}/>
    </SafeAreaView>
  )
}

export default SignUp
