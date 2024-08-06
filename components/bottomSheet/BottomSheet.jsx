import React, { createContext, useContext, useRef, useState, useCallback, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Dimensions, StyleSheet, useColorScheme, View } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { global, ResponsiveSize } from '../constant';

const BottomSheetContext = createContext();

export const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef(null);
  const [snapPoints, setSnapPoints] = useState(['15%']);
  const [content, setContent] = useState(null);
  const scheme = useColorScheme();

  const openBottomSheet = useCallback((newContent, newSnapPoints = ['15%']) => {
    setContent(newContent);
    setSnapPoints(newSnapPoints);
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const onClose = useCallback(() => {
    setContent(null);
  }, []);

  const contextValue = useMemo(() => ({
    openBottomSheet,
    closeBottomSheet,
    onClose
  }), [openBottomSheet, closeBottomSheet,onClose]);


  

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
      <BottomSheet
        handleStyle={{ height: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: scheme == "dark" ? DarkTheme.colors.background : "white" }}
        handleIndicatorStyle={{ backgroundColor: scheme == "dark" ? DefaultTheme.colors.background : global.primaryColor }}
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: scheme == "dark" ? DarkTheme.colors.background : "white" }}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => {onClose(null)}}
      >
        <>
          {content}
        </>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => useContext(BottomSheetContext);