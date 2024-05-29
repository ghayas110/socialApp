import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const InputC = ({ secureTextEntry, placeholder }) => {
    const scheme = useColorScheme();

    const style = StyleSheet.create({
        Input: {
            borderWidth: 1,
            borderRadius: 10,
            ...(scheme === 'dark' ? { backgroundColor: '#121212' } : { backgroundColor: '#FAFAFA' }),
            ...(scheme === 'dark' ? { borderColor: '#2F2F2F' } : { borderColor: '#E1E1E1' }),
            paddingHorizontal: 10,
            paddingTop: 14,
            width: '100%',
            fontFamily: 'Poppins-Regular',
            lineHeight: 23,
            fontSize: 16
        }
    })
    return (
        <>
            <TextInput style={style.Input} placeholder={placeholder} secureTextEntry={secureTextEntry} placeholderTextColor="#A0A0A0" />
        </>
    )
}


export default InputC;