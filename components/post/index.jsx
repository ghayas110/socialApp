import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, View, Dimensions, Image, TouchableOpacity, Pressable } from 'react-native'
import TextC from '../text/text';
import EntypoFont from "react-native-vector-icons/Entypo";
import { useColorScheme } from 'react-native';
import LikeLight from '../../assets/icons/Like.png';
import CommnetLight from '../../assets/icons/Comment.png';
import ShareLight from '../../assets/icons/Share.png';
import { useBottomSheet } from '../bottomSheet/BottomSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { ResponsiveSize, global } from '../constant';
import TimeAgo from '@manu_omg/react-native-timeago';
import * as PostCreationAction from '../../store/actions/PostCreation/index';
import { connect } from 'react-redux';
import Video, { VideoRef } from 'react-native-video';


const Post = ({ userName, profileImage, postId, likeCount, commnetCount, description, content, userLocation, timeAgo, LikeDisLikeFunc }) => {
    console.log(content, 'asdasd')
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const scheme = useColorScheme();
    const videoRef = useRef(null);
    const style = StyleSheet.create({
        PostHeader: {
            flexDirection: 'row',
            paddingVertical: ResponsiveSize(10),
            paddingHorizontal: ResponsiveSize(15),
            width: windowWidth,
        },
        PostProfileImage: {
            height: ResponsiveSize(40),
            width: ResponsiveSize(40),
            borderRadius: ResponsiveSize(40),
            backgroundColor: 'blue',
            marginRight: ResponsiveSize(10),
            overflow: 'hidden',
        },
        PostProfileImageBox: {
            flexDirection: "column",
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        PostActionDot: {
            flexDirection: "row",
            alignItems: 'center',
        },
        ActuallPost: {
            height: windowHeight * 0.40,
            width: windowWidth,
            borderRadius: 0
        },
        postActionSection: {
            flexDirection: 'row',
            paddingVertical: ResponsiveSize(12),
            paddingHorizontal: ResponsiveSize(15),
            width: windowWidth,
        },
        PostDetail: {
            textAlign: "left",
            paddingHorizontal: ResponsiveSize(15),
        },
        commentSectionProfile: {
            height: ResponsiveSize(40),
            width: ResponsiveSize(40),
            backgroundColor: 'red',
            borderRadius: ResponsiveSize(40),
            overflow: 'hidden',
            marginTop: ResponsiveSize(5),
        },
        PostIcons: {
            paddingHorizontal: ResponsiveSize(5)
        },
        PostIcons1: {
            paddingLeft: 0,
            paddingRight: ResponsiveSize(5)
        },
        CommnetAdd: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: ResponsiveSize(20),
            paddingVertical: ResponsiveSize(5)
        },
        CommenterProfile: {
            height: ResponsiveSize(21),
            width: ResponsiveSize(21),
            backgroundColor: 'blue',
            borderRadius: ResponsiveSize(40),
            overflow: 'hidden',
        },
        CommenterProfileImage: {
            height: ResponsiveSize(21),
            width: ResponsiveSize(21)
        },
        PostDate: {
            paddingHorizontal: ResponsiveSize(15),
            paddingVertical: ResponsiveSize(5)
        },
    })
    useEffect(() => {
        return () => { closeBottomSheet() }
    }, [])
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

    const HandleLikes = ({ id }) => {
        const [likedPostId, setLikePostId] = useState([])
        return (
            <Pressable onPress={() => {
                LikeDisLikeFunc({
                    post_id: id
                })
                setLikePostId(prev => [...prev, id])
            }} style={style.PostIcons1}>
                <Image source={LikeLight} style={{ height: ResponsiveSize(22), width: ResponsiveSize(22) }} />
            </Pressable>
        )
    }
    return (
        <>
            <View style={style.PostHeader}>
                <ImageBackground source={{ uri: profileImage }} style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
                <View style={style.PostProfileImageBox}>
                    <TextC size={ResponsiveSize(12)} text={userName} font={'Montserrat-Bold'} />
                    <TextC size={ResponsiveSize(10)} text={userLocation} font={'Montserrat-Medium'} />
                </View>
            </View>

            {content?.length > 1 ?
                <Carousel
                    loop={false}
                    width={windowWidth}
                    height={windowHeight * 0.40}
                    autoPlay={false}
                    data={content}
                    scrollAnimationDuration={1000}
                    renderItem={items => {
                        return (
                            <Image source={{ uri: items.item?.attachment_thumbnail_url }} style={style.ActuallPost} />
                        )
                    }
                    }
                />
                :
                <>
                    {content[0]?.attachment_url.endsWith('.mp4') ?
                        <Video
                            repeat={true}
                            source={{
                                uri: content[0]?.attachment_url,
                            }}
                            ref={videoRef}
                            paused={false}
                        />
                        :
                        <Image source={{ uri: content[0]?.attachment_thumbnail_url }} style={style.ActuallPost} />
                    }
                </>
            }

            <View style={style.postActionSection}>
                <HandleLikes id={postId} />
                <Pressable style={style.PostIcons}>
                    <Image source={CommnetLight} style={{ height: ResponsiveSize(20), width: ResponsiveSize(20) }} />
                </Pressable>
                <Pressable style={style.PostIcons}>
                    <Image source={ShareLight} style={{ height: ResponsiveSize(20), width: ResponsiveSize(20), marginTop: 1 }} />
                </Pressable>
            </View>


            <View style={style.PostDetail}>
                <TextC size={ResponsiveSize(10)} text={`${likeCount} likes`} font={'Montserrat-Medium'} />

                <View style={{ paddingVertical: ResponsiveSize(3) }}>
                    <TextC size={ResponsiveSize(11)} style={{ ...(scheme === 'dark' ? { color: DarkTheme.colors.text } : { color: DefaultTheme.colors.text }) }} text={description} font={'Montserrat-Medium'} />
                </View>

                <TouchableOpacity onPress={handleOpenSheet} style={{ paddingVertical: ResponsiveSize(3) }}>
                    <TextC size={ResponsiveSize(11)} text={`View all ${commnetCount} comments`} font={'Montserrat-Medium'} />
                </TouchableOpacity>
            </View>
            <View style={style.PostDate}>
                <TimeAgo
                    style={{ fontFamily: "Montserrat-Medium", fontSize: ResponsiveSize(10), color: '#DADADA' }}
                    time={timeAgo}
                />
            </View>
        </>
    )
}

function mapStateToProps({ PostCreationReducer }) {
    return { PostCreationReducer };
}
export default connect(mapStateToProps, PostCreationAction)(Post);
