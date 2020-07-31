import { AsyncStorage } from "react-native";
import { data, DECKS_STORAGE_KEY } from "./data";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

const NOTIFICATION_KEY = "FlashCard:notifications";

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

export function addCardToDeck(title, card) {
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
export function removeDeck(title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Todays Quiz!",
    body: "👋 don't forget to test your self today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
