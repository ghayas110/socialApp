import { SafeAreaView, StyleSheet, StatusBar, View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonC from '../components/button/index';
import AntDedign from "react-native-vector-icons/AntDesign"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




const windowWidth = Dimensions.get('window').width;

const CheckIn = ({ onLogin }) => {
  const [userName, setUserName] = useState()
  useEffect(() => {
    LoadName()
  })


  const LoadName = async () => {
    const value = await AsyncStorage.getItem('UserName');
    setUserName(value)
  }
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#05348E'
    },
    titleWrapper: {
      paddingHorizontal: 20,
      paddingBottom: 10
    },
    titleTextFirst: {
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: 42,
      color: 'white',
      lineHeight: 50
    },
    titleTextSecond: {
      fontFamily: 'Montserrat-ExtraBold',
      fontSize: 42,
      color: '#69BE25',
      lineHeight: 50,
      width:windowWidth * 0.7
    },
    CheckInHeading: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      color: 'white',
      lineHeight: 30,
      paddingBottom: 10
    },
    bottomSheetContent: {
      height: 60,
      width: "100%",
      position: 'absolute',
      top: Dimensions.get('window').height - 60,
      flexDirection: "row",
      alignItems: 'flex-start',
      justifyContent: 'center',
      textAlign: 'center',
      paddingHorizontal: 30
    },
    bottomSheetContentTextOne: {
      fontSize: 13,
      fontFamily: 'Montserrat-Regular',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white'
    },
    bottomSheetContentTextTwo: {
      fontSize: 13,
      fontFamily: 'Montserrat-Regular',
      color: '#69BE25',
    }
  })

  const homeWithoutCheckIn = () => {
    onLogin()
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor={'#05348E'} />
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity>
            <AntDedign name='arrowleft' size={32} color={'#69BE25'} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTextFirst}>Welcome,</Text>
          <Text style={styles.titleTextSecond} size={14} ellipsizeMode={"tail"} numberOfLines={1}>{userName}</Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 70, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.CheckInHeading}>Would you like to check in ?</Text>
          <View style={{ paddingVertical: 20 }}>
            <ButtonC title="Yes" bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} onPress={() => navigation.navigate('CheckInDetail')} />
          </View>
          <ButtonC title="No" bgColor={'#002245'} TextStyle={{ color: 'white' }} onPress={() => homeWithoutCheckIn()} />
        </View>

        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetContentTextOne}>Your CheckIn preference can be changed at any time in Settings.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default CheckIn