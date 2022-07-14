/**
 * Renders post data flatlist on Search page
 * @param {Array} data - array of objects of post data pulled from database
 * @param {Array} navigation - Stack navigator
 */
import React from "react";
import { StyleSheet, Text, View, FlatList, Image, Pressable } from "react-native";

const FlatlistItem = ({data, navigation}) => {
    const navigatePage = () => {
        navigation.push("Post", { data: data });
    }
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Pressable onPress={navigatePage}>
                    <Image style={{ width: "100%", height: "100%", borderRadius: 40 }} source={{
                        uri: data.post_img_src
                    }} />
                </Pressable>
            </View>
            <Pressable onPress={navigatePage} style={styles.textContainer}>
                <Text style={{ color: "#fff" }}>{data.post_title}</Text>
            </Pressable>
        </View>
    );
}

const SearchPostsFlatlist = (props) => {
    return(
        <FlatList data={props.data} renderItem={({item}) => (
            <FlatlistItem data={item} navigation={props.navigation} />
        )} keyExtractor={(item) => item.post_id} />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "#393E42"
    },
    imageContainer: {
        width: 60,
        height: 60
    },
    textContainer: {
        width: "80%",
        justifyContent: "center",
        marginHorizontal: 20
    }
});

export default SearchPostsFlatlist;
