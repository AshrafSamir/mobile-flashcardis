import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, Platform } from "react-native";
import AddDeck from "./components/AddDeck";
import ListDecks from "./components/ListDecks";
import reducer from "./reducers";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { saveIntialDataToStoarge } from "./utils/api";
import middleware from "./middleware";

import { Constants } from "expo";

const RouteConfigs = {
  ListDecks: {
    name: "List Decks",
    component: ListDecks,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      ),
      title: "List Decks",
    },
  },
  AddDeck: {
    component: AddDeck,
    name: "Add Deck",
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
      title: "New Deck",
    },
  },
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const Tab = createMaterialTopTabNavigator();

export default class App extends Component {
  componentDidMount() {
    saveIntialDataToStoarge();
  }
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator {...TabNavigatorConfig}>
              <Tab.Screen {...RouteConfigs["ListDecks"]} />
              <Tab.Screen {...RouteConfigs["AddDeck"]} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
