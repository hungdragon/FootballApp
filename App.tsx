import { StatusBar } from "expo-status-bar";
import { Keyboard, StyleSheet, TouchableHighlightBase } from "react-native";
import { Provider } from "react-redux";
import { store } from "src/redux";
import RootStackNavigation from "src/navigations/RootStackNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import React from "react";

const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <RootStackNavigation />
      </Provider>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
