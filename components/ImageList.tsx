import React from "react";
import { FlatList, Image, Pressable, StyleSheet, View, Text } from "react-native";
import type { MarkerImage } from "../types";

type Props = {
    images: MarkerImage[];
    onRemove: (imageId: string) => void;
};

const CARD_IMG_SIZE = 140;
const CARD_FOOTER_HEIGHT = 38;
const CARD_WIDTH = CARD_IMG_SIZE;
const LIST_HEIGHT = CARD_IMG_SIZE + CARD_FOOTER_HEIGHT + 16;

export const ImageList: React.FC<Props> = ({ images, onRemove }) => {
    if (!images.length) {
        return <Text style = {styles.empty}> Изображения отсутствуют </Text>
    }

    return (
        <FlatList
        horizontal
        data = {images}
        keyExtractor={(item) => item.id}
        style = {{ height: LIST_HEIGHT }}
        showsHorizontalScrollIndicator = {false}
        contentContainerStyle = {styles.content}
        renderItem={({item}) => (
            <View style = {styles.card}>
                <Image source = {{ 
                    uri: item.uri }} 
                    style={styles.img}
                    resizeMode="cover"
                    />
                <Pressable onPress = {() => onRemove(item.id)} style = {styles.removeBtn}>
                    <Text style = {styles.removeTxt}> Удалить </Text>
                </Pressable>
            </View>
        )}
        />
    );
};

const styles = StyleSheet.create ({
    empty: {paddingVertical: 12, opacity: 0.6},
    content: {
        paddingVertical: 8,
        alignItems: "flex-start",
    },
    card: {
        width: CARD_WIDTH,
        marginHorizontal: 8,
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#fff",
    },
    img: { width: "100%", 
        height: CARD_IMG_SIZE,
        alignSelf: "stretch",
    },
    removeBtn: {
        height: CARD_FOOTER_HEIGHT,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#fff",
        paddingHorizontal: 8,
    },
    removeTxt: {color: "#cc0000", fontWeight: "600"}
})