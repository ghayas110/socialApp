import { StyleSheet, SafeAreaView, StatusBar, View, TouchableOpacity, Dimensions, ScrollView, ImageBackground, Pressable, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { global, ResponsiveSize } from '../components/constant';
import TextC from '../components/text/text';
import AntDedign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import * as AllEventAction from "../store/actions/Events/index";
import { connect } from "react-redux";


const EventDetail = ({ route, getEventDetail }) => {
  const { id } = route.params;
  const [eventDetail, setEventDetail] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadEventDetail()
  }, [])

  const loadEventDetail = async () => {
    setLoading(true)
    const loadingDetail = await getEventDetail({ id })
    if (loadingDetail) {
      setLoading(false)
      setEventDetail(loadingDetail)
    }
    else {
      setLoading(false)
    }
  }

  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: global.white
    },
    bodyWrapper: {
      paddingHorizontal: ResponsiveSize(15),
      paddingTop: ResponsiveSize(20),
    },
    thumbnail: {
      height: ResponsiveSize(300),
      borderBottomRightRadius: ResponsiveSize(20),
      borderBottomLeftRadius: ResponsiveSize(20),
      overflow: 'hidden'
    },
    thumbnailLoad: {
      height: ResponsiveSize(300),
      borderBottomRightRadius: ResponsiveSize(20),
      borderBottomLeftRadius: ResponsiveSize(20),
      overflow: 'hidden',
      backgroundColor: 'lightgray'
    },
    layer: {
      height: ResponsiveSize(300),
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingTop: ResponsiveSize(40)
    },
    bodyWrapperHeader: {
      height: ResponsiveSize(300),
      paddingHorizontal: ResponsiveSize(15),
      position: 'relative',
    },
    headerBottom: {
      width: windowWidth,
      position: 'absolute',
      bottom: 50,
      paddingHorizontal: ResponsiveSize(15),
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: ResponsiveSize(15)
    },
    profile: {
      height: ResponsiveSize(50),
      width: ResponsiveSize(50),
      borderRadius: ResponsiveSize(50),
      marginRight: ResponsiveSize(5),
      overflow: 'hidden',
    },
    detailSpaces: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: ResponsiveSize(25),
      paddingRight: ResponsiveSize(15)
    },
  })
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={"light-content"} />
        {loading ? <View style={styles.thumbnailLoad}></View> :
          <ImageBackground
            source={eventDetail?.event_cover_image ? { uri: eventDetail.event_cover_image } : null}
            style={styles.thumbnail}>
            <View style={styles.layer}>
              <View style={styles.bodyWrapperHeader}>
                <View style={styles.header}>
                  <Pressable style={styles.gobackBtn} onPress={navigation.goBack}>
                    <AntDedign name='left' size={ResponsiveSize(20)} color={global.white} />
                  </Pressable>
                </View>
                <View style={styles.headerBottom}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={eventDetail?.profile_picture_url ? { uri: eventDetail.profile_picture_url } : null}
                      style={styles.profile} />
                    <View style={{ flexDirection: 'column' }}>
                      <TextC font={"Montserrat-Bold"} style={{ color: global.white, width: 190 }} ellipsizeMode={"tail"} numberOfLines={1} size={ResponsiveSize(15)} text={eventDetail?.user_name} />
                      <TextC font={"Montserrat-Medium"} style={{ color: global.description, width: 190 }} ellipsizeMode={"tail"} numberOfLines={1} size={ResponsiveSize(11)} text={eventDetail?.event_location} />
                    </View>
                  </View>
                  <View>
                    <AntDedign name='edit' size={ResponsiveSize(20)} color={global.white} />
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        }

        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: ResponsiveSize(40) }}>
          {loading ?
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <ActivityIndicator size="large" color={global.primaryColor} />
            </View>
            :
            <View style={styles.bodyWrapper}>
              <TextC font={"Montserrat-Bold"} style={{ color: global.black }} size={ResponsiveSize(22)} text={eventDetail?.event_title} />
              <View style={styles.detailSpaces}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <TextC font={"Montserrat-Bold"} text={'Create at'} style={{ textAlign: 'center', color: global.black }} />
                    <TextC font={"Montserrat-Regular"} text={eventDetail?.created_at?.split("T")[0]} style={{ textAlign: 'center', color: global.placeholderColor }} />
                  </View>
                  <View style={{ flexDirection: 'column', paddingLeft: ResponsiveSize(20) }}>
                    <TextC font={"Montserrat-Bold"} text={eventDetail?.event_date} style={{ textAlign: 'center', color: global.black }} />
                    <TextC font={"Montserrat-Regular"} text={`${eventDetail?.event_start_time} to ${eventDetail?.event_end_time}`} style={{ textAlign: 'center', color: global.placeholderColor }} />
                  </View>
                </View>
                <View>
                  <TouchableOpacity style={styles.locationBtn}>
                    <Ionicons name='location-outline' size={28} color={global.secondaryColor} />
                  </TouchableOpacity>
                </View>
              </View>
              <TextC font={"Montserrat-Bold"} style={{ color: global.black }} size={ResponsiveSize(14)} text={"About this event"} />
              <TextC font={"Montserrat-Regular"} style={{ color: global.black, paddingTop: ResponsiveSize(12) }} size={ResponsiveSize(12)} text={eventDetail?.event_details} />
            </View>
          }
        </ScrollView>
      </SafeAreaView >
    </>
  )
}

function mapStateToProps({ AllEventReducer }) {
  return { AllEventReducer };
}
export default connect(mapStateToProps, AllEventAction)(React.memo(EventDetail));
