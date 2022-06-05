import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, Modal, Dimensions, FlatList, StatusBar} from "react-native";
import styled from 'styled-components/native';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";
import {useIsFocused, useNavigation} from '@react-navigation/native';

//const [edit,setEdit] = useState(false);
//console.log('AllPosts.edit',AllPosts.edit)

const Item = React.memo(
  ({ item: { id, content, distance, location, isBookmarked, isLiked, likes, postIdx, postImageList, profileImage, userIdx, nickname, identification }, edit }) => {
    const [like, setLike] = useState(likes);
    const [bookmark, setBookmark] = useState(isBookmarked);
    const [modalVisible, setModalVisible] = useState(false);
    const [others_modalVisible, setOthers_ModalVisible] = useState(false);
    const devWidth = Dimensions.get("window").width;
    const { user } = useContext(UserContext);
    const userId = user.id;
    //const [edit,setEdit] = useState(edit);
    //const edit = useState(AllPosts.edit);
    //console.log('AllPosts.edit',edits) 
    const [check, setCheck] = useState(false);
    const navigation = useNavigation();
    

    return (
      <View 
        style={{
          backgroundColor:'#fff'
        }}>
          {edit ? (<TouchableOpacity 
            style={{alignItems:'flex-end'}}
            onPress={()=>{
              setCheck(!check);
              console.log(check.length)
              }}>
            <AntDesign 
              name= {check ? "checkcircle":"checkcircleo"}
              style={{fontSize:14,}}/>
          </TouchableOpacity>):null}
        <TouchableOpacity 
          style={{
            padding:2
          }}
          onPress={()=>navigation.navigate("PostDetails", {
            postImageList: postImageList,
            content: content,
            distance: distance,
            location: location,
            isBookmarked: isBookmarked,
            likes: likes,
            postIdx: postIdx,
            profileImage: profileImage,
            identification: identification
          })}>
          <Image 
              source={{uri:`${postImageList}`}}
              style={{ width: devWidth/3.1, height: devWidth/3 }}
            />
        </TouchableOpacity>
      </View>
    );
        
  });

const AllPosts = ()=> {

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

  const { user } = useContext(UserContext);
  const userId = user.id;
  const { dispatch } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const [like, setLike] = useState(posts.likes);
  const [bookmark, setBookmark] = useState(posts.isBookmarked);
  const [modalVisible, setModalVisible] = useState(false);
  const [others_modalVisible, setOthers_ModalVisible] = useState(false);
  const devWidth = Dimensions.get("window").width;
  const [edit,setEdit] = useState(false);
             
  const navigation = useNavigation();
          
          

  return (
    <View 
      style={{
        flex:1,
        backgroundColor:'#fff'
      }}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View 
        style={{
          flexDirection:'row',
          padding:10,
          margin:10,
          alignItems:'center',
          justifyContent:'space-between',
          paddingTop:25,
        }}>
        <TouchableOpacity 
          style={{paddingRight:10}}
          onPress={()=>navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color='#484848'/>
        </TouchableOpacity>
        <Text style={{paddingHorizontal:15, fontSize:20, }}>
          전체 게시물 조회
        </Text>
        <TouchableOpacity 
          onPress={
            edit ? ()=>navigation.navigate("Profile") : ()=> setEdit(!edit)
          }>
          <Text style={{fontSize:18, color:'gray' }}>
            {edit ? '완료':'편집'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={posts}
        numColumns={3}
        renderItem={  ({ item })  => (
          <Item item={item} edit={edit} />
        )}
          //const [bookmark, setBookmark] = useState(false);
          
         // (//<Item item={item}/>)}
        
      //   <View 
      //   style={{
      //     backgroundColor:'#fff'
      //   }}
      //   >
      //     {edit ? (<TouchableOpacity 
      //       style={{alignItems:'flex-end'}}
      //       onPress={()=>{
      //         setBookmark(!bookmark)
      //       }}>
      //       <AntDesign 
      //         name= {bookmark ? "checkcircle":"checkcircleo"}
      //         style={{fontSize:13,}}/>
      //     </TouchableOpacity>):null}
      //   <TouchableOpacity 
      //     style={{
      //       padding:2,
      //     }}
      //     onPress={()=>
      //       navigation.navigate("PostDetails", {
      //       postImageList: item.postImageList,
      //       content: item.content,
      //       distance: item.distance,
      //       location: item.location,
      //       isBookmarked: item.isBookmarked,
      //       likes: item.likes,
      //       postIdx: item.postIdx,
      //       profileImage: item.profileImage,
      //       identification: item.identification
      //     })}
      //     >
      //     <Image 
      //         source={{uri:`${item.postImageList}`}}
      //         style={{ width: devWidth/3.1, height: devWidth/3 }}
      //       />
      //   </TouchableOpacity>
      // </View>
      // ) }//}
        windowSize={3}
      />
    </View>
  );
};

export default AllPosts;