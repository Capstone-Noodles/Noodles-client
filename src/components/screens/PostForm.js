import React, { useState, useContext, useCallback } from 'react';
import {  View,ScrollView, Image, ImageBackground, StatusBar, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Title, Caption, Text, TouchableRipple, } from 'react-native-paper';
//import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Ionic from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";

const PostForm = ({navigation})=> {

  const { user } = useContext(UserContext);
  const { dispatch } = useContext(UserContext);
  const [upload, setupload] = useState(false);
  //앨범에서 사진 가져오기
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setupload(true);
    setModalVisible(!modalVisible);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    } else if (result.cancelled) {
      setupload(false);
    }
  };
  //카메라
  //const [image_camera, setImage_camera] = useState(null);
  const camera = async () => {
    // No permissions request is necessary for launching the image library
    setupload(true);
    setModalVisible(!modalVisible);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    } else if (result.cancelled) {
      setupload(false);
    }
  };

  //이미지 삭제
  const delete_image = async () => {
    setImage(null);
    setupload(false);
  }

  const _handleContent = (content) => {
    setContent(content);
  };

  //업로드버튼 클릭시
  const uploadButton = useCallback(async() => {
    try {
      if (user.latitude == null) {
        dispatch({ 
          accessToken: user.accessToken, 
          refreshToken: user.refreshToken,
          id: user.id,
          location: '서울 중구 오장동',
          latitude: 37.5642135, 
          longitude: 127.0016985
        });
      }
      
      // const data = {
      //   uploadDto : { 
      //     longitude: `${user?.longitude}`,
      //     latitude: `${user?.latitude}`,
      //     location: `${user?.location}`,
      //     content: `${content}`,
      //   },
      //   imageFileList : `${image}`,
      // }
      const form = new FormData();
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : `image`;
      const uploadDto = {
        longitude: `${user?.longitude}`,
        latitude: `${user?.latitude}`,
        location: `${user?.location}`,
        content: `${content}`,
      }
      form.append('uploadDto', JSON.stringify(uploadDto));
      form.append('imageFileList', { uri: image, name: filename, type });
      axios.post('http://133.186.228.218:8080/posts/write', form, {
        headers: {
          "x-auth-token": `${user?.accessToken}`,
          "Content-Type": "multipart/form-data",
        }
      })
      // axios({
      //   method: 'post',
      //   url: 'http://133.186.228.218:8080/posts/write',
      //   headers: {
      //     'x-auth-token': `${user?.accessToken}`,
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: form
      // })
      .then(function(response){
        Alert.alert("알림", "글이 작성되었습니다.");
        return response.data;
      })
      .catch(function(error){
        console.log(error);
        alert("Error",error);
      });
    } catch (e) {
      alert(e);
    } finally {
    }
  }, [image, user, dispatch, content]);

  //BottomPopup
  const [modalVisible, setModalVisible] = useState(false);
  const devHeight = Dimensions.get("window").height;

  return (
    <ScrollView style={{flex:1,backgroundColor:'white',height:'100%'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <View style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingTop:35,
        paddingBottom:10,
        backgroundColor:'white',
        borderBottomColor:'#ffd2cf',
        borderBottomWidth:3,
      }}>
        <TouchableOpacity onPress={()=>navigation.navigate("Locate")}>
          <Ionic name="locate" style={{fontSize: 30}}/>
        </TouchableOpacity>
        <Text>{user.location}</Text>
        <Ionic name="notifications-outline" style={{fontSize:25}}/>
      </View>

      <View style={{
          alignItems:'center',
          justifyContent:'center',
          paddingVertical:30,
          paddingHorizontal:10, 
      }}>
          <View style={{
              width:350,
              height:350,
              backgroundColor:'#ffd2cf',
              borderRadius:10,
              alignItems:'center',
              justifyContent:'center',
          }}>
              <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)} style={{padding: upload? 0:30}}>
                <Entypo name={upload ? '':'camera'} style={{fontSize:30,color:'#484848'}}/>
              </TouchableOpacity>
              <View style={{paddingBottom:38}}>
                {image && 
                <ImageBackground
                    source={{ uri: image }} style={{width:315,height:315,borderRadius:10}}>
                    <TouchableOpacity onPress={delete_image}>
                      <AntDesign name={upload ? 'minuscircle':''} 
                          style={{textAlign:'right',fontSize:25,color:'rgba(90,90,90,0.8)',padding:5}}/>
                    </TouchableOpacity>
                </ImageBackground>}
                </View>
               
          </View>
      </View>

      <View style={{
          alignItems:'center',
          justifyContent:'center',
          paddingBottom:15,
          paddingHorizontal:10,    
        }}>
          <View style={{
              width:350,
              height:150,
              backgroundColor:'#ffd2cf',
              borderRadius:10,
              alignItems:'center',
              justifyContent:'center',

          }}>
              <TextInput 
                style={{width:'95%'}}
                value={content}
                multiline
                numberOfLines={8}
                onChangeText={_handleContent}
                placeholder="글을 자유롭게 작성해보세요."
              />
          </View>
      </View>

      <View style={{alignItems:'flex-end',justifyContent:'center',padding:20}}>
          <TouchableOpacity style={{
            backgroundColor:'#ffd2cf',
            borderRadius:10,
            width:65, height:30, 
            alignItems:'center', justifyContent:'center',marginVertical:5}}
            onPress={uploadButton}>
            <Text style={{fontSize:15,color:'#484848'}}>
              업로드
            </Text>
          </TouchableOpacity>
      </View>

        
      {/*popup*/}
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
                <Text style={{fontSize:18,fontWeight:'600',color:'#484848'}}>사진 첨부하기</Text>
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
                <TouchableOpacity onPress={camera}>
                  <Entypo 
                    name="camera" 
                    style={{fontSize:65,color:'#ffbfbf'}}/>
                  <Text style={{textAlign:'center',fontSize:15,color:'#484848',}}>카메라</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage}>
                  <AntDesign 
                    name="picture" 
                    style={{fontSize:65,color:'#ffbfbf'}}/>
                  <Text style={{textAlign:'center',fontSize:15,color:'#484848',}}>앨범</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      

    </ScrollView>
  );
};

export default PostForm;