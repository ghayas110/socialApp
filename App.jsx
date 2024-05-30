import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainNavigation from './navigation/MainNavigation';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';


const App = () => {
  const scheme = useColorScheme();
  return (
    <>
      <StatusBar backgroundColor={scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background} barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}/>
      <MainNavigation />
    </>
  )
}

export default App

const styles = StyleSheet.create({})