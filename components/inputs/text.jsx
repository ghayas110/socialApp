import React from "react";
import {View,Text,StyleSheet,TextInput} from "react-native"

const TextInputC = ({placeholder})=>{
    const styles = StyleSheet.create({
        Input:{
            borderWidth:1,
            borderColor:'#b3b3b3',
            backgroundColor:'#fafafa',
            borderRadius:60,
            paddingVertical:10,
            paddingHorizontal:20,
            fontFamily:'Montserrat-Medium',
            fontSize:12
        }
    })
    return(
        <TextInput style={styles.Input} placeholder={placeholder} placeholderTextColor={"#666666"}/>
    )
}

export default TextInputC;