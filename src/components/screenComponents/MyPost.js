import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyPost = (props) => {
  const navigation = useNavigation();
  const myPostInfo = props.data;
  //   console.log("in MyPost");
  //   console.log(myPostInfo);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <FlatList
        data={myPostInfo}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.idx}
            onPress={() => {
              navigation.navigate("PostDetails", {
                postIdx: item.idx,
              });
            }}
            style={{ padding: 5 }}
          >
            <Image
              source={{ uri: `${item.image}` }}
              style={{ width: 120, height: 120, borderRadius: 100 }}
            />
          </TouchableOpacity>
        )}
        windowSize={3}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
    /* {myPostInfo &&
          myPostInfo.map((post) => {
            return ( 
              // <TouchableOpacity
              //           onPress={() => {
              //             navigation.navigate("PostDetails", {
              //               postImageList: post.image,
              //               // content: content,
              //               // distance: distance,
              //               // location: location,
              //               // isBookmarked: isBookmarked,
              //               // likes: likes,
              //               // postIdx: postIdx,
              //               // profileImage: profileImage,
              //               // identification: identification
              //             } );
              //           }}
              //           key={post.idx}>
              //           <Image
              //             source={{ uri: `${post.image}` }}
              //             style={{ width: 120, height: 120, borderRadius: 100 }}/>
              //         </TouchableOpacity>
             );
          })}  */
  );
};

export default MyPost;
