import { SafeAreaView, StyleSheet, StatusBar, View, ActivityIndicator, Text, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ButtonC from '../components/button/index';
import InputC from '../components/inputs/index';
import AntDedign from "react-native-vector-icons/AntDesign"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as CountryAction from "../store/actions/Country/index";
import { connect } from "react-redux";
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { global } from '../components/constant';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';




const windowWidth = Dimensions.get('window').width;


const CheckInDetail = ({ CheckInReducer, CheckInInApp, getAllCountries, getAllStates, getAllCities, onLogin }) => {
  const navigation = useNavigation()
  const stateDropdown = useRef()
  const [allCountriesData, setAllCountriesData] = useState()
  const [allStateData, setAllStateData] = useState()
  const [allCityData, setAllCityData] = useState()
  const [showError, setShowError] = useState(false)

  const [currentCountry, setCurrentCountry] = useState("United States")
  const [currentState, setCurrentState] = useState("")
  const [currentCity, setCurrentCity] = useState(null)
  const [layoverTime, setLayoverTime] = useState(null)
  const [userName, setUserName] = useState()
  useEffect(() => {
    LoadName()
  })
  const LoadName = async () => {
    const value = await AsyncStorage.getItem('UserName');
    setUserName(value)
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#05348E'
    },
    titleWrapper: {
      paddingHorizontal: 20,
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
      width: windowWidth * 0.7
    },
    privacyText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 13,
      color: 'white',
    },
    errorArea: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    socialLoginBtn: {
      height: 48,
      width: 48,
      backgroundColor: 'white',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginHorizontal: 3
    },
    bottomSheetContent: {
      width: "100%",
      flexDirection: "row",
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: 22,
      paddingVertical: 20
    },
    bottomSheetContentTextOne: {
      fontSize: 12,
      fontFamily: 'Montserrat-Italic',
      flexDirection: 'row',
      alignItems: 'center',
      color: 'white'
    },
    labelS: {
      color: "white",
      fontFamily: "Montserrat-Regular",
      fontSize: 13,
      paddingBottom: 4,
    },
    dropdownButtonStyle: {
      width: global.inputWidth,
      height: global.inputHeight,
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: global.inputPaddingH,
      fontFamily: 'Montserrat-Regular',
      borderWidth: 1,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Montserrat-Regular'
    },
    dropdownButtonArrowStyle: {
      fontSize: 22,
      color: '#666666'
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      color: '#151E26',
      fontFamily: 'Montserrat-Regular'
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  })

  useEffect(() => {
    LoadCountry()
  }, [])
  useEffect(() => {
    LoadState()
  }, [currentCountry])
  useEffect(() => {
    LoadCity()
  }, [currentState])

  const LoadCountry = async () => {
    const loadAllCountriesDetail = await getAllCountries()
    setAllCountriesData(loadAllCountriesDetail)
  }
  const LoadState = async () => {
    const loadAllStateDetail = await getAllStates({
      country: currentCountry
    })
    setAllStateData(loadAllStateDetail)
  }
  const LoadCity = async () => {
    const loadAllCityDetail = await getAllCities({
      country: currentCountry,
      state: currentState
    })
    setAllCityData(loadAllCityDetail)
  }


  const onSubmit = async () => {
    if (currentCountry && currentState && currentCity && layoverTime) {
      const checkInLoad = await CheckInInApp({
        country: currentCountry,
        state: currentState,
        city: currentCity,
        layover_time: layoverTime
      })
      if (checkInLoad.message == "Check-in created successfully") {
        onLogin();
      }
    }
    else {
      setShowError(true)
    }
  }

  const SelectStateToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Please select a State',
      text2: 'Please select State and try again',
      text1Style: {
        fontFamily: 'Montserrat-Regular'
      },
      text2Style: {
        fontFamily: 'Montserrat-Bold'
      },
    });
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

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={styles.labelS}>Country</Text>
          </View>
          <View>
            <SelectDropdown
              defaultValue={"United States"}
              disableAutoScroll={true}
              data={allCountriesData}
              dropdownOverlayColor="rgba(0, 0, 0,0.7)"
              onSelect={(selectedItem) => {
                stateDropdown.current.reset()
                setCurrentCountry(selectedItem.name)
              }}
              disabled={allCountriesData?.length < 0 || allCountriesData == undefined || allCountriesData == null ? true : false}
              search={true}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <>

                    <View style={{ ...styles.dropdownButtonStyle, borderColor: showError == false || currentCountry !== null && currentCountry !== undefined && currentCountry !== "" ? "white" : "red" }}>
                      {allCountriesData?.length < 0 || allCountriesData == undefined || allCountriesData == null ?
                        <ActivityIndicator color={'black'} />
                        :
                        <>
                          <Text style={{
                            ...styles.dropdownButtonTxtStyle,
                            color: selectedItem ? 'black' : global.placeholderColor
                          }}>
                            {(selectedItem && selectedItem.name) || "United States"}
                          </Text>
                          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                        </>
                      }

                    </View>
                  </>

                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <>
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      <Text style={styles.dropdownItemTxtStyle}>{item?.name}</Text>
                    </View>
                  </>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={styles.labelS}>State</Text>
          </View>
          <View>
            <SelectDropdown
              ref={stateDropdown}
              disableAutoScroll={true}
              data={allStateData}
              dropdownOverlayColor="rgba(0, 0, 0,0.7)"
              onSelect={(selectedItem) => {
                setCurrentState(selectedItem.name)
              }}
              disabled={allStateData?.length < 0 || allStateData == undefined || allStateData == null ? true : false}
              search={true}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <>

                    <View style={{ ...styles.dropdownButtonStyle, borderColor: showError == false || currentState !== null && currentState !== undefined && currentState !== "" ? "white" : "red" }}>
                      {allStateData?.length < 0 || allStateData == undefined || allStateData == null ?
                        <ActivityIndicator color={'black'} />
                        :
                        <>
                          <Text style={{
                            ...styles.dropdownButtonTxtStyle,
                            color: selectedItem ? 'black' : global.placeholderColor
                          }}>
                            {(selectedItem && selectedItem.name) || "Select State"}
                          </Text>
                          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                        </>
                      }

                    </View>
                  </>

                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <>
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      <Text style={styles.dropdownItemTxtStyle}>{item?.name}</Text>
                    </View>
                  </>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={styles.labelS}>City</Text>
          </View>
          <View>
            {currentState == "" ?
              <TouchableOpacity onPress={SelectStateToast} style={{ ...styles.dropdownButtonStyle, borderColor: showError == false || currentCity !== null && currentCity !== undefined && currentCity !== "" ? "white" : "red" }}>
                <Text style={{ ...styles.dropdownButtonTxtStyle }}>
                  {"Select City"}
                </Text>
              </TouchableOpacity>
              :
              <SelectDropdown
                disableAutoScroll={true}
                data={allCityData}
                dropdownOverlayColor="rgba(0, 0, 0,0.7)"
                onSelect={(selectedItem) => {
                  setCurrentCity(selectedItem)
                }}
                disabled={allCityData?.length < 0 || allCityData == undefined || allCityData == null ? true : false}
                search={true}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <>

                      <View style={{ ...styles.dropdownButtonStyle, borderColor: showError == false || currentCity !== null && currentCity !== undefined && currentCity !== "" ? "white" : "red" }}>
                        {allCityData?.length < 0 || allCityData == undefined || allCityData == null ?
                          <ActivityIndicator color={'black'} />
                          :
                          <>
                            <Text style={{
                              ...styles.dropdownButtonTxtStyle,
                              color: selectedItem ? 'black' : global.placeholderColor
                            }}>
                              {(selectedItem) || "Select City"}
                            </Text>
                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                          </>
                        }

                      </View>
                    </>

                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <>
                      <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                      </View>
                    </>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            }

          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 10, }}>
          <InputC error={showError == false || layoverTime !== null && layoverTime !== undefined && layoverTime !== "" ? undefined : true} onChangeText={setLayoverTime} max={3} type={"number-pad"} label={'How long is your layover ?'} placeholder={"25h"} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 15, paddingTop: 30 }}>
          <ButtonC title="Continue" bgColor={'#69BE25'} TextStyle={{ color: '#002245' }} disabled={CheckInReducer?.loading} loading={CheckInReducer?.loading} onPress={onSubmit} />
        </View>

        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetContentTextOne}>Disclaimer: This app will not show exact locations but just the city you are currently laying over in. </Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}


function mapStateToProps({ CountryReducer, StatesReducer, CityReducer, CheckInReducer }) {
  return { CountryReducer, StatesReducer, CityReducer, CheckInReducer };
}
export default connect(mapStateToProps, CountryAction)(CheckInDetail);