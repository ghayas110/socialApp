import { StyleSheet, SafeAreaView, StatusBar, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import TextC from '../components/text/text';
import AllEvents from '../components/eventLists/AllEvents';
import Unseen from '../components/eventLists/MyEvent.jsx';
import EventHeader from '../components/mainHeader/event';
import { global, ResponsiveSize } from '../components/constant';
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Joined from '../components/eventLists/Joined.jsx';
import MyEvent from '../components/eventLists/MyEvent.jsx';



const EventScreen = ({ route }) => {
  const { myEventReFreash, allEventReFreash, joinedEventReFreash } = route.params;
  const windowWidth = Dimensions.get('window').width;
  const scheme = useColorScheme();
  const [tabSlider, useTabSlider] = useState(joinedEventReFreash ? 2 : myEventReFreash ? 3 : 1)
  const innerBody = windowWidth - ResponsiveSize(30)
  const left = useSharedValue("0%");
  const handlePress = (r) => {
    left.value = withTiming(r == 2 ? "33.33%" : r == 3 ? "66.66%" : "0%");
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: global.white
    },
    bodyWrapper: {
      paddingHorizontal: ResponsiveSize(15),
      paddingTop: ResponsiveSize(5),
    },
    tabWrapper: {
      width: innerBody,
      flexDirection: 'row',
      alignItems: 'center',
    },
    TabSlider: {
      borderWidth: 0,
      borderColor: global.primaryColor,
      height: ResponsiveSize(50),
      backgroundColor: "#A8B8D8",
      borderRadius: ResponsiveSize(60),
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      width: '100%'
    },
    notificationTab: {
      height: ResponsiveSize(50),
      backgroundColor: global.white,
      borderRadius: ResponsiveSize(60),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderWidth: 1,
      borderColor: global.primaryColor,
    },
    TopTab: {
      width: '33.33%',
      height: ResponsiveSize(50),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

    },
    TopTabAbsolute: {
      width: '33.33%',
      height: ResponsiveSize(50),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      zIndex: 1,
      backgroundColor: global.primaryColor,
      borderRadius: ResponsiveSize(60),
      borderWidth: 1,
      borderColor: global.primaryColor,
    },
    Content: {
      paddingVertical: ResponsiveSize(20)
    }
  })
  const tabActivator = (r) => {
    useTabSlider(r)
    handlePress(r)
  }
  const TabContent = () => {
    switch (tabSlider) {
      case 1:
        return <AllEvents isRefreash={allEventReFreash} />;
      case 2:
        return <Joined isRefreash={joinedEventReFreash} />;
      case 3:
        return <MyEvent isRefreash={myEventReFreash} />;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
      <EventHeader backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
      <View style={styles.bodyWrapper}>
        <View style={styles.tabWrapper}>
          <View style={styles.TabSlider}>
            <Animated.View
              style={{
                ...styles.TopTabAbsolute,
                left,
              }}
            >
              <TextC text={tabSlider == 1 ? 'All Events' : tabSlider == 2 ? 'Joined' : tabSlider == 3 ? "My Events" : ""} style={{ color: "white" }} font={'Montserrat-Medium'} size={ResponsiveSize(11)} />
            </Animated.View>
            <TouchableOpacity onPress={() => { tabActivator(1) }} style={styles.TopTab}>
              <TextC text={'All Events'} font={'Montserrat-Medium'} size={ResponsiveSize(11)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { tabActivator(2) }} style={styles.TopTab}>
              <TextC text={'Joined'} font={'Montserrat-Medium'} size={ResponsiveSize(11)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { tabActivator(3) }} style={styles.TopTab}>
              <TextC text={'My Events'} font={'Montserrat-Medium'} size={ResponsiveSize(11)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ ...styles.bodyWrapper, paddingTop: ResponsiveSize(10), flex: 1 }}>
        <TabContent />
      </View>
    </SafeAreaView >
  )
}

export default EventScreen

