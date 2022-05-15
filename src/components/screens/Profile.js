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

const Profile = ({navigation}) => {

  //로그아웃
  /*const [userDetails,setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };*/
  const logout = () => {
    //AsyncStorage.setItem('user',JSON.stringify({...userDetails,loggedIn:false}),);
    navigation.navigate("Login");
  };


  const userNickname = '빵이';
  const userStateMessage = '@J_bread';
  const follower ='4';
  const following='1';

  //  
  const [image, setImage] = useState(null);
  const getData = data => {
    setImage(data);
  }
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    //
    <ScrollView style={{flex:1,backgroundColor:'white', height:'100%'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      
      <View style={{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal: 15,
        alignItems:'center',
        paddingTop:35,
        paddingBottom:10,
        backgroundColor:'white',
        borderBottomColor:'#ffd2cf',
        borderBottomWidth:3,
      }}>
        <Ionic name="locate" style={{fontSize:30}}/>
        <View style={{flexDirection:'row',alignItems:'baseline',paddingLeft:36}}>
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
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>navigation.navigate("PostForm")}>
            <AntDesign name="form" style={{fontSize:20,paddingRight:10}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("Menu")}>
            <Ionic name="menu-sharp" style={{fontSize:30}}/>
          </TouchableOpacity>
        </View>
      </View>



      <View style={{paddingHorizontal:15, marginTop:10}}>
        <View style={{alignItems:'flex-end',paddingBottom:0}}>
            <TouchableOpacity onPress={()=>navigation.navigate("EditProfile")}>
              <Icons name="account-edit-outline" style={{fontSize:20}}/>
            </TouchableOpacity>
        </View>
        <View style={{alignItems:'center'}}>
            <Avatar.Image
                  source={require('../../storage/images/fig.jpg')}
                  size={130}
                />
            <View style={{alignItems:'center',paddingTop:10}}>
              <Title style={{fontSize:20,fontWeight:'bold'}}>{userNickname}</Title>
               <Caption style={{
                 fontSize:13,fontWeight:'500',lineHeight:14}}>{userStateMessage}</Caption>
            </View>
            
            <View style={{
              marginTop:10, alignItems:'center',
              flexDirection:'row', paddingHorizontal: 20,
              }}>
              <TouchableOpacity onPress={()=>navigation.navigate("Follower",{follower:follower})}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Title style={{fontSize:13,fontWeight:'bold'}}>
                    팔로워 </Title>
                  <Caption style={{fontSize:13,fontWeight:'500',lineHeight:14}}>
                    {follower}</Caption>
                </View>
              </TouchableOpacity>
              <View style={{paddingHorizontal:30}}></View>
              <TouchableOpacity onPress={()=>navigation.navigate("Following",{following:following})}>
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
        <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>navigation.navigate("Test")}>
          <Text style={{fontSize:13}}>
            편집{'   '}
          </Text>
        </TouchableOpacity>

        <MyPost data={getData}/>
        
        <TouchableOpacity style={{alignItems:'center'}}>
        <Text>
          전체 게시물 보기
        </Text>
      </TouchableOpacity>
      </View>

      {
        image ?
        (
          <View style={{
            position:'absolute',
            zIndex:1,
            width:'100%',
            height:'100%',
            backgroundColor:'rgba(52,52,52,0.8)'
          }}>
            <StatusBar backgroundColor="#525252" barStyle="dark-content"/>
            <View style={{
              position:'absolute',
              top:windowHeight/6,
              left:windowWidth/18,
              backgroundColor:'white',
              width:350,
              height:465,
              borderRadius:15,
              zIndex:1,
              elevation:50,
            }}>
              <View style={{
                flexDirection:'row',
                alignItems:'center',
                paddingVertical:10,
                paddingHorizontal:15
              }}>
                <Image source={image} style={{
                  width:30,
                  height:30,
                  borderRadius:100}}/>
                  <View style={{paddingLeft:8}}>
                    <Text style={{fontSize:12,fontWeight:'600'}}>
                      빵이
                    </Text>
                  </View>
              </View>
              <Image source={image} style={{width:'100%',height:'80%'}}/>
              <View style={{
                justifyContent:'space-around',
                width:'100%',
                flexDirection:'row',
                alignItems:'center',
                padding:8,
              }}>
                <Ionic name="ios-heart-outline" style={{fontSize:26}}/>
                <Ionic name="ios-person-outline" style={{fontSize:26}}/>
                <Feather name="navigation" style={{fontSize:26}}/>
              </View>
            </View>
          </View>
        ) : null
      }
      

    </ScrollView>
  );
};

export default Profile;