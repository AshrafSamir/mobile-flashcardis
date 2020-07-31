import React, { Component } from "react";
import * as Constants from "expo-constants";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import { purple, white, gray } from "../utils/colors";
import { addCardToDeck } from "../utils/api";
import { addQuestion } from "../actions/decks";
import { TouchableOpacity } from "react-native-gesture-handler";

class NewQuestion extends Component {
  state = {
    question: "",
    answer: "",
  };
  handleQuestion = (e) => {
    const question = e.target.value;
    this.setState({
      question: question,
    });
  };
  handleAnswer = (e) => {
    const answer = e.target.value;
    this.setState({
      answer: answer,
    });
  };
  handleSubmit = () => {
    const { route, dispatch, navigation } = this.props;
    const { answer, question } = this.state;
    const { title, number } = route.params;
    const obj = {
      title: title,
      info: {
        question: question,
        answer: answer,
      },
    };
    const card = obj.info;
    addCardToDeck(title, card).then(() => {
      dispatch(addQuestion(obj));
      this.setState({
        answer: "",
        question: "",
      });
      navigation.navigate("DeckDetails", {
        title: title,
        number: number + 1,
      });
    });
  };
  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your question</Text>
        <TextInput
          value={question}
          style={styles.textInput}
          onChange={this.handleQuestion}
          placeholder={"   Question"}
        />
        <Text style={styles.title}>Your answer</Text>
        <TextInput
          value={answer}
          style={styles.textInput}
          onChange={this.handleAnswer}
          placeholder={"   Answer"}
        />
        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.add}
          onPress={(question && answer) !== "" ? this.handleSubmit : null}
          keyboardShouldPersistTaps={"handled"}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
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
    backgroundColor: gray,
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

export default connect(null)(NewQuestion);
