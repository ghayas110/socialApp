import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    DarkTheme,
    Dimensions,
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
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { useHeaderHeight } from '@react-navigation/elements';
import { TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from '../store/config.json'

const Message = ({ route }) => {
    const focus = useIsFocused();
    const scheme = useColorScheme();
    const windowWidth = Dimensions.get('window').width;
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
            paddingLeft:ResponsiveSize(5)
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
            height: windowWidth * 0.1,
            width: windowWidth * 0.1,
            borderRadius: windowWidth * 0.1,
            backgroundColor: global.description,
            marginRight: ResponsiveSize(10),
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
            bottom: ResponsiveSize(0),
            backgroundColor: '#EEEEEE',
        },
        MessageInput: {
            paddingHorizontal: ResponsiveSize(15),
            fontFamily: "Montserrat-Medium",
            width: windowWidth,
            fontSize: ResponsiveSize(12),
            paddingVertical: ResponsiveSize(15),
        },
        SentBtn: {
            position: 'absolute',
            height: ResponsiveSize(40),
            width: ResponsiveSize(40),
            backgroundColor: global.secondaryColor,
            right: ResponsiveSize(15),
            top: ResponsiveSize(8),
            borderRadius: ResponsiveSize(30),
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
            paddingHorizontal: ResponsiveSize(12),
            paddingVertical: ResponsiveSize(7)
        },
        messageUser: {
            fontSize: ResponsiveSize(12),
            color: global.white,
            fontFamily: 'Montserrat-Regular',
            paddingHorizontal: ResponsiveSize(12),
            paddingVertical: ResponsiveSize(7)
        },
        empty: {
            flex: 1,
        },
        thisUserText: {
            backgroundColor: global.description,
            flex: 1,
            borderRadius: ResponsiveSize(30),
        },
        otherUserText: {
            backgroundColor: global.secondaryColor,
            flex: 2,
            borderRadius: ResponsiveSize(30),
        },
    });

    const [newMessage, setNewMessage] = useState("")
    const [recentChats, setRecentChats] = useState([])
    const [user_id, setUserId] = useState()
    const [loader, setLoader] = useState(false)

    const loadRecentChats = async () => {
        const Token = await AsyncStorage.getItem('Token'); U_id
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
        }).on('message', (data) => {
            setRecentChats(data);
            console.log(data, 'verification Data before create message');
        })
        setLoader(false)
    }



    useEffect(() => {
        setLoader(true)
        loadRecentChats()
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' },
        });
        return () => {
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
        const Token = await AsyncStorage.getItem('Token');
        if (newMessage !== "") {
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
            }).on('message', (data) => {
                setNewMessage("")
                setRecentChats(data);
                console.log(data, 'verification Data after create message');
            })
        }
    }

    const renderItem = useCallback((items) => {
        return (
            <>
                <View style={styles.messageWrapper}>
                    {items?.item?.senderUserId == user_id ?
                        <View style={styles.messageContainer2}>
                            <View style={styles.empty}></View>
                            <View style={styles.otherUserText}>
                                <Text style={styles.messageUser}>{items.item.message}</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.messageContainer1}>
                            <View style={styles.thisUserText}>
                                <Text style={styles.message}>{items.item.message}</Text>
                            </View>
                            <View style={styles.empty}></View>
                        </View>
                    }
                </View>
            </>
        );
    }, [recentChats]);
    return (
        <>
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
                    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: global.white, position: 'relative' }}>
                        <StatusBar backgroundColor={global.white} />
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
                        <View style={{ paddingTop: ResponsiveSize(10) }}>
                            <FlashList
                                showsVerticalScrollIndicator={false}
                                data={recentChats}
                                keyExtractor={(items, index) => index?.toString()}
                                renderItem={renderItem}
                            />
                        </View>
                        <View style={styles.MessageInputWrapper}>
                            <TextInput placeholder="Message..." style={styles.MessageInput} value={newMessage} onChangeText={(e) => setNewMessage(e)} />
                            <TouchableOpacity onPress={sendMessage} style={styles.SentBtn}>
                                <Feather name="send" color={global.white} size={ResponsiveSize(16)} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    )
}
export default Message;