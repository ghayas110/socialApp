import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { ResposiveSize, global } from '../constant';




const width = Dimensions.get('window').width;


const EventHeader = ({backgroundColor}) => {
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        HeaderWrapper:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            backgroundColor:backgroundColor,
            paddingVertical:ResposiveSize(15),
            paddingHorizontal: ResposiveSize(15),
        },
        HeaderLogo:{
            width: ResposiveSize(130),
            height: ResposiveSize(22),
            resizeMode: 'contain',
        }
    })

    return (
        <View style={styles.HeaderWrapper}>
            <Image source={require('../../assets/icons/Logo.png')} style={styles.HeaderLogo}/>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('AddEvent')}>
                    <Image source={require('../../assets/icons/addEventIcon.png')} style={{ objectFit: 'contain', width: 19, height: 21 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EventHeader;
