import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, Dimensions, TouchableOpacity, Image, Text, PermissionsAndroid, ImageBackground, ActivityIndicator, Pressable, useColorScheme, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { ResponsiveSize, global } from '../components/constant';
import TextC from '../components/text/text';
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as UserProfile from "../store/actions/UserProfile/index";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-number-input";
import DatePicker from 'react-native-date-picker';




const EditProfile = ({ GetUserProfileReducer, UpdateProfileData }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const scheme = useColorScheme();
    const navigation = useNavigation()
    const [dialCode, setDialCode] = useState("")
    const [dob, setDob] = useState("")



    useEffect(() => {
        if (GetUserProfileReducer?.data) {
            reset({
                name: GetUserProfileReducer?.data?.user_name,
                phone: GetUserProfileReducer?.data?.phone_number,
                gender: GetUserProfileReducer?.data?.gender,
                dob: GetUserProfileReducer?.data?.date_of_birth,
                description: GetUserProfileReducer?.data?.bio,
            })
            setDialCode(GetUserProfileReducer?.data?.country_code)
        }
    }, [])

    const schema = yup.object().shape({
        name: yup
            .string()
            .required('name is required'),
        phone: yup
            .string()
            .required('phone is required'),
        gender: yup
            .string()
            .required('gender is required'),
        dob: yup
            .string()
            .required('dob is required'),
        description: yup
            .string()
            .required('description is required'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        getValues
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            phone: '',
            gender: '',
            dob: '',
            description: '',
        },
    });
    const styles = StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            width: windowWidth,
            paddingHorizontal: ResponsiveSize(15),
            paddingVertical: ResponsiveSize(15),
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
            backgroundColor: global.secondaryColor,
            width: windowWidth * 0.6,
            paddingVertical: ResponsiveSize(15),
            borderRadius: ResponsiveSize(100),
            alignItems: 'center',
            justifyContent: 'center',
        },
        bodyWrapper: {
            paddingHorizontal: ResponsiveSize(15),
        },
        updateImage: {
            paddingVertical: ResponsiveSize(30),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        ProfileImage: {
            height: ResponsiveSize(70),
            width: ResponsiveSize(70),
            borderRadius: ResponsiveSize(70),
            backgroundColor: 'red'
        },
        bodyInitial: {
            paddingHorizontal: ResponsiveSize(15),
            borderTopWidth: 1,
            borderTopColor: global.description,
            paddingBottom: ResponsiveSize(30)
        },
        TextFeidContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        TextFeidContainerLeft: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: windowWidth * 0.3,
            height: windowHeight * 0.07,
        },
        TextFeidContainerRight: {
            borderBottomWidth: 1,
            borderBottomColor: global.description,
            paddingHorizontal: ResponsiveSize(10),
            width: windowWidth * 0.6,
            fontFamily: 'Montserrat-Medium',
            height: windowHeight * 0.07,
            flexDirection: 'row',
            alignItems: 'center',
            color:'black'
        },
        TextFeidContainerRight1: {
            borderBottomWidth: 1,
            borderBottomColor: global.description,
            paddingHorizontal: ResponsiveSize(10),
            width: windowWidth * 0.6,
            fontFamily: 'Montserrat-Medium',
            color:'black'
        }
    })
    const onSubmit = (data) => {
        const LoadUpdate = UpdateProfileData({
            user_name: data.name,
            phone_number: data.phone,
            gender: data.gender,
            date_of_birth: data.dob,
            bio: data.description,
            country_code: dialCode
        })
        console.log(LoadUpdate)
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
            <ScrollView style={{ flexGrow: 1, ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: 'white' }), }}>
                <View style={styles.wrapper}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.logoSide1}>
                        <AntDesign name='left' color={"#05348E"} size={ResponsiveSize(18)} />
                    </Pressable>
                    <View style={styles.logoSide2}>
                        <TextC size={ResponsiveSize(13)} font={'Montserrat-Bold'} text={"Update Profile"} />
                    </View>
                    <View style={styles.logoSide3}></View>
                </View>
                <View style={styles.bodyWrapper}>
                    <View style={styles.updateImage}>
                        <Image style={styles.ProfileImage} source={GetUserProfileReducer?.data?.profile_picture_url == "" ? require('../assets/icons/avatar.png') : { uri: GetUserProfileReducer?.data?.profile_picture_url }} />
                        <TouchableOpacity style={{ paddingTop: ResponsiveSize(10) }}>
                            <TextC size={ResponsiveSize(12)} style={{ color: global.secondaryColor }} text={"Update Profile Picture"} font={'Montserrat-Bold'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bodyInitial}>
                    <View style={styles.TextFeidContainer}>
                        <View style={styles.TextFeidContainerLeft}>
                            <TextC size={ResponsiveSize(13)} text={"Name"} font={'Montserrat-Medium'} />
                        </View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput onChangeText={onChange} value={value} style={styles.TextFeidContainerRight} />
                            )}
                            name="name"
                        />
                    </View>
                    <View style={styles.TextFeidContainer}>
                        <View style={styles.TextFeidContainerLeft}>
                            <TextC size={ResponsiveSize(13)} text={"Phone"} font={'Montserrat-Medium'} />
                        </View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <PhoneInput
                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: global.description, width: windowWidth * 0.6, }}
                                        flagButtonStyle={{ height: windowHeight * 0.07, width: ResponsiveSize(45) }}
                                        textContainerStyle={{ padding: 0, height: windowHeight * 0.07, backgroundColor: 'white', paddingHorizontal: 0 }}
                                        codeTextStyle={{ display: 'none' }}
                                        textInputStyle={{ height: windowHeight * 0.07,fontFamily:'Montserrat-Medium' }}
                                        disableArrowIcon={true}
                                        defaultCode={GetUserProfileReducer?.data?.country_code || 'US'}
                                        defaultValue={GetUserProfileReducer?.data?.phone_number}
                                        onChangeFormattedText={(text) => { onChange(text) }}
                                        onChangeCountry={(text) => { setDialCode(text.cca2) }}
                                    />
                                )
                            }}
                            name="phone"
                        />

                    </View>
                    <View style={styles.TextFeidContainer}>
                        <View style={styles.TextFeidContainerLeft}>
                            <TextC size={ResponsiveSize(13)} text={"Gender"} font={'Montserrat-Medium'} />
                        </View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput onChangeText={onChange} value={value} style={styles.TextFeidContainerRight} />
                            )}
                            name="gender"
                        />
                    </View>
                    <View style={styles.TextFeidContainer}>
                        <View style={styles.TextFeidContainerLeft}>
                            <TextC size={ResponsiveSize(13)} text={"Date of birth"} font={'Montserrat-Medium'} />
                        </View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <TouchableOpacity onPress={() => setDob(true)} style={styles.TextFeidContainerRight}>
                                        <TextC size={ResponsiveSize(13)} style={{color:'black'}} text={value} font={'Montserrat-Medium'} />
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        open={dob}
                                        date={new Date(GetUserProfileReducer?.data?.date_of_birth)}
                                        mode="date"
                                        onConfirm={(date) => {
                                            setDob(false)
                                            onChange(date)
                                        }}
                                        onCancel={() => {
                                            setDob(false)
                                        }}

                                    />
                                </>
                            )}
                            name="dob"
                        />
                    </View>
                    <View style={styles.TextFeidContainer}>
                        <View style={styles.TextFeidContainerLeft}>
                            <TextC size={ResponsiveSize(13)} text={"Description"} font={'Montserrat-Medium'} />
                        </View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput onChangeText={onChange} value={value} style={styles.TextFeidContainerRight1} multiline={true} numberOfLines={5} />
                            )}
                            name="description"
                        />
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: ResponsiveSize(30) }}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.NextBtn}>
                            <TextC size={15} text={'Update'} font={'Montserrat-Bold'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

function mapStateToProps({ GetUserProfileReducer }) {
    return { GetUserProfileReducer };
}
export default connect(mapStateToProps, UserProfile)(EditProfile);