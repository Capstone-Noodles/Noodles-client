import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, Modal, Dimensions, FlatList} from "react-native";
import styled from 'styled-components/native';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { PostData } from '../screenComponents/Data';

const Item = React.memo(
  ({ item: { id, content, distance, location, isBookmarked, isLiked, likes, postIdx, postImageList, profileImage, userIdx, nickname, identification } }) => {
    const [like, setLike] = useState(likes);
    const [bookmark, setBookmark] = useState(isBookmarked);
    const [modalVisible, setModalVisible] = useState(false);
    const [others_modalVisible, setOthers_ModalVisible] = useState(false);
    const devWidth = Dimensions.get("window").width;
    const { user } = useContext(UserContext);
    const userId = user.id;
       
    const navigation = useNavigation();

    return (
      <View 
        style={{
          backgroundColor:'#fff'
        }}>
        <TouchableOpacity 
          style={{
            padding:2
          }}
          onPress={()=>navigation.navigate("PostDeatails", {
            postImageList: postImageList
          })}>
          <Image 
              source={{uri:`${postImageList}`}}
              style={{ width: devWidth/3, height: devWidth/3 }}
            />
        </TouchableOpacity>
      </View>
    );
        
  });

const AllPosts = ()=> {

  const { user } = useContext(UserContext);
  const { dispatch } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();


  useEffect(() => {
    try {
      if (user.latitude == null) {
        dispatch({ 
          accessToken: user.accessToken, 
          refreshToken: user.refreshToken,
          id: user.id,
          location: '서울 중구 오장동',
          latitude: 37.5642135, 
          longitude: 127.0016985
        });
      }
      axios({
        method: 'get',
        url: 'http://133.186.228.218:8080/posts',
        params: { 
          longitude: `${user?.longitude}`,
          latitude: `${user?.latitude}`, 
        },
        headers: {
          "x-auth-token": `${user?.accessToken}`,
        }
      })
      .then(function(response){
        const result = response.data;
        const list = []
        for (let i = 0; i < result.length; i++) {
          list.push({
            id: i,
            content: result[i].content,
            distance: result[i].distance,
            isBookmarked: result[i].isBookmarked,
            isLiked: result[i].isLiked,
            likes: result[i].likes,
            location: result[i].location,
            postIdx: result[i].postIdx,
            postImageList: result[i].postImageList,
            profileImage: result[i].profileImage,
            userIdx: result[i].userIdx,
            nickname: result[i].nickname,
            identification: result[i].identification,
          });
        }
        setPosts(list);
      })
      .catch(function(error){
        console.log(error);
      });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, [user, setPosts, isFocused]);

  return (
    <View 
      style={{
        backgroundColor:'#fff',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'stretch'
      }}>
    <FlatList
      keyExtractor={item => item['id'].toString()}
      data={posts}
      numColumns={3}
      renderItem={({ item }) => (
        <Item item={item} />
      )}
      windowSize={3}
    />
    </View>
  );
};

export default AllPosts;