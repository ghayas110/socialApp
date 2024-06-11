import React, { useCallback, useMemo, useRef } from 'react';
import { ImageBackground, StyleSheet, View, Dimensions, Image, TouchableOpacity, Pressable } from 'react-native'
import TextC from '../text/text';
import EntypoFont from "react-native-vector-icons/Entypo";
import { useColorScheme } from 'react-native';
import LikeLight from '../../assets/icons/Like.png';
import CommnetLight from '../../assets/icons/Comment.png';
import ShareLight from '../../assets/icons/Share.png';
// import LikeDark from '../../assets/icons/LikeLight.png';
// import CommnetDark from '../../assets/icons/CommentLight.png';
// import ShareDark from '../../assets/icons/MessangerLight.png';
import { useBottomSheet } from '../bottomSheet/BottomSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';


const Post = ({ userName, profileImage, id, likeCount, commnetCount, description, content, userLocation }) => {
    const scheme = useColorScheme();
    const width = Dimensions.get('window').width;
    const style = StyleSheet.create({
        PostHeader: {
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 20,
            width: width - 40
        },
        PostProfileImage: {
            height: 45,
            width: 45,
            borderRadius: 32,
            backgroundColor: 'blue',
            marginRight: 8,
            overflow: 'hidden',
        },
        PostProfileImageBox: {
            flexDirection: "column",
            alignItems: 'flex-start',
            justifyContent:'center'
        },
        PostActionDot: {
            flexDirection: "row",
            alignItems: 'center',
        },
        ActuallPost: {
            height: 231,
            width: width - 40,
            borderRadius: 30
        },
        postActionSection: {
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: width - 40
        },
        PostDetail: {
            textAlign: "left",
            paddingHorizontal: 20,
        },
        commentSectionProfile: {
            height: 40,
            width: 40,
            backgroundColor: 'red',
            borderRadius: 32,
            overflow: 'hidden',
            marginTop: 6,
        },
        PostIcons: {
            paddingHorizontal: 5
        },
        PostIcons1: {
            paddingLeft: 0,
            paddingRight: 5
        },
        CommnetAdd: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 5
        },
        CommenterProfile: {
            height: 21,
            width: 21,
            backgroundColor: 'blue',
            borderRadius: 32,
            overflow: 'hidden',
        },
        CommenterProfileImage: {
            height: 21,
            width: 21
        },
        PostDate: {
            paddingHorizontal: 20,
            paddingVertical: 5
        }
    })
    const { openBottomSheet, closeBottomSheet } = useBottomSheet();
    const handleOpenSheet = () => {
        openBottomSheet(
            <>
                <ScrollView>
                    <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={style.commentSectionProfile}>
                                    <ImageBackground source={profileImage} style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
                                </View>
                                <View style={{ paddingHorizontal: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextC text={"neo6.1"} font={'Montserrat-Regular'} style={{ includeFontPadding: false }} />
                                        <TextC text={"3d"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", marginLeft: 6 }} />
                                    </View>
                                    <TextC text={"es simplemente el texto de relleno de. es simplemente el texto de relleno de."} font={'Montserrat-Regular'} style={{ includeFontPadding: false, fontSize: 14 }} />
                                    <View style={{ flexDirection: "row", alignItems: 'center', paddingTop: 5 }}>
                                        <TouchableOpacity>
                                            <TextC text={"Reply"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <EntypoFont name={"heart-outlined"} size={20} />
                                <TextC text={"34"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", fontSize: 12 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10, paddingLeft: 70 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={style.commentSectionProfile}>
                                    <ImageBackground source={profileImage} style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
                                </View>
                                <View style={{ paddingHorizontal: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextC text={"neo6.1"} font={'Montserrat-Regular'} style={{ includeFontPadding: false }} />
                                        <TextC text={"3d"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", marginLeft: 6 }} />
                                    </View>
                                    <TextC text={"es simplemente el texto de."} font={'Montserrat-Regular'} style={{ includeFontPadding: false, fontSize: 14 }} />
                                    <View style={{ flexDirection: "row", alignItems: 'center', paddingTop: 5 }}>
                                        <TouchableOpacity>
                                            <TextC text={"Reply"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <EntypoFont name={"heart-outlined"} size={20} />
                                <TextC text={"34"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", fontSize: 12 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10, paddingLeft: 70 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={style.commentSectionProfile}>
                                    <ImageBackground source={profileImage} style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
                                </View>
                                <View style={{ paddingHorizontal: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextC text={"neo6.1"} font={'Montserrat-Regular'} style={{ includeFontPadding: false }} />
                                        <TextC text={"3d"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", marginLeft: 6 }} />
                                    </View>
                                    <TextC text={"es simplemente el texto de."} font={'Montserrat-Regular'} style={{ includeFontPadding: false, fontSize: 14 }} />
                                    <View style={{ flexDirection: "row", alignItems: 'center', paddingTop: 5 }}>
                                        <TouchableOpacity>
                                            <TextC text={"Reply"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <EntypoFont name={"heart-outlined"} size={20} />
                                <TextC text={"34"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", fontSize: 12 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10, paddingLeft: 70 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={style.commentSectionProfile}>
                                    <ImageBackground source={profileImage} style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
                                </View>
                                <View style={{ paddingHorizontal: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextC text={"neo6.1"} font={'Montserrat-Regular'} style={{ includeFontPadding: false }} />
                                        <TextC text={"3d"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", marginLeft: 6 }} />
                                    </View>
                                    <TextC text={"es simplemente el texto de."} font={'Montserrat-Regular'} style={{ includeFontPadding: false, fontSize: 14 }} />
                                    <View style={{ flexDirection: "row", alignItems: 'center', paddingTop: 5 }}>
                                        <TouchableOpacity>
                                            <TextC text={"Reply"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <EntypoFont name={"heart-outlined"} size={20} />
                                <TextC text={"34"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", fontSize: 12 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={style.commentSectionProfile}>
                                    <ImageBackground source={profileImage} style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
                                </View>
                                <View style={{ paddingHorizontal: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextC text={"neo6.1"} font={'Montserrat-Regular'} style={{ includeFontPadding: false }} />
                                        <TextC text={"3d"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", marginLeft: 6 }} />
                                    </View>
                                    <TextC text={"es simplemente el texto de relleno de. es simplemente el texto de relleno de."} font={'Montserrat-Regular'} style={{ includeFontPadding: false, fontSize: 14 }} />
                                    <View style={{ flexDirection: "row", alignItems: 'center', paddingTop: 5 }}>
                                        <TouchableOpacity>
                                            <TextC text={"Reply"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <EntypoFont name={"heart-outlined"} size={20} />
                                <TextC text={"34"} font={'Montserrat-Medium'} style={{ includeFontPadding: false, color: "#999999", fontSize: 12 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </>
            , ["100%", "70%"]
        );
    };
    return (
        <>
            <View style={style.PostHeader}>
                <ImageBackground source={profileImage} style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
                <View style={style.PostProfileImageBox}>
                    <TextC size={13} text={userName} font={'Montserrat-Bold'} />
                    <TextC size={12} text={userLocation} font={'Montserrat-Medium'} />
                </View>
            </View>


            <Image source={content} style={style.ActuallPost} />


            <View style={style.postActionSection}>
                <Pressable style={style.PostIcons1}>
                    <Image source={LikeLight} style={{ height: 25, width: 25 }} />
                </Pressable>
                <Pressable style={style.PostIcons}>
                    <Image source={CommnetLight} style={{ height: 22, width: 22 }} />
                </Pressable>
                <Pressable style={style.PostIcons}>
                    <Image source={ShareLight} style={{ height: 22, width: 22, marginTop: 1 }} />
                </Pressable>
            </View>


            <View style={style.PostDetail}>
                <TextC size={12} text={`${likeCount} likes`} font={'Montserrat-Medium'} />

                <View style={{ paddingVertical: 3 }}>
                    <TextC size={12} style={{...(scheme === 'dark' ? { color: DarkTheme.colors.text } : { color: DefaultTheme.colors.text })}} text={description} font={'Montserrat-Medium'} />
                </View>

                <TouchableOpacity onPress={handleOpenSheet} style={{ paddingVertical: 3 }}>
                    <TextC size={12} text={`View all ${commnetCount} comments`} font={'Montserrat-Medium'} />
                </TouchableOpacity>
            </View>

            <View style={style.CommnetAdd}>
                <View style={style.CommenterProfile}>
                    <ImageBackground source={profileImage} style={style.CommenterProfileImage} resizeMode="cover"></ImageBackground>
                </View>
                <View style={{ paddingHorizontal: 8 }}>
                    <TextC text={'Add a comment'} font={'Montserrat-Medium'} size={11} />
                </View>
            </View>
            <View style={style.PostDate}>
                <TextC text={'2 days ago'} font={'Montserrat-Medium'} size={11} style={{ color: '#DADADA' }} />
            </View>
        </>
    )
}

export default Post;

const styles = StyleSheet.create({})