import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from "@react-navigation/native";

const Stories = ()=> {

  const navigation = useNavigation();

  const storyInfo = [
      {
          id:1,
          name: '빵이',
          image: require('../../storage/images/fig.jpg'),
      },
      {
        id:0,
        name: '인간',
        image: require('../../storage/images/profile1.jpg'),
    },
    {
        id:0,
        name: '짱구',
        image: require('../../storage/images/profile2.jpg'),
    },
    {
        id:0,
        name: '펭귄',
        image: require('../../storage/images/profile3.jpg'),
    },
    {
        id:0,
        name: '호빵맨',
        image: require('../../storage/images/profile4.jpg'),
    },
    {
        id:0,
        name: '루피',
        image: require('../../storage/images/profile5.jpeg'),
    },
  ];

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 
    style={{paddingVertical: 20}}>
        {
            storyInfo.map((data, index) => {
                return(
                    <TouchableOpacity 
                     key={index} 
                     onPress={() => navigation.push('Status', {
                         name: data.name,
                         image: data.image,
                     })}>
                        <View style={{
                            flexDirection:'column', 
                            paddingHorizontal:8, 
                            position:'relative',
                        }}>
                            {
                                data.id == 1 ?
                                (
                                    <View 
                                      style={{
                                          position:'absolute', 
                                          bottom:15, 
                                          right:10, 
                                          zIndex:1,
                                        }}>
                                        <Entypo name="circle-with-plus" 
                                          style={{
                                              fontSize:20, 
                                              color:"pink", 
                                              backgroundColor:'white', 
                                              borderRadius:100
                                            }}/>

                                    </View>
                                ) : null
                            }
                            <View 
                                style={{
                                    width:68, 
                                    height:68, 
                                    backgroundColor:'white', 
                                    borderWidth:1.8, 
                                    borderRadius:100,
                                    borderColor:'#f6acad',
                                    justifyContent:'center',
                                    alignItems:'center',
                                }}>
                                <Image 
                                    source={data.image} 
                                    style={{
                                        resizeMode:'cover', 
                                        width:'92%', 
                                        height:'92%', 
                                        borderRadius:100, 
                                        backgroundColor:'orange',
                                        }}/>

                            </View>
                            <Text
                              style={{
                                  textAlign:'center',
                                  fontSize:10,
                                  opacity:data.id == 0 ? 1:0.5,
                              }}>
                                {data.name}</Text>
                        </View>

                    </TouchableOpacity>
                )
            })
        }

    </ScrollView>
  );
};

export default Stories;