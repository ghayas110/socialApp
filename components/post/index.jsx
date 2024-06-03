import React, { useCallback, useMemo, useRef } from 'react';
import { ImageBackground, StyleSheet, View, Dimensions, Image, Touchable, TouchableOpacity, Button, Text } from 'react-native'
import TextC from '../text/text';
import EntypoFont from "react-native-vector-icons/Entypo";
import { useColorScheme } from 'react-native';
import LikeIconLight from '../../assets/icons/LikeLight.png'
import CommentIconLight from '../../assets/icons/CommentLight.png'
import ShareIconLight from '../../assets/icons/MessangerLight.png'
import SaveIconLight from '../../assets/icons/SaveLight.png'
import LikeIconDark from '../../assets/icons/Like.png'
import CommentIconDark from '../../assets/icons/Comment.png'
import ShareIconDark from '../../assets/icons/Messanger.png'
import SaveIconDark from '../../assets/icons/Save.png'
import { useBottomSheet } from '../bottomSheet/BottomSheet';
// import { BottomSheetHandleProps } from '@gorhom/bottom-sheet';

const Post = ({ userName, profileImage, id, likeCount, commnetCount, description, content }) => {
    const scheme = useColorScheme();
    const width = Dimensions.get('window').width;
    const style = StyleSheet.create({
        PostHeader: {
            flexDirection: 'row',
            paddingVertical: 12,
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            width: width
        },
        PostProfileImage: {
            height: 40,
            width: 40,
            borderRadius: 32,
            backgroundColor: 'blue',
            marginRight: 8,
            overflow: 'hidden',
        },
        PostProfileImageBox: {
            flexDirection: "row",
            alignItems: 'center',
        },
        PostActionDot: {
            flexDirection: "row",
            alignItems: 'center',
        },
        ActuallPost: {
            height: 400,
            width: width,
        },
        postActionSection: {
            flexDirection: 'row',
            paddingVertical: 20,
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            width: width
        },
        PostDetail: {
            textAlign: "left",
            paddingHorizontal: 10
        }
    })

    const { openBottomSheet, closeBottomSheet } = useBottomSheet();


    const handleOpenSheet = () => {
        openBottomSheet(
            <View style={{ flex: 1, alignItems: 'center'}}>

            </View>, ['100%', '50%']
        );
    };
    return (
        <>
            <View style={style.PostHeader}>
                <View style={style.PostProfileImageBox}>
                    <ImageBackground source={profileImage} style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
                    <TextC size={16} text={userName} font={'Poppins-SemiBold'} />
                </View>
                <TouchableOpacity style={style.PostActionDot}>
                    <EntypoFont name="dots-three-horizontal" size={22} color={scheme == "dark" ? 'white' : 'black'} />
                </TouchableOpacity>
            </View>
            <Image source={content} style={style.ActuallPost} />
            <View style={style.postActionSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingRight: 8 }}>
                        <Image source={scheme == "dark" ? LikeIconLight : LikeIconDark} style={{ height: 23, width: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 8 }}>
                        <Image source={scheme == "dark" ? CommentIconLight : CommentIconDark} style={{ height: 23, width: 23 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 8, paddingTop: 2 }}>
                        <Image source={scheme == "dark" ? ShareIconLight : ShareIconDark} style={{ height: 22, width: 25 }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ paddingHorizontal: 8 }}>
                        <Image source={scheme == "dark" ? SaveIconLight : SaveIconDark} style={{ height: 23, width: 23 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.PostDetail}>
                <TextC size={14} text={`${likeCount} likes`} font={'Poppins-Medium'} />
                <TextC size={14} text={description} font={'Poppins-Medium'} />
                <TouchableOpacity onPress={handleOpenSheet}>
                    <TextC size={14} style={{ color: "#999999" }} text={`${commnetCount} comments`} font={'Poppins-Medium'} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Post;

const styles = StyleSheet.create({})