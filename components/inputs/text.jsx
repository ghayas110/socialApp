import React from "react";
import {View,Text,StyleSheet,TextInput} from "react-native"
import { global } from "../constant";


const TextInputC = ({placeholder,error})=>{
    const styles = StyleSheet.create({
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
    })
    return(
        <TextInput style={styles.Input} placeholder={placeholder} placeholderTextColor={global.placeholderColor}/>
    )
}

export default TextInputC;