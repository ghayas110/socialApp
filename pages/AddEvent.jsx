import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, Dimensions, TouchableOpacity, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import TextC from '../components/text/text';
import TextInputC from '../components/inputs/text';
import LocationInput from '../components/inputs/location';
import { Calendar } from 'react-native-calendars';
import FeatherIcon from 'react-native-vector-icons/Feather'
import DatePicker from 'react-native-date-picker'
import { useNavigation } from '@react-navigation/native';


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
            top: 5,
            width: '100%',
            backgroundColor: "white",
            position: "absolute",
            zIndex: 1,
            borderRadius: 10,
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            borderColor: '#E6E6E6',
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20
        },
        StartDateWrapper: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10
        },
        EndDateWrapper: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10
        },
        InputTimeStyle: {
            width: 110,
            height: 40,
            paddingHorizontal: 10,
            backgroundColor: '#F5F5F5',
            marginTop: 10,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })

    const [selected, setSelected] = useState('');

    const [startTimeModal, setStartTimeModal] = useState(false);
    const [endTimeModal, setEndTimeModal] = useState(false);


    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const navigation = useNavigation()

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
                    <TouchableOpacity onPress={() => navigation.navigate('EventCreated')} style={styles.NextBtn}><TextC size={12} text={'Create'} font={'Montserrat-SemiBold'} /></TouchableOpacity>
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
                <View style={{ position: 'relative', paddingTop: 10 }}>
                    <Calendar
                        style={{ padding: 0, margin: 0, borderRadius: 25, overflow: 'hidden', }}
                        onDayPress={day => {
                            setSelected(day.dateString);
                        }}
                        markedDates={{
                            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: "red", }
                        }}
                        enableSwipeMonths={true}
                        monthFormat="MMM, yyyy"
                        theme={{
                            arrowColor: "#05348E",
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 5 }}>
                    <View style={styles.StartDateWrapper}>
                        <TextC font={'Montserrat-Bold'} text={'Start Hour'} />
                        <TouchableOpacity onPress={() => setStartTimeModal(true)} style={styles.InputTimeStyle}>
                            <TextC isTime={true} font={'Montserrat-Medium'} text={startTime} size={14} style={{ color: '#666666' }} />
                            <FeatherIcon name='clock' color={'#05348E'} size={20}/>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={startTimeModal}
                            date={startTime}
                            mode="time"
                            onConfirm={(date) => {
                                console.log(date, 'current date:')
                                setStartTimeModal(false)
                                setStartTime(date)
                            }}
                            onCancel={() => {
                                setStartTimeModal(false)
                            }}
                        />
                    </View>
                    <View style={styles.EndDateWrapper}>
                        <TextC font={'Montserrat-Bold'} text={'End Hour'} />
                        <TouchableOpacity onPress={() => setEndTimeModal(true)} style={styles.InputTimeStyle}>
                            <TextC isTime={true} font={'Montserrat-Medium'} text={endTime} size={14} style={{ color: '#666666' }} />
                            <FeatherIcon name='clock' color={'#05348E'} size={20} />
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={endTimeModal}
                            date={endTime}
                            mode="time"
                            onConfirm={(date) => {
                                setEndTimeModal(false)
                                setEndTime(date)
                            }}
                            onCancel={() => {
                                setEndTimeModal(false)
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'column', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 }}>
                    <TextC text={"Cover Image"} font={'Montserrat-Bold'} />
                    <View style={{ paddingTop: 10 }}>
                        <View style={{ height: 80, width: 80, backgroundColor: '#05348E', borderRadius: 80 }}></View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddEvent

