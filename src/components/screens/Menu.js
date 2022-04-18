import React,{useState} from 'react';
import { Text, View, StatusBar, Button } from 'react-native';

const Menu = ({navigation})=> {
  
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
  const logout = () => {
    //AsyncStorage.setItem('user',JSON.stringify({...userDetails,loggedIn:false}),);
    navigation.navigate("Login");
  };

  return (
    <View style={{flex:1,flexDirection:'row'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <View style={{backgroundColor:'rgba(52,52,52,0.5)',zIndex:1,width:95,height:'100%'}}/>
  
      <View style={{backgroundColor:'white',width:300,height:'100%',alignItems:'center',justifyContent:'center'}}>
      <Button title="로그아웃" onPress={logout} />
      </View>

    </View>
  );
};

export default Menu;