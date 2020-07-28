import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DeckDetails from "./DeckDetails";
import DeckLink from "./DeckLink";
import AddDeck from "./AddDeck";
import ListDecks from "./ListDecks";

const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator initialRouteName="ListDecks" headerMode="screen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="ListDecks"
        component={ListDecks}
      />
      <Stack.Screen name="DeckDetails" component={DeckDetails} />
      <Stack.Screen name="DeckLink" component={DeckLink} />
      <Stack.Screen name="AddDeck" component={AddDeck} />
    </Stack.Navigator>
  );
}

export default StackNav;
