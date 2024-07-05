import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Animated, FlatList, Pressable } from "react-native";
import TextC from "../text/text";
import { ResponsiveSize, global } from "../constant";
import LinearGradient from 'react-native-linear-gradient';
import { Easing } from 'react-native-reanimated';
import * as AllEventAction from "../../store/actions/Events/index";
import { connect } from "react-redux";
import TimeAgo from '@manu_omg/react-native-timeago';
import ButtonC from "../button/index";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SkeletonPlaceholder = ({ style, refreshing }) => {
    const translateX = new Animated.Value(-350);
    const styles = StyleSheet.create({
        container: {
            overflow: 'hidden',
            backgroundColor: '#F5F5F5',
            padding: ResponsiveSize(10),
            borderRadius: ResponsiveSize(25),
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
            marginBottom: ResponsiveSize(10)
        },
        imageWrapper: {
            width: ResponsiveSize(100),
            height: ResponsiveSize(100),
            borderRadius: ResponsiveSize(25),
            overflow: 'hidden',
        },
        textWrapper: {
            paddingLeft: ResponsiveSize(10),
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        titleStripe: {
            width: ResponsiveSize(140),
            height: ResponsiveSize(10),
            borderRadius: ResponsiveSize(5),
            overflow: 'hidden',
        },
        descriptionStripe: {
            width: ResponsiveSize(140),
            height: ResponsiveSize(40),
            borderRadius: ResponsiveSize(5),
            marginTop: ResponsiveSize(12),
            overflow: 'hidden',
        },
        gradient: {
            ...StyleSheet.absoluteFillObject,
        },
        linearGradient: {
            flex: 1,
            width: ResponsiveSize(350),
        },
        linearGradientLine: {
            flex: 1,
            width: ResponsiveSize(350),
        },
    });
    Animated.loop(
        Animated.timing(translateX, {
            toValue: 350,
            duration: 2000,
            easing: Easing.ease,
            useNativeDriver: true,
        })
    ).start();

    return (
        <View style={[styles.container, style]}>
            <View style={styles.imageWrapper}>
                <Animated.View style={[styles.gradient, { transform: [{ translateX }] }]}>
                    <LinearGradient
                        colors={['#F5F5F5', '#d5d5d5', '#F5F5F5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.linearGradient}
                    />
                </Animated.View>
            </View>
            <View style={styles.textWrapper}>
                <View style={styles.titleStripe}>
                    <Animated.View style={[styles.gradient, { transform: [{ translateX }] }]}>
                        <LinearGradient
                            colors={['#F5F5F5', '#d5d5d5', '#F5F5F5']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.linearGradientLine}
                        />
                    </Animated.View>
                </View>
                <View style={styles.descriptionStripe}>
                    <Animated.View style={[styles.gradient, { transform: [{ translateX }] }]}>
                        <LinearGradient
                            colors={['#F5F5F5', '#d5d5d5', '#F5F5F5']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.linearGradientLine}
                        />
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};
const AllEvents = ({ getAllEvents, AllEventReducer }) => {
    const [page, setPage] = useState(1)
    const navigation = useNavigation()
    useEffect(() => {
        if (AllEventReducer?.data?.length <= 0) {
            getAllEvents({ page: page, refreash: true })
        }
    }, []);
    const styles = StyleSheet.create({
        Wrapper: {
            backgroundColor: "#F5F5F5",
            padding: ResponsiveSize(10),
            borderRadius: ResponsiveSize(25),
            flexDirection: "row",
            alignItems: 'center',
            position: "relative",
            marginBottom: ResponsiveSize(10)
        },
        UpcomingImage: {
            width: ResponsiveSize(100),
            height: ResponsiveSize(100),
            borderRadius: ResponsiveSize(25)
        },
        UpcomingContent: {
            paddingLeft: 10
        },
        profileImages1: {
            height: ResponsiveSize(23),
            width: ResponsiveSize(23),
            backgroundColor: "red",
            borderRadius: ResponsiveSize(23),
            position: 'absolute',
            left: 0
        },
        profileImages2: {
            height: ResponsiveSize(23),
            width: ResponsiveSize(23),
            backgroundColor: "teal",
            borderRadius: ResponsiveSize(23),
            position: 'absolute',
            left: ResponsiveSize(10)
        },
        profileImages3: {
            height: ResponsiveSize(23),
            width: ResponsiveSize(23),
            backgroundColor: "yellow",
            borderRadius: ResponsiveSize(23),
            position: 'absolute',
            left: ResponsiveSize(20)

        },
        profileImages4: {
            height: ResponsiveSize(23),
            width: ResponsiveSize(23),
            backgroundColor: "gray",
            borderRadius: ResponsiveSize(23),
            position: 'absolute',
            left: ResponsiveSize(30)
        },
        LikeBtn: {
            position: 'absolute',
            top: ResponsiveSize(15),
            right: ResponsiveSize(15),
            height: ResponsiveSize(23),
            width: ResponsiveSize(23),
        },
        timeAgo: {
            position: 'absolute',
            bottom: ResponsiveSize(10),
            right: ResponsiveSize(10),
            fontFamily: "Montserrat-Medium",
            fontSize: ResponsiveSize(10)
        },

        notFound: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        joinedBadge: {
            borderWidth: 1,
            borderColor: global.secondaryColor,
            paddingHorizontal: ResponsiveSize(10),
            borderRadius: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(2),
            backgroundColor: global.secondaryColor,
            color: 'white',
            marginRight: ResponsiveSize(5),
        },
        timeAgoJoined: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: ResponsiveSize(5),
        },
        timeAgoJoinedV: {
            paddingBottom: ResponsiveSize(5),
        },
        timeAgoOwn: {
            borderWidth: 1,
            borderColor: global.primaryColor,
            paddingHorizontal: ResponsiveSize(10),
            borderRadius: ResponsiveSize(10),
            paddingVertical: ResponsiveSize(2),
            backgroundColor: global.primaryColor,
            color: 'white',
            marginRight: ResponsiveSize(5),
        }
    })
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = async () => {
        setPage(1)
        setRefreshing(true);
        const loadingEvent = await getAllEvents({ page: 1, refreash: true })
        if (loadingEvent == true) {
            setRefreshing(false);
        }
        else {
            setRefreshing(false);
        }
    }
    const renderItem = useCallback((items) => {
        return (
            <>
                <Pressable onPress={() => navigation.navigate('EventDetail', { id: items?.item?.event_id })} style={styles.Wrapper}>
                    <Image style={styles.UpcomingImage} src={items?.item?.event_cover_image_thumbnail} />
                    <View style={styles.UpcomingContent}>
                        {items?.item?.is_participant == 0 && items?.item?.is_my_event == 0 ?
                            <View style={styles.timeAgoJoinedV}>
                                <TimeAgo
                                    style={{ fontFamily: "Montserrat-Medium", fontSize: ResponsiveSize(10) }}
                                    time={items?.item?.created_at}
                                />
                            </View>
                            : ""
                        }
                        {items?.item?.is_participant == 1 ?
                            <View style={styles.timeAgoJoined}>
                                <View style={styles.joinedBadge}><TextC font={'Montserrat-Medium'} size={ResponsiveSize(10)} style={{ color: 'white' }} text={"Joined"} /></View>
                                <TimeAgo
                                    style={{ fontFamily: "Montserrat-Medium", fontSize: ResponsiveSize(10) }}
                                    time={items?.item?.created_at}
                                />
                            </View>
                            : ""
                        }
                        {items?.item?.is_my_event == 1 ?
                            <View style={styles.timeAgoJoined}>
                                <View style={styles.timeAgoOwn}><TextC font={'Montserrat-Medium'} size={ResponsiveSize(10)} style={{ color: 'white' }} text={"Organizer"} /></View>
                                <TimeAgo
                                    style={{ fontFamily: "Montserrat-Medium", fontSize: ResponsiveSize(10) }}
                                    time={items?.item?.created_at}
                                />
                            </View>
                            : ""
                        }
                        <TextC text={items?.item?.event_title} font={"Montserrat-Bold"} size={ResponsiveSize(12)} style={{ width: ResponsiveSize(140) }} ellipsizeMode={"tail"} numberOfLines={1} />
                        <TextC text={items?.item?.event_details} font={"Montserrat-Medium"} size={ResponsiveSize(10)} style={{ width: ResponsiveSize(140), paddingTop: ResponsiveSize(5) }} ellipsizeMode={"tail"} numberOfLines={2} />
                        <View style={{ paddingTop: ResponsiveSize(5), flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: ResponsiveSize(13), width: ResponsiveSize(13), marginRight: ResponsiveSize(3) }} source={require('../../assets/icons/calender.png')} />
                            <TextC text={items?.item?.event_date} font={'Montserrat-Medium'} size={ResponsiveSize(10)} />
                        </View>
                    </View>
                </Pressable >
            </>
        );
    }, []);

    return (
        <>
            {AllEventReducer?.loading ? (
                <>
                    <SkeletonPlaceholder />
                    <SkeletonPlaceholder />
                    <SkeletonPlaceholder />
                    <SkeletonPlaceholder />
                    <SkeletonPlaceholder />
                    <SkeletonPlaceholder />
                    <SkeletonPlaceholder />
                </>
            ) : AllEventReducer?.loading === false && AllEventReducer?.data?.length <= 0 ? (
                <View style={styles.notFound}>
                    <TextC text={"No Event Right Now"} font={'Montserrat-Bold'} size={ResponsiveSize(15)} />
                    <View style={{ paddingTop: ResponsiveSize(5), paddingHorizontal: ResponsiveSize(50) }}>
                        <TextC style={{ textAlign: 'center', color: global?.black }} text={"We couldn't find any event right now. Try to Create"} font={'Montserrat-Medium'} size={ResponsiveSize(10)} />
                    </View>
                    <View style={{ paddingTop: ResponsiveSize(15), paddingHorizontal: ResponsiveSize(50) }}>
                        <ButtonC onPress={() => navigation.navigate('AddEvent')} title={"Create New"} bgColor={global.primaryColor} TextStyle={{ color: global.white }} />
                    </View>
                </View>
            ) : (
                <FlatList
                    onRefresh={onRefresh}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={10}
                    refreshing={refreshing}
                    data={AllEventReducer?.data}
                    keyExtractor={(items, index) => index?.toString()}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    onEndReached={() => {
                        if (AllEventReducer?.data?.length > 10) {
                            getAllEvents({ page: page + 1, refreash: false })
                            setPage(page + 1)
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    renderItem={renderItem}
                />
            )}
        </>
    );
}
function mapStateToProps({ AllEventReducer }) {
    return { AllEventReducer };
}
export default connect(mapStateToProps, AllEventAction)(React.memo(AllEvents));