import React from 'react';
import { Text, View, StatusBar } from 'react-native';

const EditProfile = ()=> {
  return (
    
    <View>
        <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <Text style={{flex:1,alignItems:'center',backgroundColor:"white"}}>EditProfile</Text>
    </View>
    
  );
};

export default EditProfile;