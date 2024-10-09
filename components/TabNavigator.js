import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useContext } from "react";
import { ArtContext } from "../contexts/ArtContext";
import FavoritesScreen from "../pages/FavoritesScreen";
import HomeScreen from "../pages/HomeScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { favorites } = useContext(ArtContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavoritesScreen}
        options={{
            tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
          tabBarBadge: favorites.length,
          tabBarBadgeStyle: { backgroundColor: "red", fontSize: 10 },
        }}
      />
    </Tab.Navigator>
  );
}
