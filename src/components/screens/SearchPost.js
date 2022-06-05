import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import { UserContext } from "../../contexts/User";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Item = React.memo(
  ({
    item: {
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
      identification,
    },
  }) => {
    const [like, setLike] = useState(isLiked);
    const [bookmark, setBookmark] = useState(isBookmarked);
    const [modalVisible, setModalVisible] = useState(false);
    const [others_modalVisible, setOthers_ModalVisible] = useState(false);
    const devHeight = Dimensions.get("window").height;
    const { user } = useContext(UserContext);
    const userId = user.id;
    const [viewMore, setViewMore] = useState(false);
    const { dispatch } = useContext(UserContext);

    const navigation = useNavigation();

    const popup = () => {
      if (userId === identification) {
        setModalVisible(!modalVisible);
      } else {
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

    return (
      <View>
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
          <View style={{}}>
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
            {content.length > 25 ? (
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
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#484848",
                    }}
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
                  <TouchableOpacity onPress={() => setClosed(true)}>
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
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#484848",
                    }}
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
  }
);

const SearchPost = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const { search } = route.params.search;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // console.log({ search });
    axios
      .get("http://133.186.228.218:8080/posts/search", {
        params: {
          longitude: `${user?.longitude}`,
          latitude: `${user?.latitude}`,
          hashtag: `${search}`,
        },

        headers: {
          "x-auth-token": `${user?.accessToken}`,
        },
      })
      .then((res) => {
        const result = res.data.result;
        console.log(result);
        const list = [];
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
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);

  return (
    <View 
      style={{
        flex:1,
        backgroundColor:'#fff'
      }}>
      <FlatList
        keyExtractor={(item) => item["id"].toString()}
        data={posts}
        renderItem={({ item }) => <Item item={item} />}
        windowSize={3}
      />
    </View>
  );
};

export default SearchPost;
