import React, { useState } from 'react';
import { Text, View, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { FriendsProfileData } from '../screenComponents/Data';
import Ionic from 'react-native-vector-icons/Ionicons';

const Follower = ({route})=> {
  const navigation = useNavigation();

  return (
    
    <View style={{ flex: 1, backgroundColor:'#fff' }}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <ScrollView style={{margin:10}} showsVerticalScrollIndicator={false}>
          {
            FriendsProfileData.slice(0,4).map((data, index) => {
              const [follow,setFollow] = useState(data.follow);
              return(
                <View key={index} style={{width:'100%'}}>
                  <View
                    style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      alignItems:'center',
                      paddingVertical:20,
                      width:'100%',
                    }}>

                    <TouchableOpacity 
                      style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        maxWidth:'64%',
                      }}
                      onPress={()=>navigation.push("FriendProfile", {
                        name: data.name,
                        profileImage: data.profileImage,
                        follow: data.follow,
                        post: data.posts,
                        followers: data.followers,
                        following: data.following,
                      })}>
                      <Image
                        source={data.profileImage}
                        style={{
                          width:45,
                          height:45,
                          borderRadius:100,
                          marginRight:10,
                        }}
                      />
                      <View style={{flexDirection:'column'}}>
                        <Text style={{fontWeight:'bold'}}>
                          {data.name}
                        </Text>
                        <Text style={{color:'#484848'}}>
                          {data.StateMessage}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={{width: follow? 72:68}}
                      onPress={() => setFollow(!follow)}>
                      <View
                        style={{
                          backgroundColor: follow ? '#DEDEDE':'#ffbfbf',
                          width:'100%',
                          height:30,
                          borderRadius:5,
                          justifyContent:'center',
                          alignItems:'center'
                        }}>
                        <Text style={{color:follow ? '#6A6A6A':'#fff',fontWeight:'bold'}}>
                          {follow ? 'Following':'Follow'}
                        </Text>
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>
              );
            })
          }

          
        
      </ScrollView>
    </View>
    
  );
};

export default Follower;