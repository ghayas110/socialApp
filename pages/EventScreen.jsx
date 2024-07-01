import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, useWindowDimensions, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import TextC from '../components/text/text';
import Upcoming from '../components/eventLists/upcoming';
import Incomplete from '../components/eventLists/incomplete';
import Unseen from '../components/eventLists/unseen';
import EventHeader from '../components/mainHeader/event';
import { global, ResposiveSize } from '../components/constant';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';



const EventScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const scheme = useColorScheme();
  const [tabSlider, useTabSlider] = useState(1)
  const [notification, setNotification] = useState(false)
  const innerBody = windowWidth - ResposiveSize(30)
  const left = useSharedValue("0%");
  const handlePress = (r) => {
    left.value = withSpring(r == 2 ? "50%" : "0%");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: global.white
    },
    bodyWrapper: {
      paddingHorizontal: ResposiveSize(15),
      paddingTop: ResposiveSize(5)
    },
    tabWrapper: {
      width: innerBody,
      flexDirection: 'row',
      alignItems: 'center',
    },
    TabSlider: {
      borderWidth: 1,
      borderColor: global.primaryColor,
      height: 50,
      backgroundColor: "#A8B8D8",
      borderRadius: 60,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      width: '68%'
    },
    notificationTab: {
      height: 50,
      backgroundColor: global.white,
      borderRadius: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderWidth: 1,
      borderColor: global.primaryColor,
    },
    notificationTabWrapper: {
      width: '32%',
      paddingLeft: "2%",
    },
    TopTab: {
      width: '50%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

    },
    TopTabAbsolute: {
      width: '50%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -1,
      zIndex: 1,
      backgroundColor: global.primaryColor,
      borderRadius: 60,
      borderWidth: 1,
      borderColor: global.primaryColor,
    },
    Content: {
      paddingVertical: 20
    }
  })
  const tabActivator = (r) => {
    useTabSlider(r)
    handlePress(r)
  }
  const isNofification = (t) => {
    setNotification(t)
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
      <EventHeader backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />


      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.bodyWrapper}>
          <View style={styles.tabWrapper}>
            <View style={styles.TabSlider}>
              <Animated.View
                style={{
                  ...styles.TopTabAbsolute,
                  left,
                }}
              >
                <TextC text={tabSlider == 1 ? 'Upcoming' : tabSlider == 2 ? 'In Progress' : ""} style={{ color: "white" }} font={'Montserrat-Medium'} size={12} />
              </Animated.View>
              <TouchableOpacity onPress={() => { tabActivator(1) }} style={styles.TopTab}>
                <TextC text={'Upcoming'} font={'Montserrat-Medium'} size={12} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { tabActivator(2) }} style={styles.TopTab}>
                <TextC text={'In Progress'} font={'Montserrat-Medium'} size={12} />
              </TouchableOpacity>
            </View>





            <View style={styles.notificationTabWrapper}>
              <TouchableOpacity onPress={() => isNofification(true)} style={styles.notificationTab}>
                <TextC text={'Notification'} font={'Montserrat-Medium'} size={12} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.Content}>
            {tabSlider == 1 ? <Upcoming /> : tabSlider == 2 ? <Incomplete /> : notification == true ? <Unseen /> : ""}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventScreen

