import React, { useState } from 'react';
import { Text, View, StatusBar, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const searched = [
  {
    id: '1',
    text: '단국대'
  },
  {
    id: '2',
    text: '단국대 죽전'
  },
  {
    id: '3',
    text: '단국대 천안'
  },
];


const Search = ({navigation})=> {
  return (
    
    <View style={{ flex: 1, backgroundColor:'#fff' }}>
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
        borderBottomWidth:3,
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

      <View 
        style={{
          justifyContent:'center',
          alignItems:'center',
          width:'100%',
          paddingTop:10, 
        }}>
        <Ionic 
          name="search"
          style={{fontSize:20, opacity:0.7, position:'absolute', zIndex:1, left:25, paddingTop:10}}/>
        <TextInput 
          placeholder="검색어를 입력하세요."
          placeholderTextColor="#909090"
          style={{
            width:'94%',
            height:40,
            backgroundColor:'#EBEBEB',
            borderRadius:10,
            alignItems:'center',
            justifyContent:'center',
            fontSize:18,
            padding:4,
            paddingLeft:40,
          }}/>
      </View>

{/*
      <View 
        style={{
          justifyContent:'center',
          alignItems:'center',
          width:'100%',
          paddingVertival:10,
          position:'relative',
        }}>
        <Ionic 
          name="search"
          style={{fontSize:20, opacity:0.7, position:'absolute', zIndex:1, left:25}}/>
        <TextInput 
          placeholder="검색어를 입력하세요."
          placeholderTextColor="#909090"
          style={{
            width:'94%',
            backgroundColor:'#EBEBEB',
            borderRadius:10,
            alignItems:'center',
            justifyContent:'center',
            fontSize:16,
            padding:4,
            paddingLeft:40,
          }}/>
      </View>
*/}

      <View style={{padding:15}}>
        <Text style={{color:'#484848',fontSize:14,paddingBottom:10}}>
          최근 검색어
        </Text>
        <FlatList 
          data={searched}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <View style={{padding:5,flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{color:'#000',fontSize:17,}}>{item.text}</Text>
              <TouchableOpacity >
                <AntDesign name="delete" style={{fontSize:15}}/>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

    </View>
    
  );
};

export default Search;