import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, TextInput, FlatList, TouchableOpacity, Image, Dimensions, Modal} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    TouchableRipple,
  } from "react-native-paper";
import Ionic from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {UserContext} from "../../contexts/User";
import axios from "axios";
import styled from "styled-components/native";
import {CommonActions, useNavigation} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";

const Item = React.memo(
    ({ item: { id, commentIdx, content, parentCommentIdx, userIdx, identification, profileImage, date} }) => {

        const devHeight = Dimensions.get("window").height;
        const { user } = useContext(UserContext);
        const userId = user.id;
        const [modalVisible, setModalVisible] = useState(false);
        const [others_modalVisible, setOthers_ModalVisible] = useState(false);
        const navigation = useNavigation();

        const popup = () => {
            if (userId === identification) {
                console.log(userId, identification);
                setModalVisible(!modalVisible);
            } else {
                console.log(userId, identification);
                setOthers_ModalVisible(!others_modalVisible);
            }
        };

        const onclick = () => {

        }

        return (
            <View style={{width:'100%',padding:10,flexDirection:'row'}}>
                <TouchableOpacity 
                    style={{paddingHorizontal:5}}
                    onPress={()=>navigation.navigate("FriendProfile", {
                        nickname: identification,
                        profileImage: profileImage,
                        //stateMessage: data.StateMessage,
                        //follow: data.follow,
                        //post: data.posts,
                        //followers: data.followers,
                        //following: data.following,
                    })}>
                    <Image
                        source={{uri:`${profileImage}`}}
                        style={{ width: 40, height: 40, borderRadius: 100 }}/>
                </TouchableOpacity>
                <View style={{flexDirection:'column'}}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'flex-start', width:'80%'}}>
                        <Text style={{paddingHorizontal:5, fontSize:10, fontWeight:'bold'}}>
                            {identification}
                            
                        </Text>
                        <Text style={{paddingHorizontal:5, fontSize:15}}>
                            {content}
                        </Text>
                    </View>
                    <TouchableOpacity style={{ paddingLeft: 10 }} onPress={popup}>
                        <Feather name="more-vertical" style={{ fontSize: 20 }} />
                    </TouchableOpacity>
                    </View>
                    <Caption style={{left:5}}>
                        {date}
                    </Caption>
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
                  나의 댓글
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
                  <MaterialIcons
                    name="edit"
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
                <TouchableOpacity onPress={()=>setClosed(true)}>
                  <Icon
                    name="delete"
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
                  다른 사용자의 댓글
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
        );
    },
);

const Comment = ({navigation, route})=> {

        const {user} = useContext(UserContext);
        const [comments, setComments] = useState([]);
        const [content, setContent] = useState('');

        const postIdx = route.params;

        const _handleContent = (content) => {
            setContent(content);
        };

        const commentButton = () => {
            const body = {
                content : `${content}`,
                postIdx : `${postIdx}`,
            }
            try {
                axios.post('http://133.186.228.218:8080/comments', body, {
                    headers: {
                        "x-auth-token": `${user?.accessToken}`,
                    }
                })
            } catch (e) {
                console.log(e);
                alert("Error", e);
            }
        }

        useEffect(() => {
            try {
                axios({
                    method: 'get',
                    url: 'http://133.186.228.218:8080/comments/'+postIdx+'/postComment',
                    headers: {
                        "x-auth-token": `${user?.accessToken}`,
                    }
                })
                    .then(function (response) {
                        const result = response.data;
                        const list = []
                        for (let i = 0; i < result.length; i++) {
                            list.push({
                                id: i,
                                commentIdx: result[i].commentIdx,
                                content: result[i].content,
                                parentCommentIdx: result[i].parentCommentIdx,
                                userIdx: result[i].userIdx,
                                identification: result[i].identification,
                                profileImage: result[i].profileImage,
                                date: result[i].date,
                                location: result[i].location,
                            });
                        }
                        setComments(list);
                        return response.res;
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Error", error);
                    });
            } catch (e) {
                console.log(e);
                alert("Error", e);
            } finally {
            }
        }, [user, setComments]);

        return (
            <View style={{backgroundColor:'#fff',flex:1}}>
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
                        value={content}
                        multiline
                        numberOfLines={8}
                        onChangeText={_handleContent}
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
                    <TouchableOpacity onPress={commentButton}>
                        <Icon
                            name='send-circle'
                            size={35}
                            color='#ffbfbf'
                            style={{left:10}}/>
                    </TouchableOpacity>
                </View>
                <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'row',
                    width:'100%',
                    paddingTop: 10,
                }}>
                    <FlatList
                        keyExtractor={item => item['id'].toString()}
                        data={comments}
                        renderItem={({item}) => (
                            <Item item={item}/>
                        )}
                        windowSize={3}
                    />
                </View>
            </View>
        );
};

  // return (
  //   <View style={{ flex: 1, backgroundColor:'#fff' }}>
  //
  //     <View
  //       style={{
  //         justifyContent:'center',
  //         alignItems:'center',
  //         flexDirection:'row',
  //         width:'100%',
  //         paddingTop:10,
  //       }}>
  //       <Image
  //         source={require("../../storage/images/fig.jpg")}
  //         style={{ width: 40, height: 40, borderRadius: 100 }}
  //       />
  //       <TextInput
  //         placeholder="댓글을 입력하세요."
  //         placeholderTextColor="#909090"
  //         style={{
  //           width:'75%',
  //           height:40,
  //           backgroundColor:'#fff',
  //           borderRadius:10,
  //           borderColor:'#D9D9D9',
  //           borderWidth:2,
  //           alignItems:'center',
  //           justifyContent:'center',
  //           fontSize:18,
  //           padding:4,
  //           paddingLeft:10,
  //           left:5,
  //         }}/>
  //       <TouchableOpacity>
  //         <Icon
  //           name='send-circle'
  //           size={35}
  //           color='#ffbfbf'
  //           style={{left:10}}/>
  //       </TouchableOpacity>
  //     </View>
  //       <View style={{
  //           justifyContent:'center',
  //           alignItems:'center',
  //           flexDirection:'row',
  //           width:'90%',
  //           paddingLeft: 10,
  //           paddingTop: 30}}>
  //           <Image
  //               source={require("../../storage/images/fig.jpg")}
  //               style={{ width: 40, height: 40, borderRadius: 100 }}
  //           />
  //           <Text
  //               style={{
  //                   width:'75%',
  //                   height:40,
  //                   backgroundColor:'#fff',
  //                   borderRadius:5,
  //                   borderColor:'#D9D9D9',
  //                   borderWidth:0.5,
  //                   alignItems:'center',
  //                   justifyContent:'center',
  //                   fontSize:18,
  //                   padding:4,
  //                   paddingLeft:10,
  //                   left:5,
  //               }}
  //           >
  //               {"댓글1"}
  //           </Text>
  //       </View>
  //   </View>
  //
//   );
// };

export default Comment;