import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextC from '../components/text/text'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import { global, ResponsiveSize } from '../components/constant'
import ReadMore from '@fawazahmed/react-native-read-more';
import * as UserProfile from "../store/actions/UserProfile/index";
import { connect } from "react-redux";


const ProfileScreen = ({ GetUserProfileReducer }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
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
      borderWidth: 1,
      borderColor: global.description
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
      borderWidth: 1,
      borderColor: global.description,
    },
    DescriptionStyle: {
      fontFamily: 'Montserrat-Medium',
      fontSize: ResponsiveSize(10),
      marginTop: ResponsiveSize(5),
      color: global.primaryColor
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
            <TextC font={"Montserrat-Bold"} text={GetUserProfileReducer?.data?.user_name} size={ResponsiveSize(14)} />
          </View>
          <TouchableOpacity>
            <Entypo name='menu' size={26} color={'#05348E'} />
          </TouchableOpacity>
        </View>

        <View style={styles.ProfileInfo}>
          <View style={styles.profileImageWrapper}>
            <View style={styles.ProfileImage}>
              <Image style={styles.ProfileImageMain} source={GetUserProfileReducer?.data?.profile_picture_url == "" ? require('../assets/icons/avatar.png') : { uri: GetUserProfileReducer?.data?.profile_picture_url }} />
            </View>
          </View>
          <View style={styles.ProfilePostInfo}>

            <View style={styles.ProfilePostInfoInnerCard1}>
              <TextC text={GetUserProfileReducer?.data?.post_count || 0} font={'Montserrat-SemiBold'} size={ResponsiveSize(20)} style={{ color: '#69BE25' }} />
              <TextC text={'Posts'} font={'Montserrat-SemiBold'} size={ResponsiveSize(12)} />
            </View>

            <View style={styles.ProfilePostInfoInnerCard}>
              <TextC text={GetUserProfileReducer?.data?.connection_count || 0} font={'Montserrat-SemiBold'} size={ResponsiveSize(20)} style={{ color: '#69BE25' }} />
              <TextC text={'Connects'} font={'Montserrat-SemiBold'} size={ResponsiveSize(12)} />
            </View>

            <View style={styles.ProfilePostInfoInnerCard}>
              <MaterialCommunityIcons name='timer-sand' size={ResponsiveSize(20)} color={'#69BE25'} />
              <TextC text={'Honolulu'} font={'Montserrat-SemiBold'} size={ResponsiveSize(12)} style={{ width: "100%", textAlign: 'center' }} ellipsizeMode={"tail"} numberOfLines={1} />
            </View>
          </View>
        </View>

        <View style={styles.ProfileTitleDescription}>
          <TextC font={"Montserrat-SemiBold"} text={GetUserProfileReducer?.data?.user_name} size={16} />
          {GetUserProfileReducer?.data?.bio &&
          <ReadMore seeLessStyle={{ fontFamily: "Montserrat-Bold", color: global.primaryColor }} seeMoreStyle={{ fontFamily: "Montserrat-Bold", color: global.primaryColor }} numberOfLines={3} style={styles.DescriptionStyle}>
            {GetUserProfileReducer?.data?.bio}
          </ReadMore>
          }
        </View>

        <View style={styles.ProfileSettingBtn}>
          <TouchableOpacity style={styles.SetttingBtn} onPress={() => navigation.navigate('EditProfile')}><Text style={styles.SetttingBtnText}>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.SetttingBtn}><Text style={styles.SetttingBtnText}>Search</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')} style={styles.SetttingBtn}><Text style={styles.SetttingBtnText}>Setting</Text></TouchableOpacity>
        </View>

        <ScrollView style={{ flexGrow: 1 }}>
          <View style={styles.wrapper}>
            {GetUserProfileReducer?.data?.posts !== undefined && GetUserProfileReducer?.data?.posts !== null && GetUserProfileReducer?.data?.posts !== "" && GetUserProfileReducer?.data?.posts?.length > 0 ? GetUserProfileReducer?.data?.posts.map(userPosts => (
              <TouchableOpacity key={userPosts?.parent_id} style={styles.box}>
                <Image style={{ resizeMode: 'cover', height: '100%', width: "100%" }} source={{ uri: userPosts?.attachment_thumbnail_url }} />
              </TouchableOpacity>
            )) :
              <View style={{ paddingTop: ResponsiveSize(80), flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: windowWidth,borderTopColor:global.description,borderTopWidth:1}}>
                <TextC text={"No Post Available Yet"} font={"Montserrat-Bold"} />
                <TouchableOpacity style={{ backgroundColor: '#05348E', width: ResponsiveSize(150),flexDirection:'column',alignItems:'center',justifyContent:'center',paddingVertical:ResponsiveSize(10),borderRadius:ResponsiveSize(30),marginTop:ResponsiveSize(10)}} onPress={() => navigation.navigate('CreatePost')}>
                  <TextC text={"Start Your First Post"} font={"Montserrat-Medium"} size={ResponsiveSize(11)} style={{color:'white'}} />
                </TouchableOpacity>
              </View>}
          </View>

        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

function mapStateToProps({ GetUserProfileReducer }) {
  return { GetUserProfileReducer };
}
export default connect(mapStateToProps, UserProfile)(ProfileScreen);