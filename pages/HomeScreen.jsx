import { DarkTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CityScroll from '../components/citiesScroll';
import Post from '../components/post';
import * as UserProfile from "../store/actions/UserProfile/index";
import { connect } from "react-redux";



const HomeScreen = ({ GetUserProfileReducer, GetProfileData, GetUserPosts }) => {
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

  return (
    <>
      <SafeAreaView>
        <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
        <ScrollView style={{ flexGrow: 1, ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: 'white' }), }}>
          <View>
            <CityScroll />
          </View>
          <View>
            {post !== undefined && post !== null && post !== "" && post.length > 0 && post.map(data =>
              <Post postId={data?.post_id} timeAgo={data?.created_at} userLocation={`${data?.lastCheckin?.city} | ${data?.lastCheckin?.state}`} userName={data?.userDetails?.user_name} profileImage={data?.userDetails?.profile_picture_url} likeCount={data?.likes_count} commnetCount={data?.comments_count} description={data?.caption} content={data?.attachments} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}


function mapStateToProps({ GetUserProfileReducer }) {
  return { GetUserProfileReducer };
}
export default connect(mapStateToProps, UserProfile)(HomeScreen);

