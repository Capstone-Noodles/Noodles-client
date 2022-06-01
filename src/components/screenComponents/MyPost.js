import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";



const MyPost = (props) => {

  const navigation = useNavigation();
  const myPostInfo = useState(props.data);
  //   console.log("in MyPost");
  //   console.log(myPostInfo);

  return (
    <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}>
        { myPostInfo &&
          myPostInfo.map((post) => {
            return (
              <View>
                  <FlatList
                    data={post}
                    numColumns={3}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("PostDetails" );
                        }}
                        key={item.idx}>
                        <Image
                          source={{ uri: `${item.image}` }}
                          style={{ width: 120, height: 120, borderRadius: 100 }}/>
                      </TouchableOpacity>
                    )}
                    windowSize={3}/>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default MyPost;
