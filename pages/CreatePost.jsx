
import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, Image, StyleSheet, TouchableOpacity, Vibration, Dimensions, Pressable } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { ScrollView } from 'react-native-gesture-handler';
import TextC from '../components/text/text';
import Entypo from 'react-native-vector-icons/Entypo';
import { color } from '@rneui/base';
import { global, ResponsiveSize } from '../components/constant';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import CreatePostHeader from '../components/mainHeader/createPostHeader';
import Carousel from 'react-native-reanimated-carousel';
import Video, { VideoRef } from 'react-native-video';
import PhotoEditor from "@baronha/react-native-photo-editor";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useBottomSheet } from '../components/bottomSheet/BottomSheet';
import ButtonC from '../components/button';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreatePost = () => {
    const videoRef = useRef(null);
    const CurrentIndex = useRef(null);
    const [currentPreview, setCurrentPreview] = useState()
    const [isImage, setIsImage] = useState()
    const [globalType, setGlobalType] = useState(true)
    const [imageResize, setImageResize] = useState("cover")
    const [content, setContent] = useState([]);
    const [isEditAvailable, setIsEditAvailable] = useState(false);
    const [selectMulti, setSelectMulti] = useState(false);
    const [multiContent, setMultiContent] = useState([]);
    const { openBottomSheet, closeBottomSheet } = useBottomSheet();
    const [temp, setTemp] = useState();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: global.white
        },
        FirstImagePreview: {
            height: windowHeight * 0.47,
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            backgroundColor: 'gtay',
            position: 'relative',
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
            paddingHorizontal: ResponsiveSize(20)
        },
        FirstImage: {
            width: '100%',
            height: "100%",
            resizeMode: imageResize
        },
        FirstVideo: {
            width: windowWidth,
            height: windowHeight * 0.47,
        },
        wrapper: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'relative',
            paddingBottom: ResponsiveSize(50),
        },
        box: {
            height: ResponsiveSize(90),
            width: "25%",
            borderWidth: 0.5,
            borderColor: 'white',
            position: 'relative'
        },
        absoluteBottomBar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: ResponsiveSize(50),
            width: '100%',
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center'
        },
        library: {
            width: '33.33%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        photos: {
            width: '33.33%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        video: {
            width: '33.33%',
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
            borderColor: "white",
            backgroundColor: "#0052B4",
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        SelectMultiBtn: {
            backgroundColor: "#0052B4",
            paddingHorizontal: ResponsiveSize(20),
            paddingVertical: ResponsiveSize(8),
            borderRadius: ResponsiveSize(20),
            flexDirection: 'row',
            alignItems: 'center',
        },
        ImageResizeBtn: {
            borderRadius: ResponsiveSize(20),
            backgroundColor: "#0052B4",
            height: ResponsiveSize(30),
            width: ResponsiveSize(30),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: ResponsiveSize(10)
        },
        playPaused: {
            position: 'absolute',
            top: 0,
            left: 0,
            borderWidth: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth,
            height: windowHeight * 0.47,
            flexDirection: 'row'
        }
    })

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
                        <TextC font={'Montserrat-Bold'} text={'Change image?'} size={ResponsiveSize(16)} style={{ color: global.black }} />
                        <TextC font={'Montserrat-Medium'} text={'if you change this image now, you will lost edited image.'} size={ResponsiveSize(11)} style={{ color: global.placeholderColor }} />
                    </View>

                    <View style={{ paddingTop: ResponsiveSize(20) }}>
                        <TouchableOpacity style={{ paddingVertical: ResponsiveSize(10) }} onPress={() => {
                            closeBottomSheet()
                        }}>
                            <TextC font={'Montserrat-Medium'} text={'keep editing'} size={ResponsiveSize(14)} style={{ color: global.black }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingVertical: ResponsiveSize(10) }} onPress={() => {
                            setIsEditAvailable(false)
                            selectedMedia(temp)
                            closeBottomSheet()
                        }}>
                            <TextC font={'Montserrat-Medium'} text={'change image'} size={ResponsiveSize(14)} style={{ color: global.red }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </>,
            ['25%'],
        );
    };

    useEffect(() => {
        request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO).then((result) => {
            request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then((result) => {
                loadImages();
            });
        });
        return () => {
            closeBottomSheet();
        };
    }, []);

    const ImageEditorContain = async (path) => {
        const result = await PhotoEditor.open({
            path: path
        })
        setCurrentPreview(result?.split('file://')[1])
        setIsEditAvailable(true)
    }

    const ImageEditorContainMulti = async (path, id) => {
        const result = await PhotoEditor.open({
            path: path
        })
        setMultiContent(prev => prev?.map(item =>
            item.id == id ? { ...item, content: `${result?.split('file://')[1]}` } : item
        ))
        setIsEditAvailable(true)
    }
    const loadImages = async () => {
        if (Platform.OS === 'android') {
            const imageFiles = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera');
            const imagePaths = imageFiles.map(file => file.path);
            setContent(imagePaths);
        } else {
        }
    };
    const selectedMedia = (r) => {
        setCurrentPreview(r)
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const extension = r?.split('.')?.pop()?.toLowerCase();
        setIsImage(imageExtensions.includes(extension))
        setGlobalType(imageExtensions.includes(extension))
    }
    const typeChanger = async (type) => {
        setMultiContent([])
        if (Platform.OS === 'android') {
            try {
                const mediaFiles = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera');
                const filterExtensions = (extensions) => {
                    return mediaFiles.filter(file => {
                        const extension = file?.name?.split('.').pop().toLowerCase();
                        return extensions.includes(extension);
                    }).map(file => file.path);
                };
                if (type === 'Photo') {
                    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                    setContent(filterExtensions(imageExtensions));
                } else if (type === 'Video') {
                    const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
                    setContent(filterExtensions(videoExtensions));
                } else if (type === 'Library') {
                    const imageFiles = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera');
                    const imagePaths = imageFiles.map(file => file.path);
                    setContent(imagePaths);
                }
            } catch (error) {
                console.error("Error reading media files", error);
            }
        }
    };
    const MultListAdder = (id, content) => {
        setMultiContent(prevMultiContent => {
            const exists = prevMultiContent.some(item => item.id === id);
            const indexToDelete = prevMultiContent.findIndex(item => item.id === id);
            const updatedMultiContent = [...prevMultiContent];
            if (!exists) {
                updatedMultiContent.push({ id: id, content: content });
            } else {
                updatedMultiContent.splice(indexToDelete, 1);
            }
            return updatedMultiContent;
        });
    }
    const [paused, setPause] = useState(paused)
    return (
        <>
            <SafeAreaView style={styles.container}>
                <CreatePostHeader isImage={isImage} isMultiple={selectMulti} post={selectMulti ? multiContent : currentPreview} />
                <View style={styles.FirstImagePreview}>
                    {isImage ?
                        <>
                            {multiContent.length > 1 ?
                                <Carousel
                                    loop
                                    width={windowWidth}
                                    height={windowHeight * 0.47}
                                    autoPlay={false}
                                    data={multiContent}
                                    scrollAnimationDuration={1000}
                                    renderItem={(items) => {
                                        return (
                                            <>
                                                <Image ref={CurrentIndex} key={'1'} style={styles.FirstImage} source={{ uri: 'file://' + items?.item?.content }} />
                                                <View style={styles.uploadControls}>
                                                    <TouchableOpacity onPress={() => {
                                                        Vibration.vibrate(10)
                                                        setSelectMulti(!selectMulti)
                                                        setMultiContent([])
                                                    }} style={styles.ImageResizeBtn}>
                                                        <MaterialCommunityIcons name='checkbox-multiple-blank-outline' color={"white"} size={15} />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={() => setImageResize(imageResize == "cover" ? "contain" : "cover")} style={styles.ImageResizeBtn}>
                                                        <Ionicons name='resize' color={"white"} size={15} />
                                                    </TouchableOpacity>
                                                    {globalType &&
                                                        <TouchableOpacity onPress={() => { ImageEditorContainMulti(`file://${items?.item?.content}`, items?.item?.id) }} style={styles.ImageResizeBtn}>
                                                            <AntDesign name='edit' color={"white"} size={15} />
                                                        </TouchableOpacity>
                                                    }
                                                </View></>
                                        )
                                    }}
                                />
                                :
                                <>
                                    <Image style={styles.FirstImage} source={{ uri: 'file://' + currentPreview }} />
                                    <View style={styles.uploadControls}>
                                        <TouchableOpacity onPress={() => {
                                            Vibration.vibrate(10)
                                            setSelectMulti(!selectMulti)
                                            setMultiContent([])
                                        }} style={styles.ImageResizeBtn}>
                                            <MaterialCommunityIcons name='checkbox-multiple-blank-outline' color={"white"} size={15} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => setImageResize(imageResize == "cover" ? "contain" : "cover")} style={styles.ImageResizeBtn}>
                                            <Ionicons name='resize' color={"white"} size={15} />
                                        </TouchableOpacity>


                                        {globalType &&
                                            <TouchableOpacity onPress={() => { ImageEditorContain(`file://${currentPreview}`) }} style={styles.ImageResizeBtn}>
                                                <AntDesign name='edit' color={"white"} size={15} />
                                            </TouchableOpacity>
                                        }
                                    </View></>
                            }
                        </>
                        :
                        <Pressable onPress={() => setPause(!paused)} style={{ position: 'relative' }}>
                            <Video
                                repeat={true}
                                source={{ uri: 'file://' + currentPreview }}
                                ref={videoRef}
                                style={styles.FirstImage}
                                paused={paused}
                            />
                            <View style={styles.uploadControls}>
                                <TouchableOpacity onPress={() => {
                                    Vibration.vibrate(10)
                                    setSelectMulti(!selectMulti)
                                    setMultiContent([])
                                }} style={styles.ImageResizeBtn}>
                                    <MaterialCommunityIcons name='checkbox-multiple-blank-outline' color={"white"} size={15} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setImageResize(imageResize == "cover" ? "contain" : "cover")} style={styles.ImageResizeBtn}>
                                    <Ionicons name='resize' color={"white"} size={15} />
                                </TouchableOpacity>


                                {globalType &&
                                    <TouchableOpacity onPress={() => {
                                        if (multiContent.length > 1) {
                                            ImageEditorContainMulti()
                                        }
                                        else {
                                            ImageEditorContain(`file://${currentPreview}`)
                                        }
                                    }} style={styles.ImageResizeBtn}>
                                        <AntDesign name='edit' color={"white"} size={15} />
                                    </TouchableOpacity>
                                }
                            </View>
                            {paused &&
                                <View style={styles.playPaused}>
                                    <Entypo size={ResponsiveSize(50)} name='controller-play' color={"white"} />
                                </View>
                            }
                        </Pressable>
                    }

                </View>
                <ScrollView style={{ flexGrow: 1, }}>
                    <View style={styles.wrapper}>
                        {content.length > 0 ? content.map((item, index) => {
                            const inde = index + 1
                            return (
                                <TouchableOpacity key={inde} onLongPress={() => {
                                    Vibration.vibrate(10)
                                    setSelectMulti(!selectMulti)
                                    setMultiContent([])
                                }}
                                    onPress={() => {
                                        if (isEditAvailable) {
                                            handleOpenSheet()
                                            setTemp(item)
                                        }
                                        else {
                                            if (selectMulti == true) {
                                                MultListAdder(inde, item)
                                            }
                                            selectedMedia(item)
                                        }
                                    }}
                                    style={styles.box}>
                                    <Image
                                        source={{ uri: 'file://' + item }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                    {selectMulti &&
                                        <>
                                            <TouchableOpacity style={styles.MultiIndicator}>
                                                {multiContent.length > 0 ? multiContent.filter(cont => cont.id == inde).map((item, index) => (
                                                    <TextC key={index} style={{ color: 'white' }} size={11} text={multiContent.findIndex(item => item.id === inde) + 1} font={'Montserrat-Regular'} />
                                                )) : ""
                                                }
                                            </TouchableOpacity>
                                        </>
                                    }
                                    {['jpg', 'jpeg', 'png', 'gif'].includes(item?.split('.').pop().toLowerCase()) == false ?
                                        <View style={styles.videoIndicator}>
                                            <Entypo name='controller-play' color={'white'} size={22} />
                                        </View>
                                        : ""}
                                </TouchableOpacity>
                            )
                        }) : ""}
                    </View>

                </ScrollView >
                <View style={styles.absoluteBottomBar}>
                    <TouchableOpacity onPress={() => typeChanger('Library')} style={styles.library}>
                        <TextC text={'Library'} font={'Montserrat-Bold'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => typeChanger('Photo')} style={styles.photos}>
                        <TextC text={'Photo'} font={'Montserrat-Bold'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => typeChanger('Video')} style={styles.video}>
                        <TextC text={'Video'} font={'Montserrat-Bold'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}

export default CreatePost;
