import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity,
         TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const PeoplePost = ()=> {

    const postInfo = [
        {
            postTitle: '친구1',
            postPersonImage: require('../../storage/images/profile3.jpg'),
            postImage: require('../../storage/images/post22.jpg'),
            likes: 37,
            isLiked: false,
        },
        {
            postTitle: '친구2',
            postPersonImage: require('../../storage/images/profile4.jpg'),
            postImage: require('../../storage/images/post3.jpg'),
            likes: 81,
            isLiked: false,
        },
        {
            postTitle: '친구3',
            postPersonImage: require('../../storage/images/profile5.jpeg'),
            postImage: require('../../storage/images/post2.png'),
            likes: 99,
            isLiked: false,
        }
    ];

  return (
    <View>
      {
          postInfo.map( (data,index)=> {
              const [like, setLike] = useState(data.isLiked)
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
                            <TouchableOpacity>
                                <Feather name="bookmark" 
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
                        <TouchableOpacity>
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
                                  }}> {data.postTitle}
                                  </Text>
                                  <Text style={{fontSize:12, opacity:0.6, paddingVertical:2, paddingLeft:4}}>
                                        경기도 수원시 망포동
                                  </Text>
                                  <Text style={{
                                      fontWeight:'700', fontSize:14,
                                      paddingVertical:2, paddingLeft:4}}>
                                        즐겁다
                                  </Text>
                              </View>
                          </View>
                          <View style={{}}>
                            <Text style={{
                                fontSize:12, opacity:0.6, paddingVertical:2, paddingRight:35
                            }}>대략 130m</Text>
                            <Text style={{
                                fontSize:12, opacity:0.3, paddingVertical:2, paddingLeft:55
                            }}>더보기</Text>
                          </View>
                      </View>


                 </View>
              )
          })
      }
    </View>
  );
};

export default PeoplePost;