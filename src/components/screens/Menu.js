import React,{useState} from 'react';
import { Text, View, StatusBar, Button, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionic from "react-native-vector-icons/Ionicons";

const Menu = ({navigation})=> {
  
  /*
  const [userDetails,setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };
  */
  const logout = () => {
    //AsyncStorage.setItem('user',JSON.stringify({...userDetails,loggedIn:false}),);
    navigation.navigate("Login");
  };

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>

      <View style={{padding:7}}>

        <TouchableOpacity 
          style={{
            width:'100%',
            padding:5,
            flexDirection:'row',
            alignItems:'center',
            left:7,
          }}>
            <Icon name="account-cog-outline" style={{fontSize:25,color:'#ffbfbf'}}/>
          <View style={{margin:10}}>
            <Text style={{fontSize:18,color:'#484848'}}>계정/정보 관리</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            width:'100%',
            padding:5,
            flexDirection:'row',
            alignItems:'center',
            left:7,
          }}>
            <FontAwesome name="bookmark-o" style={{fontSize:25,color:'#ffbfbf'}}/>
          <View style={{margin:10}}>
            <Text style={{fontSize:18,color:'#484848'}}>  스크랩</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            width:'100%',
            padding:5,
            flexDirection:'row',
            alignItems:'center',
            left:7,
          }}>
            <Ionic name="notifications-outline" style={{fontSize:25,color:'#ffbfbf'}}/>
          <View style={{margin:10}}>
            <Text style={{fontSize:18,color:'#484848'}}>알림설정</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={logout}
          style={{
            width:'100%',
            padding:5,
            flexDirection:'row',
            alignItems:'center',
            left:7
          }}>
            <MaterialIcons name="logout" style={{fontSize:25,color:'#ffbfbf'}}/>
          <View style={{margin:10}}>
            <Text style={{fontSize:18,color:'#484848'}}>로그아웃</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            width:'100%',
            padding:5,
            flexDirection:'row',
            alignItems:'center',
            left:7
          }}>
            <Icon name="account-remove-outline" style={{fontSize:25,color:'#ffbfbf'}}/>
          <View style={{margin:10}}>
            <Text style={{fontSize:18,color:'#484848'}}>회원탈퇴</Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
    
  );
};

export default Menu;
