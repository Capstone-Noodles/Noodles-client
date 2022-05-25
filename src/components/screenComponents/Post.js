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
import {useNavigation} from '@react-navigation/native';
import { PostData } from '../screenComponents/Data';

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

const Item = React.memo(
  ({ item: { id, content, distance, location, isBookmarked, isLiked, likes, postIdx, postImageList, profileImage,userIdx, nickname } }) => {
    const [like, setLike] = useState(likes);
    const [bookmark, setBookmark] = useState(isBookmarked);
    const [modalVisible, setModalVisible] = useState(false);
    const [others_modalVisible, setOthers_ModalVisible] = useState(false);
    const devHeight = Dimensions.get("window").height;
    const userNickname='웜듀';
       
    const navigation = useNavigation();

          const popup = () => {
          if (userNickname === nickname) {
            //console.log([userNickname,nickname]);
            setModalVisible(!modalVisible);
          } else {
            //console.log([userNickname,data.Nickname])
            setOthers_ModalVisible(!others_modalVisible);
          }
        };

    return (
      <View>
        <View style={{
          paddingBottom: 5,
          borderTopColor: "#ffd2cf",
          borderTopWidth: 1.5,
        }}>
          <View style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 15,
          }}>
            <Image 
              source={{uri:`${postImageList}`}}
              style={{ width: "95%", height: 350, borderRadius: 30 }}
            />
          </View>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingTop: 5,
          }}>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 7,
            }}>
              <TouchableOpacity onPress={() => setBookmark(!bookmark)}>
                  <FontAwesome
                    name={bookmark ? "bookmark" : "bookmark-o"}
                    style={{ fontSize: 20, paddingRight: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={()=>navigation.navigate('Comment')}>
                  <Ionic
                    name="ios-chatbubble-outline"
                    style={{ fontSize: 20, paddingRight: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLike(!like)}>
                  <AntDesign
                    name={like ? "heart" : "hearto"}
                    style={{
                      paddingRight: 10,
                      fontSize: 20,
                      color: like ? "tomato" : "black",
                    }}
                  />
                </TouchableOpacity>
                <Text>좋아요 {like ? likes + 1 : likes}개</Text>
                
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
                    (userNickname === nickname)? 
                    ()=>navigation.navigate("Profile") 
                    : ()=>navigation.navigate("FriendProfile", {
                      nickname: nickname,
                      profileImage: profileImage,
                      //stateMessage: data.StateMessage,
                      //follow: data.follow,
                      //post: data.posts,
                      //followers: data.followers,
                      //following: data.following,
                    })}>
                  <Image
                    source={{uri:`${profileImage}`}}
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                  />
                </TouchableOpacity>
                <View style={{ paddingLeft: 5 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {nickname}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      opacity: 0.6,
                      paddingVertical: 2,
                      paddingLeft: 4,
                    }}
                  >
                    {location}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 14,
                      paddingVertical: 2,
                      paddingLeft: 4,
                    }}
                  >
                    {content}
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 12,
                    opacity: 0.6,
                    paddingVertical: 2,
                    paddingRight: 35,
                  }}
                >
                  {distance}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    opacity: 0.3,
                    paddingVertical: 2,
                    paddingLeft: 55,
                  }}
                >
                  더보기
                </Text>
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
                <TouchableOpacity onPress={()=>setClosed(true)}>
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
    );
  },
);

