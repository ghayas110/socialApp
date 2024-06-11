import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import Animated from 'react-native-reanimated';
import TextC from '../components/text/text';
import Upcoming from '../components/eventLists/upcoming';
import Incomplete from '../components/eventLists/incomplete';
import Unseen from '../components/eventLists/unseen';


const EventScreen = () => {
  const scheme = useColorScheme();
  const [tabSlider,useTabSlider] = useState(1)



  const styles = StyleSheet.create({
    TabSlider: {
      height: 50,
      backgroundColor: "#A8B8D8",
      borderRadius: 60,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    TopTab: {
      width: '33.33%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    TopTabAbsolute: {
      width: '33.33%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: tabSlider==1?'0':tabSlider==2?'33.33%':tabSlider==3?'66.66%':'',
      zIndex: 1,
      backgroundColor: "#05348E",
      borderRadius: 60,
    },
    Content:{
      paddingVertical:20
    }
  })
  const tabActivator =(r)=>{
    useTabSlider(r)
  }


  return (
    <SafeAreaView>
      <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
      <ScrollView style={{ flexGrow: 1, padding: 20, ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: 'white' }), }}>
        <View style={styles.TabSlider}>
          <View style={styles.TopTabAbsolute}>
            <TextC text={tabSlider==1?'Upcoming':tabSlider==2?'Incomplete':tabSlider==3?'Unseen':""} style={{ color: "white" }} font={'Montserrat-Medium'} size={12} />
          </View>
          <TouchableOpacity onPress={()=>tabActivator(1)} style={styles.TopTab}>
            <TextC text={'Upcoming'} font={'Montserrat-Medium'} size={12} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>tabActivator(2)} style={styles.TopTab}>
            <TextC text={'Incomplete'} font={'Montserrat-Medium'} size={12} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>tabActivator(3)} style={styles.TopTab}>
            <TextC text={'Unseen'} font={'Montserrat-Medium'} size={12} />
          </TouchableOpacity>
        </View>
        <View style={styles.Content}>
          {tabSlider==1?<Upcoming/>:tabSlider==2?<Incomplete/>:tabSlider==3?<Unseen/>:""}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventScreen

