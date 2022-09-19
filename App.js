import AppLoading from "expo-app-loading";
import React from "react";
import * as Font from "expo-font";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled";

const queryClient = new QueryClient();

export default function App() {
  const [assets] = useAssets([require("./IMG_1860.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
