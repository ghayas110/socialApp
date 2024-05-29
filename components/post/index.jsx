import React from 'react';
import {Image, StyleSheet,View} from 'react-native'
import TextC from '../text/text';

const Post =()=>{
    const style = StyleSheet.create({
        PostHeader:{
            flexDirection:'row',
            paddingVertical:12,
            justifyContent:'space-between',
            paddingHorizontal:12
        },
        PostProfileImage:{
            height:40,
            width:40,
            borderRadius:32,
            backgroundColor:'blue',
            marginRight:8,  
        },
        PostProfileImageBox:{
            flexDirection:"row",
            alignItems:'center',
        },
        PostActionDot:{
            flexDirection:"row",
            alignItems:'center',
        },
        ActuallPost:{
            height:350,
            width:"100%",
            backgroundColor:'white',
        }
    })

    return(
        <View>
            <View style={style.PostHeader}>
                <View style={style.PostProfileImageBox}>
                    <View style={style.PostProfileImage}></View>
                    <TextC text={"Taha Tahir"} font={'Poppins-SemiBold'}/>
                </View>
                <View style={style.PostActionDot}>
                    
                </View>
            </View>
            <View style={style.ActuallPost}>
                <Image style={{height:'100%',width:'100%'}} source={require('../../assets/icons/postImage.jpg')}/>
            </View>
        </View>
    )
}

export default Post;