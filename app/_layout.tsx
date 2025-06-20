import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "./components/themeContext";
import { GroupProvider } from "./components/groupProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <ThemeProvider>
          <GroupProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </GroupProvider>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
