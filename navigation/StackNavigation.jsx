import { StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddEvent from '../pages/AddEvent'
import EventScreen from '../pages/EventScreen'
import ProfileScreen from '../pages/ProfileScreen';
import UpdateEvent from '../pages/UpdateEvent';
import EditProfile from '../pages/EditProfile';
import EventDetailScreen from '../pages/EventDetailScreen';
import Setting from '../pages/Setting';
import ChangePassword from '../pages/changePassword';
import ChangeAirline from '../pages/ChangeAirline';
import DeleteAccount from '../pages/DeleteAccount';
import HomeScreen from '../pages/HomeScreen';
import ReelScreen from '../pages/ReelScreen';
import CreatePost from '../pages/CreatePost';
import CreatePostTwo from '../pages/CreatePostStepTwo';



const EventStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={"EventScreen"}>
      <Stack.Screen options={{
        headerShown: false,
        navigationBarHidden: true,
      }} name="EventScreen" initialParams={{ Tab: 1 }} component={EventScreen} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="AddEvent" component={AddEvent} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="UpdateEvent" component={UpdateEvent} />
    </Stack.Navigator>
  )
}


const ProfileStackNavigation = ({ onLogin }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="EditProfile" component={EditProfile} />
      <Stack.Screen
        options={{ headerShown: false, navigationBarHidden: true }}
        name="Setting"
        component={(props) => <Setting {...props} onLogin={onLogin} />}
      />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="ChangePassword" component={ChangePassword} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="ChangeAirline" component={ChangeAirline} />
      <Stack.Screen
        options={{ headerShown: false, navigationBarHidden: true }}
        name="DeleteAccount"
        component={(props) => <DeleteAccount {...props} onLogin={onLogin} />}
      />
    </Stack.Navigator>
  )
}

const HomeStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
const PostStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="CreatePost" component={CreatePost} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="CreatePostTwo" component={CreatePostTwo} />
    </Stack.Navigator>
  )
}
const GroupStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="Reel" component={ReelScreen} />
    </Stack.Navigator>
  )
}
export { EventStackNavigation, ProfileStackNavigation, HomeStackNavigation, PostStackNavigation, GroupStackNavigation }
