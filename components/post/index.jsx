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
import ReadMore from '@fawazahmed/react-native-read-more';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Post = ({ userName, profileImage, selfLiked, postId, likeCount, commnetCount, description, content, userLocation, timeAgo, LikeFunc, DisLikeFunc }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [liked, setLike] = useState(selfLiked);
    const [likeCountPre, setLikeCountPre] = useState(likeCount)
    const scheme = useColorScheme();
    const videoRef = useRef(null);
    const commentSectioLength = windowWidth - ResponsiveSize(30)



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
            backgroundColor: global.description,
            marginRight: ResponsiveSize(10),
            overflow: 'hidden',
        },
        PostProfileImage2: {
            height: commentSectioLength * 0.1,
            width: commentSectioLength * 0.1,
            borderRadius: commentSectioLength * 0.1,
            backgroundColor: global.description,
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
            height: commentSectioLength * 0.1,
            width: commentSectioLength * 0.1,
            backgroundColor: 'red',
            borderRadius: commentSectioLength * 0.1,
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
        DescriptionStyle: {
            fontFamily: 'Montserrat-Medium',
            fontSize: ResponsiveSize(10),
            marginTop: ResponsiveSize(5),
            color: global.black,
        },
        commentKeyBoard: {
            height: ResponsiveSize(90),
            width: windowWidth,
            backgroundColor: global.black,
            position: 'absolute',
            bottom: ResponsiveSize(10)
        }
    })
    useEffect(() => {
        return () => { closeBottomSheet() }
    }, [])
    const { openBottomSheet, closeBottomSheet } = useBottomSheet();

    const handleOpenSheet = () => {
        openBottomSheet(
            <>
                <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: global.white }}>
                    <View style={{ flex: 1, paddingHorizontal: ResponsiveSize(15), paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: commentSectioLength }}>

                            <View style={style.commentSectionProfile}>
                                <ImageBackground source={profileImage} style={style.PostProfileImage2} resizeMode="cover"></ImageBackground>
                            </View>

                            <View style={{ paddingHorizontal: ResponsiveSize(8), paddingTop: ResponsiveSize(5), width: commentSectioLength * 0.9 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: ResponsiveSize(3) }}>
                                    <TextC text={"neo6.1"} font={'Montserrat-SemiBold'} size={ResponsiveSize(12)} style={{ includeFontPadding: false }} />
                                    <TextC text={"3d"} font={'Montserrat-Medium'} size={ResponsiveSize(10)} style={{ includeFontPadding: false, color: "#999999", marginLeft: 6 }} />
                                </View>
                                <TextC text={"es simplemente el texto de relleno de. es simplemente el texto de relleno de. es simplemente el texto de relleno de. es simplemente el texto de relleno de."} font={'Montserrat-Regular'} style={{ includeFontPadding: false, fontSize: ResponsiveSize(11), color: global.black }} />

                                <View style={{ flexDirection: "row", alignItems: 'center', paddingTop: 5 }}>
                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }}>
                                        <AntDesign
                                            name={'heart'}
                                            color={global.red}
                                            size={ResponsiveSize(15)}
                                        />
                                        <TextC text={"322"} size={ResponsiveSize(10)} font={'Montserrat-Medium'} style={{ color: "#999999", paddingLeft: ResponsiveSize(5) }} />
                                    </TouchableOpacity>

                                    <TextC text={"|"} size={ResponsiveSize(12)} font={'Montserrat-Medium'} style={{ color: "#999999", paddingHorizontal: ResponsiveSize(5) }} />

                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }}>
                                        <MaterialCommunityIcons
                                            name={'comment-outline'}
                                            color={global.black}
                                            size={ResponsiveSize(15)}
                                        />
                                        <TextC text={"23"} size={ResponsiveSize(10)} font={'Montserrat-Medium'} style={{ color: "#999999", paddingLeft: ResponsiveSize(5) }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>


                    {/* <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10, paddingLeft: 70 }}>
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
                    </View> */}
                </ScrollView>
            </>
            , ["100%", "60%"]
        );
    };
    const handleLike = async () => {
        try {
            setLike(true);
            setLikeCountPre(prev => prev + 1);
            await LikeFunc({ post_id: postId });
        } catch (error) {
            console.error('Error liking the post:', error);
        }
    };
    const handleDislike = async () => {
        try {
            setLike(false);
            setLikeCountPre(prev => prev - 1);
            await DisLikeFunc({ post_id: postId });
        } catch (error) {
            console.error('Error disliking the post:', error);
        }
    };
    console.log(description, 'asdasd')
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
                        <View style={{ height: windowHeight * 0.40, width: windowWidth, backgroundColor: 'red', backgroundColor: global.description }}>
                            <Video
                                repeat={true}
                                source={{
                                    uri: content[0]?.attachment_url,
                                }}
                                ref={videoRef}
                                paused={false}
                                style={{ height: windowHeight * 0.40, width: windowWidth }}
                            />
                        </View>
                        :
                        <Image source={{ uri: content[0]?.attachment_thumbnail_url }} style={style.ActuallPost} />
                    }
                </>
            }

            <View style={style.postActionSection}>
                <Pressable onPress={liked ? handleDislike : handleLike} style={style.PostIcons1}>
                    <AntDesign
                        name={liked ? 'heart' : 'hearto'}
                        color={liked ? global.red : global.primaryColor}
                        size={ResponsiveSize(22)}
                    />
                </Pressable>
                <Pressable onPress={handleOpenSheet} style={style.PostIcons}>
                    <Image source={CommnetLight} style={{ height: ResponsiveSize(20), width: ResponsiveSize(20) }} />
                </Pressable>
                <Pressable style={style.PostIcons}>
                    <Image source={ShareLight} style={{ height: ResponsiveSize(20), width: ResponsiveSize(20), marginTop: 1 }} />
                </Pressable>
            </View>


            <View style={style.PostDetail}>
                <TextC size={ResponsiveSize(10)} text={`${likeCountPre} likes`} font={'Montserrat-Medium'} />

                {description !== '' ?
                    <View style={{ paddingVertical: ResponsiveSize(3) }}>
                        <ReadMore
                            seeLessStyle={{
                                fontFamily: 'Montserrat-Bold',
                                color: global.primaryColor,
                            }}
                            seeMoreStyle={{
                                fontFamily: 'Montserrat-Bold',
                                color: global.primaryColor,
                            }}
                            numberOfLines={2}
                            style={style.DescriptionStyle}>
                            {description}
                        </ReadMore>
                    </View>
                    :""
                }
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
