import React from 'react';
import { StatusBar, Image } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Ionic from "react-native-vector-icons/Ionicons";
import Home from './src/components/screens/Home';
import People from './src/components/screens/People';
import Search from './src/components/screens/Search';
import Chat from './src/components/screens/Chat';
import ChatWith from './src/components/screens/ChatWith';
import Profile from './src/components/screens/Profile';
import Login from './src/components/screens/Login';
import Signup from './src/components/screens/Signup';
import Status from './src/components/screenComponents/Status';
import PostForm from './src/components/screens/PostForm';
import Test from './src/components/screens/test';
import Test2 from './src/components/screens/test2';
import PostDetails from './src/components/screens/PostDetails';
import EditProfile from './src/components/screens/EditProfile';
import Menu from './src/components/screens/Menu';

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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Bottom" component={BottomTabScreen}/>
        <Stack.Screen name="PostForm" component={PostForm}/>
        <Stack.Screen name="Test" component={Test}/>
        <Stack.Screen name="Test2" component={Test2}/>
        <Stack.Screen name="PostDetails" component={PostDetails}
          options={({}) => ({
            title: '게시물',
            headerShown: true,
            headerBackTitleVisible:false,
          })}/>
        <Stack.Screen name="EditProfile" component={EditProfile}
          options={({}) => ({
            title: '프로필 수정',
            headerShown: true,
            headerBackTitleVisible:false,
          })}/>
        <Stack.Screen name="Menu" component={Menu}/>
        <Stack.Screen name="ChatWith" component={ChatWith} 
          options={({route}) => ({
            title: route.params.userName,
            headerShown: true,
            headerBackTitleVisible:false,
          })}/>
       
        <Stack.Screen name="Status" component={Status}/>
      </Stack.Navigator>
    </NavigationContainer>




  );
};

export default App;