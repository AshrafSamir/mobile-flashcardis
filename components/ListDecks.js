import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions/decks";
import { getDecks } from "../utils/api";
import DeckLink from "./DeckLink";

class ListDecks extends Component {
  state = {
    titles: [],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then((results) => {
      console.log("testasd", JSON.parse(results));
      if (JSON.parse(results) !== null) {
        dispatch(receiveDecks(JSON.parse(results)));
      }
    });
  }

  render() {
    const { decks, keys, loading } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View>
          {loading
            ? null
            : keys.map((key) => (
                <DeckLink
                  key={key}
                  deck={key}
                  navigation={this.props.navigation}
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
    loading: decks === undefined,
    decks: decks,
    keys: decks !== undefined ? Object.keys(decks) : [],
  };
}

export default connect(mapStateToProps)(ListDecks);
