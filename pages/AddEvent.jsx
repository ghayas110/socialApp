import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import TextC from '../components/text/text';
import TextInputC from '../components/inputs/text';
import LocationInput from '../components/inputs/location';





const width = Dimensions.get('window').width;
const AddEvent = () => {
    const scheme = useColorScheme();
    const styles = StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            height: 60,
            width: width,
            paddingHorizontal: 15,
            backgroundColor: scheme === 'dark' ? DarkTheme.colors.background : 'white',
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
            paddingHorizontal: 20,
            paddingVertical: 4,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        }
    })



    return (
        <SafeAreaView>
            <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
            <View style={styles.wrapper}>
                <View style={styles.logoSide1}>
                    <AntDesign name='left' color={"#05348E"} size={16} />
                    <Image source={require('../assets/icons/Logo.png')} style={{ objectFit: 'contain', width: 80, height: 22 }} />
                </View>
                <View style={styles.logoSide2}>
                    <TextC font={'Montserrat-SemiBold'} text={"New Event"} />
                </View>
                <View style={styles.logoSide3}>
                    <TouchableOpacity style={styles.NextBtn}><TextC size={12} text={'Next'} font={'Montserrat-SemiBold'} /></TouchableOpacity>
                </View>
            </View>
            {/* <ScrollView style={{ flexGrow: 1, padding: 20, ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: 'white' }), }}> */}
                <TextInputC placeholder={'Event title'} />
                <View style={{ paddingTop: 15 }}>
                    <LocationInput />
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

export default AddEvent

