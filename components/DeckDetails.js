import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Constants from "expo-constants";
import { connect } from "react-redux";
import { purple, white, gray } from "../utils/colors";

class DeckDetails extends Component {
  render() {
    const { route, navigation } = this.props;
    const { title, number } = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{number} Cards</Text>

        <TouchableOpacity
          onPress={()=>{navigation.navigate("NewQuestion", {
            title: title,
            number: number,
          })}}
          style={styles.add}
        >
          <Text style={styles.buttonText}>Add Question</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.start}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: Constants.statusBarHeight,
    padding: 50,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
    color: gray,
  },
  count: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 8,
  },
  add: {
    width: "100%",
    backgroundColor: purple,
    padding: 10,
    alignItems: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  start: {
    width: "100%",

    backgroundColor: purple,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: white,
  },
});

function mapStateToProps() {
  return {
    deck: "deck",
    cardNumber: "cardNumber",
  };
}

export default connect(mapStateToProps)(DeckDetails);
