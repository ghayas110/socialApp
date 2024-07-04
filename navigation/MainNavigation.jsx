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
import LoginSwitcher from '../pages/LoginSwitcher';
import { ResponsiveSize, global } from '../components/constant';
import SignUpSecondStep from '../pages/SignUpSecondStep';
import ReApplyDocument from '../pages/ReApplyDocument';
import Approval from '../pages/Approval';


const MainNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const scheme = useColorScheme();
  useEffect(() => {
    VerifyToken()
  }, [])
  const VerifyToken = async () => {
    try {
      const value = await AsyncStorage.getItem('Token');
      console.log(value)
      if (value !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
  }

  const styles = StyleSheet.create({
    centerTab: {
      height: ResponsiveSize(55),
      width: ResponsiveSize(55),
      borderRadius: 70,
      backgroundColor: global.primaryColor,
      marginBottom: ResponsiveSize(25),
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    }
  });
  return (
    <NavigationContainer>
      {isLoggedIn ?
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: '#69BE25', borderTopLeftRadius: ResponsiveSize(20), borderTopRightRadius: ResponsiveSize(20) },
          }}>
          <Tab.Screen name="Home" component={HomeScreen}
            options={{
              navigationBarColor: '#69BE25',
              tabBarIcon: ({ color, size, focused }) => (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Image source={!focused ? require('../assets/icons/homeTab/tabHomeLight.png') : require('../assets/icons/homeTab/tabHomeFill.png')} style={{ width: ResponsiveSize(25), height: ResponsiveSize(20), objectFit: 'contain' }} />
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


          <Tab.Screen name="Event"  component={EventStackNavigation} options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image source={!focused ? require('../assets/icons/homeTab/tabEventLight.png') : require('../assets/icons/homeTab/tabEventFill.png')} style={{ width: ResponsiveSize(25), height: ResponsiveSize(20), objectFit: 'contain' }} />
              </View>
            ),
            headerShown: false,
            tabBarShowLabel: false,
          }} />




          <Tab.Screen name="CreatePost" component={CreatePost} options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.centerTab}>
                <Image source={require('../assets/icons/homeTab/centerTab.png')} style={{ width: ResponsiveSize(25), height: ResponsiveSize(20), objectFit: 'contain' }} />
              </View>
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
              <Image source={!focused ? require('../assets/icons/homeTab/tabChatLight.png') : require('../assets/icons/homeTab/tabChatFill.png')} style={{ width: ResponsiveSize(25), height: ResponsiveSize(20), objectFit: 'contain' }} />
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
              <Image source={!focused ? require('../assets/icons/homeTab/tabProfile.png') : require('../assets/icons/homeTab/tabProfile.png')} style={{ width: ResponsiveSize(25), height: ResponsiveSize(20), objectFit: 'contain' }} />
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
          <Stack.Screen options={{ navigationBarHidden: true }} name="SplashScreen" component={SplashScreen} />
          <Stack.Screen options={{ navigationBarHidden: true }} name="LoginSwitcher" component={LoginSwitcher} />

          <Stack.Screen options={{ navigationBarHidden: true }} name="Login" >
            {(props) => <Login {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen options={{ navigationBarHidden: true }} name="CheckIn" >
            {(props) => <CheckIn {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen options={{ navigationBarHidden: true }} name="CheckInDetail" >
            {(props) => <CheckInDetail {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen options={{ navigationBarHidden: true }} name="SignUp" component={SignUp} />
          <Stack.Screen options={{ navigationBarHidden: true }} name="SignUpSecond" component={SignUpSecondStep} />
          <Stack.Screen options={{ navigationBarHidden: true }} name="Reapply" component={ReApplyDocument} />
          <Stack.Screen options={{ navigationBarHidden: true }} name="Approval" component={Approval} />
          <Stack.Screen options={{ navigationBarHidden: true }} name="Otp" component={Otp} />
          <Stack.Screen options={{ navigationBarHidden: true }} name="ResetPassword" component={ResetPassword} />
          <Stack.Screen options={{ navigationBarHidden: true }} name="PasswordChanged" component={PasswordChanged} />

        </Stack.Navigator>
      }
    </NavigationContainer >
  )
}

export default MainNavigation

const styles = StyleSheet.create({})