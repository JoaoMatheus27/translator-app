import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'white', // Set the background color here
          },
        }}
      />
    </Stack>
  );
}