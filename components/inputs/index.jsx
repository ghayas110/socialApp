import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View, TouchableOpacity,Dimensions } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import { global } from "../constant";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const InputC = ({ secureTextEntry, placeholder, value, onChangeText, label,error }) => {
    const style = StyleSheet.create({
        Input: {
            fontSize: 14,
            paddingHorizontal: global.inputPaddingH,
            backgroundColor: '#FFFFFF',
            width: global.inputWidth,
            fontFamily: 'Montserrat-Regular',
            height: global.inputHeight,
            color: global.black,
            borderRadius: 30,
            borderWidth:1,
            ...(error === undefined ? { borderColor: global.white } : { borderColor: 'red' })
        },
        labelS: {
            color: global.white,
            fontFamily: "Montserrat-Regular",
            fontSize: 13,
            paddingBottom: 4,
        },
        InputError: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 12,
            color: 'red'
        }
    })

    const [isSecure, setIsSecure] = useState(true)
    return (
        <>
            <View>
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={style.labelS}>{label}</Text>
                </View>
                <View style={{ position: 'relative' }}>
                    <TextInput value={value} onChangeText={onChangeText} style={style.Input} placeholder={placeholder} secureTextEntry={secureTextEntry == true ? isSecure : secureTextEntry} placeholderTextColor={global.placeholderColor} />
                    {secureTextEntry == true ?
                        <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={{ position: 'absolute', height: windowHeight * 0.07, width: windowWidth * 0.10, right: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Feather name={isSecure ? "eye-off" : "eye"} size={13} color={'black'} />
                        </TouchableOpacity>
                        : ""
                    }
                </View>
            </View>
        </>
    )
}


export default InputC;