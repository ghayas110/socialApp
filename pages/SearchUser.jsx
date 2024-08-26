import React, { useEffect, useRef, useState } from 'react';
import {
  DarkTheme,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { global, ResponsiveSize } from '../components/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextC from '../components/text/text';
import { useNavigation } from '@react-navigation/native';
import SearchCenter from '../components/searchBar';
import { Image } from 'react-native-elements';
import baseUrl from '../store/config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { useBottomSheet } from '../components/bottomSheet/BottomSheet';
import Modal from 'react-native-modal';
import * as UserRegisterAction from "../store/actions/UserRegister/index";
import { connect } from "react-redux";


const SearchUser = ({ getAllAirline, getAllCountries,getAllStates}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const scheme = useColorScheme();
  const [isVisible, setIsVisible] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  useEffect(() => {
    return () => { closeBottomSheet() }
  }, [])

  const toggleVisibility = () => {
    if (isVisible) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsVisible(false))
    } else {
      setIsVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth,
      paddingHorizontal: ResponsiveSize(15),
      paddingTop: ResponsiveSize(15),
      paddingBottom: ResponsiveSize(10),
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
    SearchCenter: {
      paddingHorizontal: ResponsiveSize(15),
      paddingTop: ResponsiveSize(10)
    },
    SearchCenterInput: {
      position: 'relative',
      paddingHorizontal: ResponsiveSize(15),
      paddingTop: ResponsiveSize(10)
    },
    FilterBtn: {
      width: ResponsiveSize(60),
      height: ResponsiveSize(45),
      paddingVertical: ResponsiveSize(7),
      borderRadius: ResponsiveSize(20),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 100,
      right: ResponsiveSize(0),
      bottom: ResponsiveSize(0),
    },
    SearchUserInput: {
      fontSize: ResponsiveSize(11),
      paddingHorizontal: global.inputPaddingH,
      backgroundColor: '#EEEEEE',
      width: global.inputWidth,
      fontFamily: 'Montserrat-Regular',
      height: global.inputHeight,
      color: global.black,
      borderTopLeftRadius: ResponsiveSize(23),
      borderTopRightRadius: ResponsiveSize(23),
      borderBottomLeftRadius: ResponsiveSize(isVisible ? 0 : 23),
      borderBottomRightRadius: ResponsiveSize(isVisible ? 0 : 23),
      borderWidth: 1,
      borderColor: global.description,
      zIndex: 2,
    },
    ListOfSearch: {
      paddingVertical: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    ProfileImage: {
      height: ResponsiveSize(40),
      width: ResponsiveSize(40),
      borderRadius: ResponsiveSize(40),
      marginRight: ResponsiveSize(0),
      backgroundColor: global.description,
    },
    UpcomingContent: {
      paddingLeft: 10,
    },
    NextBtn: {
      backgroundColor: global.secondaryColor,
      width: ResponsiveSize(60),
      paddingVertical: ResponsiveSize(7),
      borderRadius: ResponsiveSize(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    DropdownSeeker: {
      height: !isVisible && 0,
      backgroundColor: global.description,
      paddingBottom: ResponsiveSize(!isVisible ? 0 : ResponsiveSize(15)),
      backgroundColor: '#EEEEEE',
      borderBottomLeftRadius: ResponsiveSize(20),
      borderBottomRightRadius: ResponsiveSize(20),
      borderColor: global.description,
      borderWidth: ResponsiveSize(!isVisible ? 0 : ResponsiveSize(1)),
      width: global.inputWidth,
      paddingHorizontal: ResponsiveSize(15),
      paddingTop: ResponsiveSize(!isVisible ? 0 : ResponsiveSize(15)),
      overflow: 'hidden'
    },
    filterTab: {
      backgroundColor: global.primaryColor,
      paddingHorizontal: ResponsiveSize(15),
      paddingVertical: ResponsiveSize(5),
      borderRadius: ResponsiveSize(20),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: ResponsiveSize(2),
      position: 'relative',
      width: windowWidth - ResponsiveSize(65) * 3.7
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    view: {
      width: 300,
      height: 100,
      backgroundColor: 'red',
    },
    SelectOptions: {
      backgroundColor: '#EEEEEE',
      width: "100%",
      paddingHorizontal: ResponsiveSize(10),
      padding: ResponsiveSize(5),
      borderRadius: ResponsiveSize(10),
      marginTop: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: ResponsiveSize(10)
    },
    modalTopLayer: {
      paddingBottom: ResponsiveSize(20),
      paddingTop: ResponsiveSize(10),
      width: windowWidth * 0.9,
      position: 'absolute',
      backgroundColor: 'white',
      top: windowHeight * 0.3,
      borderRadius: ResponsiveSize(10),
      overflow: 'hidden',
      zIndex: 999,
      paddingHorizontal: ResponsiveSize(10),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    IndicatorDot: {
      position: 'absolute',
      height: ResponsiveSize(10),
      width: ResponsiveSize(10),
      borderRadius: ResponsiveSize(10),
      backgroundColor: global.secondaryColor,
      top: ResponsiveSize(-4),
      right: ResponsiveSize(8)
    },
    AirlineLayer: {
      height: windowHeight * 0.5,
      paddingBottom: ResponsiveSize(20),
      paddingTop: ResponsiveSize(10),
      width: windowWidth * 0.9,
      position: 'absolute',
      backgroundColor: 'white',
      top: windowHeight * 0.3,
      borderRadius: ResponsiveSize(10),
      overflow: 'hidden',
      zIndex: 999,
      paddingHorizontal: ResponsiveSize(10),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    AirlineBoundries: {
      height: windowHeight * 0.4,
      width: '100%',
      overflow: 'hidden',
      paddingBottom: ResponsiveSize(5)
    },
    ModalSearchBar: {
      backgroundColor: "#EEEEEE",
      width: '100%',
      fontFamily: 'Montserrat-Medium',
      paddingHorizontal: ResponsiveSize(10),
      paddingVertical: ResponsiveSize(5),
      borderRadius: ResponsiveSize(10),
      marginBottom: ResponsiveSize(10)
    },
    CountryModalLayers: {
      maxHeight: windowHeight * 0.7,
      paddingBottom: ResponsiveSize(20),
      paddingTop: ResponsiveSize(10),
      width: windowWidth * 0.9,
      position: 'absolute',
      backgroundColor: 'white',
      top: windowHeight * 0.2,
      borderRadius: ResponsiveSize(10),
      overflow: 'hidden',
      zIndex: 999,
      paddingHorizontal: ResponsiveSize(10),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  const navigation = useNavigation();
  const [searchedUser, setSearchedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const LoadUserId = async () => {
    const U_id = await AsyncStorage.getItem('U_id');
    setUserId(U_id);
  };
  useEffect(() => {
    SearchUsers();
    LoadUserId();
  }, []);

  const SearchUsers = async () => {
    setLoading(true);
    const Token = await AsyncStorage.getItem('Token');
    const response = await fetch(
      `${baseUrl.baseUrl}/users/get-all-users-filter`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': baseUrl.apiKey,
          accesstoken: `Bearer ${Token}`,
        },
        body: JSON.stringify({
          airline_ids: [],
          check_in_cities: [],
          user_types: [],
          time_left: [],
          search: searchText
        }),
      },
    );
    const result = await response.json();
    setSearchedUser(result?.data);
    setLoading(false);
  };
  const SearchUsersDirect = async (e) => {
    setLoading(true);
    const Token = await AsyncStorage.getItem('Token');
    const response = await fetch(
      `${baseUrl.baseUrl}/users/get-all-users-filter`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': baseUrl.apiKey,
          accesstoken: `Bearer ${Token}`,
        },
        body: JSON.stringify({
          airline_ids: [],
          check_in_cities: [],
          user_types: [],
          time_left: [],
          search: e
        }),
      },
    );
    const result = await response.json();
    setSearchedUser(result?.data);
    setLoading(false);
  };



  const [position, setPosition] = useState([])
  const [airLine, setAirline] = useState([])
  const [stayTime, setStayTime] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")

  const AddPositions = (e) => {
    setPosition(prevItems => {
      if (prevItems.includes(e)) {
        return prevItems.filter(item => item !== e)
      } else {
        return [...prevItems, e];
      }
    });
  }
  const AddAirLine = (e) => {
    setAirline(prevItems => {
      if (prevItems.includes(e)) {
        return prevItems.filter(item => item !== e)
      } else {
        return [...prevItems, e];
      }
    });
  }
  const AddTime = (e) => {
    setStayTime(e);
  }
  const AddCountry = async (e) => {
    setCountry(e);
    const loadAllStateDetail = await getAllStates({
      country: e,
    });
    setAllStateData(loadAllStateDetail);
  }
  const AddState = async (e) => {
    setState(e);
    
  }


  // airLine Data
  const [allAirLine, setAllAirLine] = useState()
  useEffect(() => {
    LoadAirLine()
    LoadCountry();
  }, [])

  const LoadAirLine = async () => {
    const loadAllAirLineDetail = await getAllAirline()
    setAllAirLine(loadAllAirLineDetail?.data)
  }
  // airLine Data

  const PositionData = [
    { key: 1, label: 'Pilot' },
    { key: 2, label: 'Fligh Attendent' },
    { key: 3, label: 'Technician' },
  ];


  // Country Data
  const [allCountriesData, setAllCountriesData] = useState();
  const LoadCountry = async () => {
    const loadAllCountriesDetail = await getAllCountries();
    setAllCountriesData(loadAllCountriesDetail);
  };
  // Country Data


  const [allStateData, setAllStateData] = useState();

  const TimeData = [
    { key: 1, label: 'None' },
    { key: 2, label: 'More then 3 hours' },
    { key: 3, label: 'More then 6 hours' },
    { key: 4, label: 'More then 9 hours' },
    { key: 5, label: '10+ hours' },
  ];

  const [isPositionVisible, setPositionVisible] = useState(false);
  const [isAirLineVisible, setAirLineVisible] = useState(false);
  const [isCountryVisible, setCountryVisible] = useState(false);
  const [isStateVisible, setStateVisible] = useState(false);
  const [isTimeVisible, setTimeVisible] = useState(false);
  const [SearchCountry, setSearchCountry] = useState("");
  const [SearchState, setSearchState] = useState("");




  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={
            scheme === 'dark' ? DarkTheme.colors.background : 'white'
          }
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <View style={styles.wrapper}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.logoSide1}>
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
              text={'Search'}
            />
          </View>
          <View style={styles.logoSide3}>
            {isVisible && (
              <Animated.View style={[styles.animatedView, { opacity }]}>
                <TouchableOpacity
                  onPress={SearchUsers}
                  style={styles.NextBtn}>
                  <TextC
                    size={ResponsiveSize(10)}
                    text={'Apply'}
                    font={'Montserrat-SemiBold'}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: global.white,
          }}>
          <View style={styles.SearchCenterInput}>
            <View style={{ position: 'relative' }}>
              <TextInput
                style={styles.SearchUserInput}
                placeholder="Search Users"
                onChangeText={(e) => isVisible ? setSearchText(e) : SearchUsersDirect(e)}
              />
              <TouchableOpacity onPress={toggleVisibility} style={styles.FilterBtn}>
                <AntDesign name='filter' color={global.primaryColor} size={ResponsiveSize(18)} />
              </TouchableOpacity>
            </View>
            <View style={styles.DropdownSeeker}>
              <TextC text={"Sort by"} font={'Montserrat-Bold'} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: ResponsiveSize(10) }}>
                <TouchableOpacity onPress={() => setPositionVisible(true)} style={styles.filterTab}>
                  <TextC text={"Position"} style={{ color: global.white }} size={ResponsiveSize(10)} font={'Montserrat-SemiBold'} />
                  {position.length > 0 &&
                    <View style={styles.IndicatorDot}></View>
                  }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setAirLineVisible(true)} style={styles.filterTab}>
                  <TextC text={"Airline"} style={{ color: global.white }} size={ResponsiveSize(10)} font={'Montserrat-SemiBold'} />
                  {airLine.length > 0 &&
                    <View style={styles.IndicatorDot}></View>
                  }
                </TouchableOpacity>


                <TouchableOpacity onPress={() => setCountryVisible(true)} style={styles.filterTab}>
                  <TextC text={"Country"} style={{ color: global.white }} size={ResponsiveSize(10)} font={'Montserrat-SemiBold'} />
                  {country !== "" && country !== 1 &&
                    <View style={styles.IndicatorDot}></View>
                  }
                </TouchableOpacity>
              </View>



              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: ResponsiveSize(10) }}>
                {country !== "" &&
                  <TouchableOpacity onPress={() => setStateVisible(true)} style={styles.filterTab}>
                    <TextC text={"State"} style={{ color: global.white }} size={ResponsiveSize(10)} font={'Montserrat-SemiBold'} />
                    {state !== "" && state !== 1 &&
                      <View style={styles.IndicatorDot}></View>
                    }
                  </TouchableOpacity>
                }

                {/* {country !== "" &&
                  <TouchableOpacity onPress={() => setTimeVisible(true)} style={styles.filterTab}>
                    <TextC text={"Time"} style={{ color: global.white }} size={ResponsiveSize(10)} font={'Montserrat-SemiBold'} />
                    {stayTime !== "" && stayTime !== 1 &&
                      <View style={styles.IndicatorDot}></View>
                    }
                  </TouchableOpacity>
                } */}
              </View>

            </View>
          </View>
          <View style={styles.SearchCenter}>
            {loading ? (
              <View style={{ paddingTop: ResponsiveSize(100) }}>
                <ActivityIndicator size={'large'} color={global.primaryColor} />
              </View>
            ) : (
              <>
                {searchedUser !== undefined &&
                  searchedUser !== null &&
                  searchedUser !== '' &&
                  searchedUser?.length > 0 ? (
                  searchedUser.map(data => (
                    <Pressable onPress={() => navigation.navigate('UserProfileScreen', { user_id: data?.user_id })} style={styles.ListOfSearch}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FastImage
                          style={styles.ProfileImage}
                          source={{
                            uri: data?.profile_picture_url,
                            priority: FastImage.priority.high,
                          }}
                        />
                        <View style={styles.UpcomingContent}>
                          <TextC
                            text={data.user_name}
                            font={'Montserrat-Bold'}
                            size={ResponsiveSize(12)}
                            style={{ width: ResponsiveSize(160) }}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                          />
                          <TextC
                            text={
                              data.user_type == 'PILOT'
                                ? 'Pilot'
                                : data.user_type == 'FLIGHT ATTENDANT'
                                  ? 'Flight attendent'
                                  : data?.user_type == 'TECHNICIAN'
                                    ? 'Technician'
                                    : ''
                            }
                            style={{
                              color: global.placeholderColor,
                              paddingVertical: ResponsiveSize(2),
                            }}
                            font={'Montserrat-Medium'}
                            size={ResponsiveSize(11)}
                          />
                        </View>
                      </View>

                      {/* <TextC
                        size={ResponsiveSize(10)}
                        font={'Montserrat-Medium'}
                        text={'Connect'}
                        style={{ color: 'red' }}
                      /> */}
                      {/* {data?.connectionsStatus == null ? (
                        <TouchableOpacity
                          disabled={userConnectLoading.value}
                          style={{
                            color: global.white,
                            backgroundColor: global.secondaryColor,
                            paddingHorizontal: ResponsiveSize(15),
                            paddingVertical: ResponsiveSize(3),
                            borderRadius: ResponsiveSize(10),
                            overflow: 'hidden',
                          }}
                          onPress={() => ConnectUser(data?.user_id)}>
                          {userConnectLoading.value == true &&
                          userConnectLoading.id == data?.user_id ? (
                            <ActivityIndicator
                              size={'small'}
                              color={global.white}
                            />
                          ) : (
                            <TextC
                              size={ResponsiveSize(10)}
                              font={'Montserrat-Medium'}
                              text={'Connect'}
                              style={{color: 'white'}}
                            />
                          )}
                        </TouchableOpacity>
                      ) : data?.connectionsStatus?.status == 'REJECTED' ? (
                        <Pressable
                          disabled={userConnectLoading.value}
                          style={{
                            color: global.white,
                            backgroundColor: global.secondaryColor,
                            paddingHorizontal: ResponsiveSize(15),
                            paddingVertical: ResponsiveSize(3),
                            borderRadius: ResponsiveSize(10),
                            overflow: 'hidden',
                          }}
                          >
                          {userConnectLoading.value == true &&
                          userConnectLoading.id == data?.user_id ? (
                            <ActivityIndicator
                              size={'small'}
                              color={global.primaryColor}
                            />
                          ) : (
                            <TextC
                              size={ResponsiveSize(10)}
                              font={'Montserrat-Medium'}
                              text={'Connect'}
                              style={{color: 'white'}}
                            />
                          )}
                        </Pressable>
                      ) : data?.connectionsStatus?.status == 'PENDING' &&
                        data?.connectionsStatus?.sender == userId ? (
                        <Pressable
                          disabled={userConnectLoading.value}
                          style={{
                            color: global.white,
                            backgroundColor: global.red,
                            paddingHorizontal: ResponsiveSize(15),
                            paddingVertical: ResponsiveSize(3),
                            borderRadius: ResponsiveSize(10),
                            overflow: 'hidden',
                          }}
                          >
                          {userConnectLoading.value == true &&
                          userConnectLoading.id == data?.user_id ? (
                            <ActivityIndicator
                              size={'small'}
                              color={global.white}
                            />
                          ) : (
                            <TextC
                              size={ResponsiveSize(10)}
                              font={'Montserrat-Medium'}
                              text={'Pending'}
                              style={{
                                color: global.white,
                              }}
                            />
                          )}
                        </Pressable>
                      ) : data?.connectionsStatus?.status == 'PENDING' &&
                        data?.connectionsStatus?.receiver_id == userId ? (
                        <Pressable
                          disabled={userConnectLoading.value}
                          style={{
                            color: global.white,
                            backgroundColor: global.red,
                            paddingHorizontal: ResponsiveSize(15),
                            paddingVertical: ResponsiveSize(3),
                            borderRadius: ResponsiveSize(10),
                            overflow: 'hidden',
                          }}
                          >
                          {userConnectLoading.value == true &&
                          userConnectLoading.id == data?.user_id ? (
                            <ActivityIndicator
                              size={'small'}
                              color={global.white}
                            />
                          ) : (
                            <TextC
                              size={ResponsiveSize(10)}
                              font={'Montserrat-Medium'}
                              text={'Pending'}
                              style={{
                                color: global.white,
                              }}
                            />
                          )}
                        </Pressable>
                      ) : data?.connectionsStatus?.status == 'ACCEPTED' ? (
                        <Pressable
                          disabled={userConnectLoading.value}
                          style={{
                            color: global.white,
                            backgroundColor: global.red,
                            paddingHorizontal: ResponsiveSize(15),
                            paddingVertical: ResponsiveSize(3),
                            borderRadius: ResponsiveSize(10),
                            overflow: 'hidden',
                          }}
                          >
                          {userConnectLoading.value == true &&
                          userConnectLoading.id == data?.user_id ? (
                            <ActivityIndicator
                              size={'small'}
                              color={global.white}
                            />
                          ) : (
                            <TextC
                              size={ResponsiveSize(10)}
                              font={'Montserrat-Medium'}
                              text={'Disconnect'}
                              style={{
                                color: global.white,
                              }}
                            />
                          )}
                        </Pressable>
                      ) : (
                        ''
                      )} */}
                    </Pressable>
                  ))
                ) : (
                  <>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <TextC
                        size={ResponsiveSize(10)}
                        font={'Montserrat-Medium'}
                        text={'No result found'}
                      />
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Position */}
      <Modal
        isVisible={isPositionVisible}
        style={{ margin: 0, paddingHorizontal: windowWidth * 0.05 }}
        animationIn={'bounceInUp'}
        avoidKeyboard={true}
        onBackdropPress={() => setPositionVisible(false)}
        statusBarTranslucent={false}>
        <View style={styles.modalTopLayer}>
          <TextC text={"Position"} font={"Montserrat-Bold"} style={{ paddingBottom: ResponsiveSize(15) }} />
          {PositionData.map(positions =>
            <TouchableOpacity onPress={() => AddPositions(positions?.key)} style={styles.SelectOptions}>
              <TextC
                key={positions?.key}
                size={ResponsiveSize(12)}
                font={'Montserrat-Regular'}
                text={positions?.label}
                style={{ color: global.black }}
              />

              {position.includes(positions?.key) && (
                <AntDesign name='checkcircleo' color='green' size={ResponsiveSize(16)} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      {/* Position */}


      {/* AirLine */}
      <Modal
        isVisible={isAirLineVisible}
        style={{ margin: 0, paddingHorizontal: windowWidth * 0.05 }}
        animationIn={'bounceInUp'}
        avoidKeyboard={true}
        onBackdropPress={() => setAirLineVisible(false)}
        statusBarTranslucent={false}>
        <View style={styles.AirlineLayer}>
          <TextC text={"Airline"} font={"Montserrat-Bold"} style={{ paddingBottom: ResponsiveSize(15) }} />
          <ScrollView style={styles.AirlineBoundries} showsVerticalScrollIndicator={false}>
            {allAirLine?.map(AirLine =>
              <TouchableOpacity onPress={() => AddAirLine(AirLine?.airline_id)} style={styles.SelectOptions}>
                <TextC
                  key={AirLine?.airline_id}
                  size={ResponsiveSize(12)}
                  font={'Montserrat-Regular'}
                  text={AirLine?.title}
                  style={{ color: global.black }}
                />

                {airLine.includes(AirLine?.airline_id) && (
                  <AntDesign name='checkcircleo' color='green' size={ResponsiveSize(16)} />
                )}
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </Modal>
      {/* AirLine */}



      {/* Country */}
      <Modal
        isVisible={isCountryVisible}
        style={{ margin: 0, paddingHorizontal: windowWidth * 0.05 }}
        animationIn={'bounceInUp'}
        avoidKeyboard={true}
        onBackdropPress={() => setCountryVisible(false)}
        statusBarTranslucent={false}>
        <View style={styles.CountryModalLayers}>
          <TextC text={"Country"} font={"Montserrat-Bold"} style={{ paddingBottom: ResponsiveSize(15) }} />
          <TextInput value={SearchCountry} onChangeText={(e) => setSearchCountry(e)} placeholder='Search Country' style={styles.ModalSearchBar} />
          <ScrollView style={styles.AirlineBoundries} showsVerticalScrollIndicator={false}>
            {allCountriesData?.filter(item => item?.name.toLowerCase().includes(SearchCountry.toLowerCase())).map(AirLine =>
              <TouchableOpacity onPress={() => AddCountry(AirLine?.name)} style={styles.SelectOptions}>
                <TextC
                  key={AirLine?.name}
                  size={ResponsiveSize(12)}
                  font={'Montserrat-Regular'}
                  text={AirLine?.name}
                  style={{ color: global.black }}
                />

                {country == AirLine?.name && (
                  <AntDesign name='checkcircleo' color='green' size={ResponsiveSize(16)} />
                )}
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </Modal>
      {/* Country */}


      {/* State */}
      <Modal
        isVisible={isStateVisible}
        style={{ margin: 0, paddingHorizontal: windowWidth * 0.05 }}
        animationIn={'bounceInUp'}
        avoidKeyboard={true}
        onBackdropPress={() => setStateVisible(false)}
        statusBarTranslucent={false}>
        <View style={styles.CountryModalLayers}>
          <TextC text={"State"} font={"Montserrat-Bold"} style={{ paddingBottom: ResponsiveSize(15) }} />
          <TextInput value={SearchCountry} onChangeText={(e) => setSearchState(e)} placeholder='Search State' style={styles.ModalSearchBar} />
          <ScrollView style={styles.AirlineBoundries} showsVerticalScrollIndicator={false}>
            {allStateData?.filter(item => item?.name.toLowerCase().includes(SearchState.toLowerCase())).map(AirLine =>
              <TouchableOpacity onPress={() => AddState(AirLine?.name)} style={styles.SelectOptions}>
                <TextC
                  key={AirLine?.name}
                  size={ResponsiveSize(12)}
                  font={'Montserrat-Regular'}
                  text={AirLine?.name}
                  style={{ color: global.black }}
                />

                {country == AirLine?.name && (
                  <AntDesign name='checkcircleo' color='green' size={ResponsiveSize(16)} />
                )}
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </Modal>
      {/* State */}

      {/* Time */}
      <Modal
        isVisible={isTimeVisible}
        style={{ margin: 0, paddingHorizontal: windowWidth * 0.05 }}
        animationIn={'bounceInUp'}
        avoidKeyboard={true}
        onBackdropPress={() => setTimeVisible(false)}
        statusBarTranslucent={false}>
        <View style={styles.modalTopLayer}>
          <TextC text={"Time"} font={"Montserrat-Bold"} style={{ paddingBottom: ResponsiveSize(15) }} />
          {TimeData.map(positions =>
            <TouchableOpacity onPress={() => AddTime(positions?.key)} style={styles.SelectOptions}>
              <TextC
                key={positions?.key}
                size={ResponsiveSize(12)}
                font={'Montserrat-Regular'}
                text={positions?.label}
                style={{ color: global.black }}
              />

              {stayTime == positions?.key && (
                <AntDesign name='checkcircleo' color='green' size={ResponsiveSize(16)} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      {/* Time */}
    </>
  );
};
function mapStateToProps({ RegisterUserReducer }) {
  return { RegisterUserReducer };
}
export default connect(mapStateToProps, UserRegisterAction)(SearchUser);