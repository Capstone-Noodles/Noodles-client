import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions, FlatList, StatusBar, ImageBackground} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";
import {useIsFocused, useNavigation} from '@react-navigation/native';



const Item = React.memo(
  ({ item: 
      { 
        id, 
        content, 
        distance, 
        location, 
        isBookmarked, 
        isLiked, 
        likes, 
        postIdx, 
        postImageList, 
        profileImage, 
        userIdx, 
        nickname, 
        identification 
      }, 
     edit, 
     count, 
     setCount 
  }) => {

    const [like, setLike] = useState(likes);
    const [bookmark, setBookmark] = useState(isBookmarked);
    const [modalVisible, setModalVisible] = useState(false);
    const [others_modalVisible, setOthers_ModalVisible] = useState(false);
    const devWidth = Dimensions.get("window").width;
    const { user } = useContext(UserContext);
    const userId = user.id;
    const navigation = useNavigation();
    const [check, setCheck] = useState(false);

    const aPostImageList = postImageList.split(',');
    const postSrc = aPostImageList[0];

    return (
      <View style={{ backgroundColor:'#fff' }}>
        <TouchableOpacity 
          style={{ padding:2 }}
          onPress={()=>navigation.navigate("PostDetails", {
            postImageList: postImageList,
            content: content,
            distance: distance,
            location: location,
            isBookmarked: isBookmarked,
            likes: likes,
            postIdx: postIdx,
            profileImage: profileImage,
            identification: identification,
            userIdx: userIdx,
            nickname: nickname,
          })}
          disabled={count>=6 ? true:false}
        >
          <ImageBackground 
              source={{uri:`${postSrc}`}}
              style={{ width: devWidth/3.1, height: devWidth/3 }}
          >
          {edit ? 
          (<TouchableOpacity 
            style={{ alignItems:'flex-end', padding:5}}
            disabled={count>=6 ? true:false}
            onPress={()=>{
              setCheck(!check);
              console.log('start',check)
              check ? setCount(--count):setCount(++count)
              console.log(count)
              }}>
            <AntDesign 
              name= {check ? "checkcircle":"checkcircleo"}
              style={{fontSize:20,  color:'#ffbfbf'}}/>
          </TouchableOpacity>)
          :null}
          </ImageBackground>
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
        url: 'http://133.186.228.218:8080/myPosts',
        params: {
            identification: `${user?.id}`,
        },
        headers: {
          "x-auth-token": `${user?.accessToken}`,
        }
      })
      .then(function(response){
        const result = response.data;
        const list = []
        for (let i = 0; i < result.result.length; i++) {
          list.push({
            id: i,
            content: result.result[i].content,
            distance: result.result[i].distance,
            isBookmarked: result.result[i].isBookmarked,
            isLiked: result.result[i].isLiked,
            likes: result.result[i].likes,
            location: result.result[i].location,
            postIdx: result.result[i].postIdx,
            postImageList: result.result[i].postImageList,
            profileImage: result.result[i].profileImage,
            userIdx: result.result[i].userIdx,
            nickname: result.result[i].nickname,
            identification: result.result[i].identification,
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
  const navigation = useNavigation();
          
  const [edit, setEdit] = useState(false);
  const [count, setCount] = useState(0);

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
          paddingTop:30,
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
            {count>=6 ? '완료':'편집'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={posts}
        numColumns={3}
        renderItem={  ({ item })  => (
          <Item item={item} edit={edit} count={count} setCount={setCount}/>
        )}
        windowSize={3}
      />
    </View>
  );
};

export default AllPosts;