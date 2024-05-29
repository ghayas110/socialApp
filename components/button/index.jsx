import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const Button = ({ text, bgColor, TextStyle, BtnStyle, loading }) => {
    const style = StyleSheet.create({
        button: {
            width: "100%",
            backgroundColor: bgColor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            height:55,
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
        <TouchableOpacity disabled={loading} style={style.button}>
            {loading ?
                <ActivityIndicator style={style.btnText} color="white" />
                :
                <Text style={style.btnText}>{text}</Text>
            }

        </TouchableOpacity>
    )
}

export default React.memo(Button);
