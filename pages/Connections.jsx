import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import TextC from '../components/text/text';
import {global, ResponsiveSize} from '../components/constant';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AllConnections from '../components/connectionList/AllConnections.jsx';
import PendingConnections from '../components/connectionList/PendingConnections.jsx';

const Connections = ({route}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowheight = Dimensions.get('window').height;
  const scheme = useColorScheme();
  const [tabSlider, useTabSlider] = useState(1);
  const innerBody = windowWidth - ResponsiveSize(30);
  const left = useSharedValue('0%');
  const [allEventPage, useAllEventPage] = useState(1);
  const [joinedEventPage, useJoinedEventPage] = useState(1);

  const handlePress = r => {
    left.value = withTiming(r == 1 ? '0%' : r == 2 ? '50%' : '0%');
  };

  const tabActivator = r => {
    useTabSlider(r);
    handlePress(r);
  };
  useEffect(() => {
    useTabSlider(1);
    handlePress(1);
  }, []);

  const TabContent = () => {
    switch (tabSlider) {
      case 1:
        return (
          <AllConnections page={allEventPage} pageChange={useAllEventPage} />
        );
      case 2:
        return (
          <PendingConnections
            page={joinedEventPage}
            pageChange={useJoinedEventPage}
            tabActivator={tabActivator}
          />
        );
      default:
        return null;
    }
  };
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth,
      paddingHorizontal: ResponsiveSize(15),
      paddingVertical: ResponsiveSize(15),
      backgroundColor: global.white,
    },
    logoSide1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '33.33%',
    },
    logoSide2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '33.33%',
    },
    logoSide3: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '33.33%',
    },
    container: {
      flex: 1,
      backgroundColor: global.white,
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
      backgroundColor: '#A8B8D8',
      borderRadius: ResponsiveSize(60),
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
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
      width: '50%',
      height: ResponsiveSize(50),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TopTabAbsolute: {
      width: '50%',
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
      paddingVertical: ResponsiveSize(20),
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.wrapper}>
        <Pressable onPress={() => navigation.goBack()} style={styles.logoSide1}>
          <AntDesign
            name="left"
            color={global.primaryColor}
            size={ResponsiveSize(22)}
          />
        </Pressable>
        <View style={styles.logoSide2}>
          <TextC
            size={ResponsiveSize(13)}
            font={'Montserrat-Bold'}
            text={'Connection'}
          />
        </View>
        <TouchableOpacity
          style={styles.logoSide3}
          onPress={() => navigation.navigate('SearchUser')}>
          <AntDesign
            name="search1"
            color={global.primaryColor}
            size={ResponsiveSize(22)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyWrapper}>
        <View style={styles.tabWrapper}>
          <View style={styles.TabSlider}>
            <Animated.View
              style={{
                ...styles.TopTabAbsolute,
                left,
              }}>
              <TextC
                text={
                  tabSlider == 1
                    ? 'All Connections'
                    : tabSlider == 2
                    ? 'Pending'
                    : ''
                }
                style={{color: 'white'}}
                font={'Montserrat-Medium'}
                size={ResponsiveSize(11)}
              />
            </Animated.View>
            <TouchableOpacity
              onPress={() => {
                tabActivator(1);
              }}
              style={styles.TopTab}>
              <TextC
                text={'All Connections'}
                font={'Montserrat-Medium'}
                size={ResponsiveSize(11)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                tabActivator(2);
              }}
              style={styles.TopTab}>
              <TextC
                text={'Pending'}
                font={'Montserrat-Medium'}
                size={ResponsiveSize(11)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.bodyWrapper,
          paddingTop: ResponsiveSize(10),
          flex: 1,
        }}>
        <TabContent />
      </View>
    </SafeAreaView>
  );
};

export default Connections;
