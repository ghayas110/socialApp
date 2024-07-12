import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextC from '../components/text/text'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import { global, ResponsiveSize } from '../components/constant'
import ReadMore from '@fawazahmed/react-native-read-more';

const ProfileScreen = () => {
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    ProfileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: ResponsiveSize(15),
      paddingTop: ResponsiveSize(15)
    },
    ProfileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: ResponsiveSize(15)
    },
    ProfileImage: {
      height: ResponsiveSize(70),
      width: ResponsiveSize(70),
      borderRadius: ResponsiveSize(70),
    },
    ProfileImageMain: {
      height: "100%",
      width: "100%",
      borderRadius: ResponsiveSize(70),
    },
    profileImageWrapper: {
      width: '25%',

    },
    ProfilePostInfo: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: '75%',
      position: 'relative',
      paddingBottom: 15,
    },
    ProfilePostInfoInnerCard: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '33.33%',
      height: 80,
      borderRadius: 20,
    },

    ProfilePostInfoInnerCard1: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '20%',
      height: 80,
      borderRadius: 20,
    },
    ProfileTitleDescription: {
      paddingHorizontal: ResponsiveSize(15)
    },
    ProfileSettingBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: ResponsiveSize(15),
      paddingTop: ResponsiveSize(15)
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
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      paddingTop: ResponsiveSize(15),
    },
    box: {
      height: ResponsiveSize(90),
      width: '25%',
      position: 'relative',
      backgroundColor: 'black'
    },
    DescriptionStyle: {
      fontFamily: 'Montserrat-Medium',
      fontSize: ResponsiveSize(10),
      marginTop:ResponsiveSize(5),
      color:global.primaryColor
    },
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
              <Image style={styles.ProfileImageMain} source={require('../assets/icons/profile.png')} />
            </View>
          </View>
          <View style={styles.ProfilePostInfo}>

            <View style={styles.ProfilePostInfoInnerCard1}>
              <TextC text={'54'} font={'Montserrat-SemiBold'} size={ResponsiveSize(20)} style={{ color: '#69BE25' }} />
              <TextC text={'Posts'} font={'Montserrat-SemiBold'} size={ResponsiveSize(12)} />
            </View>

            <View style={styles.ProfilePostInfoInnerCard}>
              <Feather name='map' size={ResponsiveSize(20)} color={'#69BE25'} />
              <TextC text={'Connects'} font={'Montserrat-SemiBold'} size={ResponsiveSize(12)} />
            </View>

            <View style={styles.ProfilePostInfoInnerCard}>
              <MaterialCommunityIcons name='timer-sand' size={ResponsiveSize(20)} color={'#69BE25'} />
              <TextC text={'Honolulusdasd'} font={'Montserrat-SemiBold'} size={ResponsiveSize(12)} style={{ width: "100%" }} ellipsizeMode={"tail"} numberOfLines={1} />
            </View>

          </View>
        </View>


        <View style={styles.ProfileTitleDescription}>
          <TextC font={"Montserrat-SemiBold"} text={"David R."} size={16} />
          <ReadMore seeLessStyle={{fontFamily:"Montserrat-Bold",color:global.primaryColor}} seeMoreStyle={{fontFamily:"Montserrat-Bold",color:global.primaryColor}} numberOfLines={3} style={styles.DescriptionStyle}>
            {
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
          </ReadMore>
        </View>

        <View style={styles.ProfileSettingBtn}>
          <TouchableOpacity style={styles.SetttingBtn} onPress={()=>navigation.navigate('EditProfile')}><Text style={styles.SetttingBtnText}>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.SetttingBtn}><Text style={styles.SetttingBtnText}>Search</Text></TouchableOpacity>
          <TouchableOpacity onPress={Logout} style={styles.SetttingBtn}><Text style={styles.SetttingBtnText}>Logout</Text></TouchableOpacity>
        </View>

        <ScrollView style={{ flexGrow: 1 }}>
          <View style={styles.wrapper}>
            <TouchableOpacity style={styles.box}></TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
