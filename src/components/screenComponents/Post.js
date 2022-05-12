import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";

const Post = () => {
  const userNickname = "빵이";
  const postInfo = [
    {
      Nickname: "빵이",
      postPersonImage: require("../../storage/images/fig.jpg"),
      postImage: require("../../storage/images/post1.png"),
      location: "경기도 수원시 망포동",
      textmsg: "안냐세염^^",
      distance: "대략 130m",
      likes: 765,
      isLiked: false,
      bookmarked: false,
    },
    {
      Nickname: "세빈",
      postPersonImage: require("../../storage/images/profile1.jpg"),
      postImage: require("../../storage/images/post22.jpg"),
      location: "경기도 수원시 화서동",
      textmsg: "안녕 난 세빈이야",
      distance: "대략 270m",
      likes: 81,
      isLiked: false,
      bookmarked: false,
    },
    {
      Nickname: "짱구",
      postPersonImage: require("../../storage/images/profile2.jpg"),
      postImage: require("../../storage/images/post2.png"),
      location: "경기도 수원시 떡잎마을",
      textmsg: "안녕 난 짱구야",
      distance: "대략 560m",
      likes: 99,
      isLiked: false,
      bookmarked: false,
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [others_modalVisible, setOthers_ModalVisible] = useState(false);
  const devHeight = Dimensions.get("window").height;
  const { user } = useContext(UserContext);

  // 게시물 읽어오는 axios
  useEffect(async () => {
    await axios
      .get(
        `http://133.186.228.218:8080/posts?longitude=127.00231&latitude=37.00201`,
        {
          headers: {
            "x-auth-token": `${user?.accessToken}`,
          },
        }
      )
      .then((response) => {
        const result = response.data;
        console.log(result);
      })
      .catch((err) => {});
  }, [user]);

  return (
    <View>
      {postInfo.map((data, index) => {
        const [like, setLike] = useState(data.isLiked);
        const [bookmark, setBookmark] = useState(data.bookmarked);

        const popup = () => {
          if (userNickname === data.Nickname) {
            //console.log([userNickname,data.Nickname])
            setModalVisible(!modalVisible);
          } else {
            //console.log([userNickname,data.Nickname])
            setOthers_ModalVisible(!others_modalVisible);
          }
        };

        return (
          <View
            key={index}
            style={{
              paddingBottom: 10,
              borderBottomColor: "#ffd2cf",
              borderBottomWidth: 1.5,
              borderTopColor: "#ffd2cf",
              borderTopWidth: 1.5,
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
                source={data.postImage}
                style={{ width: "95%", height: 350, borderRadius: 30 }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 5,
                paddingVertical: 5,
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
                <TouchableOpacity>
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
                <Text>좋아요 {like ? data.likes + 1 : data.likes}개</Text>
              </View>
              <TouchableOpacity onPress={popup} style={{ paddingLeft: 10 }}>
                <Feather name="more-vertical" style={{ fontSize: 20 }} />
              </TouchableOpacity>
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
                <Image
                  source={data.postPersonImage}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <View style={{ paddingLeft: 5 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {data.Nickname}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      opacity: 0.6,
                      paddingVertical: 2,
                      paddingLeft: 4,
                    }}
                  >
                    {data.location}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 14,
                      paddingVertical: 2,
                      paddingLeft: 4,
                    }}
                  >
                    {data.textmsg}
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
                  {data.distance}
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

            {/*<View style={{
                          paddingHorizontal:15, 
                          borderColor:'#ffbfbf', borderWidth:1.5,
                          borderRadius:90}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                  source={data.postPersonImage}
                                  style={{
                                      width:25, height:25,
                                      borderRadius:100,
                                      backgroundColor:'orange',
                                      marginRight:10,
                                  }}
                                />
                                <TextInput
                                  placeholder='Add a comment'
                                  style={{opacity:0.5}}
                                />
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Entypo
                                  name="emoji-happy"
                                  style={{fontSize:15, color:'lightgreen', marginRight:10}}
                                />
                                <Entypo
                                  name="emoji-neutral"
                                  style={{fontSize:15, color:'pink', marginRight:10}}
                                />
                                <Entypo
                                  name="emoji-sad"
                                  style={{fontSize:15, color:'red'}}
                                />
                            </View>
                        </View>
                      </View>*/}
          </View>
        );
      })}
      {/*User_Modal*/}
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
                <TouchableOpacity>
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

      {/*Other_Modal*/}
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
};

export default Post;
