import React, { useState, useEffect, useContext, useCallback } from 'react';
import {  View, Button, Image, StatusBar, TouchableOpacity,Dimensions } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Title, Caption, Text, TouchableRipple, } from 'react-native-paper';
import Ionic from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MyPost from '../screenComponents/MyPost';
import PostForm from './PostForm';
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";

const FriendProfile = ({route, navigation}) => {
  const { user } = useContext(UserContext);
  const {id, identification, profileImage, follow, userIdx} = route.params;
  const [nickname, setNickname] = useState();
  const [follow_,setFollow_] = useState(false);
  const [stateMessage, setStateMessage] = useState();
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();
  const [postList, setPostList] = useState([]);
  const { dispatch } = useContext(UserContext);

    const _handleFollowPress = useCallback(async() => {
        try {
            axios({
                method: 'post',
                url: 'http://133.186.228.218:8080/following/'+userIdx,
                headers: {
                    "x-auth-token": `${user?.accessToken}`,
                }
            })
                .then(function(response){
                    setFollow_(!follow_)
                    dispatch({
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken,
                        id: user.id,
                        location: user.location,
                        latitude: user.latitude,
                        longitude: user.longitude
                    });
                    return response.data;
                })
                .catch(function(error){
                    console.log(error);
                    alert("Error",error);
                });
        } catch (e) {
        } finally {
        }
    }, [user, userIdx, setFollow_, follow_, dispatch]);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://133.186.228.218:8080/mypage/"+userIdx,
            headers: {
                "x-auth-token": `${user?.accessToken}`,
            },
        })
            .then((response) => {
                const result = response.data.result.mypageList[0];
                // console.log("--------------------------------------");
                // console.log(result.result.mypageList);
                // console.log(result.follower);
                setStateMessage(result.description);
                setFollower(result.follower);
                setFollowing(result.following);
                setFollow_(result.isFollowed);
                setNickname(result.nickname);

                const imageListString = result.imageList;
                const imageList = imageListString.split(",");

                const postIdxListString = result.postIdxList;
                const postIdxList = postIdxListString.split(",");

                const data = [];
                for (let i = 0; i < imageList.length; i++) {
                    data.push({
                        image: imageList[i],
                        idx: postIdxList[i],
                    });
                }
                setPostList(data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [setPostList, user]);

    const [image, setImage] = useState(null);
  return (
    <ScrollView style={{flex:1,backgroundColor:'white', height:'100%'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <View style={{paddingHorizontal:15, marginTop:20}}>
        <View style={{alignItems:'center'}}>

            <Avatar.Image
                  source={{uri:`${profileImage}`}}
                  size={130}
                />
            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
            <TouchableOpacity
                style={{width: 68 }}
                onPress={_handleFollowPress}>
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
                onPress={() => navigation.navigate("ChatWith",{userName:identification, userImg:profileImage})}>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Follower", { follower: follower, id: userIdx })
                }}
              >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Title style={{fontSize:13,fontWeight:'bold'}}>
                    팔로워 </Title>
                  <Caption style={{fontSize:13,fontWeight:'500',lineHeight:14}}>
                    {follower}</Caption>
                </View>
              </TouchableOpacity>
              <View style={{paddingHorizontal:30}}></View>
              <TouchableOpacity
                onPress={() =>{
                  navigation.navigate("Following", { following: following, id: userIdx })
                }}
              >
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

        <MyPost data={postList} />
        
        <TouchableOpacity
            style={{alignItems:'center'}}
            onPress={() => navigation.navigate("FriendAllPosts", {identification})}
        >
        <Text>
          전체 게시물 보기
        </Text>
      </TouchableOpacity>
      </View>

      
      

    </ScrollView>
  );
};

export default FriendProfile;