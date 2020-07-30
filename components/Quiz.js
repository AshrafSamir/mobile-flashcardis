import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Constants from "expo-constants";
import { connect } from "react-redux";
import { white, gray, green, red } from "../utils/colors";
import { getDecks } from "../utils/api";
import { data } from "../utils/data";

class Quiz extends Component {
  state = {
    questions: [],
    index: 0,
    size: 0,
    view: false
  };
  componentDidMount() {
    const { route } = this.props;
    const { title } = route.params;

    getDecks().then((result) => {
      const data = JSON.parse(result);
      this.setState({
        questions: data[title].questions,
        size: data[title].questions.length,
      });
    });
  }
  render() {
    const { route, navigation } = this.props;
    const { questions, size, index, view } = this.state;
    const { title } = route.params;
    const loading = questions.length === 0;

    return (
      <View style={styles.container}>
        <View style={styles.topLeft}>
          <Text>{`${index}/${size}`}</Text>
        </View>
        <View style={styles.top}>
          <Text style={styles.title}>
            {loading ?  null : view ? questions[index].question: questions[index].answer}
          </Text>
          <TouchableOpacity>
            <Text style={{ color: red }}>Answer</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.correct}>
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.Incorrect}>
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topLeft: {
    width: "100%",
    height: "30%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  top: {
    width: "100%",
    height: "30%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
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
  correct: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: green,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  Incorrect: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: red,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: white,
  },
  buttons: {},
});

function mapStateToProps() {
  return {
    deck: "deck",
    cardNumber: "cardNumber",
  };
}

export default connect(mapStateToProps)(Quiz);
