import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';

const ReelScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={{flex:1,height:windowHeight,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontFamily:'Montserrat-Bold'}}>Group Chat Coming Soon</Text>
    </View>
  )
}

export default ReelScreen

const styles = StyleSheet.create({})