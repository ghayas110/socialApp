import { SafeAreaView, StyleSheet, StatusBar, View, Modal, Text, Pressable, Dimensions, PermissionsAndroid, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonC from '../components/button/index';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AntDedign from "react-native-vector-icons/AntDesign"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as UserRegisterAction from "../store/actions/UserRegister/index";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextC from '../components/text/text';
import { ResposiveSize, global } from '../components/constant';
import { useToast } from '../components/Toast/ToastContext';
import DatePicker from 'react-native-date-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useBottomSheet } from '../components/bottomSheet/BottomSheet';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as Progress from 'react-native-progress';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({ insertUser, RegisterUserReducer, getAllAirline }) => {
    const { showToast } = useToast();
    const navigation = useNavigation()
    const [dob, setDob] = useState(false)
    const [expiry, setExpiry] = useState(false)
    const { openBottomSheet, closeBottomSheet } = useBottomSheet();
    const [documentImage, setDocumentImage] = useState('')
    const [documentName, setDocumentName] = useState('')
    const [isImageSave, setIsImageSave] = useState(true)
    const [isImageSaveExist, setIsImageSaveExist] = useState(false)

    const schema = yup.object().shape({
        dob: yup
            .string()
            .required('Date of birth is required'),
        expiryDate: yup
            .string()
            .required('Expiry date is required'),
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dob: '',
            expiryDate: '',
        },
    });
    const onSubmit = async (data) => {
        console.log(data)
        if (!documentImage == "") {
            try {
                await AsyncStorage.removeItem('email');
                await AsyncStorage.setItem('email', data.email);
                const Responce = await insertUser({
                    user_name: data?.userName,
                    email: data?.email,
                    password: data?.password,
                    user_type: data?.position,
                    airline: data?.airline
                })
                if (Responce == 'Signup successfull') {
                    navigation.navigate('Otp')
                }
                else if (Responce == 'Email already exists') {
                    showToast({
                        title: "Email already exists",
                        message: "Email already exists.Please try again.",
                        iconColor: "red",
                        iconName: "mail",
                        bg: "#fff2f2"
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }
        else {
            setIsImageSaveExist(true)
        }
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: global.primaryColor
        },
        bodyWrapper: {
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: ResposiveSize(15)
        },
        header: {
            paddingTop: windowHeight * 0.06,
            width: windowWidth - ResposiveSize(30),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        titleWrapper: {
            width: windowWidth - ResposiveSize(30),
            paddingTop: windowHeight * 0.05
        },
        titleTextFirst: {
            fontFamily: 'Montserrat-ExtraBold',
            fontSize: ResposiveSize(50),
            color: global.white,
            lineHeight: ResposiveSize(50)
        },
        titleTextSecond: {
            fontFamily: 'Montserrat-ExtraBold',
            fontSize: ResposiveSize(50),
            color: global.secondaryColor,
            lineHeight: ResposiveSize(50)
        },
        secondInputWrapper: {
            paddingTop: windowHeight * 0.02
        },
        termsWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        haveAccoundWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: windowHeight * 0.01,
            paddingBottom: windowHeight * 0.05,
        },
        submitBtnWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: ResposiveSize(15),
            paddingBottom: ResposiveSize(8)
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalView: {
            width: windowWidth * 0.8,
            height: windowHeight * 0.56,
            backgroundColor: '#7891C2',
            borderRadius: ResposiveSize(20),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            paddingHorizontal: ResposiveSize(20),
            paddingVertical: ResposiveSize(20),
        },
        modalTextHeading: {
            fontFamily: 'Montserrat-Bold',
            fontSize: ResposiveSize(13),
            color: global.white,
        },
        dateInput: {
            fontSize: ResposiveSize(12),
            paddingHorizontal: global.inputPaddingH,
            backgroundColor: '#FFFFFF',
            width: global.inputWidth,
            fontFamily: 'Montserrat-Regular',
            height: global.inputHeight,
            color: global.black,
            borderRadius: ResposiveSize(30),
            borderWidth: ResposiveSize(1),
            flexDirection: 'row',
            alignItems: 'center'
        },
        dateInputSelect: {
            fontSize: ResposiveSize(12),
            paddingHorizontal: global.inputPaddingH,
            backgroundColor: '#FFFFFF',
            width: global.inputWidth,
            fontFamily: 'Montserrat-Regular',
            height: ResposiveSize(180),
            color: global.black,
            borderRadius: ResposiveSize(30),
            borderWidth: ResposiveSize(1),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        dropdownButtonTxtStyle: {
            flex: 1,
            fontSize: ResposiveSize(12),
            fontWeight: '500',
            fontFamily: 'Montserrat-Regular'
        },
        dateInputImage: {
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: ResposiveSize(12),
            paddingHorizontal: ResposiveSize(5),
            backgroundColor: '#FFFFFF',
            width: global.inputWidth,
            fontFamily: 'Montserrat-Regular',
            height: ResposiveSize(70),
            color: global.black,
            borderRadius: ResposiveSize(30),
            borderWidth: 0,
        },
        dateImageUpload: {
            height: ResposiveSize(60),
            width: ResposiveSize(70),
        },
        ImageLoader: {
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: ResposiveSize(5)
        }
    })
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                handleOpenSheet()
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const openPhotoLibrary = async () => {
        setIsImageSave(true)
        const result = await launchImageLibrary();
        if (result?.assets.length > 0) {
            setDocumentImage(result?.assets[0]?.uri)
            setDocumentName(result?.assets[0]?.fileName)
            setTimeout(() => {
                setIsImageSave(false)
            }, 1500);
            closeBottomSheet()
        }
    }
    const openMobileCamera = async () => {
        setIsImageSave(true)
        const result = await launchCamera();
        if (result?.assets.length > 0) {
            setDocumentImage(result?.assets[0]?.uri)
            setDocumentName(result?.assets[0]?.fileName)
            setTimeout(() => {
                setIsImageSave(false)
            }, 1500);
            closeBottomSheet()
        }
    }
    const handleOpenSheet = () => {
        openBottomSheet(
            <>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: ResposiveSize(15) }}>
                    <ButtonC onPress={openMobileCamera} BtnStyle={{ width: windowWidth * 0.45 }} TextStyle={{ color: global.white }} bgColor={global.primaryColor} style={styles.openCamera} title={"Open camera"}></ButtonC>
                    <ButtonC onPress={openPhotoLibrary} BtnStyle={{ width: windowWidth * 0.45 }} TextStyle={{ color: global.white }} bgColor={global.primaryColor} style={styles.openLibrary} title={"Open library"}></ButtonC>
                </View>
            </>
            , ["15%"]
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar backgroundColor={global.primaryColor} />
                <View style={styles.bodyWrapper}>
                    <View style={styles.header}>
                        <Pressable onPress={navigation.goBack}>
                            <AntDedign name='left' size={ResposiveSize(20)} color={global.secondaryColor} />
                        </Pressable>
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleTextFirst}>Just, <Text style={styles.titleTextSecond}>few</Text></Text>
                        <Text style={styles.titleTextSecond}>step more</Text>
                    </View>
                    <View style={styles.secondInputWrapper}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ paddingHorizontal: ResposiveSize(12) }}>
                                            <TextC text={"Date of birth"} size={ResposiveSize(11)} font={'Montserrat-Regular'} style={{ color: 'white', paddingBottom: ResposiveSize(4) }} />
                                        </View>
                                        <TouchableOpacity onPress={() => setDob(true)} style={{ ...styles.dateInput, ...(errors?.dob?.message === undefined ? { borderColor: global.white } : { borderColor: 'red' }) }}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(value && value.toLocaleString().split(",")[0]) || "Date of birth"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <DatePicker
                                        modal
                                        open={dob}
                                        date={new Date()}
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



                    <View style={styles.secondInputWrapper}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ paddingHorizontal: ResposiveSize(12) }}>
                                <TextC text={"Employee card Image"} size={ResposiveSize(11)} font={'Montserrat-Regular'} style={{ color: 'white', paddingBottom: ResposiveSize(4) }} />
                            </View>
                            {documentImage == "" ?
                                <TouchableOpacity onPress={requestCameraPermission} style={styles.dateInputSelect}>
                                    <Feather name='upload-cloud' size={ResposiveSize(50)} color={global.primaryColor} />
                                    <TextC text={'Upload employee card Image'} style={{ color: global.primaryColor }} size={ResposiveSize(11)} font={"Montserrat-Regular"} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={requestCameraPermission} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.dateInputImage}>
                                        <ImageBackground src={documentImage} borderRadius={ResposiveSize(25)} style={styles.dateImageUpload}></ImageBackground>
                                        <View style={styles.ImageLoader}>
                                            <TextC text={documentName} style={{ color: global.secondaryColor, paddingBottom: ResposiveSize(5), width: 180 }} font={'Montserrat-Medium'} ellipsizeMode={"tail"} numberOfLines={1} />
                                            <Progress.Bar progress={10} color={global.secondaryColor} animated={true} indeterminate={isImageSave} indeterminateAnimationDuration={1000} width={ResposiveSize(180)} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>


                    {!documentImage == "" &&
                        <View style={styles.secondInputWrapper}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ paddingHorizontal: ResposiveSize(12) }}>
                                                <TextC text={"Expiry Date"} size={ResposiveSize(11)} font={'Montserrat-Regular'} style={{ color: 'white', paddingBottom: ResposiveSize(4) }} />
                                            </View>
                                            <TouchableOpacity onPress={() => setExpiry(true)} style={{ ...styles.dateInput, ...(errors?.expiryDate?.message === undefined ? { borderColor: global.white } : { borderColor: 'red' }) }}>
                                                <Text style={styles.dropdownButtonTxtStyle}>
                                                    {(value && value.toLocaleString().split(",")[0]) || "Expiry Date"}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <DatePicker
                                            modal
                                            open={expiry}
                                            date={new Date()}
                                            mode="date"
                                            onConfirm={(date) => {
                                                console.log(date, 'expiry Date')
                                                setExpiry(false)
                                                onChange(date)
                                            }}
                                            onCancel={() => {
                                                setExpiry(false)
                                            }}
                                        />
                                    </>
                                )}
                                name="expiryDate"
                            />
                        </View>}
                    <View style={styles.submitBtnWrapper}>
                        <ButtonC title="Sign Up" bgColor={global.secondaryColor} disabled={RegisterUserReducer?.loading} loading={RegisterUserReducer?.loading} TextStyle={{ color: global.primaryColorDark }} onPress={handleSubmit(onSubmit)} />
                    </View>
                    <View style={styles.haveAccoundWrapper}>
                        <TextC text={'Already have an account?'} style={{ color: global.white }} size={ResposiveSize(11)} font={"Montserrat-Regular"} /><TouchableOpacity onPress={() => navigation.navigate('Login')}><TextC text={'Login'} style={{ color: global.secondaryColor, marginLeft: ResposiveSize(5) }} size={ResposiveSize(11)} font={"Montserrat-Bold"} /></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

function mapStateToProps({ RegisterUserReducer }) {
    return { RegisterUserReducer };
}
export default connect(mapStateToProps, UserRegisterAction)(SignUp);
























// const onSubmit = async (data) => {
//     try {
//       await AsyncStorage.removeItem('email');
//       await AsyncStorage.setItem('email', data.email);
//       const Responce = await insertUser({
//         user_name: data?.userName,
//         email: data?.email,
//         password: data?.password,
//         user_type: data?.position,
//         airline: data?.airline
//       })
//       if (Responce == 'Signup successfull') {
//         navigation.navigate('Otp')
//       }
//       else if (Responce == 'Email already exists') {
//         showToast({
//           title: "Email already exists",
//           message: "Email already exists.Please try again.",
//           iconColor: "red",
//           iconName: "mail",
//           bg: "#fff2f2"
//         })
//       }
//     } catch (e) {
//       console.log(e)
//     }
//   };