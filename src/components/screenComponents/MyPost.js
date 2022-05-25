import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const MyPost = (props) => {
  const navigation = useNavigation();

  const myPostInfo = props.data;
  //   console.log(myPostInfo);

  const MyPostInfo = [
    {
      id: 1,
      name: "빵이",
      image: require("../../storage/images/post1.png"),
    },
    {
      id: 0,
      name: "인간",
      image: require("../../storage/images/post22.jpg"),
    },
    {
      id: 0,
      name: "짱구",
      image: require("../../storage/images/post2.png"),
    },
    {
      id: 0,
      name: "짱구",
      image: require("../../storage/images/post3.jpg"),
    },
    // {
    //   id: 0,
    //   name: "짱구",
    //   image: require("../../storage/images/profile1.jpg"),
    // },
    // {
    //     id:0,
    //     name: '짱구',
    //     image: require('../../storage/images/profile2.jpg'),
    // },
  ];

  return (
    <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        {myPostInfo &&
          myPostInfo.map((post) => {
            <TouchableOpacity
              onPress={() => navigation.navigate("PostDetails")}
            >
              <Image
                // source={require("../../storage/images/profile1.jpg")}
                source={{ uri: `${post.image}` }}
                style={{ width: 120, height: 120, borderRadius: 100 }}
              />
            </TouchableOpacity>;
          })}
        {/* <TouchableOpacity onPress={() => navigation.navigate("PostDetails")}>
          <Image
            source={require("../../storage/images/profile1.jpg")}
            style={{ width: 120, height: 120, borderRadius: 100 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("PostDetails")}>
          <Image
            source={require("../../storage/images/profile2.jpg")}
            style={{ width: 120, height: 120, borderRadius: 100 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("PostDetails")}>
          <Image
            source={require("../../storage/images/profile3.jpg")}
            style={{ width: 120, height: 120, borderRadius: 100 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("PostDetails")}>
          <Image
            source={require("../../storage/images/profile4.jpg")}
            style={{ width: 120, height: 120, borderRadius: 100 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("PostDetails")}>
          <Image
            source={require("../../storage/images/profile5.jpeg")}
            style={{ width: 120, height: 120, borderRadius: 100 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("PostDetails")}>
          <Image
            source={require("../../storage/images/profile6.jpg")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              backgroundColor: "#E5E5E5",
            }}
          />
        </TouchableOpacity> */}
      </View>
      {/*MyPostInfo.map((data, index) => {
                return(
                    <View key={index}
                          style={{}}>
                        <View style={{ }}>
                            <Image source={data.image}
                               style={{width:100, height:100, borderRadius:100}}/>
                        </View>
                        <View style={{ }}>
                            <Image source={data.image}
                               style={{width:100, height:100, borderRadius:100}}/>
                        </View>
                    </View>
                )
            })*/}
    </ScrollView>
  );
};

export default MyPost;
