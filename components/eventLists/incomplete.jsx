import React from "react";
import { View, StyleSheet, Image } from "react-native";
import TextC from "../text/text";

const Incomplete = () => {
    const styles = StyleSheet.create({
        wrapper: {
            padding: 15,
            flexDirection: 'row',
            borderBottomColor: '#E9E9E9',
            borderBottomWidth: 1,
            position: 'relative',
        },
        LikeArea: {
            position: 'absolute',
            right: 15,
            top:5
        },
        LikeBtn: {
            height: 23,
            width: 23,
        },
        LikeBtn1: {
            height: 23,
            width: 23,
            marginLeft: 10
        }
    })
    return (
        <>
            <View style={styles.wrapper}>
                <Image source={require('../../assets/icons/eventProfile2.png')} style={{ width: 40, height: 40 }} />
                <View style={{ paddingLeft: 10 }}>
                    <TextC text={"Alicia Montalvo"} font={'Montserrat-Bold'} />
                    <TextC text={"DL FA"} font={'Montserrat-Regular'} size={12} />
                    <View style={{ paddingVertical: 5, paddingRight: 40 }}>
                        <TextC style={{ color: "black" }} font={"Montserrat-Medium"} size={10} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'} />
                    </View>
                    <TextC text={"65 likes"} font={'Montserrat-Bold'} size={12} />
                </View>

                <View style={styles.LikeArea}>
                    <TextC text={"20hrs"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9'}} size={10} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.LikeBtn} source={require('../../assets/icons/clock.png')} />
                        <Image style={styles.LikeBtn1} source={require('../../assets/icons/Like.png')} />
                    </View>
                </View>
            </View>

            
            <View style={styles.wrapper}>
                <Image source={require('../../assets/icons/eventProfile2.png')} style={{ width: 40, height: 40 }} />
                <View style={{ paddingLeft: 10 }}>
                    <TextC text={"Alicia Montalvo"} font={'Montserrat-Bold'} />
                    <TextC text={"DL FA"} font={'Montserrat-Regular'} size={12} />
                    <View style={{ paddingVertical: 5, paddingRight: 40 }}>
                        <TextC style={{ color: "black" }} font={"Montserrat-Medium"} size={10} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'} />
                    </View>
                    <TextC text={"65 likes"} font={'Montserrat-Bold'} size={12} />
                </View>

                <View style={styles.LikeArea}>
                    <TextC text={"20hrs"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9'}} size={10} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.LikeBtn} source={require('../../assets/icons/clock.png')} />
                        <Image style={styles.LikeBtn1} source={require('../../assets/icons/Like.png')} />
                    </View>
                </View>
            </View>
            <View style={styles.wrapper}>
                <Image source={require('../../assets/icons/eventProfile2.png')} style={{ width: 40, height: 40 }} />
                <View style={{ paddingLeft: 10 }}>
                    <TextC text={"Alicia Montalvo"} font={'Montserrat-Bold'} />
                    <TextC text={"DL FA"} font={'Montserrat-Regular'} size={12} />
                    <View style={{ paddingVertical: 5, paddingRight: 40 }}>
                        <TextC style={{ color: "black" }} font={"Montserrat-Medium"} size={10} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'} />
                    </View>
                    <TextC text={"65 likes"} font={'Montserrat-Bold'} size={12} />
                </View>

                <View style={styles.LikeArea}>
                    <TextC text={"20hrs"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9'}} size={10} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.LikeBtn} source={require('../../assets/icons/clock.png')} />
                        <Image style={styles.LikeBtn1} source={require('../../assets/icons/Like.png')} />
                    </View>
                </View>
            </View>
            <View style={styles.wrapper}>
                <Image source={require('../../assets/icons/eventProfile2.png')} style={{ width: 40, height: 40 }} />
                <View style={{ paddingLeft: 10 }}>
                    <TextC text={"Alicia Montalvo"} font={'Montserrat-Bold'} />
                    <TextC text={"DL FA"} font={'Montserrat-Regular'} size={12} />
                    <View style={{ paddingVertical: 5, paddingRight: 40 }}>
                        <TextC style={{ color: "black" }} font={"Montserrat-Medium"} size={10} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'} />
                    </View>
                    <TextC text={"65 likes"} font={'Montserrat-Bold'} size={12} />
                </View>

                <View style={styles.LikeArea}>
                    <TextC text={"20hrs"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9'}} size={10} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.LikeBtn} source={require('../../assets/icons/clock.png')} />
                        <Image style={styles.LikeBtn1} source={require('../../assets/icons/Like.png')} />
                    </View>
                </View>
            </View>
            <View style={styles.wrapper}>
                <Image source={require('../../assets/icons/eventProfile2.png')} style={{ width: 40, height: 40 }} />
                <View style={{ paddingLeft: 10 }}>
                    <TextC text={"Alicia Montalvo"} font={'Montserrat-Bold'} />
                    <TextC text={"DL FA"} font={'Montserrat-Regular'} size={12} />
                    <View style={{ paddingVertical: 5, paddingRight: 40 }}>
                        <TextC style={{ color: "black" }} font={"Montserrat-Medium"} size={10} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'} />
                    </View>
                    <TextC text={"65 likes"} font={'Montserrat-Bold'} size={12} />
                </View>

                <View style={styles.LikeArea}>
                    <TextC text={"20hrs"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9'}} size={10} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.LikeBtn} source={require('../../assets/icons/clock.png')} />
                        <Image style={styles.LikeBtn1} source={require('../../assets/icons/Like.png')} />
                    </View>
                </View>
            </View><View style={styles.wrapper}>
                <Image source={require('../../assets/icons/eventProfile2.png')} style={{ width: 40, height: 40 }} />
                <View style={{ paddingLeft: 10 }}>
                    <TextC text={"Alicia Montalvo"} font={'Montserrat-Bold'} />
                    <TextC text={"DL FA"} font={'Montserrat-Regular'} size={12} />
                    <View style={{ paddingVertical: 5, paddingRight: 40 }}>
                        <TextC style={{ color: "black" }} font={"Montserrat-Medium"} size={10} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'} />
                    </View>
                    <TextC text={"65 likes"} font={'Montserrat-Bold'} size={12} />
                </View>

                <View style={styles.LikeArea}>
                    <TextC text={"20hrs"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9'}} size={10} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.LikeBtn} source={require('../../assets/icons/clock.png')} />
                        <Image style={styles.LikeBtn1} source={require('../../assets/icons/Like.png')} />
                    </View>
                </View>
            </View><View style={styles.wrapper}>
                <Image source={require('../../assets/icons/eventProfile2.png')} style={{ width: 40, height: 40 }} />
                <View style={{ paddingLeft: 10 }}>
                    <TextC text={"Alicia Montalvo"} font={'Montserrat-Bold'} />
                    <TextC text={"DL FA"} font={'Montserrat-Regular'} size={12} />
                    <View style={{ paddingVertical: 5, paddingRight: 40 }}>
                        <TextC style={{ color: "black" }} font={"Montserrat-Medium"} size={10} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text'} />
                    </View>
                    <TextC text={"65 likes"} font={'Montserrat-Bold'} size={12} />
                </View>

                <View style={styles.LikeArea}>
                    <TextC text={"20hrs"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9'}} size={10} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.LikeBtn} source={require('../../assets/icons/clock.png')} />
                        <Image style={styles.LikeBtn1} source={require('../../assets/icons/Like.png')} />
                    </View>
                </View>
            </View>
        </>
    );
}

export default Incomplete;