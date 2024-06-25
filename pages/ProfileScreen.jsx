import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextC from '../components/text/text'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    ProfileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 20
    },
    ProfileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20
    },
    ProfileImage: {
      height: 120,
      width: 90,
      borderRadius: 22,
      padding: 3,
      borderWidth: 1,
      borderColor: '#B3B3B3'
    },
    ProfileImageMain: {
      height: "100%",
      width: "100%",
    },
    ProfilePostInfo: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: '70%',
      position: 'relative',
      paddingBottom: 15
    },
    ProfilePostInfoInnerCard: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '33.33%',
      height: 80,
      borderRadius: 20,
    },
    profileImageWrapper: {
      width: '30%'
    },
    ProfileTitleDescription: {
      paddingHorizontal: 20
    },
    ProfileSettingBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
      paddingTop: 15
    },
    SetttingBtn: {
      backgroundColor: '#05348E',
      width: '32%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderRadius: 20

    },
    SetttingBtnText: {
      color: "white",
      fontFamily: 'Montserrat-Medium',
      fontSize: 12,
    },
    CollapseSlider: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopColor: ''
    }
  })

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('Token');
      navigation.navigate('login')
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.ProfileHeader}>
          <View style={{ width: 25 }}>
          </View>
          <View>
            <TextC font={"Montserrat-Bold"} text={"David R. Wright"} size={16} />
          </View>
          <View>
            <Entypo name='menu' size={26} color={'#05348E'} />
          </View>
        </View>

        <View style={styles.ProfileInfo}>
          <View style={styles.profileImageWrapper}>
            <View style={styles.ProfileImage}>
              <Image style={styles.ProfileImageMain} source={require('../assets/icons/cityImage1.png')} />
            </View>
          </View>
          <View style={styles.ProfilePostInfo}>
            <View style={styles.ProfilePostInfoInnerCard}>
              <TextC text={'23hrs'} font={'Montserrat-Medium'} size={12} style={{ color: '#C8C8CC' }} />
              <MaterialCommunityIcons name='timer-sand' size={22} color={'#69BE25'} />
              <TextC text={'Honolulusdasd'} font={'Montserrat-SemiBold'} size={14} style={{ width: "100%" }} ellipsizeMode={"tail"} numberOfLines={1} />
            </View>
            <View style={styles.ProfilePostInfoInnerCard}>
              <Feather name='map' size={22} color={'#69BE25'} />
              <TextC text={'Map'} font={'Montserrat-SemiBold'} size={14} />
            </View>
            <View style={styles.ProfilePostInfoInnerCard}>
              <TextC text={'54'} font={'Montserrat-Bold'} size={22} style={{ color: '#69BE25' }} />
              <TextC text={'Post'} font={'Montserrat-SemiBold'} size={14} />
            </View>
          </View>
        </View>


        <View style={styles.ProfileTitleDescription}>
          <TextC font={"Montserrat-SemiBold"} text={"David R."} size={16} />
          <TextC style={{ marginTop: 8 }} font={"Montserrat-Medium"} text={"🌍 World Explorer | 📸 Visual Storyteller✈️ Traveling the globe, one adventure at a time"} size={13} />
        </View>

        <View style={styles.ProfileSettingBtn}>
          <TouchableOpacity style={styles.SetttingBtn}><Text style={styles.SetttingBtnText}>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.SetttingBtn}><Text style={styles.SetttingBtnText}>Search</Text></TouchableOpacity>
          <TouchableOpacity onPress={Logout} style={styles.SetttingBtn}><Text style={styles.SetttingBtnText}>Logout</Text></TouchableOpacity>
        </View>

        <View style={styles.CollapseSlider}>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