const Post = () => {
  
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    try {
      axios({
        method: 'get',
        url: 'http://133.186.228.218:8080/posts?longitude=127.00231&latitude=37.00201',
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
          });
        }
        setPosts(list);
        console.log(list);
        return response.res;
      })
      .catch(function(error){
        console.log(error);
        alert("Error",error);
      });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, [user, setPosts]);

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={posts}
        renderItem={({ item }) => (
          <Item item={item} />
        )}
        windowSize={3}
      />
  </Container>
  );

  // return (
  //   <>
  //     {
  //       posts.map((data, index) => {
  //         console.log(data)

  //       const [like, setLike] = useState(data.isLiked);
  //       const [bookmark, setBookmark] = useState(data.isBookmarked);
  //       //const [closed,setClosed] = useState(data.closed);
  //       const [modalVisible, setModalVisible] = useState(false);
  //       const [others_modalVisible, setOthers_ModalVisible] = useState(false);
       
  //       const popup = () => {
  //         if (userNickname === data.nickname) {
  //           console.log([userNickname,data.nickname]);
  //           setModalVisible(!modalVisible);
  //         } else {
  //           //console.log([userNickname,data.Nickname])
  //           setOthers_ModalVisible(!others_modalVisible);
  //         }
  //       };

  //       return (
  //         <View>
  //         {
  //           //closed ? null:
  //           (
  //         <View
  //           key={index}
  //           style={{
  //             paddingBottom: 10,
  //             borderBottomColor: "#ffd2cf",
  //             borderBottomWidth: 1.5,
  //             borderTopColor: "#ffd2cf",
  //             borderTopWidth: 1.5,
  //           }}
  //         >
  //           <View
  //             style={{
  //               position: "relative",
  //               justifyContent: "center",
  //               alignItems: "center",
  //               paddingTop: 15,
  //             }}
  //           >
  //             <Image
  //               source={{uri:'https://placeimg.com/140/140/any'}}
  //               style={{ width: "95%", height: 350, borderRadius: 30 }}
  //             />
  //           </View>

  //           <View
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "center",
  //               justifyContent: "space-between",
  //               paddingHorizontal: 5,
  //               paddingVertical: 5,
  //             }}
  //           >
  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 alignItems: "center",
  //                 paddingLeft: 7,
  //               }}
  //             >
  //               <TouchableOpacity onPress={() => setBookmark(!bookmark)}>
  //                 <FontAwesome
  //                   name={bookmark ? "bookmark" : "bookmark-o"}
  //                   style={{ fontSize: 20, paddingRight: 10 }}
  //                 />
  //               </TouchableOpacity>
  //               <TouchableOpacity
  //                onPress={()=>navigation.navigate('Comment')}>
  //                 <Ionic
  //                   name="ios-chatbubble-outline"
  //                   style={{ fontSize: 20, paddingRight: 10 }}
  //                 />
  //               </TouchableOpacity>
  //               <TouchableOpacity onPress={() => setLike(!like)}>
  //                 <AntDesign
  //                   name={like ? "heart" : "hearto"}
  //                   style={{
  //                     paddingRight: 10,
  //                     fontSize: 20,
  //                     color: like ? "tomato" : "black",
  //                   }}
  //                 />
  //               </TouchableOpacity>
  //               <Text>좋아요 {like ? data.likes + 1 : data.likes}개</Text>
  //             </View>
  //             <TouchableOpacity onPress={popup} style={{ paddingLeft: 10 }}>
  //               <Feather name="more-vertical" style={{ fontSize: 20 }} />
  //             </TouchableOpacity>
  //           </View>

  //           <View
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "flex-end",
  //               justifyContent: "space-between",
  //               padding: 10,
  //             }}
  //           >
  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 alignItems: "flex-start",
  //               }}
  //             >
  //               <TouchableOpacity 
  //                 onPress={
  //                   (userNickname === data.Nickname)? 
  //                   ()=>navigation.navigate("Profile") 
  //                   : ()=>navigation.navigate("FriendProfile", {
  //                     //id: data.id,
  //                     //nickname: data.Nickname,
  //                     profileImage: data.profileImage,
  //                     //stateMessage: data.StateMessage,
  //                     //follow: data.follow,
  //                     //post: data.posts,
  //                     //followers: data.followers,
  //                     //following: data.following,
  //                   })}>
  //                 <Image
  //                   source={{uri:'https://placeimg.com/140/140/any'}}
  //                   style={{ width: 40, height: 40, borderRadius: 100 }}
  //                 />
  //               </TouchableOpacity>
  //               <View style={{ paddingLeft: 5 }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 15,
  //                     fontWeight: "bold",
  //                   }}
  //                 >
  //                   {" "}
                    
  //                 </Text>
  //                 <Text
  //                   style={{
  //                     fontSize: 12,
  //                     opacity: 0.6,
  //                     paddingVertical: 2,
  //                     paddingLeft: 4,
  //                   }}
  //                 >
  //                   {data.location}
  //                 </Text>
  //                 <Text
  //                   style={{
  //                     fontWeight: "700",
  //                     fontSize: 14,
  //                     paddingVertical: 2,
  //                     paddingLeft: 4,
  //                   }}
  //                 >
  //                   {data.content}
  //                 </Text>
  //               </View>
  //             </View>
  //             <View style={{}}>
  //               <Text
  //                 style={{
  //                   fontSize: 12,
  //                   opacity: 0.6,
  //                   paddingVertical: 2,
  //                   paddingRight: 35,
  //                 }}
  //               >
  //                 {data.distance}
  //               </Text>
  //               <Text
  //                 style={{
  //                   fontSize: 12,
  //                   opacity: 0.3,
  //                   paddingVertical: 2,
  //                   paddingLeft: 55,
  //                 }}
  //               >
  //                 더보기
  //               </Text>
  //             </View>
  //           </View>



  //     <View>
  //       <Modal
  //         animationType="fade"
  //         transparent={true}
  //         visible={modalVisible}
  //         onRequestClose={() => {
  //           setModalVisible(!modalVisible);
  //         }}
  //       >
  //         <View
  //           style={{
  //             flex: 1,
  //             backgroundColor: "#000000AA",
  //             justifyContent: "flex-end",
  //           }}
  //         >
  //           <View
  //             style={{
  //               backgroundColor: "white",
  //               width: "100%",
  //               borderTopRightRadius: 15,
  //               borderTopLeftRadius: 15,
  //               paddingHorizontal: 10,
  //               maxHeight: devHeight * 0.4,
  //             }}
  //           >
  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 justifyContent: "space-between",
  //                 alignItems: "center",
  //                 marginHorizontal: 10,
  //                 marginVertical: 10,
  //               }}
  //             >
  //               <Text
  //                 style={{ fontSize: 18, fontWeight: "600", color: "#484848" }}
  //               >
  //                 나의 게시물
  //               </Text>
  //               <TouchableOpacity
  //                 onPress={() => setModalVisible(!modalVisible)}
  //               >
  //                 <Ionic
  //                   name="close"
  //                   style={{
  //                     fontSize: 20,
  //                     color: "#484848",
  //                     textAlign: "right",
  //                   }}
  //                 />
  //               </TouchableOpacity>
  //             </View>

  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 justifyContent: "space-around",
  //                 alignItems: "center",
  //                 marginHorizontal: 10,
  //                 marginVertical: 20,
  //               }}
  //             >
  //               <TouchableOpacity>
  //                 <Foundation
  //                   name="page-edit"
  //                   style={{ fontSize: 65, color: "#ffbfbf" }}
  //                 />
  //                 <Text
  //                   style={{
  //                     textAlign: "center",
  //                     fontSize: 15,
  //                     color: "#484848",
  //                   }}
  //                 >
  //                   수정
  //                 </Text>
  //               </TouchableOpacity>
  //               <TouchableOpacity onPress={()=>setClosed(true)}>
  //                 <Foundation
  //                   name="page-delete"
  //                   style={{ fontSize: 65, color: "#ffbfbf" }}
  //                 />
  //                 <Text
  //                   style={{
  //                     textAlign: "center",
  //                     fontSize: 15,
  //                     color: "#484848",
  //                   }}
  //                 >
  //                   삭제
  //                 </Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </View>
  //       </Modal>
  //     </View>


  //     <View>
  //       <Modal
  //         animationType="fade"
  //         transparent={true}
  //         visible={others_modalVisible}
  //         onRequestClose={() => {
  //           setOthers_ModalVisible(!others_modalVisible);
  //         }}
  //       >
  //         <View
  //           style={{
  //             flex: 1,
  //             backgroundColor: "#000000AA",
  //             justifyContent: "flex-end",
  //           }}
  //         >
  //           <View
  //             style={{
  //               backgroundColor: "white",
  //               width: "100%",
  //               borderTopRightRadius: 15,
  //               borderTopLeftRadius: 15,
  //               paddingHorizontal: 10,
  //               maxHeight: devHeight * 0.4,
  //             }}
  //           >
  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 justifyContent: "space-between",
  //                 alignItems: "center",
  //                 marginHorizontal: 10,
  //                 marginVertical: 10,
  //               }}
  //             >
  //               <Text
  //                 style={{ fontSize: 18, fontWeight: "600", color: "#484848" }}
  //               >
  //                 다른 사용자의 게시물
  //               </Text>
  //               <TouchableOpacity
  //                 onPress={() => setOthers_ModalVisible(!others_modalVisible)}
  //               >
  //                 <Ionic
  //                   name="close"
  //                   style={{
  //                     fontSize: 20,
  //                     color: "#484848",
  //                     textAlign: "right",
  //                   }}
  //                 />
  //               </TouchableOpacity>
  //             </View>

  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 justifyContent: "space-around",
  //                 alignItems: "center",
  //                 marginHorizontal: 10,
  //                 marginVertical: 20,
  //               }}
  //             >
  //               <TouchableOpacity>
  //                 <AntDesign
  //                   name="sharealt"
  //                   style={{ fontSize: 65, color: "#ffbfbf" }}
  //                 />
  //                 <Text
  //                   style={{
  //                     textAlign: "center",
  //                     fontSize: 15,
  //                     color: "#484848",
  //                   }}
  //                 >
  //                   공유
  //                 </Text>
  //               </TouchableOpacity>
  //               <TouchableOpacity>
  //                 <AntDesign
  //                   name="link"
  //                   style={{ fontSize: 65, color: "#ffbfbf" }}
  //                 />
  //                 <Text
  //                   style={{
  //                     textAlign: "center",
  //                     fontSize: 15,
  //                     color: "#484848",
  //                   }}
  //                 >
  //                   링크
  //                 </Text>
  //               </TouchableOpacity>
  //               <TouchableOpacity>
  //                 <AntDesign
  //                   name="exclamationcircle"
  //                   style={{ fontSize: 65, color: "#fd6767" }}
  //                 />
  //                 <Text
  //                   style={{
  //                     textAlign: "center",
  //                     fontSize: 15,
  //                     color: "#484848",
  //                   }}
  //                 >
  //                   신고
  //                 </Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </View>
  //       </Modal>
  //     </View>


      
  //   </View>
  //   )}
      
  //     </View>
  //       );
  //     })}
      

      
  //   </>
  // );
};

export default Post;
