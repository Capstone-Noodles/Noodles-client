import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionic from "react-native-vector-icons/Ionicons";
import Evilcons from "react-native-vector-icons/EvilIcons";
import Stories from '../screenComponents/Stories';
import Post from '../screenComponents/Post';

const Home = ()=> {
  return (
    
    <View style={{backgroundColor:'white', height:'100%'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <View style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingTop:35,
        paddingBottom:10,
        backgroundColor:'white'
      }}>
        <Ionic name="locate" style={{fontSize: 30}}/>
        <Text style={{
          fontSize:25, fontWeight:'500', color:'tomato'}}>
          우리동네
        </Text>
        <Ionic name="notifications-outline" style={{fontSize:25}}/>
      </View>

      <ScrollView>
        <Post/>
        <View style={{
          justifyContent:'center',
          alignItems:'center',
          padding:20
        }}>
          <Ionic name="ios-reload-circle-sharp"
                 style={{fontSize:60, opacity:0.2}}/>
        </View>
      </ScrollView>

    </View>
    
  );
};

export default Home;