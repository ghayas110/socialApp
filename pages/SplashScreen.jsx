import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
const SplashScreen = () => {
    const navigation =useNavigation()
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Login')
      }, 1000); // Navigate to Home screen after 10 seconds
    }, [navigation]);
  
    return (
      <View style={styles.container}>
   <Image source={require('../images/logo.jpeg')} style={{width:200,height:220,resizeMode:'contain'}}/>
   
    </View>
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