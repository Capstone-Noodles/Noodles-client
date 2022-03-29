import React from 'react';
import { Text, View, Image } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from './src/components/screens/Home';
import People from './src/components/screens/People';
import Search from './src/components/screens/Search';
import Chat from './src/components/screens/Chat';
import Profile from './src/components/screens/Profile';
import Ionic from "react-native-vector-icons/Ionicons";
import Status from './src/components/screenComponents/Status';



const App = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTabScreen = () => {
    return(
      <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle:{
          height: 50
        },

        tabBarIcon: ({focused, size, colour}) => {
          let iconName;
          if(route.name==="Home") {
            iconName = focused ? "home" : "home-outline";
            size = focused ? size+4 : size+2;
          }
          else if(route.name==="People") {
            iconName = focused ? "ios-people" : "ios-people-outline"
            size = focused ? size+4 : size+2;
          }
          else if(route.name==="Search") {
            iconName = focused ? "search" : "ios-search-outline"
            size = focused ? size+4 : size+2;
          }
          else if(route.name==="Chat") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline"
            size = focused ? size+4 : size+2;
          }
          else if(route.name==="Profile") {
            iconName = focused ? "ios-person-circle" : "ios-person-circle-outline"
            size = focused ? size+4 : size+2;
          }

          return <Ionic name={iconName} size={size} color={colour}/>
        }

      })}>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="People" component={People}/>
        <Tab.Screen name="Search" component={Search}/>
        <Tab.Screen name="Chat" component={Chat}/>
        <Tab.Screen name="Profile" component={Profile}/>

      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Bottom" component={BottomTabScreen}/>
        <Stack.Screen name="Status" component={Status}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;