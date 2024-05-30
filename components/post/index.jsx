import React from 'react';
import {ImageBackground, StyleSheet, View ,Dimensions,Image} from 'react-native'
import TextC from '../text/text';


const Post = () => {
    const width = Dimensions.get('window').width;
    const style = StyleSheet.create({
        PostHeader: {
            flexDirection: 'row',
            paddingVertical: 12,
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            width:width
        },
        PostProfileImage: {
            height: 40,
            width: 40,
            borderRadius: 32,
            backgroundColor: 'blue',
            marginRight: 8,
            overflow:'hidden',
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
            height:500,
            width: width,
            // height:'auto'
        }
    })
    return (
        <>
            <View style={style.PostHeader}>
                <View style={style.PostProfileImageBox}>
                    <ImageBackground source={require('../../assets/icons/profile.jpg')} style={style.PostProfileImage} resizeMode="cover"></ImageBackground>
                    <TextC text={"Taha Tahir"} font={'Poppins-SemiBold'} />
                </View>
                <View style={style.PostActionDot}>
                    <Image source={require('../../assets/icons/Shape.svg')}/>
                </View>
            </View>
            <Image source={require('../../assets/icons/postImage.jpg')} style={style.ActuallPost}/>
        </>
    )
}

export default Post;