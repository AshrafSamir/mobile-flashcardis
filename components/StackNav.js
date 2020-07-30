import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DeckDetails from "./DeckDetails";
import DeckLink from "./DeckLink";
import AddDeck from "./AddDeck";
import Tab from "./Tab";
import NewQuestion from "./NewQuestion";
import Quiz from "./Quiz";

const Stack = createStackNavigator();

function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tab" headerMode="screen">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Tab"
          component={Tab}
        />
        <Stack.Screen name="NewQuestion" component={NewQuestion} />
        <Stack.Screen name="AddDeck" component={AddDeck} />
        <Stack.Screen name="DeckLink" component={DeckLink} />
        <Stack.Screen name="DeckDetails" component={DeckDetails} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;
