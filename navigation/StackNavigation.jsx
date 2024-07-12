import { StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddEvent from '../pages/AddEvent'
import EventScreen from '../pages/EventScreen'
import ProfileScreen from '../pages/ProfileScreen';
import EventDetail from '../pages/EventDetail';
import UpdateEvent from '../pages/UpdateEvent';
import EditProfile from '../pages/EditProfile';



const EventStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={"EventScreen"}>
      <Stack.Screen options={{
        headerShown: false,
        navigationBarHidden: true
      }} name="EventScreen" initialParams={{Tab:1}} component={EventScreen} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="AddEvent" component={AddEvent} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="EventDetail" component={EventDetail} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="UpdateEvent" component={UpdateEvent} />
    </Stack.Navigator>
  )
}


const ProfileStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  )
}
export { EventStackNavigation, ProfileStackNavigation }
