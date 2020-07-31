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
    view: true,
    correct: 0,
    value: "Answer",
  };
  componentDidMount() {
    const { route } = this.props;
    const { title } = route.params;

    getDecks().then((result) => {
      const data = JSON.parse(result);
      console.log("data", data);
      this.setState({
        questions: data[title].questions,
        size: data[title].questions.length,
      });
    });
  }

  handleCorrect = () => {
    this.setState((prev) => {
      return {
        index: prev.index + 1,
        correct: prev.correct + 1,
      };
    });
  };
  handleIncorrect = () => {
    this.setState((prev) => {
      return {
        index: prev.index + 1,
      };
    });
  };
  handleViewAnswer = () => {
    this.setState((prev) => {
      return {
        view: !prev.view,
      };
    });
  };
  handleStartOver = () => {
    this.setState({
      index: 0,
      correct: 0,
    });
  };

  render() {
    const { route, navigation } = this.props;
    const { questions, size, index, view, correct, value } = this.state;
    const { title } = route.params;
    const loading = questions.length === 0;
    if (index === size && size !== 0) {
      return (
        <View style={styles.container}>
          <Text
            style={styles.title}
          >{`You have answered ${correct} correct questions.`}</Text>

          <TouchableOpacity onPress={this.handleStartOver} style={styles.add}>
            <Text  style={styles.buttonText}>
              Start Over
            </Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            onPress={() => {
              navigation.goBack(null);
            }}
            style={styles.start}
          >
            <Text style={styles.buttonText2}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (size === 0) {
      return (
        <View style={styles.container}>
          <View style={styles.top}>
            <Text
              style={styles.title}
            >{`Add questions first to start the Quiz.`}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.topLeft}>
            <Text>{`${index + 1}/${size}`}</Text>
          </View>
          <View style={styles.top}>
            <Text style={styles.title}>
              {loading
                ? null
                : view
                ? questions[index].question
                : questions[index].answer}
            </Text>
            <TouchableOpacity onPress={this.handleViewAnswer}>
              <Text style={{ color: red }}>{view ? `Answer` : `Question`}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={this.handleCorrect} style={styles.correct}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            onPress={this.handleIncorrect}
            style={styles.Incorrect}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      );
    }
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
  start: {
    width: "100%",
    borderRadius: 10,
    borderColor: gray,
    borderWidth: 1,
    backgroundColor: white,
    padding: 10,
    alignItems: "center",
  },
  add: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: gray,
    padding: 10,
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
