import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { LatLng } from "react-native-maps";
import type { MapMarker, MarkerImage, MarkerId } from "../types";

// описываем, что хранит и предоставляет контекст
type MarkersContextValue = {
    markers: MapMarker[];
    addMarker: (coordinate: LatLng, title?: string) => MarkerId;
    getMarker: (id: MarkerId) => MapMarker | undefined;
    addImageToMarker: (markerId: MarkerId, image: MarkerImage) => void;
    removeImageFromMarker: (markerId: MarkerId, imageId: string) => void;
};

// создаем контекст
const MarkersContext = createContext<MarkersContextValue | undefined>(undefined); 

// провайдер, оборачивающий все приложение
export const MarkersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [markers, setMarkers] = useState<MapMarker[]>([]); // состояние всех маркеров

    const addMarker = useCallback((coordinate: LatLng, title?: string): MarkerId => {
        const id = Date.now().toString(); // генерируем id маркера по времени
        setMarkers( prev => [
            ...prev,
            { id, coordinate, title, createdAt: Date.now(), images: [] }
        ]);
        return id;
    }, []);

    const getMarker = useCallback((id: MarkerId) => {
        return markers.find( m => m.id === id);
    }, [markers]);

    const addImageToMarker = useCallback((markerId: MarkerId, image: MarkerImage) => {
        setMarkers(prev => 
            prev.map(m => m.id === markerId ? { ...m, images: [...m.images, image] }: m)
        );
    }, []);

    const removeImageFromMarker = useCallback((markerId: MarkerId, imageId: string) => {
        setMarkers (prev => 
            prev.map(m => m.id === markerId ? { ...m, images: m.images.filter(img => img.id !== imageId) }: m)
        );
    }, []);

    const value = useMemo(() => ({
        markers, addMarker, getMarker, addImageToMarker, removeImageFromMarker
    }), [markers, addMarker, getMarker, addImageToMarker, removeImageFromMarker]);

    // возвращаем провайдер с готовым api
    return <MarkersContext.Provider value = {value}> {children} </MarkersContext.Provider>;
};

// кастомный хук для удобного доступа к контексту
export const useMarkers = (): MarkersContextValue => {
    const ctx = useContext(MarkersContext);
    if (!ctx) throw new Error ("useMarkers должен быть использован вместе с MarkersProvider");
    return ctx;
}
