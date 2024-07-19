import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
const width = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign'
import TextC from '../text/text';
import { useNavigation } from '@react-navigation/native';

const CreatePostHeader = () => {
    const styles = StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            height: 60,
            width: width - 30,
        },
        logoSide1:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',
            width:'33.33%',
        },
        logoSide2:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            width:'33.33%',
        },
        logoSide3:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-end',
            width:'33.33%',
        },
        NextBtn:{
            backgroundColor:'#69BE25',
            paddingHorizontal:20,
            paddingVertical:4,
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center',
        }
    })
    const navigation = useNavigation()

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={()=>navigation.goBack()}  style={styles.logoSide1}>
                <AntDesign name='left' color={"#05348E"} size={16}/>
                <Image source={require('../../assets/icons/Logo.png')} style={{ objectFit: 'contain', width: 80, height: 22}} />
            </TouchableOpacity>
            <View style={styles.logoSide2}>
                <TextC font={'Montserrat-SemiBold'} text={"Recently"}/>
            </View>
            <View style={styles.logoSide3}>
                <TouchableOpacity style={styles.NextBtn}><TextC size={12} text={'Next'} font={'Montserrat-SemiBold'}/></TouchableOpacity>
            </View>
        </View>
    )
}

export default CreatePostHeader;

