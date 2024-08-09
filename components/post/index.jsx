import ReadMore from '@fawazahmed/react-native-read-more';
import TimeAgo from '@manu_omg/react-native-timeago';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import Carousel from 'react-native-reanimated-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import CommnetLight from '../../assets/icons/Comment.png';
import ShareLight from '../../assets/icons/Share.png';
import * as PostCreationAction from '../../store/actions/PostCreation/index';
import { ResponsiveSize, global } from '../constant';
import TextC from '../text/text';
import Comments from './comment';
import Reply from './Reply';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Text } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Post = ({ userName, profileImage, selfLiked, postId, likeCount, commnetCount, description, content, userLocation, timeAgo, LikeFunc, DisLikeFunc, LoadComments, AddComment, comments_show_flag, allow_comments_flag, likes_show_flag, LoadReplies, DeletComments }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [liked, setLike] = useState(selfLiked);
    const [likeCountPre, setLikeCountPre] = useState(likeCount)
    const videoRef = useRef(null);
    const commentScrollRef = useRef(null)
    const commentSectioLength = windowWidth - ResponsiveSize(30)
    const [commentLoading, setCommentLoading] = useState(false)
    const [commentCrash, setCommentCrash] = useState(false)
    const [commentList, setCommentList] = useState([])
    const [tempId, setTempId] = useState()
    const [tempReplyId, setTempReplyId] = useState()
    const [ReplyList, setReplyList] = useState([])
    const [ReplyId, setReplyId] = useState()
    const [commentInfo, setCommentInfo] = useState("")
    const [commentPage, setCommentPage] = useState(1)
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [allReplyLoaded, setAllReplyLoaded] = useState(false);
    const [commentLoadingPage, setCommentLoadingPage] = useState(false)
    const [ReplyPages, setReplyPages] = useState(1)
    const [commentCrashPage, setCommentCrashPage] = useState(false)
    const [replyComment, setReplyComment] = useState("")
    const [replyCommentId, setReplyCommentId] = useState("")
    const [replyLoading, setReplyLoading] = useState(false)
    const [replyAddLoader, setReplyAddLoader] = useState(false)
    const [loadMoreLoading, setLoadMoreLoading] = useState(false)
    const [paused, setPause] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [commentAddLoading, setCommentAddLoading] = useState(false)

    useEffect(() => {
        if (commentPage !== 1) {
            openCommentSectionPagination()
        }
    }, [commentPage])
    const openCommentSectionPagination = async () => {
        if (allDataLoaded) return;
        setCommentLoadingPage(true);
        setCommentCrashPage(false);
        const result = await LoadComments({
            post_id: postId,
            page: commentPage,
            limit: 10
        });
        if (result?.comments) {
            setCommentList(prev => [...prev, ...result?.comments]);
            if (result.comments.length < 10) {
                setAllDataLoaded(true);
            }
            setCommentLoadingPage(false);
        } else {
            setCommentCrashPage(true);
            setCommentLoadingPage(false);
        }
    };
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
        },
        modalTopLayer: {
            height: windowHeight * 0.6,
            width: windowWidth,
            paddingTop: 10,
            position: 'absolute',
            backgroundColor: 'white',
            bottom: ResponsiveSize(0),
            borderTopLeftRadius: ResponsiveSize(15),
            borderTopRightRadius: ResponsiveSize(15),
            overflow: 'hidden',
            zIndex: 999
        },
        TopIndicator: {
            width: windowWidth,
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
        },
        CommentCrashBtn: {
            backgroundColor: global.red,
            paddingHorizontal: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(5),
            borderRadius: ResponsiveSize(10),
        },
        replyBox: {
            height: ResponsiveSize(40),
            width: windowWidth,
            backgroundColor: '#EEEEEE',
            borderTopLeftRadius: ResponsiveSize(10),
            borderTopRightRadius: ResponsiveSize(10),
            paddingHorizontal: ResponsiveSize(15),
            elevation: 5,
            shadowColor: 'black',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        ProfileReplyBoxProfile: {
            height: ResponsiveSize(25),
            width: ResponsiveSize(25),
            backgroundColor: 'gray',
            borderRadius: ResponsiveSize(50),
            overflow: 'hidden',
            marginRight: ResponsiveSize(5),
            flexDirection: 'row',
            alignItems: 'center',
        },
        ProfileReplyBox: {
            height: ResponsiveSize(25),
            width: windowWidth * 0.5,
            borderRadius: ResponsiveSize(50),
            overflow: 'hidden',
            marginRight: ResponsiveSize(5),
            flexDirection: 'row',
            alignItems: 'center',
        },
        DeleteBtn: {
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'red'
        },
        ReportBtnComment: {
            width: ResponsiveSize(50),
            height: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red'
        },
        DeleteBtnComment: {
            width: ResponsiveSize(50),
            height: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red'
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
    const toggleModal = () => {
        openCommentSection()
        setModalVisible(!isModalVisible);
    };
    const openCommentSection = async () => {
        setCommentLoading(true)
        setCommentCrash(false)
        const result = await LoadComments({
            post_id: postId,
            page: 1,
            limit: 10
        })
        if (result?.comments) {
            setCommentList(result?.comments)
            setTempId(result?.comments[0]?.comment_id + 1)
            setCommentLoading(false)
            if (result.comments.length < 10) {
                setAllDataLoaded(true);
            }
        }
        else {
            setCommentCrash(true)
            setCommentLoading(false)
        }
    }
    const commentAdder = async () => {
        setCommentAddLoading(true)
        commentScrollRef.current.scrollTo(0)
        const user_name = await AsyncStorage.getItem('Name')
        const user_Picture = await AsyncStorage.getItem('Picture')
        setCommentList(prev => [
            {
                comment: commentInfo,
                user: {
                    profile_picture_url: user_Picture,
                    user_name: user_name,
                },
                posting: true
            },
            ...prev
        ]);
        const comments = await AddComment({
            comment_type: "COMMENT",
            comment: commentInfo,
            parent_id: postId
        })
        if (comments?.statusCode == 200) {
            setCommentList(prev => [
                {
                    comment: commentInfo,
                    user: {
                        profile_picture_url: user_Picture,
                        user_name: user_name,
                    },
                    posting: false,
                    replies_count: 0,
                    likes_count: 0,
                    selfLiked: false,
                    comment_id: tempId,
                    myComment: true
                },
                ...prev?.filter(d => d.posting !== true)
            ]);
            setCommentInfo("")
            setCommentAddLoading(false)
        }
        else {
            setCommentAddLoading(false)
            setCommentList(prev => [
                {
                    comment: commentInfo,
                    user: {
                        profile_picture_url: user_Picture,
                        user_name: user_name,
                    },
                    posting: "crash"
                },
                ...prev?.filter(d => d.posting !== true)
            ]);
        }
    }
    const commentRetry = async () => {
        setCommentAddLoading(true)
        commentScrollRef.current.scrollTo(0);
        const user_name = await AsyncStorage.getItem('Name');
        const user_Picture = await AsyncStorage.getItem('Picture');
        const modifiedComments = commentList.map(data => {
            if (data.posting === 'crash') {
                return {
                    ...data,
                    posting: true
                };
            }
            return data;
        });
        setCommentList(modifiedComments);
        try {
            const comments = await AddComment({
                comment_type: "COMMENT",
                comment: commentInfo,
                parent_id: postId
            });
            if (comments?.statusCode == 200) {
                setCommentList(prev => [
                    {
                        comment: commentInfo,
                        user: {
                            profile_picture_url: user_Picture,
                            user_name: user_name,
                        },
                        posting: false,
                        replies_count: 0,
                        likes_count: 0,
                        selfLiked: false,
                        myComment: true
                    },
                    ...prev.filter(d => d.posting !== true && d.posting !== 'crash')
                ]);
                setCommentInfo("");
                setCommentAddLoading(false)
            } else {
                setCommentList(prev => [
                    {
                        comment: commentInfo,
                        user: {
                            profile_picture_url: user_Picture,
                            user_name: user_name,
                        },
                        posting: 'crash'
                    },
                    ...prev.filter(d => d.posting !== true && d.posting !== 'crash')
                ]);
                setCommentAddLoading(false)
            }
        } catch (error) {
            setCommentList(prev => [
                {
                    comment: commentInfo,
                    user: {
                        profile_picture_url: user_Picture,
                        user_name: user_name,
                    },
                    posting: 'crash'
                },
                ...prev.filter(d => d.posting !== true && d.posting !== 'crash')
            ]);
            console.error('Error adding comment:', error);
            setCommentAddLoading(false)
        }
    };
    const LoadRepliesFunction = async (e) => {
        setTempReplyId()
        setReplyPages(1)
        setReplyCommentId(e)
        setReplyLoading(true);
        setAllReplyLoaded(false);
        if (ReplyList.length <= 0) {
            const result = await LoadReplies({
                comment_id: e,
                page: ReplyPages,
                limit: 10
            })
            if (result.replies.length < 10) {
                setAllReplyLoaded(true);
            }
            setTempReplyId(result?.replies[0]?.comment_id + 1)
            setReplyPages(prev => prev + 1)
            setReplyList(result?.replies)
            setReplyId(result?.parent_id)
            setReplyLoading(false);
        }
        else {
            setReplyList([])
            setReplyLoading(false);
        }
    }
    const loadMoreReply = async () => {
        if (allReplyLoaded) return;
        setLoadMoreLoading(true)
        setReplyPages(prev => prev + 1)
        const result = await LoadReplies({
            comment_id: replyCommentId,
            page: ReplyPages,
            limit: 10
        })
        setReplyList(prev => [...prev, ...result?.replies]);
        setLoadMoreLoading(false)
        if (result.replies.length < 10) {
            setAllReplyLoaded(true);
            setLoadMoreLoading(false)
        }
        setReplyId(result?.parent_id)
    }
    const ReplyAdder = async () => {
        setReplyAddLoader(true)
        commentScrollRef.current.scrollTo(0)
        const user_name = await AsyncStorage.getItem('Name')
        const user_Picture = await AsyncStorage.getItem('Picture')
        setReplyList(prev => [
            {
                comment: commentInfo,
                user: {
                    profile_picture_url: user_Picture,
                    user_name: user_name,
                },
                posting: true
            },
            ...prev
        ]);
        const comments = await AddComment({
            comment_type: "REPLY",
            comment: commentInfo,
            parent_id: replyComment?.comment_id
        })
        if (comments?.statusCode == 200) {
            setReplyAddLoader(false)
            setCommentInfo("")
            setReplyComment("")
            setReplyList(prev => [
                {
                    comment: commentInfo,
                    user: {
                        profile_picture_url: user_Picture,
                        user_name: user_name,
                    },
                    posting: false,
                    selfLiked: false,
                    likes_count: 0,
                    comment_id: tempReplyId,
                    myComment: true
                },
                ...prev?.filter(d => d.posting !== true)
            ]);
            setCommentList(prevArray =>
                prevArray.map(item =>
                    item.comment_id == replyComment?.comment_id ? { ...item, replies_count: item?.replies_count + 1 } : item
                )
            );
        }
        else {
            setReplyAddLoader(false)
            setReplyList(prev => [
                {
                    comment: commentInfo,
                    user: {
                        profile_picture_url: user_Picture,
                        user_name: user_name,
                    },
                    posting: "crash"
                },
                ...prev?.filter(d => d.posting !== true)
            ]);
        }
    }
    const DeleteComment = async (e) => {
        const filterCommentDat = commentList.map(comment => {
            if (comment.comment_id == e) {
                return {
                    ...comment,
                    deleting: true,
                };
            }
            return comment;
        });
        setCommentList(filterCommentDat);
        const result = await DeletComments({
            comment_type: "COMMENT",
            comment_id: e
        })
        if (result == "Comment deleted successfully") {
            setCommentList(prevItems => prevItems.filter(item => item.comment_id !== e))
        }
    }
    const DeleteReply = async (e) => {
        const filterCommentDat = ReplyList.map(comment => {
            if (comment.comment_id == e) {
                return {
                    ...comment,
                    deleting: true,
                };
            }
            return comment;
        });
        setReplyList(filterCommentDat);
        const result = await DeletComments({
            comment_type: "REPLY",
            comment_id: e
        })
        console.log(result)
        if (result == "Reply deleted successfully") {
            setReplyList(prevItems => prevItems.filter(item => item.comment_id !== e))
            setCommentList(prevArray =>
                prevArray.map(item =>
                    item.comment_id == ReplyId ? { ...item, replies_count: item?.replies_count - 1 } : item
                )
            );
        }
    }
    const closeCommentFunction = () => {
        setModalVisible(false)
        setCommentLoading(false)
        setCommentCrash(false)
        setCommentList([])
        setReplyList([])
        setReplyId()
        setCommentInfo("")
        setCommentPage(1)
        setAllDataLoaded(false);
        setAllReplyLoaded(false)
        setCommentLoadingPage(false)
        setCommentCrashPage(false)
        setReplyComment("")
        setReplyCommentId("")
        setReplyLoading(false)
        setReplyAddLoader(false)
        setLoadMoreLoading(false)
        setPause(true);
        setModalVisible(false);
        setCommentAddLoading(false)
    }
    const CommentItem = React.memo(({ DeleteComment, ReplyId, replyCommentId, replyLoading, LoadRepliesFunction, data, commentRetry, setReplyComment }) => {
        return (
            <Comments DeleteComment={DeleteComment} ReplyId={ReplyId} replyCommentId={replyCommentId} replyLoading={replyLoading} LoadRepliesFunction={LoadRepliesFunction} data={data} commentRetry={commentRetry} setReplyComment={setReplyComment} />
        );
    });
    const ReplyItem = React.memo(({ data, commentRetry, setReplyComment, DeleteReply }) => {
        return (
            <Reply DeleteReply={DeleteReply} data={data} commentRetry={commentRetry} setReplyComment={setReplyComment} />
        );
    });
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
                    hideago={true}
                />
            </View>
            <Modal
                isVisible={isModalVisible}
                style={{ margin: 0 }}
                animationIn={"bounceInUp"}
                avoidKeyboard={true}
                onBackdropPress={() => closeCommentFunction()}
                statusBarTranslucent={false}
            >
                <View style={style.modalTopLayer}>
                    <View style={style.TopIndicator}>
                        <View style={style.modalIndicator}></View>
                        <TextC text={"Comments"} style={{ color: global.black, paddingTop: ResponsiveSize(3) }} font={'Montserrat-Bold'} size={ResponsiveSize(12)} />
                    </View>
                    {commentLoading ? (
                        <View style={{ paddingTop: ResponsiveSize(50), width: windowWidth, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={global.primaryColor} />
                        </View>
                    ) : (
                        <ScrollView ref={commentScrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: ResponsiveSize(50), paddingTop: ResponsiveSize(10), flex: 1 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                initialNumToRender={10}
                                data={commentList}
                                keyExtractor={(items, index) => index?.toString()}
                                maxToRenderPerBatch={10}
                                windowSize={10}
                                onEndReached={() => {
                                    if (!allDataLoaded && !commentLoadingPage) {
                                        setCommentPage(prev => prev + 1);
                                    }
                                }}
                                onEndReachedThreshold={0.5}
                                renderItem={(items) => (
                                    <>
                                        <CommentItem DeleteComment={DeleteComment} ReplyId={ReplyId} replyCommentId={replyCommentId} replyLoading={replyLoading} LoadRepliesFunction={LoadRepliesFunction} data={items.item} commentRetry={commentRetry} setReplyComment={setReplyComment} />
                                        {ReplyId == items.item?.comment_id &&
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                initialNumToRender={10}
                                                data={ReplyList}
                                                keyExtractor={(items, index) => index?.toString()}
                                                maxToRenderPerBatch={10}
                                                windowSize={10}
                                                renderItem={(items) => (
                                                    <>
                                                        <View style={{ width: windowWidth, paddingLeft: ResponsiveSize(40) }}>
                                                            <ReplyItem DeleteReply={DeleteReply} data={items.item} commentRetry={commentRetry} setReplyComment={setReplyComment} />
                                                        </View>
                                                    </>
                                                )}
                                                ListFooterComponent={
                                                    <>
                                                        {!allReplyLoaded && ReplyPages > 1 &&
                                                            <>
                                                                {loadMoreLoading ?
                                                                    <View style={{ width: windowWidth, paddingLeft: ResponsiveSize(90), paddingTop: ResponsiveSize(10), paddingBottom: ResponsiveSize(20), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                                        <ActivityIndicator size={ResponsiveSize(13)} color={global.primaryColor} />
                                                                    </View>
                                                                    :
                                                                    <View style={{ width: windowWidth, paddingLeft: ResponsiveSize(90), paddingTop: ResponsiveSize(10), paddingBottom: ResponsiveSize(20) }}>
                                                                        <TouchableOpacity onPress={() => loadMoreReply()}>
                                                                            <TextC text={"Load more"} size={ResponsiveSize(10)} font={'Montserrat-SemiBold'} style={{ color: global.primaryColor }} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                }
                                                            </>
                                                        }
                                                    </>
                                                }
                                            />
                                        }
                                    </>
                                )}
                                ListFooterComponent={
                                    commentLoadingPage ? (
                                        <ActivityIndicator size={'small'} color={global.primaryColor} />
                                    ) : null
                                }
                            />
                        </ScrollView>
                    )}
                    <View style={style.commentAdd}>
                        {replyComment !== "" &&
                            <View style={style.replyBox}>
                                <View style={style.ProfileReplyBox}>
                                    <Image style={style.ProfileReplyBoxProfile} source={{ uri: replyComment?.user?.profile_picture_url }} />
                                    <TextC font={'Montserrat-Medium'} size={ResponsiveSize(11)} text={`Reply to ${replyComment?.user?.user_name}`} />
                                </View>
                                <TouchableOpacity onPress={() => setReplyComment("")}>
                                    <AntDesign name='close' color={global.black} size={ResponsiveSize(13)} />
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{ width: windowWidth, position: 'relative' }}>
                            <TextInput editable={!commentAddLoading} value={commentInfo} onChangeText={(e) => setCommentInfo(e)} placeholder='Comment here' style={style.commentInput} />
                            <TouchableOpacity disabled={commentInfo === "" || commentAddLoading} onPress={() => {
                                if (replyComment?.comment_id) {
                                    ReplyAdder()
                                } else {
                                    commentAdder()
                                }
                            }} style={style.sendCommentBtn}>
                                {replyAddLoader ?
                                    <ActivityIndicator color={'white'} size={'small'} /> :
                                    <Feather name='send' color={'white'} size={ResponsiveSize(15)} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
        </>
    )
}

function mapStateToProps({ PostCreationReducer }) {
    return { PostCreationReducer };
}
export default connect(mapStateToProps, PostCreationAction)(Post);
// checking whether