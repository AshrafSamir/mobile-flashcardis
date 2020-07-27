import React, { Component } from "react";

import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { purple } from "../utils/colors";
import { addDecks } from "../actions/decks";

class AddDeck extends Component {
  state = {
    deckName: {},
  };
  handleInput = (e) => {
    let text = e.target.value;
    let obj = {
      [text]: {
        title: text,
      },
    };
    this.setState({
      deckName: obj,
    });
    text = "";
    obj = {};
  };
  handleSubmit = () => {
    const { dispatch } = this.props;
    const { deckName } = this.state;
    dispatch(addDecks(deckName));
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>What is the title of your new deck</Text>
        </View>

        <View style={styles.textSection}>
          <TextInput
            onChange={this.handleInput}
            placeholder="Deck Title"
            style={styles.inputText}
          />
        </View>

        <View style={styles.buttonSection}>
          <Button
            onPress={this.handleSubmit}
            style={styles.button}
            title="Submit"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textSection: {
    width: "100%",
    height: "30%",
  },
  buttonSection: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    marginLeft: "20%",
    width: "60%",
  },
  button: {
    backgroundColor: purple,
    color: "white",
  },
  container: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default connect(null)(AddDeck);
