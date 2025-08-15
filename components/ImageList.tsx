import React from "react";
import { FlatList, Image, Pressable, StyleSheet, View, Text } from "react-native";
import type { MarkerImage } from "../types";

type Props = {
    images: MarkerImage[];
    onRemove: (imageId: string) => void;
};

export const ImageList: React.FC<Props> = ({ images, onRemove }) => {
    if (!images.length) {
        return <Text style = {styles.empty}> Изображения отсутствуют </Text>
    }

    return (
        <FlatList
        horizontal
        data = {images}
        keyExtractor={(item) => item.id}
        contentContainerStyle = {{paddingVertical: 8}}
        renderItem={({item}) => (
            <View style = {styles.card}>
                <Image source = {{ uri: item.uri }} style={styles.img}/>
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
    card: {
        marginHorizontal: 8,
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: StyleSheet.hairlineWidth,
    },
    img: { width: 14, height: 140},
    removeBtn: {
        paddingVertical: 6,
        alignItems: "center",
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#fff",
    },
    removeTxt: {color: "#cc0000", fontWeight: "600"}
})