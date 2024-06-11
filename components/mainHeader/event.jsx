import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get('window').width;


const EventHeader = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", height: 60, width: width - 30 }}>
            <Image source={require('../../assets/icons/Logo.png')} style={{ objectFit: 'contain', width: 130, height: 22 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Pressable onPress={() => navigation.navigate('AddEvent')}>
                    <Image source={require('../../assets/icons/addEventIcon.png')} style={{ objectFit: 'contain', width: 19, height: 21 }} />
                </Pressable>
            </View>
        </View>
    )
}

export default EventHeader;
