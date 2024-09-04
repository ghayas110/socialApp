import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    DarkTheme,
    Dimensions,
    Easing,
    ImageBackground,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import { global, ResponsiveSize } from "../components/constant";
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextC from "../components/text/text";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import { useHeaderHeight } from '@react-navigation/elements';
import { TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from '../store/config.json'
import { Animated } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons'
import FastImage from "react-native-fast-image";
import { useBottomSheet } from '../components/bottomSheet/BottomSheet';
import ButtonC from "../components/button";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";



const Message = ({ route }) => {
    const focus = useIsFocused();
    const scheme = useColorScheme();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation();
    const headerHeight = useHeaderHeight();
    const styles = StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            width: windowWidth,
            paddingHorizontal: ResponsiveSize(15),
            paddingVertical: ResponsiveSize(15),
            backgroundColor: global.white,
            borderBottomColor: global.description,
            borderBottomWidth: ResponsiveSize(1)
        },
        logoSide1: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        logoSide2: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: ResponsiveSize(5)
        },
        bodyWrapper: {
            paddingHorizontal: ResponsiveSize(15),
            paddingVertical: ResponsiveSize(5),
        },
        SearchInputWrapper: {
            position: "relative",
        },
        SearchInput: {
            borderRadius: ResponsiveSize(20),
            paddingHorizontal: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(5),
            fontSize: ResponsiveSize(12),
            fontFamily: 'Montserrat-Regular',
            borderColor: global.description,
            borderWidth: ResponsiveSize(1),
            position: "relative",
            paddingLeft: ResponsiveSize(35)
        },
        SearchIcon: {
            position: 'absolute',
            top: ResponsiveSize(8),
            left: ResponsiveSize(10)
        },
        PostHeader: {
            flexDirection: 'row',
            paddingTop: ResponsiveSize(15),
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        PostProfileImage: {
            height: ResponsiveSize(30),
            width: ResponsiveSize(30),
            borderRadius: ResponsiveSize(30),
            backgroundColor: global.description,
            marginRight: ResponsiveSize(5),
            overflow: 'hidden',
        },
        PostProfileImage2: {
            height: windowWidth * 0.07,
            width: windowWidth * 0.07,
            borderRadius: windowWidth * 0.1,
            backgroundColor: global.description,
            marginRight: ResponsiveSize(5),
            overflow: 'hidden',
        },
        PostProfileImageBox: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        MessageInputWrapper: {
            width: windowWidth,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            paddingHorizontal: ResponsiveSize(10),
            paddingTop: ResponsiveSize(5),
            paddingBottom: ResponsiveSize(10),
            bottom: 0,
            backgroundColor: global.white,
        },
        MessageInput: {
            paddingHorizontal: ResponsiveSize(15),
            height: ResponsiveSize(45),
            fontFamily: "Montserrat-Medium",
            backgroundColor: "#EEEEEE",
            width: windowWidth - ResponsiveSize(20),
            fontSize: ResponsiveSize(12),
            paddingVertical: ResponsiveSize(15),
            borderRadius: ResponsiveSize(15)
        },
        SentBtn: {
            position: 'absolute',
            height: ResponsiveSize(40),
            width: ResponsiveSize(40),
            backgroundColor: global.secondaryColor,
            right: ResponsiveSize(13),
            top: ResponsiveSize(8),
            borderRadius: ResponsiveSize(15),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        CameraBtn: {
            position: 'absolute',
            height: ResponsiveSize(40),
            width: ResponsiveSize(40),
            backgroundColor: global.secondaryColor,
            right: ResponsiveSize(58),
            top: ResponsiveSize(8),
            borderRadius: ResponsiveSize(15),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        messageWrapper: {
            paddingHorizontal: ResponsiveSize(15),
            paddingVertical: ResponsiveSize(5)
        },
        messageContainer1: {
            flexDirection: "row",
            flex: 1,
        },
        messageContainer2: {
            justifyContent: "flex-end",
            flexDirection: "row",
            flex: 1,
        },
        message: {
            fontSize: ResponsiveSize(12),
            color: global.black,
            fontFamily: 'Montserrat-Regular',
        },
        TimeAgo: {
            fontSize: ResponsiveSize(8),
            color: global.black,
            fontFamily: 'Montserrat-Regular',
            marginTop: ResponsiveSize(3),
            marginRight: ResponsiveSize(3)
        },
        TimeAgoWhite: {
            fontSize: ResponsiveSize(8),
            color: global.white,
            fontFamily: 'Montserrat-Regular',
            marginTop: ResponsiveSize(3),
            marginRight: ResponsiveSize(3)
        },
        messageUser: {
            fontSize: ResponsiveSize(12),
            color: global.white,
            fontFamily: 'Montserrat-Regular',
        },
        empty: {
            flex: 1,
        },
        thisUserText: {
            backgroundColor: global.description,
            borderBottomLeftRadius: ResponsiveSize(10),
            borderTopRightRadius: ResponsiveSize(10),
            borderBottomRightRadius: ResponsiveSize(10),
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingHorizontal: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(5),
            maxWidth: windowWidth * 0.6
        },
        otherUserText: {
            backgroundColor: global.secondaryColor,
            borderTopLeftRadius: ResponsiveSize(10),
            borderBottomLeftRadius: ResponsiveSize(10),
            borderBottomRightRadius: ResponsiveSize(10),
            flexDirection: 'column',
            alignItems: 'flex-end',
            paddingHorizontal: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(5),
            maxWidth: windowWidth * 0.7
        },
        ImageMessage: {
            backgroundColor: global.secondaryColor,
            borderTopLeftRadius: ResponsiveSize(10),
            borderBottomLeftRadius: ResponsiveSize(10),
            borderBottomRightRadius: ResponsiveSize(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(5),
            width: windowWidth * 0.7
        },
        messageText: {
            fontSize: 16,
        },
        leftAction: {
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            padding: ResponsiveSize(10),
        },
        actionText: {
            color: 'white',
            fontWeight: 'bold',
        },
        otherMedia: {
            backgroundColor: global.secondaryColor,
            borderRadius: ResponsiveSize(10),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth * 0.7,
            paddingVertical: ResponsiveSize(6),
            position: 'relative'
        },
        otherMedia2: {
            backgroundColor: global.description,
            borderRadius: ResponsiveSize(10),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth * 0.7,
            paddingVertical: ResponsiveSize(6),
            position: 'relative'
        },

        ImageMessage2: {
            backgroundColor: global.description,
            borderTopLeftRadius: ResponsiveSize(10),
            borderBottomLeftRadius: ResponsiveSize(10),
            borderBottomRightRadius: ResponsiveSize(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(5),
            width: windowWidth * 0.7
        },
        otherMediaThumbnail: {
            borderRadius: ResponsiveSize(10),
            width: windowWidth * 0.67,
            height: windowWidth * 0.67
        },
        BottomInfoBar: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: ResponsiveSize(10),
            width: windowWidth * 0.7
        }
    });
    const [newMessage, setNewMessage] = useState("")
    const [recentChats, setRecentChats] = useState([])
    const [user_id, setUserId] = useState()
    const [loader, setLoader] = useState(false)
    const scrollViewRef = useRef();

    const { openBottomSheet, closeBottomSheet } = useBottomSheet();

    const handleOpenSheet = () => {
        openBottomSheet(
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                        paddingHorizontal: ResponsiveSize(15),
                    }}>
                    <ButtonC
                        onPress={openMobileCamera}
                        BtnStyle={{ width: windowWidth * 0.45 }}
                        TextStyle={{ color: global.white }}
                        bgColor={global.primaryColor}
                        style={styles.openCamera}
                        title={'Open camera'}></ButtonC>
                    <ButtonC
                        onPress={openPhotoLibrary}
                        BtnStyle={{ width: windowWidth * 0.45 }}
                        TextStyle={{ color: global.white }}
                        bgColor={global.primaryColor}
                        style={styles.openLibrary}
                        title={'Open library'}></ButtonC>
                </View>
            </>,
            ['15%'],
        );
    };

    const openPhotoLibrary = async () => {
        const result = await launchImageLibrary();
        if (result?.assets.length > 0) {
            closeBottomSheet();
            navigation.navigate('messageMedia', {
                media_url: result?.assets,
                receiverUserId: route?.params?.receiverUserId,
                profile_picture_url: route?.params?.profile_picture_url,
                user_name: route?.params?.user_name
            })
        }
    };
    const openMobileCamera = async () => {
        const result = await launchCamera();
        if (result?.assets.length > 0) {
            closeBottomSheet();
            navigation.navigate('messageMedia', {
                media_url: result?.assets,
                receiverUserId: route?.params?.receiverUserId,
                profile_picture_url: route?.params?.profile_picture_url,
                user_name: route?.params?.user_name

            })
        }
    };

    const loadRecentChats = async () => {
        setLoader(true)
        const Token = await AsyncStorage.getItem('Token');
        const U_id = await AsyncStorage.getItem('U_id');
        setUserId(U_id)
        const socket = io(`${baseUrl}/chat`, {
            transports: ['websocket'],
            extraHeaders: {
                'x-api-key': "TwillioAPI",
                'accesstoken': `Bearer ${Token}`
            }
        });
        socket.on('connect').emit('oldMessages', {
            "receiverUserId": route?.params?.receiverUserId,
        }).emit('readMessage', { receiverUserId: route?.params?.receiverUserId }).on('message', (data) => {
            if (data?.message.length > 0) {
                setLoader(false)
                setRecentChats(data?.message);
            }
            setLoader(false)
        }).emit('readMessage', { receiverUserId: route?.params?.receiverUserId })
    }

    useEffect(() => {
        loadRecentChats()
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' },
        });
        return () => {
            closeBottomSheet();
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: '#69BE25',
                    borderTopLeftRadius: ResponsiveSize(20),
                    borderTopRightRadius: ResponsiveSize(20),
                },
            });
        }
    }, []);

    const sendMessage = async () => {
        if (newMessage !== "") {
            setRecentChats(prev => [
                ...prev,
                {
                    created_at: Date.now(),
                    message: newMessage,
                    isSend: false,
                    senderUserId: user_id
                },
            ]);
            const Token = await AsyncStorage.getItem('Token');
            const socket = io(`${baseUrl}/chat`, {
                transports: ['websocket'],
                extraHeaders: {
                    'x-api-key': "TwillioAPI",
                    'accesstoken': `Bearer ${Token}`
                }
            });
            socket.on('connect').emit('createDirectMessage', {
                "message": newMessage,
                "receiverUserId": route?.params?.receiverUserId,
            }).emit('readMessage', { receiverUserId: route?.params?.receiverUserId }).on('message', (data) => {
                setNewMessage("")
                setRecentChats(data?.message);
            })
        }
    }

    const swipeableRef = useRef(null);

    const renderLeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0.7, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[styles.leftAction, { transform: [{ scale }] }]}>
                <Octicons name="reply" size={20} color="#000" />
            </Animated.View>
        );
    };


    const handleSwipeableWillOpen = (ref) => {
        if (swipeableRef.current && swipeableRef.current !== ref.current) {
            swipeableRef.current.close();
        }
        swipeableRef.current = ref.current;
    };


    const renderItem = useCallback((items) => {
        const date = new Date(items.item.created_at);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
        return (
            <>
                <View style={styles.messageWrapper}>
                    {items?.item?.senderUserId == user_id ?
                        <View style={styles.messageContainer2}>
                            <View style={styles.empty}></View>
                            {items?.item?.is_media == "Y" ?
                                <View style={styles.otherMedia}>
                                    <FastImage
                                        source={
                                            items?.item?.media_url == ''
                                                ? require('../assets/icons/avatar.png')
                                                : { uri: items?.item?.media_url, priority: FastImage.priority.high }
                                        }
                                        style={styles.otherMediaThumbnail}
                                        resizeMode="cover"
                                    />
                                    {items?.item?.message !== "" ?
                                        <View style={styles.ImageMessage}>
                                            <Text style={styles.messageUser}>{items.item.message}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.TimeAgo}>{formattedTime}</Text>
                                                {items?.item?.isSend == false ?
                                                    <AntDesign name="clockcircleo" />
                                                    :
                                                    <>
                                                        {items?.item?.read_status == "N" ?
                                                            < AntDesign name="check" />
                                                            :
                                                            <FontAwesome6 name="check-double" />
                                                        }
                                                    </>
                                                }
                                            </View>
                                        </View>
                                        :
                                        <View style={styles.BottomInfoBar}>
                                            <Text style={styles.TimeAgoWhite}>{formattedTime}</Text>
                                            {items?.item?.isSend == false ?
                                                <AntDesign name="clockcircleo" color={global.white} />
                                                :
                                                <>
                                                    {items?.item?.read_status == "N" ?
                                                        <AntDesign name="check" color={global.white} />
                                                        :
                                                        <FontAwesome6 name="check-double" color={global.white} />
                                                    }
                                                </>
                                            }
                                        </View>
                                    }
                                </View>
                                :
                                <View style={styles.otherUserText}>
                                    <Text style={styles.messageUser}>{items.item.message}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.TimeAgo}>{formattedTime}</Text>
                                        {items?.item?.isSend == false ?
                                            <AntDesign name="clockcircleo" />
                                            :
                                            <>
                                                {items?.item?.read_status == "N" ?
                                                    < AntDesign name="check" />
                                                    :
                                                    <FontAwesome6 name="check-double" />
                                                }
                                            </>
                                        }
                                    </View>
                                </View>
                            }
                        </View>
                        :
                        <Swipeable
                            ref={swipeableRef}
                            renderLeftActions={renderLeftActions}
                            onSwipeableWillOpen={() => handleSwipeableWillOpen(swipeableRef)}
                        >
                            <View style={styles.messageContainer1}>
                                {items?.item?.is_media == "Y" ?
                                    <View style={styles.otherMedia2}>
                                        <FastImage
                                            source={
                                                items?.item?.media_url == ''
                                                    ? require('../assets/icons/avatar.png')
                                                    : { uri: items?.item?.media_url, priority: FastImage.priority.high }
                                            }
                                            style={styles.otherMediaThumbnail}
                                            resizeMode="cover"
                                        />
                                        {items?.item?.message !== "" ?
                                            <View style={styles.ImageMessage2}>
                                                <Text style={styles.message}>{items.item.message}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.TimeAgo}>{formattedTime}</Text>
                                                    {items?.item?.isSend == false ?
                                                        <AntDesign name="clockcircleo" />
                                                        :
                                                        < AntDesign name="check" />
                                                    }
                                                </View>
                                            </View>
                                            :
                                            <View style={styles.BottomInfoBar}>
                                                <Text style={styles.TimeAgoWhite}>{formattedTime}</Text>
                                                {items?.item?.isSend == false ?
                                                    <AntDesign name="clockcircleo" color={global.white} />
                                                    :
                                                    <AntDesign name="check" color={global.white} />
                                                }
                                            </View>
                                        }
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <ImageBackground
                                            source={
                                                route?.params?.profile_picture_url == ''
                                                    ? require('../assets/icons/avatar.png')
                                                    : { uri: route?.params?.profile_picture_url }
                                            }
                                            style={styles.PostProfileImage2}
                                            resizeMode="cover" />
                                        <View style={styles.thisUserText}>
                                            <Text style={styles.message}>{items.item.message}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.TimeAgo}>{formattedTime}</Text>
                                            </View>
                                        </View>
                                    </View>}
                                <View style={styles.empty}></View>
                            </View>
                        </Swipeable>
                    }
                </View>
            </>
        );
    }, [recentChats]);




    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flexGrow: 1 }}
            keyboardVerticalOffset={
                Platform.OS === 'ios' ? headerHeight + StatusBar.currentHeight : 0
            }>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor={
                        scheme === 'dark' ? DarkTheme.colors.background : 'white'
                    }
                    barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
                />
                <View style={styles.wrapper}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.logoSide1}>
                        <AntDesign name='left' color={global.primaryColor} size={ResponsiveSize(22)} />
                    </Pressable>
                    <View style={styles.logoSide2}>
                        <ImageBackground
                            source={
                                route?.params?.profile_picture_url == ''
                                    ? require('../assets/icons/avatar.png')
                                    : { uri: route?.params?.profile_picture_url }
                            }
                            style={styles.PostProfileImage}
                            resizeMode="cover"></ImageBackground>
                        <TextC size={ResponsiveSize(12)} font={'Montserrat-Bold'} text={route?.params?.user_name} />
                    </View>
                </View>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    contentContainerStyle={{ flexGrow: 1, backgroundColor: global.white, position: 'relative', paddingTop: ResponsiveSize(10), paddingBottom: ResponsiveSize(65) }}>
                    {loader ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <ActivityIndicator size={'large'} color={global.primaryColor} />
                        </View>
                        :
                        <FlashList
                            estimatedItemSize={25}
                            showsVerticalScrollIndicator={false}
                            data={recentChats}
                            keyExtractor={(items, index) => index?.toString()}
                            renderItem={renderItem}
                        />
                    }
                </ScrollView>
                <View style={styles.MessageInputWrapper}>
                    <TextInput placeholder="Message..." style={styles.MessageInput} value={newMessage} onPress={() =>
                        scrollViewRef.current.scrollToEnd({ animated: true })
                    } onChangeText={(e) => setNewMessage(e)} />
                    <TouchableOpacity onPress={sendMessage} style={styles.SentBtn}>
                        <Feather name="send" color={global.white} size={ResponsiveSize(16)} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleOpenSheet} style={styles.CameraBtn}>
                        <Feather name="camera" color={global.white} size={ResponsiveSize(16)} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}
export default Message;