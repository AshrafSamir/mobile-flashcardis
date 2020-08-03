import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { View, StatusBar } from "react-native";
import reducer from "./reducers";
import { purple } from "./utils/colors";
import { setLocalNotification  } from "./utils/api";
import middleware from "./middleware";
import * as Constants from "expo-constants";
import StackNav from "./components/StackNav";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View
      style={{
        backgroundColor,
        height: Constants.statusBarHeight,
        marginBottom: 15,
      }}
    >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <StackNav />
        </View>
      </Provider>
    );
  }
}
