import { StyleSheet, SafeAreaView, StatusBar, View, Modal, TouchableOpacity, Dimensions, ScrollView, ImageBackground, Pressable, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { global, ResponsiveSize } from '../components/constant';
import TextC from '../components/text/text';
import AntDedign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import * as AllEventAction from "../store/actions/Events/index";
import { connect } from "react-redux";
import Feather from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image';

const EventDetail = ({ route, getEventDetail, DeleteEvent, AllEventReducer, JoinEvents, LeaveEvents, getAllEvents, getJoinedEvents, getMyEvents }) => {
  const { id } = route.params;
  const [eventDetail, setEventDetail] = useState()
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false);


  useEffect(() => {
    loadEventDetail()
  }, [])

  const loadEventDetail = async () => {
    setLoading(true)
    const loadingDetail = await getEventDetail({ id })
    if (loadingDetail) {
      setEventDetail(loadingDetail)
      setLoading(false)
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      bottom: ResponsiveSize(50),
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
    profileAvatar: {
      height: ResponsiveSize(50),
      width: ResponsiveSize(50),
      borderRadius: ResponsiveSize(50),
      marginRight: ResponsiveSize(5),
      overflow: 'hidden',
      backgroundColor: global.description,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailSpaces: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: ResponsiveSize(25),
      paddingRight: ResponsiveSize(15)
    },
    leaveBtn: {
      backgroundColor: global.red,
      width: ResponsiveSize(120),
      paddingHorizontal: ResponsiveSize(30),
      paddingVertical: ResponsiveSize(5),
      borderRadius: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    JoinBtn: {
      backgroundColor: global.secondaryColor,
      width: ResponsiveSize(120),
      paddingHorizontal: ResponsiveSize(30),
      paddingVertical: ResponsiveSize(5),
      borderRadius: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    leaveBtn2: {
      backgroundColor: global.red,
      width: ResponsiveSize(80),
      paddingHorizontal: ResponsiveSize(10),
      paddingVertical: ResponsiveSize(5),
      borderRadius: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    JoinBtn2: {
      backgroundColor: global.secondaryColor,
      width: ResponsiveSize(80),
      paddingHorizontal: ResponsiveSize(10),
      paddingVertical: ResponsiveSize(5),
      borderRadius: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: ResponsiveSize(10),
      justifyContent: 'center',
    },
    seeFullMap: {
      backgroundColor: global.secondaryColor,
      paddingHorizontal: ResponsiveSize(10),
      paddingVertical: ResponsiveSize(5),
      borderRadius: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
      backgroundColor: global.white,
      borderRadius: ResponsiveSize(10),
      paddingVertical: ResponsiveSize(30),
      paddingHorizontal: ResponsiveSize(20),
      width: windowWidth - ResponsiveSize(30),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconWrapper: {
      backgroundColor: '#fee3e5',
      height: ResponsiveSize(40),
      width: ResponsiveSize(40),
      borderRadius: ResponsiveSize(40),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteBtn: {
      backgroundColor: global.red,
      borderWidth: 1,
      borderColor: global.red,
      paddingHorizontal: ResponsiveSize(10),
      paddingVertical: ResponsiveSize(10),
      borderRadius: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth * 0.8,
      marginTop: ResponsiveSize(8),
    },
    cancelBtn: {
      backgroundColor: global.white,
      paddingHorizontal: ResponsiveSize(10),
      paddingVertical: ResponsiveSize(10),
      borderRadius: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth * 0.8,
      marginTop: ResponsiveSize(8),
      borderWidth: 1,
      borderColor: global.description,
    }
  })

  const joinEvent = async (id) => {
    const isJoin = await JoinEvents({
      event_id: id
    })
    if (isJoin == true) {
      getAllEvents({ page: 1, refreash: true })
      getJoinedEvents({ page: 1, refreash: true })
      getMyEvents({ page: 1, refreash: true })
      navigation.navigate("EventScreen", { Tab: 1 })
    }
    else if (isJoin == false) {
      setDeleteModal(false)
    }
  }
  const leaveEvent = async (id) => {
    const isJoin = await LeaveEvents({
      event_id: id
    })
    if (isJoin == true) {
      getAllEvents({ page: 1, refreash: true })
      getJoinedEvents({ page: 1, refreash: true })
      getMyEvents({ page: 1, refreash: true })
      navigation.navigate("EventScreen", { Tab: 1 })
    }
    else if (isJoin == false) {
      setDeleteModal(false)
    }
  }
  const deleteEvent = async (id) => {
    const isDelete = await DeleteEvent(id)
    if (isDelete == true) {
      getAllEvents({ page: 1, refreash: true })
      getJoinedEvents({ page: 1, refreash: true })
      getMyEvents({ page: 1, refreash: true })
      navigation.navigate("EventScreen", { Tab: 1 })
    }
    else if (isDelete == false) {
      setDeleteModal(false)
    }
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={"light-content"} />
        {loading ? <View style={styles.thumbnailLoad}></View> :
          <FastImage
            source={{
              uri: eventDetail?.event_cover_image,
              priority: FastImage.priority.high,
            }}
            style={styles.thumbnail}>
            <View style={styles.layer}>
              <View style={styles.bodyWrapperHeader}>
                <View style={styles.header}>
                  <Pressable style={styles.gobackBtn} onPress={navigation.goBack}>
                    <AntDedign name='left' size={ResponsiveSize(20)} color={global.white} />
                  </Pressable>
                  {eventDetail?.is_myevent == 0 ?
                    <>
                      {eventDetail?.is_participant == 1 ?
                        <>
                          <TouchableOpacity onPress={() => leaveEvent(eventDetail?.event_id)} style={styles.leaveBtn}>
                            {AllEventReducer?.EventLeaveLoading ?
                              <ActivityIndicator size="small" color={global.white} />
                              :
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextC text={"Leave"} style={{ color: global.white }} font={"Montserrat-Medium"} />
                                <Feather name="log-out" color={'white'} style={{ paddingLeft: ResponsiveSize(5) }} />
                              </View>
                            }
                          </TouchableOpacity>
                        </>
                        :
                        <TouchableOpacity onPress={() => joinEvent(eventDetail?.event_id)} style={styles.JoinBtn}>
                          {AllEventReducer?.EventJoinLoading ?
                            <ActivityIndicator size="small" color={global.white} />
                            :
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <TextC text={"Join"} style={{ color: global.white }} font={"Montserrat-Medium"} />
                              <AntDedign name="adduser" color={'white'} style={{ paddingLeft: ResponsiveSize(5) }} />
                            </View>
                          }
                        </TouchableOpacity>
                      }
                    </> :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => setDeleteModal(true)} style={styles.leaveBtn2}>
                        <TextC text={"Delete"} style={{ color: global.white }} font={"Montserrat-Medium"} />
                        <AntDedign name="delete" color={'white'} style={{ paddingLeft: ResponsiveSize(5) }} />
                      </TouchableOpacity>

                      <Modal
                        statusBarTranslucent={true}
                        animationType="slide"
                        transparent={true}
                        visible={deleteModal}
                        onRequestClose={() => {
                          setDeleteModal(!deleteModal);
                        }}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <View style={styles.iconWrapper}>
                              <Feather size={ResponsiveSize(20)} color={global.red} name='alert-triangle' />
                            </View>
                            <TextC text={"Are you sure?"} font={"Montserrat-Bold"} style={{ color: global.black, paddingTop: ResponsiveSize(8) }} />
                            <TextC size={12} text={"This action cannot be undone. all data accociated with this event will be lost."} font={"Montserrat-Medium"} style={{ color: global.placeholderColor, paddingTop: ResponsiveSize(8), textAlign: 'center' }} />

                            <TouchableOpacity onPress={() => deleteEvent(eventDetail?.event_id)} style={styles.deleteBtn}>
                              {AllEventReducer?.deleteEventLoading ?
                                <ActivityIndicator size="small" color={global.white} />
                                :
                                <TextC text={"Delete"} style={{ color: global.white }} font={"Montserrat-Medium"} />
                              }
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setDeleteModal(false)} style={styles.cancelBtn}>
                              <TextC text={"Cancel"} style={{ color: global.black }} font={"Montserrat-Medium"} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>

                      <TouchableOpacity onPress={() => navigation.navigate('UpdateEvent', { id: eventDetail?.event_id })} style={styles.JoinBtn2}>
                        <TextC text={"Edit"} style={{ color: global.white }} font={"Montserrat-Medium"} />
                        <AntDedign name="adduser" color={'white'} style={{ paddingLeft: ResponsiveSize(5) }} />
                      </TouchableOpacity>
                    </View>
                  }

                </View>
                <View style={styles.headerBottom}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage
                      source={{
                        uri: eventDetail?.profile_picture_url,
                        priority: FastImage.priority.high,
                      }}
                      style={styles.profile} />
                    <View style={{ flexDirection: 'column' }}>
                      <TextC font={"Montserrat-Bold"} style={{ color: global.white, width: ResponsiveSize(140) }} ellipsizeMode={"tail"} numberOfLines={1} size={ResponsiveSize(15)} text={eventDetail?.user_name} />
                      <TextC font={"Montserrat-Medium"} style={{ color: global.description, width: ResponsiveSize(140) }} ellipsizeMode={"tail"} numberOfLines={1} size={ResponsiveSize(11)} text={eventDetail?.event_location} />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.seeFullMap}>
                    <TextC text={"Map"} style={{ color: global.white }} font={"Montserrat-Medium"} />
                    <Ionicons name='location-outline' style={{ paddingLeft: ResponsiveSize(5) }} size={ResponsiveSize(16)} color={global.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </FastImage>
        }

        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: ResponsiveSize(40) }}>
          {loading ?
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <ActivityIndicator size="large" color={global.primaryColor} />
            </View>
            :
            <View style={styles.bodyWrapper}>
              <TextC font={"Montserrat-Bold"} size={ResponsiveSize(22)} text={eventDetail?.event_title} />
              <View style={styles.detailSpaces}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <TextC font={"Montserrat-Bold"} text={'Create at'} style={{ textAlign: 'center' }} />
                    <TextC font={"Montserrat-Regular"} text={eventDetail?.created_at?.split("T")[0]} style={{ textAlign: 'center', color: global.placeholderColor }} />
                  </View>
                  <View style={{ flexDirection: 'column', paddingLeft: ResponsiveSize(20) }}>
                    <TextC font={"Montserrat-Bold"} text={eventDetail?.event_date} style={{ textAlign: 'center' }} />
                    <TextC font={"Montserrat-Regular"} text={`${eventDetail?.event_start_time} to ${eventDetail?.event_end_time}`} style={{ textAlign: 'center', color: global.placeholderColor }} />
                  </View>
                </View>
              </View>
              <TextC font={"Montserrat-Bold"} size={ResponsiveSize(14)} text={"About this event"} />
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
export default connect(mapStateToProps, AllEventAction)(EventDetail);
