import React, { useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Modal, Dimensions, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from "react-native-vector-icons/Foundation";

const PostDetails = ({navigation})=> {

    const userNickname = '빵이';
    const postInfo = [
        {
            Nickname: userNickname,
            postPersonImage: require('../../storage/images/fig.jpg'),
            postImage: require('../../storage/images/profile1.jpg'),
            location: '경기도 수원시 망포동',
            textmsg: '안',
            distance: '대략 130m',
            likes: 765,
            isLiked: false,
            bookmarked: false,
        },
        {
            Nickname: userNickname,
            postPersonImage: require('../../storage/images/fig.jpg'),
            postImage: require('../../storage/images/profile2.jpg'),
            location: '경기도 수원시 화서동',
            textmsg: '녕',
            distance: '대략 270m',
            likes: 81,
            isLiked: false,
            bookmarked: false,
        },
        {
            Nickname: userNickname,
            postPersonImage: require('../../storage/images/fig.jpg'),
            postImage: require('../../storage/images/profile3.jpg'),
            location: '경기도 수원시 떡잎마을',
            textmsg: '하',
            distance: '대략 560m',
            likes: 99,
            isLiked: false,
            bookmarked: false,
        },
        {
            Nickname: userNickname,
            postPersonImage: require('../../storage/images/fig.jpg'),
            postImage: require('../../storage/images/profile4.jpg'),
            location: '경기도 수원시 망포동',
            textmsg: '세',
            distance: '대략 130m',
            likes: 97,
            isLiked: false,
            bookmarked: false,
      },
      {
          Nickname: userNickname,
          postPersonImage: require('../../storage/images/fig.jpg'),
          postImage: require('../../storage/images/profile5.jpeg'),
          location: '경기도 수원시 화서동',
          textmsg: '요',
          distance: '대략 270m',
          likes: 55,
          isLiked: false,
          bookmarked: false,
      },
      {
          Nickname: userNickname,
          postPersonImage: require('../../storage/images/fig.jpg'),
          postImage: require('../../storage/images/profile6.jpg'),
          location: '경기도 수원시 떡잎마을',
          textmsg: '우',
          distance: '대략 560m',
          likes: 44,
          isLiked: false,
          bookmarked: false,
      },
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const devHeight = Dimensions.get("window").height;

  
  return (
    <ScrollView style={{backgroundColor:'white',flex:1}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>

      
      <View style={{
        paddingTop:30,
        paddingBottom:5,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        borderBottomColor:'#ffd2cf',
        borderBottomWidth:1.5,
      }}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionic 
              name="chevron-back-sharp" 
              style={{fontSize:38,color:'#484848'}}/>
        </TouchableOpacity>
        <Text style={{fontSize:20,paddingLeft:10,color:'#484848'}}>게시물</Text>
      </View>
      
      {
          postInfo.map( (data,index)=> {
              const [like, setLike] = useState(data.isLiked);
              const [bookmark, setBookmark] = useState(data.bookmarked);

              const popup = () => {
      
                if (userNickname === data.Nickname) {
                  //console.log([userNickname,data.Nickname])
                  setModalVisible(!modalVisible)
                }
              }

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
                            <TouchableOpacity onPress={()=> setBookmark(!bookmark)}>
                                <FontAwesome name={ bookmark ? "bookmark":"bookmark-o" }
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
                        <TouchableOpacity onPress={popup} style={{paddingLeft:10}}>
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
                                  }}> {data.Nickname}
                                  </Text>
                                  <Text style={{fontSize:12, opacity:0.6, paddingVertical:2, paddingLeft:4}}>
                                        {data.location}
                                  </Text>
                                  <Text style={{
                                      fontWeight:'700', fontSize:14,
                                      paddingVertical:2, paddingLeft:4}}>
                                        {data.textmsg}
                                  </Text>
                              </View>
                          </View>
                          <View style={{}}>
                            <Text style={{
                                fontSize:12, opacity:0.6, paddingVertical:2, paddingRight:35
                            }}>{data.distance}</Text>
                            <Text style={{
                                fontSize:12, opacity:0.3, paddingVertical:2, paddingLeft:55
                            }}>더보기</Text>
                          </View>
                      </View>

 
                 </View>
              )
          })
      }
      {/*User_Modal*/}
      <View>
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { setModalVisible(!modalVisible); }}
        >
          <View style={{
            flex:1,
            backgroundColor:'#000000AA',
            justifyContent:'flex-end',
  
          }}>
            <View style={{
              backgroundColor:'white',
              width:'100%',
              borderTopRightRadius:15,
              borderTopLeftRadius:15,
              paddingHorizontal:10,
              maxHeight:devHeight*0.4,
            }}>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginHorizontal:10,
                marginVertical:10
              }}>
                <Text style={{fontSize:18,fontWeight:'600',color:'#484848'}}>나의 게시물</Text>
                <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
                  <Ionic 
                    name="close" 
                    style={{fontSize:20,color:'#484848',textAlign:'right'}}/>
                </TouchableOpacity>
              </View>
              
              <View style={{
                flexDirection:'row',
                justifyContent:'space-around',
                alignItems:'center',
                marginHorizontal:10,
                marginVertical:20,
              }}>
                <TouchableOpacity>
                  <Foundation 
                    name="page-edit" 
                    style={{fontSize:65,color:'#ffbfbf'}}/>
                  <Text style={{textAlign:'center',fontSize:15,color:'#484848',}}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Foundation 
                    name="page-delete" 
                    style={{fontSize:65,color:'#ffbfbf'}}/>
                  <Text style={{textAlign:'center',fontSize:15,color:'#484848',}}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        </View>

       
        
    </ScrollView>
  );
};

export default PostDetails;