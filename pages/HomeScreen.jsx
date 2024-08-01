import { DarkTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ImageBackground, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CityScroll from '../components/citiesScroll';
import Post from '../components/post';
import * as UserProfile from "../store/actions/UserProfile/index";
import { connect } from "react-redux";
import { global, ResponsiveSize } from '../components/constant';
import TextC from '../components/text/text';
import AntDesign from 'react-native-vector-icons/AntDesign'


const HomeScreen = ({ GetUserProfileReducer, GetProfileData, GetUserPosts, PostCreationReducer }) => {
  const scheme = useColorScheme();
  const [post, setPost] = useState([]);
  const getFeeds = async () => {
    const result = await GetUserPosts();
    setPost(result)
  }
  useEffect(() => {
    GetProfileData();
    getFeeds()
  }, []);

  const styles = StyleSheet.create({
    UploadingLoader: {
      paddingVertical: ResponsiveSize(10),
      paddingHorizontal: ResponsiveSize(15),
      borderBottomWidth: ResponsiveSize(1),
      borderBottomColor: global.description,
      flexDirection: "row",
      alignItems: "center",
    },
    profileImageUpload: {
      height: ResponsiveSize(30),
      width: ResponsiveSize(30),
      borderRadius: ResponsiveSize(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    PostDescription: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: ResponsiveSize(8)
    }
  })
  return (
    <>
      <SafeAreaView>
        <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
        <ScrollView style={{ flexGrow: 1, ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: 'white' }), }}>

          <View>
            <CityScroll />
          </View>

          {PostCreationReducer?.uploadLoading &&
            <View style={styles.UploadingLoader}>
              <ImageBackground style={styles.profileImageUpload} source={{ uri: `file://${PostCreationReducer?.uploadFiles}` }}>
                <ActivityIndicator size={'small'} color={global.white} />
              </ImageBackground>
              <View style={styles.PostDescription}>
                <TextC text={"Finishing up"} font={'Montserrat-SemiBold'} size={ResponsiveSize(12)} style={{ color: global.black }} />
                <AntDesign name='checkcircleo' color={global.secondaryColor} style={{ marginTop: ResponsiveSize(3), marginLeft: ResponsiveSize(5) }} />
              </View>
            </View>
          }

          <View>
            {post !== undefined && post !== null && post !== "" && post.length > 0 && post.map(data =>
              <Post selfLiked={data?.selfLiked} postId={data?.post_id} timeAgo={data?.created_at} userLocation={`${data?.lastCheckin?.city} | ${data?.lastCheckin?.state}`} userName={data?.userDetails?.user_name} profileImage={data?.userDetails?.profile_picture_url} likeCount={data?.likes_count} commnetCount={data?.comments_count} description={data?.caption} content={data?.attachments} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}


function mapStateToProps({ GetUserProfileReducer, PostCreationReducer }) {
  return { GetUserProfileReducer, PostCreationReducer };
}
export default connect(mapStateToProps, UserProfile)(HomeScreen);

