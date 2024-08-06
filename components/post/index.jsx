import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, View, Dimensions, Image, TouchableOpacity, Pressable, TextInput, ActivityIndicator, TouchableWithoutFeedback, ScrollView, Platform, Keyboard } from 'react-native'
import TextC from '../text/text';
import CommnetLight from '../../assets/icons/Comment.png';
import ShareLight from '../../assets/icons/Share.png';
import Carousel from 'react-native-reanimated-carousel';
import { ResponsiveSize, global } from '../constant';
import TimeAgo from '@manu_omg/react-native-timeago';
import * as PostCreationAction from '../../store/actions/PostCreation/index';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import ReadMore from '@fawazahmed/react-native-read-more';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Post = ({ userName, profileImage, selfLiked, postId, likeCount, commnetCount, description, content, userLocation, timeAgo, LikeFunc, DisLikeFunc, LoadComments, AddComment, comments_show_flag, allow_comments_flag, likes_show_flag }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [liked, setLike] = useState(selfLiked);
    const [likeCountPre, setLikeCountPre] = useState(likeCount)
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
        },
        playPaused: {
            position: 'absolute',
            top: 0,
            left: 0,
            borderWidth: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth,
            height: windowHeight * 0.43,
            flexDirection: 'row',
        },
        commentAdd: {
            position: 'absolute',
            bottom: 0,
            width: windowWidth,
        },
        commentInput: {
            backgroundColor: "#EEEEEE",
            borderTopColor: '#cccccc',
            borderTopWidth: 1,
            paddingLeft: ResponsiveSize(15),
            paddingVertical: ResponsiveSize(10),
            fontFamily: 'Montserrat-Medium',
        },
        sendCommentBtn: {
            backgroundColor: global.secondaryColor,
            position: 'absolute',
            right: ResponsiveSize(10),
            top: ResponsiveSize(7),
            height: ResponsiveSize(30),
            width: ResponsiveSize(30),
            borderRadius: ResponsiveSize(30),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: ResponsiveSize(15),
            paddingRight: ResponsiveSize(2),
            paddingTop: ResponsiveSize(2),
        },
        modalTopLayer: {
            height: windowHeight * 0.6,
            width: windowWidth,
            paddingHorizontal: ResponsiveSize(15),
            paddingTop: 10,
            position: 'absolute',
            backgroundColor: 'white',
            bottom: ResponsiveSize(0),
            borderTopLeftRadius: ResponsiveSize(15),
            borderTopRightRadius: ResponsiveSize(15),
            overflow: 'hidden'
        },
        TopIndicator: {
            width: windowWidth - ResponsiveSize(30),
            paddingVertical: ResponsiveSize(2),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        modalIndicator: {
            width: ResponsiveSize(30),
            paddingVertical: ResponsiveSize(2),
            borderRadius: ResponsiveSize(20),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEEEEE',
        }
    })
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
    const [paused, setPause] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        openCommentSection()
        setModalVisible(!isModalVisible);
    };



    const [commentLoading, setCommentLoading] = useState(false)
    const [commentCrash, setCommentCrash] = useState(false)
    const [commentList, setCommentList] = useState()


    const openCommentSection = async () => {
        setCommentLoading(true)
        setCommentCrash(false)
        const result = await LoadComments({
            post_id: postId,
            page: 1,
            limit: 100
        })
        if (result?.comments) {
            setCommentList(result?.comments)
            setCommentLoading(false)
        }
        else {
            setCommentCrash(true)
            setCommentLoading(false)
        }
    }
    return (
        <>
            <View style={style.PostHeader}>
                <ImageBackground source={
                    profileImage == ''
                        ? require('../../assets/icons/avatar.png')
                        : { uri: profileImage }}

                    style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
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
                            <>
                                {/* <Image source={{ uri: .attachment_thumbnail_url }} style={style.ActuallPost} /> */}
                                {items.item?.attachment_url.endsWith('.mp4') ?
                                    <View style={{ height: windowHeight * 0.40, width: windowWidth, backgroundColor: 'red', backgroundColor: global.description }}>
                                        <Pressable
                                            onPress={() => setPause(!paused)}
                                            style={{ position: 'relative' }}>
                                            <Video
                                                repeat={true}
                                                source={{
                                                    uri: items.item?.attachment_url,
                                                }}
                                                ref={videoRef}
                                                paused={paused}
                                                style={{ height: windowHeight * 0.40, width: windowWidth }}
                                            />
                                            {paused && (
                                                <View style={style.playPaused}>
                                                    <Entypo
                                                        size={ResponsiveSize(50)}
                                                        name="controller-play"
                                                        color={'white'}
                                                    />
                                                </View>
                                            )}
                                        </Pressable>
                                    </View>
                                    :
                                    <Image source={{ uri: items.item?.attachment_thumbnail_url }} style={style.ActuallPost} />
                                }
                            </>
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
                {allow_comments_flag == "Y" &&
                    <Pressable onPress={() => toggleModal()} style={style.PostIcons}>
                        <Image source={CommnetLight} style={{ height: ResponsiveSize(20), width: ResponsiveSize(20) }} />
                    </Pressable>
                }
                <Pressable style={style.PostIcons}>
                    <Image source={ShareLight} style={{ height: ResponsiveSize(20), width: ResponsiveSize(20), marginTop: 1 }} />
                </Pressable>
            </View>
            <View style={style.PostDetail}>
                {likes_show_flag == "Y" &&
                    <TextC size={ResponsiveSize(10)} text={`${likeCountPre} likes`} font={'Montserrat-Medium'} />
                }
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
                    : ""
                }
                {allow_comments_flag == "Y" ?
                    <TouchableOpacity style={{ paddingVertical: ResponsiveSize(3) }}>
                        {comments_show_flag == "Y" ?
                            <TextC size={ResponsiveSize(11)} text={`View all ${commnetCount} comments`} font={'Montserrat-Medium'} />
                            :
                            <TextC size={ResponsiveSize(11)} text={`View all comments`} font={'Montserrat-Medium'} />
                        }
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ paddingTop: ResponsiveSize(3) }}>
                        <TextC size={ResponsiveSize(10)} text={'Comments are turned off'} font={'Montserrat-Medium'} />
                    </TouchableOpacity>
                }
            </View>
            <View style={style.PostDate}>
                <TimeAgo
                    style={{ fontFamily: "Montserrat-Medium", fontSize: ResponsiveSize(10), color: '#DADADA' }}
                    time={timeAgo}
                />
            </View>



            <Modal
                isVisible={isModalVisible}
                style={{ margin: 0 }}
                animationIn={"bounceInUp"}
                avoidKeyboard={true}
                onBackdropPress={() => setModalVisible(false)}
                statusBarTranslucent={true}
                propagateSwipe={true}
                swipeDirection="down"
                onSwipeComplete={toggleModal}
            >
                <View style={style.modalTopLayer}>
                    <View style={style.TopIndicator}>
                        <View style={style.modalIndicator}></View>
                        <TextC text={"Comments"} style={{ color: global.black, paddingTop: ResponsiveSize(3) }} font={'Montserrat-Bold'} size={ResponsiveSize(12)} />
                    </View>
                    {commentLoading ? (
                        <View style={{ paddingTop: ResponsiveSize(50), width: windowWidth - ResponsiveSize(30), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={global.primaryColor} />
                        </View>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: ResponsiveSize(50), paddingTop: ResponsiveSize(10) }}>
                            {commentList !== null && commentList !== undefined && commentList !== "" && commentList.length > 0 ? (
                                commentList.map(data => (
                                    <View key={data?.post_id} style={{ flexDirection: 'row', alignItems: 'flex-start', width: commentSectioLength, marginBottom: ResponsiveSize(15) }}>
                                        <View style={style.commentSectionProfile}>
                                            <ImageBackground
                                                source={data?.user?.profile_picture_url === '' ? require('../../assets/icons/avatar.png') : { uri: data?.user?.profile_picture_url }}
                                                style={style.PostProfileImage2}
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View style={{ paddingHorizontal: ResponsiveSize(8), paddingTop: ResponsiveSize(5), width: commentSectioLength * 0.9 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: ResponsiveSize(3) }}>
                                                <TextC text={data?.user?.user_name} font={'Montserrat-SemiBold'} size={ResponsiveSize(11)} style={{ includeFontPadding: false }} />
                                                <TextC text={"3d"} font={'Montserrat-Medium'} size={ResponsiveSize(9)} style={{ includeFontPadding: false, color: "#999999", marginLeft: 6 }} />
                                            </View>
                                            <TextC text={data?.comment} font={'Montserrat-Regular'} style={{ includeFontPadding: false, fontSize: ResponsiveSize(10), color: global.black, paddingVertical: ResponsiveSize(2) }} />
                                            <View style={{ flexDirection: "row", alignItems: 'center', paddingTop: 5 }}>
                                                <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }}>
                                                    <AntDesign name={'heart'} color={global.red} size={ResponsiveSize(11)} />
                                                    <TextC text={"322"} size={ResponsiveSize(10)} font={'Montserrat-Medium'} style={{ color: "#999999", paddingLeft: ResponsiveSize(5) }} />
                                                </TouchableOpacity>

                                                <TextC text={"|"} size={ResponsiveSize(12)} font={'Montserrat-Medium'} style={{ color: "#999999", paddingHorizontal: ResponsiveSize(5) }} />

                                                <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }}>
                                                    <MaterialCommunityIcons name={'comment-outline'} color={global.black} size={ResponsiveSize(11)} />
                                                    <TextC text={"23"} size={ResponsiveSize(10)} font={'Montserrat-Medium'} style={{ color: "#999999", paddingLeft: ResponsiveSize(5) }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                commentCrash ? (
                                    <View style={{ paddingTop: ResponsiveSize(50), width: windowWidth - ResponsiveSize(30), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ paddingBottom: ResponsiveSize(5), paddingHorizontal: ResponsiveSize(50) }}>
                                            <Image style={{ height: ResponsiveSize(80), width: ResponsiveSize(80) }} source={require('../../assets/icons/something-went-wrong.png')} />
                                        </View>
                                        <TextC text={"Something went wrong"} font={'Montserrat-Bold'} size={ResponsiveSize(15)} />
                                        <TextC style={{ textAlign: 'center', color: global?.black }} text={"Brace yourself till we get the error fixed"} font={'Montserrat-Medium'} size={ResponsiveSize(10)} />
                                    </View>
                                ) : (
                                    <View style={{ paddingTop: ResponsiveSize(50), width: windowWidth - ResponsiveSize(30), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <TextC text={'No Comments Found'} font={'Montserrat-Medium'} />
                                    </View>
                                )
                            )}
                        </ScrollView>
                    )}
                    <View style={style.commentAdd}>
                        <View style={{ width: windowWidth, position: 'relative' }}>
                            <TextInput onChangeText={(e) => setCommentInfo(e)} placeholder='Comment here' style={style.commentInput} />
                            <TouchableOpacity style={style.sendCommentBtn}>
                                <Feather name='send' color={'white'} size={ResponsiveSize(15)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

function mapStateToProps({ PostCreationReducer }) {
    return { PostCreationReducer };
}
export default connect(mapStateToProps, PostCreationAction)(Post);
