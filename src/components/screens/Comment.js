import React from 'react';
import { Text, View,TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Comment = ()=> {
  return (
    <View style={{ flex: 1, backgroundColor:'#fff' }}>

      <View 
        style={{
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'row',
          width:'100%',
          paddingTop:10, 
        }}>
        <Image
          source={require("../../storage/images/fig.jpg")}
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
        <TextInput 
          placeholder="댓글을 입력하세요."
          placeholderTextColor="#909090"
          style={{
            width:'75%',
            height:40,
            backgroundColor:'#fff',
            borderRadius:10,
            borderColor:'#D9D9D9',
            borderWidth:2,
            alignItems:'center',
            justifyContent:'center',
            fontSize:18,
            padding:4,
            paddingLeft:10,
            left:5,
          }}/>
        <TouchableOpacity>
          <Icon 
            name='send-circle' 
            size={35} 
            color='#ffbfbf' 
            style={{left:10}}/>
        </TouchableOpacity>
      </View>

    </View>
    
  );
};

export default Comment;