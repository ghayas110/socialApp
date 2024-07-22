
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



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreatePost = () => {
    const videoRef = useRef(null);
    const [currentPreview, setCurrentPreview] = useState()
    const [isImage, setIsImage] = useState()
    const [imageResize, setImageResize] = useState("cover")
    const [content, setContent] = useState([]);
    const [selectMulti, setSelectMulti] = useState(false);
    const [multiContent, setMultiContent] = useState([]);

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
    useEffect(() => {
        request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO).then((result) => {
            request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then((result) => {
                loadImages();
            });
        });
        // Playlibrary()
    }, []);

    const Playlibrary = async () => {
        await PhotoEditor.open({
            path: "https://images.unsplash.com/photo-1721332149069-a470150ef51c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        })
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
        const extension = r.split('.').pop().toLowerCase();
        setIsImage(imageExtensions.includes(extension))
    }
    const typeChanger = async (type) => {
        setMultiContent([])
        if (Platform.OS === 'android') {
            try {
                const mediaFiles = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera');
                const filterExtensions = (extensions) => {
                    return mediaFiles.filter(file => {
                        const extension = file.name.split('.').pop().toLowerCase();
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
    console.log(multiContent)
    return (
        <>
            <SafeAreaView style={styles.container}>
                <CreatePostHeader />
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
                                            <Image style={styles.FirstImage} source={{ uri: 'file://' + items?.item?.content }} />
                                        )
                                    }}
                                />
                                :
                                <Image style={styles.FirstImage} source={{ uri: 'file://' + currentPreview }} />
                            }
                        </>
                        :
                        <Pressable onPress={() => setPause(!paused)} style={{ position: 'relative' }}>
                            <Video
                                source={{ uri: 'file://' + currentPreview }}
                                ref={videoRef}
                                style={styles.FirstImage}
                                paused={paused}
                            />
                            {paused &&
                                <View style={styles.playPaused}>
                                    <Entypo size={ResponsiveSize(50)} name='controller-play' color={"white"} />
                                </View>
                            }
                        </Pressable>
                    }
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
                    </View>
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
                                        if (selectMulti == true) {
                                            MultListAdder(inde, item)
                                        }
                                        selectedMedia(item)
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
                                    {['jpg', 'jpeg', 'png', 'gif'].includes(item.split('.').pop().toLowerCase()) == false ?
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
