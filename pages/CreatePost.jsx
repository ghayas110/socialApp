import React, {useState, useEffect, useRef} from 'react';
import {
  Platform,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Dimensions,
  Pressable,
  ActivityIndicator,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {showEditor} from 'react-native-video-trim';
import {request, PERMISSIONS} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';
import TextC from '../components/text/text';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '@rneui/base';
import {global, ResponsiveSize} from '../components/constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import CreatePostHeader from '../components/mainHeader/createPostHeader';
import Carousel from 'react-native-reanimated-carousel';
import Video, {VideoRef} from 'react-native-video';
import PhotoEditor from '@baronha/react-native-photo-editor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useBottomSheet} from '../components/bottomSheet/BottomSheet';
import ButtonC from '../components/button';
import {createThumbnail} from 'react-native-create-thumbnail';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreatePost = () => {
  const videoRef = useRef(null);
  const CurrentIndex = useRef(null);
  const [currentPreview, setCurrentPreview] = useState();
  const [isImage, setIsImage] = useState();
  const [globalType, setGlobalType] = useState(true);
  const [imageResize, setImageResize] = useState('cover');
  const [content, setContent] = useState([]);
  const [isEditAvailable, setIsEditAvailable] = useState({
    value: false,
    content: 'Image',
  });
  const [selectMulti, setSelectMulti] = useState(false);
  const [multiContent, setMultiContent] = useState([]);
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const [temp, setTemp] = useState();
  const [multiVideoId, isMultiVideoId] = useState();
  const [paused, setPause] = useState(paused);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: global.white,
    },
    FirstImagePreview: {
      height: windowHeight * 0.43,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      backgroundColor: 'gtay',
      position: 'relative',
      borderBottomWidth: 1,
      borderBottomColor: global.description,
    },
    uploadControls: {
      height: 60,
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: ResponsiveSize(20),
    },
    FirstImage: {
      width: '100%',
      height: windowHeight * 0.43,
      resizeMode: imageResize,
    },
    FirstVideo: {
      width: windowWidth,
      height: windowHeight * 0.43,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
    },
    box: {
      height: ResponsiveSize(90),
      width: '25%',
      borderWidth: 0.5,
      borderColor: global.description,
      position: 'relative',
    },
    absoluteBottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: ResponsiveSize(50),
      width: '100%',
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
    },
    photos: {
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    videoIndicator: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    MultiIndicator: {
      position: 'absolute',
      height: ResponsiveSize(20),
      width: ResponsiveSize(20),
      left: ResponsiveSize(10),
      top: ResponsiveSize(10),
      borderRadius: ResponsiveSize(20),
      borderColor: 'white',
      backgroundColor: '#0052B4',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    SelectMultiBtn: {
      backgroundColor: '#0052B4',
      paddingHorizontal: ResponsiveSize(20),
      paddingVertical: ResponsiveSize(8),
      borderRadius: ResponsiveSize(20),
      flexDirection: 'row',
      alignItems: 'center',
    },
    ImageResizeBtn: {
      borderRadius: ResponsiveSize(20),
      backgroundColor: '#0052B4',
      height: ResponsiveSize(30),
      width: ResponsiveSize(30),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: ResponsiveSize(10),
    },
    playPaused: {
      position: 'absolute',
      top: 0,
      left: 0,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth,
      height: windowHeight * 0.43,
      flexDirection: 'row',
    },
  });
  const handleOpenSheet = () => {
    openBottomSheet(
      <>
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            paddingHorizontal: ResponsiveSize(15),
          }}>
          <View>
            <TextC
              font={'Montserrat-Bold'}
              text={`Change ${isEditAvailable?.content}?`}
              size={ResponsiveSize(16)}
              style={{color: global.black}}
            />
            <TextC
              font={'Montserrat-Medium'}
              text={`if you change this ${
                isEditAvailable?.content == 'Video' ? 'video' : 'image'
              } now, you will lost edited ${
                isEditAvailable?.content == 'Video' ? 'video' : 'image'
              }.`}
              size={ResponsiveSize(11)}
              style={{color: global.placeholderColor}}
            />
          </View>

          <View style={{paddingTop: ResponsiveSize(20)}}>
            <TouchableOpacity
              style={{paddingVertical: ResponsiveSize(10)}}
              onPress={() => {
                closeBottomSheet();
              }}>
              <TextC
                font={'Montserrat-Medium'}
                text={'keep editing'}
                size={ResponsiveSize(14)}
                style={{color: global.black}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingVertical: ResponsiveSize(10)}}
              onPress={() => {
                setIsEditAvailable(false);
                setCurrentPreview(temp);
                closeBottomSheet();
              }}>
              <TextC
                font={'Montserrat-Medium'}
                text={`change ${
                  isEditAvailable?.content == 'Video' ? 'video' : 'image'
                }`}
                size={ResponsiveSize(14)}
                style={{color: global.red}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>,
      ['25%'],
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO).then(result => {
        request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(result => {
          loadImages();
        });
      });
    } else if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        loadImages();
      });
    }
    return () => {
      closeBottomSheet();
    };
  }, []);

  const ImageEditorContain = async path => {
    const result = await PhotoEditor.open({
      path: `file://${path?.content}`,
    });
    setCurrentPreview(prev => ({
      ...prev,
      content: result?.split('file://')[1],
    }));
    setIsEditAvailable({value: true, content: 'Image'});
  };
  const ImageEditorContainMulti = async (path, id) => {
    const result = await PhotoEditor.open({
      path: path,
    });
    setMultiContent(prev =>
      prev?.map(item =>
        item.id == id ? {...item, content: result?.split('file://')[1]} : item,
      ),
    );
    setIsEditAvailable(true);
  };

  const loadImages = async () => {
    if (Platform.OS === 'android') {
      setMediaChangeLoader(true);
      const imageFiles = await RNFS.readDir(
        RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera',
      );
      const allMedia = [...imageFiles];
      const videoContentPromises = allMedia.map(async item => {
        const isVideo =
          item.name.endsWith('.mp4') || item.name.endsWith('.mov');
        if (isVideo) {
          const thumbnail = await createThumbnail({
            url: `file://${item.path}`,
          });
          return {
            id: item.name,
            content: thumbnail?.path,
            type: 'video',
            origionalPath: item.path,
          };
        } else {
          return {
            id: item.name,
            content: item.path,
            type: 'image',
            origionalPath: item.path,
          };
        }
      });
      const videoContent = await Promise.all(videoContentPromises);
      setContent(videoContent);
      setMediaChangeLoader(false);
    } else if (Platform.OS === 'ios') {
      setMediaChangeLoader(true);
      imageFiles = await RNFS.readDir('/var/mobile/Media/DCIM/100APPLE');
      const allMedia = [...imageFiles];
      const videoContentPromises = allMedia.map(async item => {
        const isVideo =
          item.name.endsWith('.MP4') || item.name.endsWith('.mov');
        if (isVideo) {
          const thumbnail = await createThumbnail({
            url: item.path,
          });
          return {
            id: item.name,
            content: thumbnail?.path,
            type: 'video',
            origionalPath: item.path,
          };
        } else {
          return {
            id: item.name,
            content: item.path,
            type: 'image',
            origionalPath: item.path,
          };
        }
      });
      const videoContent = await Promise.all(videoContentPromises);
      setContent(videoContent);
      setMediaChangeLoader(false);
    }
  };

  const [mediaChangeLoader, setMediaChangeLoader] = useState(false);

  const MultListAdder = (id, content, type) => {
    setMultiContent(prevMultiContent => {
      const exists = prevMultiContent.some(item => item.id === id);
      const indexToDelete = prevMultiContent.findIndex(item => item.id === id);
      const updatedMultiContent = [...prevMultiContent];
      if (!exists) {
        updatedMultiContent.push({id: id, content: content, type: type});
      } else {
        updatedMultiContent.splice(indexToDelete, 1);
      }
      return updatedMultiContent;
    });
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
    const subscription = eventEmitter.addListener('VideoTrim', event => {
      switch (event.name) {
        case 'onFinishTrimming': {
          console.log(multiVideoId,'alllll')
          setMultiContent(prev =>
            prev?.map(item =>
              item.id == multiVideoId
                ? {...item, content: event?.outputPath?.split('file://')[1]}
                : item,
            ),
          );
          setCurrentPreview(prev => ({
            ...prev,
            origionalPath: event?.outputPath,
          }));
          setIsEditAvailable({value: true, content: 'Video'});
          setPause(true);
          break;
        }
      }
    });
    return () => {
      subscription.remove();
    };
  }, [multiVideoId]);

  const VideoEditorMultiple = async (path, id) => {
    isMultiVideoId(id);
    showEditor(path, {
      saveToPhoto: true,
    });
    
  };


  return (
    <>
      <SafeAreaView style={styles.container}>
        <CreatePostHeader
          isImage={isImage}
          isMultiple={selectMulti}
          post={selectMulti ? multiContent : currentPreview}
        />
        <View style={styles.FirstImagePreview}>
          <>
            {selectMulti ? (
              <Carousel
                loop
                width={windowWidth}
                height={windowHeight * 0.43}
                autoPlay={false}
                data={multiContent}
                scrollAnimationDuration={1000}
                renderItem={items => {
                  return (
                    <>
                      {items?.item.type == 'video' ? (
                        <>
                          <Pressable
                            onPress={() => setPause(!paused)}
                            style={{position: 'relative'}}>
                            <Video
                              repeat={true}
                              source={{uri: 'file://' + items?.item?.content}}
                              ref={videoRef}
                              style={styles.FirstImage}
                              paused={paused}
                            />
                            <View style={styles.uploadControls}>
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectMulti(!selectMulti);
                                  setMultiContent([]);
                                  setIsEditAvailable({
                                    value: false,
                                    content: 'Image',
                                  });
                                }}
                                style={styles.ImageResizeBtn}>
                                <MaterialCommunityIcons
                                  name="checkbox-multiple-blank-outline"
                                  color={'white'}
                                  size={15}
                                />
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() =>
                                  setImageResize(
                                    imageResize == 'cover'
                                      ? 'contain'
                                      : 'cover',
                                  )
                                }
                                style={styles.ImageResizeBtn}>
                                <Ionicons
                                  name="resize"
                                  color={'white'}
                                  size={15}
                                />
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => {
                                  VideoEditorMultiple(
                                    `file://${items?.item?.content}`,
                                    items?.item?.id,
                                  );
                                }}
                                style={styles.ImageResizeBtn}>
                                <AntDesign
                                  name="edit"
                                  color={'white'}
                                  size={15}
                                />
                              </TouchableOpacity>
                            </View>
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
                            style={styles.FirstImage}
                            source={{uri: 'file://' + items?.item?.content}}
                          />
                          <View style={styles.uploadControls}>
                            <TouchableOpacity
                              onPress={() => {
                                setSelectMulti(!selectMulti);
                                setMultiContent([]);
                                setIsEditAvailable({
                                  value: false,
                                  content: 'Image',
                                });
                              }}
                              style={styles.ImageResizeBtn}>
                              <MaterialCommunityIcons
                                name="checkbox-multiple-blank-outline"
                                color={'white'}
                                size={15}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() =>
                                setImageResize(
                                  imageResize == 'cover' ? 'contain' : 'cover',
                                )
                              }
                              style={styles.ImageResizeBtn}>
                              <Ionicons
                                name="resize"
                                color={'white'}
                                size={15}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => {
                                ImageEditorContainMulti(
                                  `file://${items?.item?.content}`,
                                  items?.item?.id,
                                );
                              }}
                              style={styles.ImageResizeBtn}>
                              <AntDesign
                                name="edit"
                                color={'white'}
                                size={15}
                              />
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </>
                  );
                }}
              />
            ) : (
              <>
                {currentPreview?.type == 'video' ? (
                  <>
                    <Pressable
                      onPress={() => setPause(!paused)}
                      style={{position: 'relative'}}>
                      <Video
                        repeat={true}
                        source={{
                          uri: 'file://' + currentPreview?.origionalPath,
                        }}
                        ref={videoRef}
                        style={styles.FirstImage}
                        paused={paused}
                      />
                      <View style={styles.uploadControls}>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectMulti(!selectMulti);
                            setMultiContent([]);
                            setIsEditAvailable({
                              value: false,
                              content: 'Image',
                            });
                          }}
                          style={styles.ImageResizeBtn}>
                          <MaterialCommunityIcons
                            name="checkbox-multiple-blank-outline"
                            color={'white'}
                            size={15}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            setImageResize(
                              imageResize == 'cover' ? 'contain' : 'cover',
                            )
                          }
                          style={styles.ImageResizeBtn}>
                          <Ionicons name="resize" color={'white'} size={15} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            showEditor(
                              `file://${currentPreview?.origionalPath}`,
                              {
                                saveToPhoto: true,
                              },
                            );
                          }}
                          style={styles.ImageResizeBtn}>
                          <AntDesign name="edit" color={'white'} size={15} />
                        </TouchableOpacity>
                      </View>
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
                      style={styles.FirstImage}
                      source={{uri: 'file://' + currentPreview?.content}}
                    />
                    <View style={styles.uploadControls}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectMulti(!selectMulti);
                          setMultiContent([]);
                          setIsEditAvailable({value: false, content: 'Image'});
                        }}
                        style={styles.ImageResizeBtn}>
                        <MaterialCommunityIcons
                          name="checkbox-multiple-blank-outline"
                          color={'white'}
                          size={15}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          setImageResize(
                            imageResize == 'cover' ? 'contain' : 'cover',
                          )
                        }
                        style={styles.ImageResizeBtn}>
                        <Ionicons name="resize" color={'white'} size={15} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          ImageEditorContain(currentPreview);
                        }}
                        style={styles.ImageResizeBtn}>
                        <AntDesign name="edit" color={'white'} size={15} />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            )}
          </>
        </View>
        <ScrollView style={{flexGrow: 1}}>
          {mediaChangeLoader ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: ResponsiveSize(80),
              }}>
              <ActivityIndicator size="small" color={global.primaryColor} />
            </View>
          ) : (
            <View style={styles.wrapper}>
              {content.length > 0
                ? content.map((item, index) => {
                    const inde = index + 1;
                    return (
                      <TouchableOpacity
                        key={inde}
                        onLongPress={() => {
                          setSelectMulti(!selectMulti);
                          setMultiContent([]);
                        }}
                        onPress={() => {
                          if (isEditAvailable?.value) {
                            setTemp(item);
                            handleOpenSheet();
                          } else {
                            if (selectMulti == true) {
                              MultListAdder(
                                inde,
                                item?.origionalPath,
                                item?.type,
                              );
                            }
                            setCurrentPreview(item);
                          }
                        }}
                        style={styles.box}>
                        <Image
                          source={{uri: 'file://' + item?.content}}
                          style={{width: '100%', height: '100%'}}
                        />
                        {selectMulti && (
                          <>
                            <TouchableOpacity style={styles.MultiIndicator}>
                              {multiContent.length > 0
                                ? multiContent
                                    .filter(cont => cont.id == inde)
                                    .map((item, index) => (
                                      <TextC
                                        key={index}
                                        style={{color: 'white'}}
                                        size={11}
                                        text={
                                          multiContent.findIndex(
                                            item => item.id === inde,
                                          ) + 1
                                        }
                                        font={'Montserrat-Regular'}
                                      />
                                    ))
                                : ''}
                            </TouchableOpacity>
                          </>
                        )}
                        {item?.type == 'video' ? (
                          <View style={styles.videoIndicator}>
                            <Entypo
                              name="controller-play"
                              color={global.white}
                              size={22}
                            />
                          </View>
                        ) : (
                          ''
                        )}
                      </TouchableOpacity>
                    );
                  })
                : ''}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CreatePost;
