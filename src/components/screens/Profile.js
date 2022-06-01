import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Button,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text
} from "react-native-paper";
import Ionic from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MyPost from "../screenComponents/MyPost";
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";

const Profile = ({ navigation }) => {

  const { user } = useContext(UserContext);

  const [userNickname, setUserNickname] = useState();
  const [userStateMessage, setUserStateMessage] = useState();
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();
  const [profileImage, setProfileImage] = useState();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://133.186.228.218:8080/mypage",
      headers: {
        "x-auth-token": `${user?.accessToken}`,
      },
    })
      .then((response) => {
        const result = response.data.result.mypageList[0];
        setUserNickname(result.nickname);
        setUserStateMessage(result.description);
        setFollower(result.follower);
        setFollowing(result.following);
        setProfileImage(result.profileImage);

        const imageListString = result.imageList;
        const imageList = imageListString.split(",");

        const postIdxListString = result.postIdxList;
        const postIdxList = postIdxListString.split(",");
        console.log(imageList[0]);
        console.log(postIdxList[0]);
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

  return (
    <View style={{ flex: 1, backgroundColor: "white", height: "100%" }}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 15,
          alignItems: "center",
          paddingTop: 50,
          paddingBottom: 10,
          backgroundColor: "white",
          borderBottomColor: "#ffd2cf",
          borderBottomWidth: 3,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Locate")}>
          <Ionic name="locate" style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            paddingLeft: 36,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "700",
              color: "tomato",
            }}
          >
            우
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "tomato",
            }}
          >
            리
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "700",
              color: "tomato",
            }}
          >
            동
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "tomato",
            }}
          >
            네
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("PostForm")}>
            <AntDesign name="form" style={{ fontSize: 20, paddingRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
            <Ionic name="menu-sharp" style={{ fontSize: 30 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
        <View style={{ alignItems: "flex-end", paddingBottom: 0 }}>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <Icons name="account-edit-outline" style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Avatar.Image source={{ uri: `${profileImage}` }} size={130} />
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Title style={{ fontSize: 20, fontWeight: "bold" }}>
              {userNickname}
            </Title>
            <Caption
              style={{
                fontSize: 13,
                fontWeight: "500",
                lineHeight: 14,
              }}
            >
              {userStateMessage}
            </Caption>
          </View>

          <View
            style={{
              marginTop: 10,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Follower", { follower: follower })
              }
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Title style={{ fontSize: 13, fontWeight: "bold" }}>
                  팔로워{" "}
                </Title>
                <Caption
                  style={{ fontSize: 13, fontWeight: "500", lineHeight: 17 }}
                >
                  {follower}
                </Caption>
              </View>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 30 }}></View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Following", { following: following })
              }
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Title style={{ fontSize: 13, fontWeight: "bold" }}>
                  팔로잉{" "}
                </Title>
                <Caption
                  style={{ fontSize: 13, fontWeight: "500", lineHeight: 17 }}
                >
                  {following}
                </Caption>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ paddingTop: 15 }}>
        <TouchableOpacity
          style={{ alignItems: "flex-end" }}
          onPress={() => navigation.navigate("Test")}
        >
          <Text style={{ fontSize: 13 }}>편집{"   "}</Text>
        </TouchableOpacity>

        <MyPost data={postList} />

        <TouchableOpacity 
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("AllPosts")} >
          <Text>전체 게시물 보기</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Profile;
