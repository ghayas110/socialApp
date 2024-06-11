import React from "react";
import { View, StyleSheet, Image } from "react-native";
import TextC from "../text/text";

const Upcoming = () => {
    const styles = StyleSheet.create({
        Wrapper: {
            backgroundColor: "#F5F5F5",
            padding: 10,
            borderRadius: 25,
            flexDirection: "row",
            alignItems: 'center',
            position: "relative",
            marginBottom:10
        },
        UpcomingImage: {
            width: "40%",
            height: 130,
            borderRadius: 25
        },
        UpcomingContent: {
            paddingLeft: 10
        },
        profileImages1: {
            height: 23,
            width: 23,
            backgroundColor: "red",
            borderRadius: 23,
            position: 'absolute',
            left: 0
        },
        profileImages2: {
            height: 23,
            width: 23,
            backgroundColor: "teal",
            borderRadius: 23,
            position: 'absolute',
            left: 10
        },
        profileImages3: {
            height: 23,
            width: 23,
            backgroundColor: "yellow",
            borderRadius: 23,
            position: 'absolute',
            left: 20

        },
        profileImages4: {
            height: 23,
            width: 23,
            backgroundColor: "gray",
            borderRadius: 23,
            position: 'absolute',
            left: 30
        },
        LikeBtn: {
            position: 'absolute',
            top: 15,
            right: 15,
            height: 23,
            width: 23,
        }
    })
    return (
        <>
            <View style={styles.Wrapper}>
                <Image style={styles.UpcomingImage} source={require("../../assets/icons/upcoming.png")} />
                <View style={styles.UpcomingContent}>
                    <TextC text={"Jaun Valdez"} font={"Montserrat-Bold"} size={12} />
                    <TextC text={"Short meetUp"} font={"Montserrat-Medium"} size={12} />
                    <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 13, width: 13, marginRight: 3 }} source={require('../../assets/icons/calender.png')} />
                        <TextC text={'Oct 25 2024 - Oct 27 2024'} font={'Montserrat-Medium'} size={10} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', height: 23, marginTop: 8 }}>
                        <View style={styles.profileImages1}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile1.png')} />
                        </View>
                        <View style={styles.profileImages2}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile2.png')} />
                        </View>
                        <View style={styles.profileImages3}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile3.png')} />
                        </View>
                        <View style={styles.profileImages4}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile4.png')} />
                        </View>
                        <TextC text={"+2 more"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9', position: 'absolute', left: 55 }} size={10} />
                    </View>
                </View>
                <Image style={styles.LikeBtn} source={require('../../assets/icons/Like.png')} />
            </View>

            <View style={styles.Wrapper}>
                <Image style={styles.UpcomingImage} source={require("../../assets/icons/upcoming.png")} />
                <View style={styles.UpcomingContent}>
                    <TextC text={"Jaun Valdez"} font={"Montserrat-Bold"} size={12} />
                    <TextC text={"Short meetUp"} font={"Montserrat-Medium"} size={12} />
                    <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 13, width: 13, marginRight: 3 }} source={require('../../assets/icons/calender.png')} />
                        <TextC text={'Oct 25 2024 - Oct 27 2024'} font={'Montserrat-Medium'} size={10} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', height: 23, marginTop: 8 }}>
                        <View style={styles.profileImages1}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile1.png')} />
                        </View>
                        <View style={styles.profileImages2}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile2.png')} />
                        </View>
                        <View style={styles.profileImages3}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile3.png')} />
                        </View>
                        <View style={styles.profileImages4}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile4.png')} />
                        </View>
                        <TextC text={"+2 more"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9', position: 'absolute', left: 55 }} size={10} />
                    </View>
                </View>
                <Image style={styles.LikeBtn} source={require('../../assets/icons/Like.png')} />
            </View>

            <View style={styles.Wrapper}>
                <Image style={styles.UpcomingImage} source={require("../../assets/icons/upcoming.png")} />
                <View style={styles.UpcomingContent}>
                    <TextC text={"Jaun Valdez"} font={"Montserrat-Bold"} size={12} />
                    <TextC text={"Short meetUp"} font={"Montserrat-Medium"} size={12} />
                    <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 13, width: 13, marginRight: 3 }} source={require('../../assets/icons/calender.png')} />
                        <TextC text={'Oct 25 2024 - Oct 27 2024'} font={'Montserrat-Medium'} size={10} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', height: 23, marginTop: 8 }}>
                        <View style={styles.profileImages1}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile1.png')} />
                        </View>
                        <View style={styles.profileImages2}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile2.png')} />
                        </View>
                        <View style={styles.profileImages3}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile3.png')} />
                        </View>
                        <View style={styles.profileImages4}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile4.png')} />
                        </View>
                        <TextC text={"+2 more"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9', position: 'absolute', left: 55 }} size={10} />
                    </View>
                </View>
                <Image style={styles.LikeBtn} source={require('../../assets/icons/Like.png')} />
            </View>

            <View style={styles.Wrapper}>
                <Image style={styles.UpcomingImage} source={require("../../assets/icons/upcoming.png")} />
                <View style={styles.UpcomingContent}>
                    <TextC text={"Jaun Valdez"} font={"Montserrat-Bold"} size={12} />
                    <TextC text={"Short meetUp"} font={"Montserrat-Medium"} size={12} />
                    <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 13, width: 13, marginRight: 3 }} source={require('../../assets/icons/calender.png')} />
                        <TextC text={'Oct 25 2024 - Oct 27 2024'} font={'Montserrat-Medium'} size={10} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', height: 23, marginTop: 8 }}>
                        <View style={styles.profileImages1}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile1.png')} />
                        </View>
                        <View style={styles.profileImages2}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile2.png')} />
                        </View>
                        <View style={styles.profileImages3}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile3.png')} />
                        </View>
                        <View style={styles.profileImages4}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile4.png')} />
                        </View>
                        <TextC text={"+2 more"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9', position: 'absolute', left: 55 }} size={10} />
                    </View>
                </View>
                <Image style={styles.LikeBtn} source={require('../../assets/icons/Like.png')} />
            </View>

            <View style={styles.Wrapper}>
                <Image style={styles.UpcomingImage} source={require("../../assets/icons/upcoming.png")} />
                <View style={styles.UpcomingContent}>
                    <TextC text={"Jaun Valdez"} font={"Montserrat-Bold"} size={12} />
                    <TextC text={"Short meetUp"} font={"Montserrat-Medium"} size={12} />
                    <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 13, width: 13, marginRight: 3 }} source={require('../../assets/icons/calender.png')} />
                        <TextC text={'Oct 25 2024 - Oct 27 2024'} font={'Montserrat-Medium'} size={10} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', height: 23, marginTop: 8 }}>
                        <View style={styles.profileImages1}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile1.png')} />
                        </View>
                        <View style={styles.profileImages2}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile2.png')} />
                        </View>
                        <View style={styles.profileImages3}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile3.png')} />
                        </View>
                        <View style={styles.profileImages4}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile4.png')} />
                        </View>
                        <TextC text={"+2 more"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9', position: 'absolute', left: 55 }} size={10} />
                    </View>
                </View>
                <Image style={styles.LikeBtn} source={require('../../assets/icons/Like.png')} />
            </View>

            <View style={styles.Wrapper}>
                <Image style={styles.UpcomingImage} source={require("../../assets/icons/upcoming.png")} />
                <View style={styles.UpcomingContent}>
                    <TextC text={"Jaun Valdez"} font={"Montserrat-Bold"} size={12} />
                    <TextC text={"Short meetUp"} font={"Montserrat-Medium"} size={12} />
                    <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 13, width: 13, marginRight: 3 }} source={require('../../assets/icons/calender.png')} />
                        <TextC text={'Oct 25 2024 - Oct 27 2024'} font={'Montserrat-Medium'} size={10} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', height: 23, marginTop: 8 }}>
                        <View style={styles.profileImages1}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile1.png')} />
                        </View>
                        <View style={styles.profileImages2}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile2.png')} />
                        </View>
                        <View style={styles.profileImages3}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile3.png')} />
                        </View>
                        <View style={styles.profileImages4}>
                            <Image style={{ height: 23, width: 23 }} source={require('../../assets/icons/eventProfile4.png')} />
                        </View>
                        <TextC text={"+2 more"} font={'Montserrat-Medium'} style={{ color: '#D9D9D9', position: 'absolute', left: 55 }} size={10} />
                    </View>
                </View>
                <Image style={styles.LikeBtn} source={require('../../assets/icons/Like.png')} />
            </View>
        </>
    );
}

export default Upcoming;