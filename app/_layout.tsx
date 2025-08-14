import { Stack } from "expo-router";
import { MarkersProvider } from "../context/markers";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <MarkersProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" options={{ title: "Карта" }} />
        <Stack.Screen name="marker/[id]" options={{ title: "Детали маркера" }} />
      </Stack>
    </MarkersProvider>
  );
}