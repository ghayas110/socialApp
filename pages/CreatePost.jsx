import React, { useState, useEffect,useRef } from 'react';
import { Platform, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { ScrollView } from 'react-native-gesture-handler';
import TextC from '../components/text/text';
import Video, { VideoRef } from 'react-native-video';

const CreatePost = () => {
    const [currentPreview, setCurrentPreview] = useState()
    const [content, setContent] = useState([]);
    const styles = StyleSheet.create({
        FirstImagePreview: {
            height: "50%",
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: 'white'
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
            paddingBottom: 50
        },
        box: {
            height: 100,
            width: "25%",
            borderWidth: 0.5,
            borderColor: 'white'
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

    console.log(content)
    const typeChanger = async (type) => {
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

    return (
        <>
            <View style={styles.FirstImagePreview}>
                {/* <Image style={styles.FirstImage} source={{ uri: 'file://' + currentPreview }} /> */}
                <Video
                    source={{ uri: 'file://' + currentPreview }}
                    style={styles.backgroundVideo}
                />
            </View>
            <ScrollView style={{ flexGrow: 1, }}>
                <View style={styles.wrapper}>
                    {content.length > 0 ? content.map((item) =>
                        <TouchableOpacity onPress={() => setCurrentPreview(item)} style={styles.box}>
                            <Image
                                source={{ uri: 'file://' + item }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </TouchableOpacity>
                    ) : ""}
                </View>
            </ScrollView>
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