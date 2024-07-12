import { DarkTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CityScroll from '../components/citiesScroll';
import Post from '../components/post';

const HomeScreen = () => {
  const scheme = useColorScheme();

  return (
    <>
      <SafeAreaView>
        <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : 'white'} barStyle={scheme === 'dark' ? "light-content" : 'dark-content'} />
        <ScrollView style={{ flexGrow: 1, ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: 'white' }), }}>
          <View>
            <CityScroll />
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <Post userLocation={'DL | P'} userName={"David J. Vega"} profileImage={require("../assets/icons/profile.png")} likeCount={'16,345'} commnetCount={'643'} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"} content={require('../assets/icons/postImage.jpg')} />
            <Post userLocation={'DL | P'} userName={"David J. Vega"} profileImage={require("../assets/icons/profile.png")} likeCount={'16,345'} commnetCount={'643'} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"} content={require('../assets/icons/postImage.jpg')} />
            <Post userLocation={'DL | P'} userName={"David J. Vega"} profileImage={require("../assets/icons/profile.png")} likeCount={'16,345'} commnetCount={'643'} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"} content={require('../assets/icons/postImage.jpg')} />
            <Post userLocation={'DL | P'} userName={"David J. Vega"} profileImage={require("../assets/icons/profile.png")} likeCount={'16,345'} commnetCount={'643'} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"} content={require('../assets/icons/postImage.jpg')} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default HomeScreen;
