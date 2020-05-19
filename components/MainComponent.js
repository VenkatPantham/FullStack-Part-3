import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Contact from "./ContactComponent";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="About Us" component={About} />
    </Stack.Navigator>
  );
};

const MenuNavigator = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ headerTitle: "Dish Details" }}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="Contact Us" component={Contact} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: "#D1C4E9",
      }}
    >
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="About Us" component={AboutNavigator} />
      <Drawer.Screen name="Menu" component={MenuNavigator} />
      <Drawer.Screen name="Contact Us" component={ContactNavigator} />
    </Drawer.Navigator>
  );
};

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    );
  }
}

export default Main;
