import { SafeAreaView, StyleSheet, StatusBar, View, Dimensions, Text } from 'react-native'
import React from 'react'
import InputC from '../components/inputs/index';
import ButtonC from '../components/button/index';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AntDedign from "react-native-vector-icons/AntDesign"
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from '@rneui/themed';
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import TextC from '../components/text/text';
import { OtpInput } from "react-native-otp-entry";


const OtpScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#05348E'
    },
    wrapper: {
      paddingHorizontal: 20,
      paddingTop: 120
    },
    OtpHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar backgroundColor={'#05348E'} />
        <View style={styles.wrapper}>
          <View style={styles.OtpHeader}>
            <TouchableOpacity>
              <AntDedign name='left' size={18} color={'#69BE25'} />
            </TouchableOpacity>
            <TextC text={"Enter code"} size={22} style={{ color: "#69BE25" }} font={'Montserrat-Bold'} />
            <View style={{ width: 22 }}></View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 30, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <TextC text={"We’ve sent an Email with an activation"} size={16} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextC text={"code to your account"} size={16} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
              <TextC text={"David.R@gmail.com"} size={16} style={{ color: "#69BE25", textAlign: 'center', marginLeft: 4 }} font={'Montserrat-Bold'} />
            </View>
          </View>


          <View style={{ paddingHorizontal: 10, paddingTop: 30 }}>
            <OtpInput focusColor={'#69BE25'}
              inputsContainerStyle={{
                color: '#69BE25'
              }}
              numberOfDigits={5} onTextChange={(text) => console.log(text)} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,paddingTop:30 }}>
          <TextC text={"I didn’t receive a code"} size={15} style={{ color: "white", textAlign: 'center' }} font={'Montserrat-Regular'} />
          <TouchableOpacity>
            <TextC text={"Resend"} size={15} style={{ color: "#69BE25", textAlign: 'center', marginLeft: 4 }} font={'Montserrat-Bold'} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:30}}>
          <ButtonC title="Verify" bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} onPress={() => navigation.navigate('CheckIn')} />
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default OtpScreen