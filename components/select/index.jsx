import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SelectC = ({ secureTextEntry, placeholder, value, onChangeText, label,data,error }) => {
    

    const styleObj = StyleSheet.create({
        labelS: {
            color: "white",
            fontFamily: "Montserrat-Regular",
            fontSize: 13,
            paddingBottom: 4,
        },
        dropdownButtonStyle: {
            width: "100%",
            height: 48,
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            fontFamily: 'Montserrat-Regular',
            borderWidth:1,
            ...(error === undefined ? { borderColor: 'white' } : { borderColor: 'red' })
        },
        dropdownButtonTxtStyle: {
            flex: 1,
            fontSize: 14,
            fontWeight: '500',
            fontFamily: 'Montserrat-Regular'
        },
        dropdownButtonArrowStyle: {
            fontSize: 28,
            color: '#666666'
        },
        dropdownButtonIconStyle: {
            fontSize: 28,
            marginRight: 8,
        },
        dropdownMenuStyle: {
            backgroundColor: '#E9ECEF',
            borderRadius: 8,
        },
        dropdownItemStyle: {
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 12,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
        },
        dropdownItemTxtStyle: {
            flex: 1,
            fontSize: 14,
            fontWeight: '500',
            color: '#151E26',
            fontFamily: 'Montserrat-Regular'
        },
        dropdownItemIconStyle: {
            fontSize: 28,
            marginRight: 8,
        },
    })

    return (
        <>
            <View>
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={styleObj.labelS}>{label}</Text>
                </View>
                <View>
                    <SelectDropdown
                        data={data}
                        dropdownOverlayColor="rgba(0, 0, 0,0.7)"
                        onSelect={(selectedItem) => {
                            onChangeText(label== "Airline"?selectedItem.id:selectedItem.title)
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styleObj.dropdownButtonStyle}>
                                    <Text style={{
                                        ...styleObj.dropdownButtonTxtStyle,
                                        color: selectedItem ? 'black' : '#DADADA'
                                    }}>
                                        {(selectedItem && selectedItem.title) || placeholder}
                                    </Text>
                                    <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styleObj.dropdownButtonArrowStyle} />
                                </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <View style={{ ...styleObj.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                    <Text style={styleObj.dropdownItemTxtStyle}>{item.title}</Text>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styleObj.dropdownMenuStyle}
                    />
                </View>
            </View>
        </>
    )
}


export default SelectC;