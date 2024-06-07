import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native"


const ButtonC = ({ title, bgColor, TextStyle, BtnStyle, loading, onPress, IsImage, Image, onpress2}) => {
    const style = StyleSheet.create({
        button: {
            backgroundColor: bgColor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            height: 48,
            ...BtnStyle,
            width:181,  
        },
        btnText: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 13,
            ...TextStyle
        }
    })
    return (
        <>
            <TouchableOpacity onPress={onPress} disabled={loading} style={style.button} onPressIn={onpress2}>
                {loading ?
                    <ActivityIndicator style={style.btnText} color="white" />
                    :
                    <Text style={style.btnText}>{title}</Text>
                }
            </TouchableOpacity>
            {/* <Image source={require('../../assets/icons/postImage.jpg')} style={style.ActuallPost} /> */}
        </>
    )
}

export default ButtonC;
