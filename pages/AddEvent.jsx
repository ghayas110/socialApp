import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import TextC from '../components/text/text';
import TextInputC from '../components/inputs/text';
import LocationInput from '../components/inputs/location';
import { Calendar, LocaleConfig } from 'react-native-calendars';




const width = Dimensions.get('window').width;
const AddEvent = () => {
    const scheme = useColorScheme();
    const styles = StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            height: 60,
            width: width,
            paddingHorizontal: 15,
            backgroundColor: scheme === 'dark' ? DarkTheme.colors.background : 'white',
        },
        logoSide1: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '33.33%',
        },
        logoSide2: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '33.33%',
        },
        logoSide3: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '33.33%',
        },
        NextBtn: {
            backgroundColor: '#69BE25',
            paddingHorizontal: 20,
            paddingVertical: 4,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        calenderCustomHeader: {
            height: 60,
            width: '100%',
            backgroundColor: "white",
            position: "absolute",
            zIndex: 1,
            borderRadius: 10,
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            borderColor:'black',
            borderWidth: 1,
        }
    })

    const [selected, setSelected] = useState('');


    console.log(selected)
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
            <View style={styles.wrapper}>
                <View style={styles.logoSide1}>
                    <AntDesign name='left' color={"#05348E"} size={16} />
                    <Image source={require('../assets/icons/Logo.png')} style={{ objectFit: 'contain', width: 80, height: 22 }} />
                </View>
                <View style={styles.logoSide2}>
                    <TextC font={'Montserrat-SemiBold'} text={"New Event"} />
                </View>
                <View style={styles.logoSide3}>
                    <TouchableOpacity style={styles.NextBtn}><TextC size={12} text={'Next'} font={'Montserrat-SemiBold'} /></TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flexGrow: 1, padding: 20, ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: 'white' }), }}>
                <TextInputC placeholder={'Event title'} />
                <View style={{ paddingVertical: 15 }}>
                    <LocationInput />
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextC text={"Select Date"} font={'Montserrat-Bold'} />
                </View>
                <View style={{ position: 'relative', paddingTop: 17 }}>
                    <View style={styles.calenderCustomHeader}>

                    </View>

                    <Calendar
                        style={{ padding: 0, margin: 0, borderRadius: 25, overflow: 'hidden', }}
                        onDayPress={day => {
                            setSelected(day.dateString);
                        }}
                        markedDates={{
                            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: "red", }
                        }}
                        // customHeader={() =>
                        //     <View style={{height:50,width:'100%',backgroundColor:'white',borderRadius:20,position:'absolute'}}>

                        //     </View>
                        // }
                        theme={{
                            selectedDayBackgroundColor: "#05348E",
                            selectedDayTextColor: "white",
                            textDayFontFamily: 'Montserrat-Medium',
                            textMonthFontFamily: 'Montserrat-Medium',
                            textDayHeaderFontFamily: 'Montserrat-Bold',
                            todayTextColor: "#05348E",
                            dayTextColor: "#05348E",
                            textDisabledColor: "white",
                            calendarBackground: "#A8B8D8",
                            textSectionTitleColor: "#05348E",
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddEvent

