import React, { useState }  from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, StyleSheet, Platform, Dimensions, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Octicons from "react-native-vector-icons/Octicons";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

//다크모드
import { useTheme } from 'react-native-paper';

const EditProfile = ({navigation}= () => {})=> {


  const [inputs,setInputs] = React.useState({  
    userNickname:'빵이',
    userStateMessage:'@J_bread',
    userImg:require('../../storage/images/fig.jpg'),
  });
  const handleOnChange = (text, input) => {
    setInputs((prevState)=>({...prevState,[input]:text}));
    //console.log([inputs.userNickname,inputs.userStateMessage]);
  };
  
  
  //다크모드
  const {colors} = useTheme();

  const [upload, setupload] = useState(false);
  const [modified, setModifed] = useState(false); //처음 변경시
  //앨범에서 사진 가져오기
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setupload(true);
    setModifed(true);
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
      console.log([inputs.userImg,result.uri])
    } else if (result.cancelled) {
      setupload(false);
    }
  };
  //카메라
  //const [image_camera, setImage_camera] = useState(null);
  const camera = async () => {
    // No permissions request is necessary for launching the image library
    setupload(true);
    setModifed(true);
    setModalVisible(!modalVisible);
    let result = await ImagePicker.launchCameraAsync({
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
  //이미지 삭제
  const delete_image = async () => {
    setImage(null);
    setupload(false);
  }

  //BottomPopup
  const [modalVisible, setModalVisible] = useState(false);
  const devHeight = Dimensions.get("window").height;

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>

      <View style={{margin:25}}>
        <View style={{alignItems:'center',paddingBottom:20}}>
            <View style={{
              height:120,
              width:120,
              borderRadius:100,
              borderWidth:1,
              borderColor:'#ffbfbf',
              justifyContent:'center',
              alignItems:'center',
            }}>
              <ImageBackground
              source={ modified ? {uri:image}:inputs.userImg }
              style={{height:120,width:120,}}
              imageStyle={{borderRadius:100}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={ upload? delete_image:()=>setModalVisible(!modalVisible)}>
                    <Ionic name={upload? "trash-bin":"camera"} size={35} color="#ffbfbf"
                    style={{
                      opacity:0.7,
                      alignItems:'center',
                      justifyContent:'center',
                    }}/>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
        </View>

        <View style={{
          flexDirection:'row',
          marginTop:10,
          marginBottom:10,
          borderBottomWidth:1,
          borderBottomColor:'#ffbfbf',
          paddingBottom:5,
          alignItems:'baseline' }}>
            <Ionic name="heart-circle-outline" size={22} style={{color:'gray'}} color={colors.text}/>
          <TextInput
          value={inputs.userNickname}
          onChangeText={(text)=>handleOnChange(text,'userNickname')}
          placeholder='닉네임'
          placeholderTextColor='gray'
          autoCorrect={false}
          style={{
            flex:1,
            marginTop: Platform.OS === 'ios' ? 0:-12,
            paddingLeft:10,
            color: colors.text,
          }}
          />
        </View>
        <View style={{
          flexDirection:'row',
          marginTop:10,
          marginBottom:10,
          borderBottomWidth:1,
          borderBottomColor:'#ffbfbf',
          paddingBottom:5,
          alignItems:'baseline' }}>
            <Octicons name="note" size={22} style={{color:'gray'}} color={colors.text}/>
          <TextInput
          value={inputs.userStateMessage}
          onChangeText={(text)=>handleOnChange(text,'userStateMessage')}
          placeholder='상태 메세지'
          placeholderTextColor='gray'
          autoCorrect={false}
          style={{
            flex:1,
            marginTop: Platform.OS === 'ios' ? 0:-12,
            paddingLeft:10,
            color: colors.text,
          }}
          />
        </View>

        <TouchableOpacity  onPress={()=>navigation.navigate("Profile")} activeOpacity={0.7} >
            <View style={{
                backgroundColor:'#ffbfbf', borderRadius:10,
                width:'100%', height:45, marginTop:20,
                alignItems:'center', justifyContent:'center', 
            }}>
                <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>완료</Text>
            </View>
        </TouchableOpacity> 

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

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  commandButton: {
    padding:15,
    borderRadius:10,
    backgroundColor:'#FF6347',
    alignItems:'center',
    marginTop:10,
  },
  panel: {
    padding:20,
    backgroundColor:'#FFF',
    paddingTop:20,
  },
  header: {
    backgroundColor:'white',
    shadowColor:'#333333',
    shadowOffset:{width:-1,height:-3},
    shadowRadius:2,
    shadowOpacity:0.4,
    paddingTop:20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  panelHeader: {
    alignItems:'center',
  },
  panelHandle: {
    width:40,
    height:8,
    borderRadius:4,
    backgroundColor:'#00000040',
    marginBottom:10,
  },
  panelTitle: {
    fontSize:27,
    height:35,
  },
  panelSubtitle: {
    fontSize:14,
    color:'gray',
    height:30,
    marginBottom:10,
  },

});

export default EditProfile;