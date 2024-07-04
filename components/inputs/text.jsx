import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native"
import { global, ResponsiveSize } from "../constant";


const TextInputC = ({ placeholder, error, onChangeText, multiline,value,numberOfLines, height,textAlignVertical,style }) => {
    console.log(error)
    const styles = StyleSheet.create({
        Input: {
            fontSize: ResponsiveSize(11),
            paddingHorizontal: global.inputPaddingH,
            backgroundColor: '#EEEEEE',
            width: global.inputWidth,
            fontFamily: 'Montserrat-Regular',
            height: height ? height : global.inputHeight,
            color: global.black,
            borderRadius: ResponsiveSize(30),
            borderWidth: 1,
            textAlignVertical:textAlignVertical,
            ...style,
            ...(error === undefined ? { borderColor: global.description } : { borderColor: 'red' })
        },
    })
    return (
        <TextInput multiline={multiline} numberOfLines={numberOfLines} onChangeText={onChangeText} value={value} style={styles.Input} placeholder={placeholder} placeholderTextColor={global.placeholderColor} />
    )
}

export default TextInputC;