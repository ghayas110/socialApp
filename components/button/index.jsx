import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native"
import { ResposiveSize } from "../constant";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ButtonC = ({ title, bgColor, TextStyle, BtnStyle, loading, onPress, IsImage, disabled, onpress2}) => {
    const style = StyleSheet.create({
        button: {
            backgroundColor: bgColor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: ResposiveSize(30),
            height: windowHeight * 0.07,
            ...BtnStyle,
            width:windowWidth * 0.5,  
        },
        btnText: {
            fontFamily: 'Montserrat-Bold',
            fontSize: ResposiveSize(13),
            ...TextStyle
        }
    })
    return (
        <>
            <TouchableOpacity onPress={onPress} disabled={disabled} style={style.button} onPressIn={onpress2}>
                {loading ?
                    <ActivityIndicator style={style.btnText} size={ResposiveSize(20)} color="white" />
                    :
                    <Text style={style.btnText}>{title}</Text>
                }
            </TouchableOpacity>
        </>
    )
}

export default ButtonC;
