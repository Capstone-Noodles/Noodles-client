import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionic from "react-native-vector-icons/Ionicons";
import Evilcons from "react-native-vector-icons/EvilIcons";
import Stories from '../screenComponents/Stories';
import PeoplePost from '../screenComponents/PeoplePost';

const People = ({navigation})=> {

  //화면 맨 위로
  const scrollRef = useRef();
  const scrollTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  return (
    
    <View style={{flex:1,backgroundColor:'white', height:'100%'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <View style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingTop: 35,
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

      <ScrollView>
        {/*<Stories/>*/}
        <PeoplePost/>
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
      </ScrollView>

    </View>
    
  );
};

export default People;