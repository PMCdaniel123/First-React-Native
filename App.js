import { NavigationContainer } from "@react-navigation/native";
import { ArtProvider } from "./contexts/ArtContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./pages/DetailScreen";
import TabNavigator from "./components/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ArtProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ title: "Detail" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ArtProvider>
  );
}
