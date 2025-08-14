import type { LatLng } from "react-native-maps";

export type MarkerId = string;

export interface MarkerImage {
    id: string,
    uri: string,
    width?: number;
    height?: number;
}

export interface MapMarker {
    id: MarkerId;
    coordinate: LatLng;
    title?: string;
    createdAt: number;
    images: MarkerImage[];
}

export type RouterParams = {
    "index": undefined;
    "marker/[id]": { id: string };
};