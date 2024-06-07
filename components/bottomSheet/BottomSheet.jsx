import React, { createContext, useContext, useRef, useState, useCallback, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useColorScheme, View } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const BottomSheetContext = createContext();

export const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef(null);
  const [snapPoints, setSnapPoints] = useState(['100%', '70%']);
  const [content, setContent] = useState(null);
  const scheme = useColorScheme();

  const openBottomSheet = useCallback((newContent, newSnapPoints = ['100%', '70%']) => {
    setContent(newContent);
    setSnapPoints(newSnapPoints);
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const contextValue = useMemo(() => ({
    openBottomSheet,
    closeBottomSheet,
  }), [openBottomSheet, closeBottomSheet]);

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}

      <BottomSheet
        handleStyle={{ height: 50, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: scheme == "dark" ? DarkTheme.colors.background : DefaultTheme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: scheme == "dark" ? DefaultTheme.colors.background : DarkTheme.colors.background }}
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: scheme == "dark" ? DarkTheme.colors.background : DefaultTheme.colors.background }}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setContent(null)}
      >
        <>
          {content}
        </>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => useContext(BottomSheetContext);