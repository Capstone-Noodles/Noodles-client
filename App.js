import React, { useContext } from "react";
import { StatusBar, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionic from "react-native-vector-icons/Ionicons";
import Home from "./src/components/screens/Home";
import People from "./src/components/screens/People";
import Search from "./src/components/screens/Search";
import Chat from "./src/components/screens/Chat";
import ChatWith from "./src/components/screens/ChatWith";
import Profile from "./src/components/screens/Profile";
import Login from "./src/components/screens/Login";
import Signup from "./src/components/screens/Signup";
import Status from "./src/components/screenComponents/Status";
import PostForm from "./src/components/screens/PostForm";
import Test from "./src/components/screens/test";
import Test2 from "./src/components/screens/test2";
import PostDetails from "./src/components/screens/PostDetails";
import EditProfile from "./src/components/screens/EditProfile";
import Menu from "./src/components/screens/Menu";
import Locate from "./src/components/screens/Locate";
import PresentLocate from "./src/components/screens/PresentLocate";
import { UserContext } from "./src/contexts/User";
import { UserProvider } from "./src/contexts/User";
import Follower from "./src/components/screens/Follower";
import Following from "./src/components/screens/Following";
import FriendProfile from "./src/components/screens/FriendProfile";
import Comment from "./src/components/screens/Comment";
import AllPosts from "./src/components/screens/AllPosts";
import SearchPost from "./src/components/screens/SearchPost";

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 80,
          },

          tabBarIcon: ({ focused, size, colour }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
              size = focused ? size + 4 : size + 2;
            } else if (route.name === "People") {
              iconName = focused ? "ios-people" : "ios-people-outline";
              size = focused ? size + 4 : size + 2;
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "ios-search-outline";
              size = focused ? size + 4 : size + 2;
            } else if (route.name === "Chat") {
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              size = focused ? size + 4 : size + 2;
            } else if (route.name === "Profile") {
              iconName = focused
                ? "ios-person-circle"
                : "ios-person-circle-outline";
              size = focused ? size + 4 : size + 2;
            }

            return <Ionic name={iconName} size={size} color={colour} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="People" component={People} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };

  const { user } = useContext(UserContext);
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={({}) => ({
              title: "회원가입",
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen name="Bottom" component={BottomTabScreen} />
          <Stack.Screen name="PostForm" component={PostForm} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Test2" component={Test2} />
          <Stack.Screen
            name="PostDetails"
            component={PostDetails}
            options={({}) => ({
              title: "게시물",
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={({}) => ({
              title: "프로필 수정",
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={({}) => ({
              title: "설정",
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="ChatWith"
            component={ChatWith}
            options={({ route }) => ({
              title: route.params.userName,
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="Locate"
            component={Locate}
            options={({}) => ({
              title: "위치 설정",
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen name="PresentLocate" component={PresentLocate} />
          <Stack.Screen
            name="Follower"
            component={Follower}
            options={({ route }) => ({
              title: "팔로워 " + route.params.follower + "명",
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="Following"
            component={Following}
            options={({ route }) => ({
              title: "팔로잉 " + route.params.following + "명",
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="FriendProfile"
            component={FriendProfile}
            options={({ route }) => ({
              title: route.params.id,
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="Comment"
            component={Comment}
            options={({ route }) => ({
              title: "댓글",
              headerShown: true,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen name="AllPosts" component={AllPosts} />

          <Stack.Screen name="Status" component={Status} />
          <Stack.Screen name="SearchPost" component={SearchPost} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
