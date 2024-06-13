import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, Image, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { ScrollView } from 'react-native-gesture-handler';
import TextC from '../components/text/text';
import Video, { VideoRef } from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import { color } from '@rneui/base';





const CreatePost = () => {
    const [currentPreview, setCurrentPreview] = useState()
    const [isImage, setIsImage] = useState()
    const [content, setContent] = useState([]);
    const [selectMulti, setSelectMulti] = useState(false);
    const [multiContent, setMultiContent] = useState([]);

    const styles = StyleSheet.create({
        FirstImagePreview: {
            height: "50%",
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
            paddingHorizontal: 20
        },
        FirstImage: {
            width: '100%',
            height: "100%",
        },
        wrapper: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'relative',
            paddingBottom: 50,
        },
        box: {
            height: 100,
            width: "25%",
            borderWidth: 0.5,
            borderColor: 'white',
            position: 'relative'
        },
        absoluteBottomBar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 50,
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
            height: 25,
            width: 25,
            left: 10,
            top: 10,
            borderRadius: 20,
            borderColor: "white",
            backgroundColor: "#0052B4",
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        SelectMultiBtn: {
            backgroundColor: "#0052B4",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
        }
    })
    useEffect(() => {
        request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then((result) => {
            loadImages();
        });
    }, []);

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

    return (
        <>
            <View style={styles.FirstImagePreview}>
                {isImage ?
                    <Image style={styles.FirstImage} source={{ uri: 'file://' + currentPreview }} />
                    :
                    <Video
                        source={{ uri: 'file://' + currentPreview }}
                        style={styles.backgroundVideo}
                    />}
                <View style={styles.uploadControls}>
                    <TouchableOpacity onPress={() => {
                        Vibration.vibrate(10)
                        setSelectMulti(!selectMulti)
                        setMultiContent([])
                    }} style={styles.SelectMultiBtn}>
                        <Image style={{ height: 18, width: 18, marginRight: 5 }} source={require('../assets/icons/layesIcon.png')} />
                        <TextC style={{ color: 'white' }} size={11} text={'Select multiple'} font={'Montserrat-Regular'} />
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
                                    MultListAdder(inde, item)
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
        </>
    )
}

export default CreatePost;