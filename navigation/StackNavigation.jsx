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



const EventStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={"EventScreen"}>
      <Stack.Screen options={{
        headerShown: false,
        navigationBarHidden: true,
      }} name="EventScreen" initialParams={{Tab:1}} component={EventScreen} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="AddEvent" component={AddEvent} />
      <Stack.Screen  options={{ headerShown: false, navigationBarHidden: true }} name="EventDetail" component={EventDetailScreen} />
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
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="Setting" component={Setting} />
      <Stack.Screen options={{ headerShown: false, navigationBarHidden: true }} name="ChangePassword" component={ChangePassword} />
      
    </Stack.Navigator>
  )
}
export { EventStackNavigation, ProfileStackNavigation }
