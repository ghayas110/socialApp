import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';


const AddEvent = () => {
    const scheme = useColorScheme();
    const styles = StyleSheet.create({

    })



    return (
        <SafeAreaView>
            <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
            <ScrollView style={{ flexGrow: 1, padding: 20, ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: 'white' }), }}>

            </ScrollView>
        </SafeAreaView>
    )
}

export default AddEvent

