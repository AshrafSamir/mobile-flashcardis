import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions/decks";
import { getDecks, getDeck } from "../utils/api";
import DeckLink from "./DeckLink";

class ListDecks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then((results) => {
      dispatch(receiveDecks(JSON.parse(results)));
    });
  }

  render() {
    const { decks, keys } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View>
        {keys.map((key) => (
          <DeckLink
            key={key}
            deck={key}
            cardNumber={
              decks[key].questions !== undefined
                ? decks[key].questions.length
                : 0
            }
          />
        ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapStateToProps(decks) {
  return {
    decks: decks,
    keys: decks !== undefined ? Object.keys(decks) : [],
  };
}

export default connect(mapStateToProps)(ListDecks);
