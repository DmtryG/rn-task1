import React, { useCallback } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useMarkers } from "../../context/markers";
import { ImageList } from "../../components/ImageList";
import { Ionicons } from "@expo/vector-icons";

export default function MarkerDetailsScreen() {
    const router = useRouter();
    const {id} = useLocalSearchParams<{id: string}>(); // получаем id маркера из url
    const {getMarker, addImageToMarker, removeImageFromMarker} = useMarkers();

    const marker = getMarker(String(id)); // находим маркер в контексте
    
    // выбираем изображения из галереи
    const pickImage = useCallback(async () => {
        try {
            // разрешение на доступ к медиатеке устройства
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status != "granted") {
                Alert.alert ("Не удалось получить доступ к медиатеке");
                return;
            }

            // открываем медиатеку
            const result = await ImagePicker.launchImageLibraryAsync ({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
            });

            // если пользователь выбрал изображение
            if (!result.canceled) {
                const asset = result.assets[0];
                addImageToMarker(String(id), {
                    id: Date.now().toString(),
                    uri: asset.uri,
                    width: asset.width,
                    height: asset.height,
                });
            }
        } catch (err) {
            console.error(err);
            Alert.alert ("Ошибка", "Произошла непредвиденная ошибка")
        }
    }, [addImageToMarker, id]);

    // если маркер не найден
    if (!marker) {
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}> Маркер не найден </Text>
            </View>
        );
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}> Маркер #{marker.id} </Text>
            <Text style = {styles.meta}> Количество изображений: {marker.images.length}</Text>

            <View style = {styles.actions}>
                <Pressable style = {styles.addBtn} onPress={pickImage}>
                    <Ionicons name="add-circle-outline" size={20} color="white" style={{ marginRight: 6 }} />
                    <Text style={styles.btnText}>Добавить изображение</Text>
                </Pressable>
            </View>

            <ImageList
            images = {marker.images}
            onRemove={(imageId) => removeImageFromMarker(marker.id, imageId)}
            />
        </View>
    )
}

const styles =StyleSheet.create({
    container: {flex: 1, padding: 16, backgroundColor: "#fff"},
    title: {fontSize: 20, fontWeight: "700", marginBottom: 8},
    meta: {fontSize: 14, opacity: 0.8, marginBottom: 4},
    actions: { flexDirection: "row", alignItems: "center", marginVertical: 12},
    addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: {color: "white", fontWeight: "600"},
});