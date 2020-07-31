import React, { Component } from "react";
import * as Constants from "expo-constants";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import { purple, white, gray } from "../utils/colors";
import { saveDeckTitle } from "../utils/api";
import { addDecks } from "../actions/decks";
import { TouchableOpacity } from "react-native-gesture-handler";

class AddDeck extends Component {
  state = {
    deckName: {},
    title: "",
  };
  handleInput = (e) => {
    const text = e.target.value;
    const obj = {
      [text]: {
        title: text,
        questions: [],
      },
    };
    this.setState({
      deckName: obj,
      title: text,
    });
  };
  handleSubmit = () => {
    const { dispatch, navigation } = this.props;
    const { deckName, title } = this.state;

    saveDeckTitle({ title }).then(() => {
      dispatch(addDecks(deckName));
      this.setState({
        deckName: {},
        title: "",
      });
      navigation.navigate("DeckDetails", {
        title: title,
        number: 0,
      });
    });
  };
  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add Deck</Text>
        <View style={styles.separator} />

        <TextInput
          value={title}
          style={styles.textInput}
          onChange={this.handleInput}
          placeholder={"    Deck Title"}
        />
        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.add}
          onPress={title !== "" ? this.handleSubmit : null}
          keyboardShouldPersistTaps={"handled"}
        >
          <Text style={styles.buttonText}>Add Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
  },
  add: {
    backgroundColor: purple,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: white,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    padding: 50,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginVertical: 8,
    color: gray,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default connect(null)(AddDeck);
