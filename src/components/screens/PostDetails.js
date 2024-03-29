import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const PostDetails = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const userId = user.id;
  const devHeight = Dimensions.get("window").height;
  const [viewMore, setViewMore] = useState(false);
  const { dispatch } = useContext(UserContext);

  const postIdx = route.params.postIdx;
  // console.log(postIdx);
  const [like, setLike] = useState();
  const [likes, setLikes] = useState();
  const [distance, setDistance] = useState();
  const [identification, setIdentification] = useState();
  const [location, setLocation] = useState();
  const [nickname, setNickname] = useState();
  const [postImageList, setPostImageList] = useState();
  const [profileImage, setProfileImage] = useState();
  const [userIdx, setUserIdx] = useState();
  const [content, setContent] = useState();
  const [bookmark, setBookmark] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [others_modalVisible, setOthers_ModalVisible] = useState(false);

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `http://133.186.228.218:8080/posts/` + postIdx,
        params: {
          longitude: `${user?.longitude}`,
          latitude: `${user?.latitude}`,
        },
        headers: {
          "x-auth-token": `${user?.accessToken}`,
        },
      })
        .then(function (response) {
          const result = response.data;
          // console.log(result);
          setLike(result.isLiked);
          setLikes(result.likes);
          setDistance(result.distance);
          setIdentification(result.identification);
          setLocation(result.location);
          setNickname(result.nickname);
          setPostImageList(result.postImageList);
          setProfileImage(result.profileImage);
          setUserIdx(result.userIdx);
          setContent(result.content);
          setBookmark(result.isBookmarked);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, [user, postIdx, setLike, setLikes, setDistance, setIdentification, setLocation, setNickname, setPostImageList, setProfileImage, setUserIdx, setContent, setBookmark]);

  // const {
  //   postImageList,
  //   content,
  //   distance,
  //   location,
  //   // isBookmarked,
  //   likes,
  //   // postIdx,
  //   profileImage,
  //   identification,
  //   userIdx,
  // } = data;

  const popup = () => {
    if (userId === identification) {
      console.log(userId, identification);
      setModalVisible(!modalVisible);
    } else {
      console.log(userId, identification);
      setOthers_ModalVisible(!others_modalVisible);
    }
  };

  const _handleLikePress = useCallback(async () => {
    try {
      axios({
        method: "post",
        url: "http://133.186.228.218:8080/posts/like/" + postIdx,
        headers: {
          "x-auth-token": `${user?.accessToken}`,
        },
      })
        .then(function (response) {
          if (like == 0) {
            setLike(1);
          } else {
            setLike(0);
          }
          dispatch({
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            id: user.id,
            location: user.location,
            latitude: user.latitude,
            longitude: user.longitude,
          });
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          alert("Error", error);
        });
    } catch (e) {
    } finally {
    }
  }, [user, postIdx, setLike, dispatch]);

  const _handleDeletePress = useCallback(async () => {
    try {
      axios({
        method: "patch",
        url: "http://133.186.228.218:8080/posts/delete/" + postIdx,
        headers: {
          "x-auth-token": `${user?.accessToken}`,
        },
      })
        .then(function (response) {
          dispatch({
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            id: user.id,
            location: user.location,
            latitude: user.latitude,
            longitude: user.longitude,
          });
          setModalVisible(!modalVisible);
          Alert.alert("게시글이 삭제되었습니다.");
          return;
        })
        .catch(function (error) {
          console.log(error);
          alert("Error", error);
        });
    } catch (e) {
    } finally {
    }
  }, [user, postIdx, dispatch, setModalVisible, modalVisible]);

  return (
    // <View></View>
    // -----------------------------------
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          paddingBottom: 5,
          borderTopColor: "#ffd2cf",
          borderTopWidth: 3,
        }}
      >
        <View
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 15,
          }}
        >
          <Image
            source={{ uri: `${postImageList}` }}
            style={{ width: "95%", height: 350, borderRadius: 30 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingTop: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 7,
            }}
          >
            <TouchableOpacity onPress={() => setBookmark(!bookmark)}>
              <FontAwesome
                name={bookmark ? "bookmark" : "bookmark-o"}
                style={{ fontSize: 20, paddingRight: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Comment", postIdx)}
            >
              <Ionic
                name="ios-chatbubble-outline"
                style={{ fontSize: 20, paddingRight: 10 }}
              />
            </TouchableOpacity>
            <AntDesign
                name={like ? "heart" : "hearto"}
                style={{
                  paddingRight: 10,
                  fontSize: 20,
                  color: like ? "tomato" : "black",
                }}
                onPress={_handleLikePress}
              />
              <Text>좋아요 {likes}개</Text>
          </View>
          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={popup}>
            <Feather name="more-vertical" style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            onPress={
              userId === identification
                ? () => navigation.navigate("Profile")
                : () =>
                    navigation.navigate("FriendProfile", {
                      nickname: identification,
                      profileImage: profileImage,
                      userIdx: userIdx,
                      //stateMessage: data.StateMessage,
                      //follow: data.follow,
                      //post: data.posts,
                      //followers: data.followers,
                      //following: data.following,
                    })
            }
          >
            <Image
              source={{ uri: `${profileImage}` }}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
          </TouchableOpacity>
          <View style={{ paddingLeft: 5 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {" "}
              {identification}
            </Text>
            <Text
              style={{
                fontSize: 10,
                opacity: 0.5,
                paddingVertical: 2,
                paddingLeft: 4,
              }}
            >
              {location}
            </Text>
            <Text
              style={{
                fontSize: 12,
                paddingVertical: 2,
                paddingLeft: 4,
                width: 200,
              }}
              numberOfLines={viewMore ? 100 : 1}
              ellipsizeMode="tail"
            >
              {content}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 10,
              opacity: 0.5,
              paddingVertical: 2,
              paddingRight: 35,
            }}
          >
            {distance}
          </Text>
          {content?.length > 25 ? (
            <TouchableOpacity onPress={() => setViewMore(!viewMore)}>
              <Text
                style={{
                  fontSize: 12,
                  opacity: 0.3,
                  paddingVertical: 2,
                  paddingLeft: 55,
                }}
              >
                {viewMore ? "접기" : "더보기"}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#000000AA",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                paddingHorizontal: 10,
                maxHeight: devHeight * 0.4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "#484848" }}
                >
                  나의 게시물
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Ionic
                    name="close"
                    style={{
                      fontSize: 20,
                      color: "#484848",
                      textAlign: "right",
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 20,
                }}
              >
                <TouchableOpacity>
                  <Foundation
                    name="page-edit"
                    style={{ fontSize: 65, color: "#ffbfbf" }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "#484848",
                    }}
                  >
                    수정
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_handleDeletePress}>
                  <Foundation
                    name="page-delete"
                    style={{ fontSize: 65, color: "#ffbfbf" }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "#484848",
                    }}
                  >
                    삭제
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={others_modalVisible}
          onRequestClose={() => {
            setOthers_ModalVisible(!others_modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#000000AA",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                paddingHorizontal: 10,
                maxHeight: devHeight * 0.4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "#484848" }}
                >
                  다른 사용자의 게시물
                </Text>
                <TouchableOpacity
                  onPress={() => setOthers_ModalVisible(!others_modalVisible)}
                >
                  <Ionic
                    name="close"
                    style={{
                      fontSize: 20,
                      color: "#484848",
                      textAlign: "right",
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 20,
                }}
              >
                <TouchableOpacity>
                  <AntDesign
                    name="sharealt"
                    style={{ fontSize: 65, color: "#ffbfbf" }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "#484848",
                    }}
                  >
                    공유
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign
                    name="link"
                    style={{ fontSize: 65, color: "#ffbfbf" }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "#484848",
                    }}
                  >
                    링크
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign
                    name="exclamationcircle"
                    style={{ fontSize: 65, color: "#fd6767" }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "#484848",
                    }}
                  >
                    신고
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>

    //-----------------------------------
    /*
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <Image 
      source={{uri:`${postImageList}`}}
      style={{width:devWidth,height:300}}/>
    </View>
    */

    /*
    <ScrollView style={{backgroundColor:'white',flex:1}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      
      {
          postInfo.map( (data,index)=> {
              const [like, setLike] = useState(data.isLiked);
              const [bookmark, setBookmark] = useState(data.bookmarked);

              const popup = () => {
      
                if (userNickname === data.Nickname) {
                  //console.log([userNickname,data.Nickname])
                  setModalVisible(!modalVisible)
                }
              }

              return(
                 <View key={index} style={{
                      paddingBottom:10,
                      borderBottomColor:'#ffd2cf',
                      borderBottomWidth:1.5,
                      borderTopColor:'#ffd2cf',
                      borderTopWidth:1.5
                  }}>

                      <View style={{
                          position:'relative',
                          justifyContent:'center',
                          alignItems:'center',
                          paddingTop:15,
                          
                      }}>
                        <Image source={data.postImage}
                               style={{width:'95%', height:350, borderRadius:30}}/>
                      </View>
                      

                      <View style={{
                          flexDirection:'row', alignItems:'center',
                          justifyContent:'space-between',
                          paddingHorizontal:5,
                          paddingVertical:5,
                         
                      }}>
                        <View style={{
                            flexDirection:'row', alignItems:'center',
                            paddingLeft:7 }}>
                            <TouchableOpacity onPress={()=> setBookmark(!bookmark)}>
                                <FontAwesome name={ bookmark ? "bookmark":"bookmark-o" }
                                         style={{fontSize:20, paddingRight:10}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionic 
                                  name="ios-chatbubble-outline"
                                  style={{fontSize:20, paddingRight:10}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> setLike(!like)}>
                               <AntDesign
                                  name={like ? 'heart':'hearto'}
                                  style={{
                                      paddingRight:10,
                                      fontSize:20,
                                      color: like ? 'tomato':'black',
                                  }}
                                />
                            </TouchableOpacity>
                            <Text>
                            좋아요{' '}
                            { like ? data.likes+1:data.likes }개
                            </Text>
                        </View>
                        <TouchableOpacity onPress={popup} style={{paddingLeft:10}}>
                            <Feather name="more-vertical" style={{fontSize:20}}/>
                        </TouchableOpacity>
                      </View>


                      <View style={{
                          flexDirection:'row', alignItems:'flex-end',
                          justifyContent:'space-between', padding:10, 
                        }}>
                          <View style={{
                              flexDirection:'row', alignItems:'flex-start', 
                              }}>
                              <Image
                                source={data.postPersonImage}
                                style={{width:40, height:40, borderRadius:100}}
                              />
                              <View style={{paddingLeft:5, }}>
                                  <Text style={{
                                      fontSize:15, fontWeight:'bold',
                                  }}> {data.Nickname}
                                  </Text>
                                  <Text style={{fontSize:12, opacity:0.6, paddingVertical:2, paddingLeft:4}}>
                                        {data.location}
                                  </Text>
                                  <Text style={{
                                      fontWeight:'700', fontSize:14,
                                      paddingVertical:2, paddingLeft:4}}>
                                        {data.textmsg}
                                  </Text>
                              </View>
                          </View>
                          <View style={{}}>
                            <Text style={{
                                fontSize:12, opacity:0.6, paddingVertical:2, paddingRight:35
                            }}>{data.distance}</Text>
                            <Text style={{
                                fontSize:12, opacity:0.3, paddingVertical:2, paddingLeft:55
                            }}>더보기</Text>
                          </View>
                      </View>

 
                 </View>
              )
          })
      }
      
      <View>
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { setModalVisible(!modalVisible); }}
        >
          <View style={{
            flex:1,
            backgroundColor:'#000000AA',
            justifyContent:'flex-end',
  
          }}>
            <View style={{
              backgroundColor:'white',
              width:'100%',
              borderTopRightRadius:15,
              borderTopLeftRadius:15,
              paddingHorizontal:10,
              maxHeight:devHeight*0.4,
            }}>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginHorizontal:10,
                marginVertical:10
              }}>
                <Text style={{fontSize:18,fontWeight:'600',color:'#484848'}}>나의 게시물</Text>
                <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
                  <Ionic 
                    name="close" 
                    style={{fontSize:20,color:'#484848',textAlign:'right'}}/>
                </TouchableOpacity>
              </View>
              
              <View style={{
                flexDirection:'row',
                justifyContent:'space-around',
                alignItems:'center',
                marginHorizontal:10,
                marginVertical:20,
              }}>
                <TouchableOpacity>
                  <Foundation 
                    name="page-edit" 
                    style={{fontSize:65,color:'#ffbfbf'}}/>
                  <Text style={{textAlign:'center',fontSize:15,color:'#484848',}}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Foundation 
                    name="page-delete" 
                    style={{fontSize:65,color:'#ffbfbf'}}/>
                  <Text style={{textAlign:'center',fontSize:15,color:'#484848',}}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        </View>

       
        
    </ScrollView>
            */
  );
};

export default PostDetails;
