import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
const SplashScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('PasswordChanged')
    }, 1000);
  }, [navigation]);

  return (
    <ImageBackground source={require('../assets/fonts/splashScreenBack.png')} style={styles.container}>
      
    </ImageBackground>
  );
};

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})