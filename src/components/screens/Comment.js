import React, { useContext, useEffect, useState } from 'react';
import {Text, View, TextInput, FlatList, TouchableOpacity, Image, Dimensions, Modal} from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {UserContext} from "../../contexts/User";
import axios from "axios";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
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

        return (
            <View style={{ flex: 1, backgroundColor:'#fff' }}>
                <View>
                    <View style={{
                        alignItems:'center',
                        flexDirection:'row',
                        width:'100%',
                        padding: 10,
                        backgroundColor: '#F1F1F1',
                        paddingLeft: 30,
                        }}
                    >

                        <Image
                            source={{uri:`${profileImage}`}}
                            style={{ width: 40, height: 40, borderRadius: 100 }}
                        />
                        <Text
                            style={{
                                width:'75%',
                                height:40,
                                backgroundColor:'#fff',
                                borderRadius:5,
                                borderColor:'#D9D9D9',
                                borderWidth:0.5,
                                alignItems:'center',
                                justifyContent:'center',
                                fontSize:18,
                                padding:4,
                                paddingLeft:10,
                                left:5,
                            }}
                        > { content } </Text>
                    </View>
                </View>
            </View>
        );
    },
);

const Comment = ()=> {

        const {user} = useContext(UserContext);
        const [comments, setComments] = useState([]);


        useEffect(() => {
            try {
                axios({
                    method: 'get',
                    url: 'http://133.186.228.218:8080/comments/28/postComment',
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
            <View>
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
                    <TouchableOpacity>
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