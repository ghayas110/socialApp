import React, { useEffect, useState } from 'react';
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

const SearchUser = () => {
  const windowWidth = Dimensions.get('window').width;

  const scheme = useColorScheme();
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
      right: ResponsiveSize(18),
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
      borderRadius: ResponsiveSize(30),
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
  });
  const navigation = useNavigation();
  const [searchedUser, setSearchedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  const LoadUserId = async () => {
    const U_id = await AsyncStorage.getItem('U_id');
    setUserId(U_id);
  };
  useEffect(() => {
    // SearchUsers();
    LoadUserId();
  }, []);




  const SearchUsers = async (e = null) => {
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
        // body: JSON.stringify({
        //   airline_ids: [1, 4],
        //   check_in_cities: [],
        //   user_types: [],
        //   time_left: [],
        //   search: "Freeman"
        // }),
      },
    );
    const result = await response.json();
    setSearchedUser(result);
    console.log(result, 'rejeact');
    setLoading(false);
  };

  const [userConnectLoading, setUserConnectLoading] = useState({
    value: false,
    id: '',
  });

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
            <TouchableOpacity
              // onPress={handleSubmit(onSubmit)}
              style={styles.NextBtn}>
              <TextC
                size={ResponsiveSize(10)}
                text={'Apply'}
                font={'Montserrat-SemiBold'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: global.white,
          }}>
          <View style={styles.SearchCenterInput}>
            <TextInput
              style={styles.SearchUserInput}
              placeholder="Search Users"
            // onChangeText={e => SearchUsers(e)}
            />
            <TouchableOpacity style={styles.FilterBtn}>
              <AntDesign name='filter' color={global.primaryColor} size={ResponsiveSize(18)} />
            </TouchableOpacity>
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
    </>
  );
};
export default SearchUser;
