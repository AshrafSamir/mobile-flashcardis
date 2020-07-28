import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddDeck from "./AddDeck";
import ListDecks from "./ListDecks";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { purple, white } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { saveIntialDataToStoarge } from "../utils/api";
import StackNav from "./StackNav";

const RouteConfigs = {
  StackNav: {
    name: "Decks List",
    component: StackNav,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      ),
      title: "Decks List",
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

const Tabs = createMaterialTopTabNavigator();

export default class Tab extends Component {
  componentDidMount() {
    saveIntialDataToStoarge();
  }
  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Tabs.Navigator {...TabNavigatorConfig}>
            <Tabs.Screen {...RouteConfigs["StackNav"]} />
            <Tabs.Screen {...RouteConfigs["AddDeck"]} />
          </Tabs.Navigator>
        </View>
      </NavigationContainer>
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
