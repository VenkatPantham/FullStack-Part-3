import React, { Component } from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Login from "./LoginComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Favorites from "./FavoriteComponent";
import Reservation from "./ReservationComponent";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HeaderOptions = {
  headerStyle: {
    backgroundColor: "#512DA8",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
  },
};

const MenuIcon = (props) => {
  return (
    <Icon
      name="menu"
      size={24}
      color="white"
      onPress={() => props.navigation.toggleDrawer()}
    />
  );
};

const LoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={HeaderOptions}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={HeaderOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

const AboutUsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="About Us" screenOptions={HeaderOptions}>
      <Stack.Screen
        name="About Us"
        component={About}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

const MenuNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Menu" screenOptions={HeaderOptions}>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ headerTitle: "Dish Detail" }}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contact Us"
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="Contact Us"
        component={Contact}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

const FavoritesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="My Favorites"
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="My Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

const ReservationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Reserve Table"
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="Reserve Table"
        component={Reservation}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <View style={styles.drawerHeader}>
      <View style={{ flex: 1 }}>
        <Image
          source={require("./images/logo.png")}
          style={styles.drawerImage}
        />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
      </View>
    </View>
    <DrawerItemList {...props} />
  </ScrollView>
);

const MainNavigatorDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: "#D1C4E9",
      }}
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
    >
      <Drawer.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="sign-in" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="home" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="list" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Favorites"
        component={FavoritesNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="heart" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reserve Table"
        component={ReservationNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="cutlery" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
      <NavigationContainer>
        <MainNavigatorDrawer />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
