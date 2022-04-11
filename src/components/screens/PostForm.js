import React, { useState, useEffect } from 'react';
import {  View, Button, Image, StatusBar, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Title, Caption, Text, TouchableRipple, } from 'react-native-paper';
import Ionic from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";


const PostForm = ({navigation})=> {

  const location = ['제주도 서귀포시 천지동'];

  const [image, setImage] = useState(null);
  const [upload, setupload] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setupload(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  

  return (
    <View style={{flex:1,backgroundColor:'white',height:'100%'}}>
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
        <Ionic name="locate" style={{fontSize: 30}}/>
        <Text>{location}</Text>
        <Ionic name="notifications-outline" style={{fontSize:25}}/>
      </View>

      <View style={{
          alignItems:'center',
          justifyContent:'center',
          paddingTop:50,
          paddingBottom:20,
          paddingHorizontal:10, 
      }}>
          <View style={{
              width:'95%',
              height:350,
              backgroundColor:'#ffd2cf',
              borderRadius:10,
              alignItems:'center',
              justifyContent:'center',
          }}>
              <TouchableOpacity onPress={pickImage}>
                <Entypo name={upload ? '':'camera'} style={{fontSize:20}}/>
                {image && 
                <Image 
                    source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              </TouchableOpacity> 
          </View>
      </View>

      <View style={{
          alignItems:'center',
          justifyContent:'center',
          paddingVertical:10,
          paddingHorizontal:10,    
        }}>
          <View style={{
              width:'95%',
              height:150,
              backgroundColor:'#ffd2cf',
              borderRadius:10,
              alignItems:'center',
              justifyContent:'center',

          }}>
              <TextInput 
                style={{width:'95%'}}
                multiline
                numberOfLines={8}
                placeholder="글을 자유롭게 작성해보세요."
              />
          </View>
      </View>

      <View style={{alignItems:'flex-end',justifyContent:'center',padding:20}}>
          <TouchableOpacity style={{
            backgroundColor:'#ffd2cf',
            borderRadius:10,
            width:65, height:30, 
            alignItems:'center', justifyContent:'center',marginVertical:5}}
            onPress={()=>navigation.navigate("Home")}>
            <Text style={{fontSize:15,}}>
              업로드
            </Text>
          </TouchableOpacity>
          </View>

    </View>
  );
};

export default PostForm;