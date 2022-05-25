import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React,{ useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionic from "react-native-vector-icons/Ionicons";
import Evilcons from "react-native-vector-icons/EvilIcons";
import Stories from '../screenComponents/Stories';
import Post from '../screenComponents/Post';

const Home = ({navigation})=> {

  //화면 맨 위로
  const scrollRef = useRef();
  const scrollTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }
  
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 34
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  return (
    
    <View style={{flex:1,backgroundColor:'white', height:'100%'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <View style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingTop:35,
        paddingBottom:10,
        backgroundColor:'white',
        borderBottomColor:'#ffd2cf',
        borderBottomWidth:1.5,
      }}>
        <TouchableOpacity onPress={()=>navigation.navigate("Locate")}>
          <Ionic name="locate" style={{fontSize: 30}}/>
        </TouchableOpacity>
        <View style={{flexDirection:'row',alignItems:'baseline'}}>
          <Text style={{
            fontSize:25, fontWeight:'700', color:'tomato'}}>
            우
          </Text>
          <Text style={{
            fontSize:15, fontWeight:'700', color:'tomato',}}>
            리
          </Text>
          <Text style={{
            fontSize:25, fontWeight:'700', color:'tomato'}}>
            동
          </Text>
          <Text style={{
            fontSize:15, fontWeight:'700', color:'tomato',}}>
            네
          </Text>
        </View>
        <Ionic name="notifications-outline" style={{fontSize:25}}/>
      </View>

      <View ref={scrollRef}>
        {/*<Stories/>*/}
        <Post/>
        <View style={{
          justifyContent:'center',
          alignItems:'center',
          padding:20
        }}>
          <TouchableOpacity onPress={scrollTop}>
            <Ionic name="ios-reload-circle-sharp"
                   style={{fontSize:60, opacity:0.2}}/>
          </TouchableOpacity>
        </View>
      </View>

    </View>
    
  );
};

export default Home;