import React, { useState } from 'react';
import { Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";

const Locate = ({navigation})=> {
  const [text,setText] = useState('');

  return (
    
    <View style={{ flex: 1, backgroundColor:'#fff' }}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>

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
          placeholder="동명(읍,면)으로 검색 (ex. 죽전동)"
          placeholderTextColor="#909090"
          onChangeText={(text) => setText(text)}
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

      <TouchableOpacity 
        activeOpacity={0.7} 
        style={{justifyContent:'center', alignItems:'center', width:'100%'}}
        onPress={()=>navigation.navigate("PresentLocate")}>
        <View style={{
            backgroundColor:'#ffbfbf', borderRadius:10,
            width:'94%', height:45, marginTop:20,
            alignItems:'center', justifyContent:'center', flexDirection:'row'
        }}>
            <Ionic name="locate" style={{fontSize:30,right:5,color:'#fff'}}/>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>현재 위치로 검색</Text>
        </View>
      </TouchableOpacity>  

      <View style={{padding:20}}>
        <View style={{paddingVertical:10}}>
            <Text style={{color:'#484848',fontSize:17,paddingBottom:10}}>
                '{text}' 검색 결과
            </Text> 
        </View>
        {/*
        <Text style={{color:'#484848',fontSize:15,paddingVertical:10,left:7,borderBottomColor:'#ffbfbf',borderBottomWidth:1}}>
            {text} 9-12
        </Text> 
        <Text style={{color:'#484848',fontSize:15,paddingVertical:10,left:7,borderBottomColor:'#ffbfbf',borderBottomWidth:1}}>
            {text} 4-25
        </Text> 
        */}
      </View>

      

    </View>
    
  );
};

export default Locate;