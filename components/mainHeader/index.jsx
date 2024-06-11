import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
const width = Dimensions.get('window').width;


const MainHeader = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", height: 60, width: width - 30}}>
            <Image source={require('../../assets/icons/Logo.png')} style={{ objectFit: 'contain', width: 130, height: 22 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                <View style={styles.locationHeader}>
                    <TouchableOpacity>
                        <Text style={styles.LocationTExt}>Honolulu</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ paddingVertical: 4, paddingLeft: 10, paddingRight: 5 }}>
                    <Image source={require('../../assets/icons/HeaderIcon1.png')} style={{ objectFit: 'contain', width: 21, height: 21 }} />
                </TouchableOpacity>

                <TouchableOpacity style={{ padding: 4 }}>
                    <Image source={require('../../assets/icons/HeaderIcon2.png')} style={{ objectFit: 'contain', width: 21, height: 21 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MainHeader;

const styles = StyleSheet.create({
    locationHeader: {
        borderRightWidth: 1,
        borderColor: "#05348E",
        height: 20,
        paddingHorizontal: 10
    },
    LocationTExt: {
        fontFamily: "Montserrat-Bold",
        fontSize: 14,
        color: '#69BE25'
    }
})