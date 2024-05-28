// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Location from '../pages/Location';
// import CarDetails from '../pages/CarDetails';
// import Calender from '../pages/Calender';

// const StackNavigation = () => {
//     const Stack = createNativeStackNavigator();
//   return (
//     <Stack.Navigator screenOptions={{
//         headerShown: false
//         }}>
//         <Stack.Screen name="Map" component={Location} />
//         <Stack.Screen name="CarDetail" component={CarDetails} />
//         <Stack.Screen name="Calender" component={Calender} />
//         </Stack.Navigator>
//   )
// }

// export default StackNavigation

// const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StackNavigation = () => {
  return (
    <View>
      <Text>StackNavigation</Text>
    </View>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})