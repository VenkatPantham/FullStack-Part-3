import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";

const HomeNavigator = createStackNavigator();

const HomeNavigatorScreen = () => {
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <HomeNavigator.Screen name="Home" component={Home} />
    </HomeNavigator.Navigator>
  );
};

const MenuNavigator = createStackNavigator();

const MenuNavigatorScreen = () => {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <MenuNavigator.Screen name="Menu" component={Menu} />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ headerTitle: "Dish Details" }}
      />
    </MenuNavigator.Navigator>
  );
};

const MainNavigator = createDrawerNavigator();

const MainNavigatorScreen = () => {
  return (
    <MainNavigator.Navigator
      drawerStyle={{
        backgroundColor: "#D1C4E9",
      }}
    >
      <MainNavigator.Screen name="Home" component={HomeNavigatorScreen} />
      <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} />
    </MainNavigator.Navigator>
  );
};

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
}

export default Main;