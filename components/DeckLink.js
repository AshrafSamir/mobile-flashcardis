import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class DeckLink extends Component {
  render() {
    const { deck, cardNumber, navigation } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DeckDetails", {
              title: deck,
              number: cardNumber,
            });
          }}
          style={[styles.button]}
        >
          <Text style={styles.text}>{deck}</Text>
          <Text>{cardNumber} Cards</Text>
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
    borderBottomWidth: 2,
    borderColor: "#20232a",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    margin: 30,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

function mapStateToProps({}, { deck, cardNumber, navigation }) {
  return {
    deck: deck,
    cardNumber: cardNumber,
  };
}

export default connect(mapStateToProps)(DeckLink);
