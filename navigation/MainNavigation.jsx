import { StyleSheet, Dimensions, View, Image, Touchable } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../pages/HomeScreen';
import EventScreen from '../pages/EventScreen';
import CreatePost from '../pages/CreatePost';
import ReelScreen from '../pages/ReelScreen';
import ProfileScreen from '../pages/ProfileScreen';
import SignUp from '../pages/SignUp';
import Otp from '../pages/Otp';
import CheckIn from '../pages/CheckIn';
import CheckInDetail from '../pages/CheckInDetail';
import ResetPassword from '../pages/ResetPassword';
import PasswordChanged from '../pages/PasswordChanged';
import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainHeader from '../components/mainHeader';
import CreatePostHeader from '../components/mainHeader/createPostHeader'
import EventHeader from '../components/mainHeader/event';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { ProfileStackNavigation, EventStackNavigation } from './StackNavigation';


const MainNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const scheme = useColorScheme();
  return (
    <NavigationContainer>
      {isLoggedIn ?
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: '#69BE25', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
          }}>
          <Tab.Screen name="Home" component={HomeScreen}
            options={{
              navigationBarColor: '#69BE25',
              tabBarIcon: ({ color, size, focused }) => (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Image source={!focused ? require('../images/homedark.png') : require('../images/homeselect.png')} style={{ width: 25, height: 20, objectFit: 'contain' }} />
                </View>
              ),
              tabBarShowLabel: false,
              headerTitle: () => (
                <MainHeader />
              ),
              headerStyle: {
                ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: "white" }),
              },
            }}
          />
          <Tab.Screen name="Event" component={EventStackNavigation} options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image source={!focused ? require('../images/searchdark.png') : require('../images/searchselect.png')} style={{ width: 25, height: 25, objectFit: 'contain' }} />
              </View>
            ),
            headerShown: false,
            tabBarShowLabel: false,
            // tabBarStyle: { display: route.name=="EventCreated"?'none':""},
          }} />
          <Tab.Screen name="CreatePost" component={CreatePost} options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Image source={!focused ? require('../images/addblack.png') : require('../images/addselect.png')} style={{ width: 25, height: 20, objectFit: 'contain' }} />
            ),
            tabBarStyle: { display: 'none' },
            tabBarShowLabel: false,
            headerTitle: () => (
              <CreatePostHeader />
            ),
            headerStyle: {
              ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: "white" }),
            }
          }} />
          <Tab.Screen name="Reel" component={ReelScreen} options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Image source={!focused ? require('../images/reeldark.png') : require('../images/reelselect.png')} style={{ width: 25, height: 20, objectFit: 'contain' }} />
            ),
            tabBarShowLabel: false,
            headerTitle: () => (
              <MainHeader />
            ),
            headerStyle: {
              ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: "white" }),
            }
          }} />
          <Tab.Screen name="Profile" component={ProfileStackNavigation} options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Image source={!focused ? require('../images/avatardark.png') : require('../images/avatarselect.png')} style={{ width: 25, height: 20, objectFit: 'contain' }} />
            ),
            headerShown: false,
            tabBarShowLabel: false,
            headerStyle: {
              ...(scheme === 'dark' ? { backgroundColor: DarkTheme.colors.background } : { backgroundColor: "white" }),
            }
          }} />
        </Tab.Navigator>
        :
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen options={{ navigationBarColor: '#05348E' }} name="SplashScreen" component={SplashScreen} />
          <Stack.Screen options={{ navigationBarColor: '#05348E' }} name="Login" >
            {(props) => <Login {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen options={{ navigationBarColor: '#05348E' }} name="SignUp" component={SignUp} />
          <Stack.Screen options={{ navigationBarColor: '#05348E' }} name="Otp" component={Otp} />
          <Stack.Screen options={{ navigationBarColor: '#05348E' }} name="CheckIn" component={CheckIn} />
          <Stack.Screen options={{ navigationBarColor: '#05348E' }} name="CheckInDetail" component={CheckInDetail} />
          <Stack.Screen options={{ navigationBarColor: '#05348E' }} name="ResetPassword" component={ResetPassword} />
          <Stack.Screen options={{ navigationBarColor: '#05348E' }} name="PasswordChanged" component={PasswordChanged} />

        </Stack.Navigator>
      }
    </NavigationContainer >
  )
}

export default MainNavigation

const styles = StyleSheet.create({})