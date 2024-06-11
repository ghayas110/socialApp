import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddEvent from '../pages/AddEvent'
import EventScreen from '../pages/EventScreen'
import EventHeader from '../components/mainHeader/event';


const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name="AddEvent" component={AddEvent} />
    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})