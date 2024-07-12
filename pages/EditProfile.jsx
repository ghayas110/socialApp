import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, Dimensions, TouchableOpacity, Image, Text, PermissionsAndroid, ImageBackground, ActivityIndicator, Pressable, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { ResponsiveSize, global } from '../components/constant';
import TextC from '../components/text/text';
import AntDesign from 'react-native-vector-icons/AntDesign'

const EditProfile = () => {
    const windowWidth = Dimensions.get('window').width;
    const scheme = useColorScheme();
    const navigation = useNavigation()

    const styles = StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            width: windowWidth,
            paddingHorizontal: ResponsiveSize(15),
            paddingVertical: ResponsiveSize(15),
            backgroundColor: scheme === 'dark' ? DarkTheme.colors.background : global.white,
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
            backgroundColor: global.secondaryColor,
            width: ResponsiveSize(80),
            paddingVertical: ResponsiveSize(10),
            borderRadius: ResponsiveSize(20),
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
            <View style={styles.wrapper}>
                <Pressable onPress={() => navigation.goBack()} style={styles.logoSide1}>
                    <AntDesign name='left' color={"#05348E"} size={ResponsiveSize(16)} />
                    <Image source={require('../assets/icons/Logo.png')} style={{ objectFit: 'contain', width: ResponsiveSize(70), height: ResponsiveSize(22) }} />
                </Pressable>
                <View style={styles.logoSide2}>
                    <TextC size={ResponsiveSize(12)} font={'Montserrat-Bold'} text={"Edit Profile"} />
                </View>
                <View style={styles.logoSide3}>
                    <TouchableOpacity style={styles.NextBtn}>
                        <TextC size={12} text={'Update'} font={'Montserrat-SemiBold'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile;