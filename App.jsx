import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import MainNavigation from './navigation/MainNavigation';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider } from './components/bottomSheet/BottomSheet';


const App = () => {
  const scheme = useColorScheme();
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetProvider>
          <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background} barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
          <MainNavigation />
        </BottomSheetProvider>
      </GestureHandlerRootView>
    </>
  )
}

export default App

const styles = StyleSheet.create({})