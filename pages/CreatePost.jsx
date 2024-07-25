import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';

const CreatePost = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={{flex:1,height:windowHeight,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontFamily:'Montserrat-Bold'}}>Create Post Coming Soon</Text>
    </View>
  )
}

export default CreatePost

const styles = StyleSheet.create({})