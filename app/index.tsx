import React, { useState } from "react";
import { Alert, ActivityIndicator, View, StyleSheet } from "react-native";
import MapView, { Marker, Region, LongPressEvent } from "react-native-maps";
import { useMarkers } from "../context/markers";
import { useRouter } from "expo-router";

const DEFAULT_REGION: Region = {
    latitude: 58.0105,
    longitude: 56.2294,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

export default function MapScreen() {
    const router = useRouter(); // навигация между экранами
    const { markers, addMarker } = useMarkers(); // получаем список маркеров и функцию добавления
    const [loaded, setLoaded] = useState(false); // статус загрузки карты

    const onLongPress = (e: LongPressEvent) => {
        try {
            const id = addMarker(e.nativeEvent.coordinate);
            router.push(`/marker/${id}`);

        } catch (err) {
            Alert.alert("Не удалось добавить маркер");
            console.error(err)
        }
    };

    return (
        <View style = {styles.container}>
            {!loaded && (
                <View style = {styles.loader}>
                    <ActivityIndicator size = "large" />
                </View>
            )}

            <MapView 
            style = {StyleSheet.absoluteFill}
            initialRegion = {DEFAULT_REGION}
            onMapReady={() => setLoaded (true)} // убираем лоадер после полной прогрузки карты
            onLongPress={onLongPress} 
            >
                {markers.map (m => (
                    <Marker
                    key = {m.id}
                    coordinate={m.coordinate}
                    title = {m.title ?? "Маркер"}
                    description = {`Изображений: ${m.images.length}`}
                    onPress={() => router.push(`/marker/${m.id}`)} // переход в детали
                    />
                ))}
                </MapView>
        </View>
    )

}

const styles = StyleSheet.create ({
    container: { flex: 1},
    loader: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
});