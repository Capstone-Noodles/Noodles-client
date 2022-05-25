import React, { useState, useEffect } from 'react';
import {  View, Button, Image, StatusBar, TouchableOpacity, ScrollView,Dimensions } from 'react-native';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Title, Caption, Text, TouchableRipple, } from 'react-native-paper';
import Ionic from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MyPost from '../screenComponents/MyPost';
import PostForm from './PostForm';

const FriendProfile = ({route,navigation}) => {
  const {id, nickname, profileImage, stateMessage, follow, post, followers, following} = route.params;
  const [follow_,setFollow_] = useState(follow);
  return (
    <ScrollView style={{flex:1,backgroundColor:'white', height:'100%'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <View style={{paddingHorizontal:15, marginTop:20}}>
        <View style={{alignItems:'center'}}>

            <Avatar.Image
                  source={profileImage}
                  size={130}
                />
            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
            <TouchableOpacity
                style={{width: 68 }}
                onPress={() => setFollow_(!follow_)}>
                <View
                    style={{
                      backgroundColor: follow_ ? '#DEDEDE':'#ffbfbf',
                      width:'100%',
                      height:30,
                      borderRadius:5,
                      justifyContent:'center',
                      alignItems:'center'
                    }}>
                    <Text style={{color:follow_ ? '#6A6A6A':'#fff',fontWeight:'bold'}}>
                      {follow_ ? '팔로잉':'팔로우'}
                    </Text>
                    </View>
            </TouchableOpacity>
            <View style={{alignItems:'center',paddingTop:10}}>
              <Title style={{fontSize:20,fontWeight:'bold'}}>{nickname}</Title>
               <Caption style={{
                 fontSize:13,fontWeight:'500',lineHeight:14}}>{stateMessage}</Caption>
            </View>
            <TouchableOpacity
                style={{width: follow? 72:68}}
                onPress={() => navigation.navigate("ChatWith",{userName:nickname, userImg:profileImage})}>
                <View
                    style={{
                      backgroundColor: '#ffbfbf',
                      width:'100%',
                      height:30,
                      borderRadius:5,
                      justifyContent:'center',
                      alignItems:'center'
                    }}>
                    <Text style={{color:'#fff',fontWeight:'bold'}}>
                      메세지
                    </Text>
                    </View>
            </TouchableOpacity>
            </View>
            
            <View style={{
              marginTop:10, alignItems:'center',
              flexDirection:'row', paddingHorizontal: 20,
              }}>
              <TouchableOpacity>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Title style={{fontSize:13,fontWeight:'bold'}}>
                    팔로워 </Title>
                  <Caption style={{fontSize:13,fontWeight:'500',lineHeight:14}}>
                    {followers}</Caption>
                </View>
              </TouchableOpacity>
              <View style={{paddingHorizontal:30}}></View>
              <TouchableOpacity>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Title style={{fontSize:13,fontWeight:'bold'}}>
                    팔로잉 </Title>
                  <Caption style={{fontSize:13,fontWeight:'500',lineHeight:14}}>
                    {following}</Caption>
                </View>
              </TouchableOpacity>
            </View>  

            
            
        </View>
      </View>




      <View style={{paddingTop:15}}>

        <MyPost/>
        
        <TouchableOpacity style={{alignItems:'center'}}>
        <Text>
          전체 게시물 보기
        </Text>
      </TouchableOpacity>
      </View>

      
      

    </ScrollView>
  );
};

export default FriendProfile;