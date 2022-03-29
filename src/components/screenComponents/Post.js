import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity,
         TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const Post = ()=> {

    const postInfo = [
        {
            postTitle: '빵이',
            postPersonImage: require('../../storage/images/fig.jpg'),
            postImage: require('../../storage/images/post1.png'),
            likes: 765,
            isLiked: false,
        },
        {
            postTitle: '세빈',
            postPersonImage: require('../../storage/images/profile1.jpg'),
            postImage: require('../../storage/images/post2.png'),
            likes: 81,
            isLiked: false,
        },
        {
            postTitle: '짱구',
            postPersonImage: require('../../storage/images/profile2.jpg'),
            postImage: require('../../storage/images/post3.jpg'),
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
                            Liked by { like ? 'you and':'' }{' '}
                            { like ? data.likes+1:data.likes } others
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
                                        안냐세염^^
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


                      <View style={{
                          paddingHorizontal:15, 
                          borderColor:'#ffd2cf', borderWidth:1.5,
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
                      </View>


                 </View>
              )
          })
      }
    </View>
  );
};

export default Post;