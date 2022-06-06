import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import { UserContext } from "../../contexts/User";
import axios from "axios";

const Item = React.memo(
  ({ item: { id, userIdx, nickname, profileImage, identification, isFollowing } }) => {
    const [follow,setFollow] = useState(isFollowing);
    const { user } = useContext(UserContext);
    const { dispatch } = useContext(UserContext);

    if (profileImage === null) {
      profileImage = "https://jimango.s3.ap-northeast-2.amazonaws.com/noodles_basic.jpg";
    }

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
          setFollow(!follow)
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
    }, [user, userIdx, setFollow, follow, dispatch]);

    if (user.id === identification) {
      return (
        <View style={{width:'100%'}}>
          <View
            style={{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              paddingVertical:20,
              width:'100%',
            }}>
  
            <TouchableOpacity 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                maxWidth:'64%',
              }}>
              <Image
                source={{uri:`${profileImage}`}}
                style={{
                  width:45,
                  height:45,
                  borderRadius:100,
                  marginRight:10,
                }}
              />
              <View style={{flexDirection:'column'}}>
                <Text style={{fontWeight:'bold'}}>
                  {nickname}
                </Text>
                <Text style={{color:'#484848'}}>
                  {identification}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{width:'100%'}}>
          <View
            style={{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              paddingVertical:20,
              width:'100%',
            }}>
  
            <TouchableOpacity 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                maxWidth:'64%',
              }}>
              <Image
                source={{uri:`${profileImage}`}}
                style={{
                  width:45,
                  height:45,
                  borderRadius:100,
                  marginRight:10,
                }}
              />
              <View style={{flexDirection:'column'}}>
                <Text style={{fontWeight:'bold'}}>
                  {nickname}
                </Text>
                <Text style={{color:'#484848'}}>
                  {identification}
                </Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity 
              style={{width: 68}}
              onPress={_handleFollowPress}>
              <View
                style={{
                  backgroundColor: follow ? '#DEDEDE':'#ffbfbf',
                  width:'100%',
                  height:30,
                  borderRadius:5,
                  justifyContent:'center',
                  alignItems:'center'
                }}>
                <Text style={{color:follow ? '#6A6A6A':'#fff',fontWeight:'bold'}}>
                  {follow ? '팔로잉':'팔로우'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  },
);

const Follower = ({ route })=> {
  const navigation = useNavigation();
  const [follower, setFollower] = useState([]);
  const { user } = useContext(UserContext);
  const userId = route.params.id;

  if (userId === user.id) {
    useEffect(() => {
      try {
        axios({
          method: 'get',
          url: 'http://133.186.228.218:8080/follower',
          headers: {
            "x-auth-token": `${user?.accessToken}`,
          }
        })
        .then(function(response){
          const result = response.data.result;
          const list = []
          for (let i = 0; i < result.length; i++) {
            list.push({
              id: i,
              userIdx: result[i].userIdx,
              nickname: result[i].nickname,
              profileImage: result[i].profileImage,
              identification: result[i].identification,
              isFollowing: result[i].isFollowing
            });
          }
          setFollower(list);
        })
        .catch(function(error){
          console.log(error);
        });
      } catch (e) {
        console.log(e);
        alert("Error", e);
      } finally {
      }
    }, [user, setFollower]);
  } else {
    useEffect(() => {
      try {
        axios({
          method: 'get',
          url: 'http://133.186.228.218:8080/follower/'+userId,
          headers: {
            "x-auth-token": `${user?.accessToken}`,
          }
        })
        .then(function(response){
          const result = response.data.result;
          const list = []
          for (let i = 0; i < result.length; i++) {
            list.push({
              id: i,
              userIdx: result[i].userIdx,
              nickname: result[i].nickname,
              profileImage: result[i].profileImage,
              identification: result[i].identification,
              isFollowing: result[i].isFollowing
            });
          }
          setFollower(list);
        })
        .catch(function(error){
          console.log(error);
        });
      } catch (e) {
        console.log(e);
        alert("Error", e);
      } finally {
      }
    }, [user, setFollower, userId]);
  }

  return (
    
    <View style={{ flex: 1, backgroundColor:'#fff' }}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      {/* <ScrollView style={{margin:10}} showsVerticalScrollIndicator={false}> */}
      <ScrollView style={{ margin: 10 }}>
        <FlatList
          keyExtractor={item => item['id'].toString()}
          data={follower}
          renderItem={({ item }) => (
              <Item item={item} />
          )}
          windowSize={3}
        />
      </ScrollView>
    </View>
  );
};

export default Follower;