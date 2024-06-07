import React from "react";
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, Text, View, StyleSheet } from 'react-native';



const Story = () => {
    const width = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        StoryWrapper: {
            paddingVertical: 10
        },
        StoryContent: {
            height: 130,
            width: 90,
            backgroundColor: 'red',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row'
        }
    })
    return (
        <>
            <Carousel
                width={width}
                height={width / 2}
                autoPlay={false}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View style={styles.StoryContent}>
                        <Text>{index}</Text>
                    </View>
                )}
            />
        </>
    )
}

export default Story;

