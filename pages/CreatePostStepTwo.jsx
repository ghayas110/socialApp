import React, {useRef, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {global, ResponsiveSize} from '../components/constant';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import TextC from '../components/text/text';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalSelector from 'react-native-modal-selector';
import Carousel from 'react-native-reanimated-carousel';
import * as PostCreationAction from '../store/actions/PostCreation/index';
import {connect} from 'react-redux';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CreatePostTwo = ({
  route,
  PostCreationReducer,
  CreatePostFunction,
  ExludeConnection,
}) => {
  const CurrentIndex = useRef(null);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ScreenHeight = Dimensions.get('screen').height;
  const navigation = useNavigation();
  const ref = React.useRef(null);
  const [privacy, setPrivacy] = useState('Public');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: ResponsiveSize(55),
      backgroundColor: global.white,
      paddingHorizontal: ResponsiveSize(15),
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
    NextBtn: {
      backgroundColor: '#69BE25',
      paddingHorizontal: ResponsiveSize(20),
      paddingVertical: ResponsiveSize(4),
      borderRadius: ResponsiveSize(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    singlePostContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: ResponsiveSize(15),
      height: windowHeight * 0.3,
      width: windowWidth,
      overflow:'hidden',
      borderRadius:ResponsiveSize(10)
    },
    singlePostInner: {
      height: windowHeight * 0.3,
      width: windowWidth * 0.7,
      backgroundColor: global.placeholderColor,
      borderRadius: ResponsiveSize(10),
      overflow: 'hidden',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 3},
      borderWidth: 1,
      borderColor: global.description,
      backgroundColor: 'white',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 2,
    },

    singlePostInnerCarousel: {
      height: windowHeight * 0.27,
      width: windowWidth,
      backgroundColor: global.placeholderColor,
      borderRadius: ResponsiveSize(10),
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: global.description,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 3},
      backgroundColor: 'white',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 2,
    },
    descriptionCenter: {
      paddingHorizontal: ResponsiveSize(15),
      paddingBottom: ResponsiveSize(15),
      borderBottomColor: global.description,
      borderBottomWidth: 1,
      marginBottom: ResponsiveSize(20),
      paddingTop: ResponsiveSize(10),
    },
    TextFeidContainerRight1: {
      paddingHorizontal: ResponsiveSize(10),
      fontFamily: 'Montserrat-Medium',
      color: global.placeholderColor,
      fontSize: ResponsiveSize(12),
      minHeight: windowHeight * 0.07,
      paddingTop: ResponsiveSize(15),
    },
    SettingList: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: ResponsiveSize(15),
      paddingBottom: ResponsiveSize(20),
    },
    CompleteOverlay: {
      height: ScreenHeight,
      width: windowWidth,
      backgroundColor: 'rgba(0, 0, 0,0.6)',
      position: 'absolute',
      left: 0,
      zIndex: 1000,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Loader: {
      height: windowHeight * 0.15,
      width: windowWidth * 0.3,
      backgroundColor: global.white,
      borderRadius: ResponsiveSize(10),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tagCapsule: {
      backgroundColor: '#EEEEEE',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: ResponsiveSize(10),
      paddingRight: ResponsiveSize(5),
      paddingVertical: ResponsiveSize(3),
      borderRadius: ResponsiveSize(5),
      marginLeft: ResponsiveSize(5),
    },
    TagedPeople: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
    },
    playPaused: {
      position: 'absolute',
      top: 0,
      left: 0,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      height: windowHeight * 0.3,
      width: windowWidth,
      flexDirection: 'row',
    },
  });
  const data = [
    {key: 'PUBLIC', label: 'Public'},
    {key: 'PRIVATE', label: 'Private'},
    {key: 'FOLLOWERS', label: 'Connections only'},
  ];
  console.log(route?.params?.isImage);
  const CreatePostFinalStep = async () => {
    const Tags = PostCreationReducer?.searchConnectionData?.map(
      item => item.user_id,
    );
    const stringNumbers = Tags.map(String);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append(
        'privacy_setting',
        data
          ?.filter(d => d.label == privacy)
          .map(b => {
            return b?.key;
          })[0],
      );
      formData.append('tags', JSON.stringify(stringNumbers));
      formData.append(
        'comments_show_flag',
        PostCreationReducer?.isCommentCount == true ? 'Y' : 'N',
      );
      formData.append(
        'likes_show_flag',
        PostCreationReducer?.isLikeCount == true ? 'Y' : 'N',
      );
      formData.append(
        'allow_comments_flag',
        PostCreationReducer?.isCommentOff == true ? 'Y' : 'N',
      );
      if (route?.params?.post) {
        formData.append('post_attachments', {
          uri: `file://${route?.params?.post}`,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
      }
      console.log(formData?._parts);
      const result = await CreatePostFunction(formData);
      if (result == 'Post Created') {
        setLoading(false);
        navigation.navigate('Home');
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const excludeConections = async r => {
    ExludeConnection(r);
  };
  const [paused, setPause] = useState(paused);
  const videoRef = useRef(null);
  console.log(route?.params?.post?.type, 'koko');
  return (
    <>
      {loading ? (
        <>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />
          <View style={styles.CompleteOverlay}>
            <View style={styles.Loader}>
              <ActivityIndicator size="large" color={global.primaryColor} />
            </View>
          </View>
        </>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: global.white,
            position: 'relative',
          }}>
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.logoSide1}>
              <AntDesign
                name="left"
                color={'#05348E'}
                size={ResponsiveSize(16)}
              />
              <Image
                source={require('../assets/icons/Logo.png')}
                style={{
                  objectFit: 'contain',
                  width: ResponsiveSize(70),
                  height: ResponsiveSize(22),
                }}
              />
            </TouchableOpacity>
            <View style={styles.logoSide2}>
              <TextC font={'Montserrat-SemiBold'} text={'Post'} />
            </View>
            <View style={styles.logoSide3}>
              <TouchableOpacity
                onPress={() => CreatePostFinalStep()}
                style={styles.NextBtn}>
                <TextC
                  size={ResponsiveSize(11)}
                  text={'Post'}
                  font={'Montserrat-SemiBold'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.singlePostContainer}>
            {route?.params?.isMultiple == true ? (
              <Carousel
                ref={ref}
                width={windowWidth}
                height={windowHeight * 0.3}
                loop={false}
                autoPlay={false}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.9,
                  parallaxScrollingOffset: 50,
                }}
                data={route?.params?.post}
                renderItem={items => {
                  return (
                    <>
                      {items?.item?.type == 'video' ? (
                        <>
                          <Pressable
                            onPress={() => setPause(!paused)}
                            style={{position: 'relative'}}>
                            <Video
                              repeat={true}
                              source={{
                                uri: 'file://' + items?.item?.content,
                              }}
                              ref={videoRef}
                              style={styles.singlePostInnerCarousel}
                              paused={paused}
                            />
                            {paused && (
                              <View style={styles.playPaused}>
                                <Entypo
                                  size={ResponsiveSize(50)}
                                  name="controller-play"
                                  color={'white'}
                                />
                              </View>
                            )}
                          </Pressable>
                        </>
                      ) : (
                        <Image
                          ref={CurrentIndex}
                          key={'1'}
                          style={styles.singlePostInnerCarousel}
                          source={{uri: 'file://' + items?.item?.content}}
                        />
                      )}
                    </>
                  );
                }}
              />
            ) : (
              <>
                {route?.params?.post?.type == 'video' ? (
                  <>
                    <Pressable
                      onPress={() => setPause(!paused)}
                      style={{position: 'relative'}}>
                      <Video
                        repeat={true}
                        source={{
                          uri: 'file://' + route?.params?.post?.origionalPath,
                        }}
                        ref={videoRef}
                        style={styles.singlePostInner}
                        paused={paused}
                      />
                      {paused && (
                        <View style={styles.playPaused}>
                          <Entypo
                            size={ResponsiveSize(50)}
                            name="controller-play"
                            color={'white'}
                          />
                        </View>
                      )}
                    </Pressable>
                  </>
                ) : (
                 <>
                  <Image
                    ref={CurrentIndex}
                    key={'1'}
                    style={styles.singlePostInner}
                    source={{uri: 'file://' + route?.params?.post?.content}}
                  />
                  </>
                )}
              </>
            )}
          </View>
          <View style={styles.descriptionCenter}>
            <TextInput
              placeholder="Write a caption or add a poll..."
              style={styles.TextFeidContainerRight1}
              multiline={true}
              numberOfLines={2}
              textAlignVertical="top"
              onChangeText={text => setCaption(text)}
            />
            <View style={styles.TagedPeople}>
              {PostCreationReducer?.searchConnectionData?.map(date => (
                <View style={styles.tagCapsule}>
                  <TextC
                    text={`@${date?.user_name}`}
                    font={'Montserrat-Medium'}
                    size={ResponsiveSize(11)}
                    style={{color: global.black}}
                  />
                  <TouchableOpacity
                    onPress={() => excludeConections(date)}
                    style={{marginLeft: ResponsiveSize(5)}}>
                    <Entypo
                      name="cross"
                      color={global.black}
                      size={ResponsiveSize(18)}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TagPeople')}
            style={styles.SettingList}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign
                name="adduser"
                color={global.primaryColor}
                size={ResponsiveSize(28)}
              />
              <TextC
                text={'Tag People'}
                font={'Montserrat-Medium'}
                size={ResponsiveSize(12)}
                style={{
                  color: global?.placeholderColor,
                  marginLeft: ResponsiveSize(5),
                }}
              />
            </View>
            <View>
              <AntDesign
                name="right"
                color={global.primaryColor}
                size={ResponsiveSize(18)}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.SettingList}>
            <ModalSelector
              data={data}
              onChange={option => {
                setPrivacy(option?.label);
              }}
              selectTextStyle={{color: global.placeholderColor}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AntDesign
                    name="user"
                    color={global.primaryColor}
                    size={ResponsiveSize(28)}
                  />
                  <TextC
                    text={'Audience'}
                    font={'Montserrat-Medium'}
                    size={ResponsiveSize(12)}
                    style={{
                      color: global?.placeholderColor,
                      marginLeft: ResponsiveSize(5),
                    }}
                  />
                </View>
                <View>
                  <TextC
                    text={privacy}
                    font={'Montserrat-Medium'}
                    size={ResponsiveSize(10)}
                    style={{
                      color: global?.placeholderColor,
                      marginLeft: ResponsiveSize(5),
                      backgroundColor: global.description,
                      paddingHorizontal: ResponsiveSize(10),
                      paddingVertical: ResponsiveSize(5),
                      borderRadius: ResponsiveSize(30),
                    }}
                  />
                </View>
              </View>
            </ModalSelector>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PostSetting')}
            style={styles.SettingList}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="settings-outline"
                color={global.primaryColor}
                size={ResponsiveSize(28)}
              />
              <TextC
                text={'Advance Settings'}
                font={'Montserrat-Medium'}
                size={ResponsiveSize(12)}
                style={{
                  color: global?.placeholderColor,
                  marginLeft: ResponsiveSize(5),
                }}
              />
            </View>
            <View>
              <AntDesign
                name="right"
                color={global.primaryColor}
                size={ResponsiveSize(18)}
              />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
};

function mapStateToProps({PostCreationReducer}) {
  return {PostCreationReducer};
}
export default connect(mapStateToProps, PostCreationAction)(CreatePostTwo);
