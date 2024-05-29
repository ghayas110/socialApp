import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';



const SignUp = () => {
  const scheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: DefaultTheme.colors.background }),
    },
    text:{
      ...(scheme === 'dark' ? { color: DarkTheme.colors.text } : { color: DefaultTheme.colors.text }),
    }
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SignUp</Text>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({

})