import { AsyncStorage } from "react-native";
import { data, DECKS_STORAGE_KEY } from "./data";


export function saveIntialDataToStoarge() {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}

export function getDeck({ id }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    const res = JSON.parse(results);
    return res[id];
  });
}

export function saveDeckTitle({ title }) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      },
    })
  );
}

export function addCardToDeck( title, card ) {
  console.log("title", title);
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    const res = JSON.parse(results);
    const newData = {
      ...res,
      [title]: {
        ...res[title],
        questions: res[title].questions.concat(card),
      },
    };
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newData));
  });
}
export function removeDeck (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
