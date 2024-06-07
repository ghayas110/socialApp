import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather'



const InputC = ({ secureTextEntry, placeholder, value, onChangeText, label }) => {
    const style = StyleSheet.create({
        Input: {
            borderWidth: 0,
            borderRadius: 30,
            paddingHorizontal: 15,
            backgroundColor: '#FFFFFF',
            width: '100%',
            fontFamily: 'Montserrat-Regular',
            lineHeight: 23,
            fontSize: 14,
            height: 48,
            color: 'black'
        },
        labelS: {
            color: "white",
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
                    <TextInput value={value} onChangeText={onChangeText} style={style.Input} placeholder={placeholder} secureTextEntry={secureTextEntry == true ? isSecure : secureTextEntry} placeholderTextColor="#DADADA" />
                    {secureTextEntry == true ?
                        <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={{ position: 'absolute', height: 48, width: 48, right: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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