import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, Platform } from "react-native";
import AddDeck from "./components/AddDeck";
import ListDecks from "./components/ListDecks";
import reducer from "./reducers";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { saveIntialDataToStoarge } from "./utils/api";
import middleware from "./middleware";
import Tab from "./components/Tab";


export default class App extends Component {
  componentDidMount() {
    saveIntialDataToStoarge();
  }
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <Tab />
        </View>
      </Provider>
    );
  }
}
