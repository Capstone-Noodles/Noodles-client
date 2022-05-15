import React from 'react';
import { Text, View, } from 'react-native';

const FriendProfile = ({route})=> {
  const {name, profileImage, follow, post, followers, following} = route.params;
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{name}</Text>
    </View>
    
  );
};

export default FriendProfile;