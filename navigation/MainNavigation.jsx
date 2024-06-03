import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../pages/HomeScreen';
import SearchScreen from '../pages/SearchScreen';
import AddPost from '../pages/AddPost';
import ReelScreen from '../pages/ReelScreen';
import ProfileScreen from '../pages/ProfileScreen';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const MainNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      {isLoggedIn ?
        <Tab.Navigator >
          <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image source={!focused ? require('../images/homedark.png') : require('../images/homeselect.png')} style={{ width: 25, height: 20, objectFit: 'contain' }} />

              </View>
            ),
          }} />
          <Tab.Screen name="Search" component={SearchScreen} options={{

            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image source={!focused ? require('../images/searchdark.png') : require('../images/searchselect.png')} style={{ width: 25, height: 25, objectFit: 'contain' }} />

              </View>
            ),
          }} />
          <Tab.Screen name="AddPost" component={AddPost} options={{
            tabBarIcon: ({ color, size, focused }) => (

              <Image source={!focused ? require('../images/addblack.png') : require('../images/addselect.png')} style={{ width: 25, height: 20, objectFit: 'contain' }} />
            ),
          }} />
          <Tab.Screen name="Reel" component={ReelScreen} options={{
            tabBarIcon: ({ color, size, focused }) => (

              <Image source={!focused ? require('../images/reeldark.png') : require('../images/reelselect.png')} style={{ width: 25, height: 20, objectFit: 'contain' }} />
            ),
          }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: ({ color, size, focused }) => (

              <Image source={!focused ? require('../images/avatardark.png') : require('../images/avatarselect.png')} style={{ width: 25, height: 20, objectFit: 'contain' }} />
            ),
          }} />
        </Tab.Navigator>
        :
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />

          <Stack.Screen name="Login" >
            {(props) => <Login {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} />

        </Stack.Navigator>
      }
    </NavigationContainer>
  )
}

export default MainNavigation

const styles = StyleSheet.create({})