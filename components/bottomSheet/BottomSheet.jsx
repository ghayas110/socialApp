import React, { createContext, useContext, useRef, useState, useCallback, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetContext = createContext();

export const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef(null);
  const [snapPoints, setSnapPoints] = useState(['100%', '50%']);
  const [content, setContent] = useState(null);

  const openBottomSheet = useCallback((newContent, newSnapPoints = ['100%', '50%']) => {
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
        handleStyle={{height:50,borderTopLeftRadius:20,borderTopRightRadius:20}}
        ref={bottomSheetRef}
        // handleComponent={}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setContent(null)}
      >
        {content}
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => useContext(BottomSheetContext);