import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native"


const ButtonC = ({ title, bgColor, TextStyle, BtnStyle, loading, onPress, IsImage, Image }) => {
    const style = StyleSheet.create({
        button: {
            width: "100%",
            backgroundColor: bgColor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            height: 55,
            ...BtnStyle
        },
        btnText: {
            fontFamily: 'Poppins-SemiBold',
            lineHeight: 23,
            fontSize: 16,
            ...TextStyle
        }
    })
    return (
        <>
            <TouchableOpacity onPress={onPress} disabled={loading} style={style.button}>
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
