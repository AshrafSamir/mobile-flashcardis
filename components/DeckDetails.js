import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Constants from "expo-constants";
import { connect } from "react-redux";
import { purple, white, gray, black, red } from "../utils/colors";
import { removeDeck, getDecks } from "../utils/api";
import { receiveDecks } from "../actions/decks";

class DeckDetails extends Component {
  handleDelte = () => {
    const { route, navigation, dispatch } = this.props;
    const { title } = route.params;
    removeDeck(title).then(dispatch(removeDeck(title)));
    navigation.navigate("Tab");
  };
  render() {
    const { route, navigation } = this.props;
    const { title, number } = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{number} Cards</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewQuestion", {
              title: title,
              number: number,
            });
          }}
          style={styles.add}
        >
          <Text style={styles.buttonText}>Add Question</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.start}
          onPress={() => {
            navigation.navigate("Quiz", {
              title: title,
              number: number,
            });
          }}
        >
          <Text style={styles.buttonText2}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleDelte} style={{ margin: 20 }}>
          <Text style={{ color: red }}>Delete Deck</Text>
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
    borderRadius: 10,
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
    borderRadius: 10,
    borderColor: gray,
    borderWidth: 1,
    backgroundColor: white,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: white,
  },
  buttonText2: {
    color: gray,
  },
});

function mapStateToProps() {
  return {
    deck: "deck",
    cardNumber: "cardNumber",
  };
}

export default connect(mapStateToProps)(DeckDetails);
