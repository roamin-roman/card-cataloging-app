import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Home from "./screens/Home";
import CreateCard from "./screens/CreateCard";
import CardInfo from "./screens/CardInfo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducers/reducer";
import { DarkTheme } from "react-native-paper";

const store = createStore(reducer);

const Stack = createStackNavigator();

const myOptions = {
    title: "Card Catalog",
    headerTintColor: "white",
    headerStyle: {
        backgroundColor: "#1ab844",
    },
};
function App() {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={myOptions}
                />
                <Stack.Screen
                    name="Create"
                    component={CreateCard}
                    options={{ ...myOptions, title: "Create Card" }}
                />
                <Stack.Screen
                    name="Card Info"
                    component={CardInfo}
                    options={{ ...myOptions, title: "Card Info" }}
                />
            </Stack.Navigator>
        </View>
    );
}

export default () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e3be4f",
    },
});
