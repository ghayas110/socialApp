import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ButtonC = ({ title, bgColor, TextStyle, BtnStyle, loading, onPress, IsImage, Image, onpress2}) => {
    const style = StyleSheet.create({
        button: {
            backgroundColor: bgColor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            height: windowHeight * 0.07,
            ...BtnStyle,
            width:windowWidth * 0.5,  
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
