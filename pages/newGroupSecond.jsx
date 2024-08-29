import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    DarkTheme,
    Dimensions,
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import { global, ResponsiveSize } from "../components/constant";
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextC from "../components/text/text";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimeAgo from '@manu_omg/react-native-timeago';
import { baseUrl } from '../store/config.json'
import * as AllConnectionsAction from "../store/actions/Connections/index";
import { connect } from "react-redux";


const NewGroupSecondScreen = ({route}) => {
    const scheme = useColorScheme();
    const windowWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth,
            paddingHorizontal: ResponsiveSize(15),
            paddingVertical: ResponsiveSize(15),
            backgroundColor: global.white
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
        bodyWrapper: {
            paddingHorizontal: ResponsiveSize(15),
            paddingVertical: ResponsiveSize(5),
        },
        NextBtn: {
            backgroundColor: '#69BE25',
            paddingHorizontal: ResponsiveSize(20),
            paddingVertical: ResponsiveSize(4),
            borderRadius: ResponsiveSize(20),
            alignItems: 'center',
            justifyContent: 'center',
        },
        GroupName:{
            paddingVertical:ResponsiveSize(20),
            flexDirection: 'column',
            alignItems:'center',
            justifyContent:'center'
        },
        GroupProfile:{
            width:ResponsiveSize(80),
            height:ResponsiveSize(80),
            borderRadius:ResponsiveSize(80),
            backgroundColor:'#E6E6E6'
        }
    });
    const navigation = useNavigation();
   

    console.log(route?.params, 'menu')
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={
                    scheme === 'dark' ? DarkTheme.colors.background : 'white'
                }
                barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: global.white }}>
                <StatusBar backgroundColor={global.white} />
                <View style={styles.wrapper}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.logoSide1}>
                        <AntDesign name='left' color={global.primaryColor} size={ResponsiveSize(22)} />
                    </Pressable>
                    <View style={styles.logoSide2}>
                        <TextC size={ResponsiveSize(16)} font={'Montserrat-Bold'} text={"New Group"} />
                    </View>
                    <TouchableOpacity style={styles.logoSide3}>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyWrapper}>
                    <View style={styles.GroupName}>
                        <View style={styles.GroupProfile}>

                        </View>
                        <TextInput placeholder=""/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
function mapStateToProps({ AllConnectionsReducer }) {
    return { AllConnectionsReducer };
}
export default connect(mapStateToProps, AllConnectionsAction)(NewGroupSecondScreen);