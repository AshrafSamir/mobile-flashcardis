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
      },
    })
  );
}

export function addCardToDeck({ title, card }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    const res = JSON.parse(results);
    res[title].questions.push(card);
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(res));
  });
}
