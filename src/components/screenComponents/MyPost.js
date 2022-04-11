import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from "@react-navigation/native";

const MyPost = (props)=> {

  const navigation = useNavigation();

  const MyPostInfo = [
    {
        id:1,
        name: '빵이',
        image: require('../../storage/images/post1.png'),
    },
    {
        id:0,
        name: '인간',
        image: require('../../storage/images/post22.jpg'),
    },
    {
        id:0,
        name: '짱구',
        image: require('../../storage/images/post2.png'),
    },
    {
        id:0,
        name: '짱구',
        image: require('../../storage/images/post3.jpg'),
    },
    {
        id:0,
        name: '짱구',
        image: require('../../storage/images/profile1.jpg'),
    },
    {
        id:0,
        name: '짱구',
        image: require('../../storage/images/profile2.jpg'),
    },
  ];

  return (
    <ScrollView style={{paddingHorizontal:10, paddingVertical:10,}}>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
            paddingVertical:10}}>
            <TouchableOpacity 
                onPressIn={()=>props.data(require('../../storage/images/profile1.jpg'))}
                onPressOut={()=>props.data(null)}>
                <Image source={require('../../storage/images/profile1.jpg')}
                    style={{width:120, height:120, borderRadius:100}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate("PostDetails")}>
                <Image source={require('../../storage/images/profile2.jpg')}
                    style={{width:120, height:120, borderRadius:100}}/>
            </TouchableOpacity>
            
            <Image source={require('../../storage/images/profile3.jpg')}
                   style={{width:120, height:120, borderRadius:100}}/>
        </View>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
            paddingVertical:10}}>
            <Image source={require('../../storage/images/profile4.jpg')}
                   style={{width:120, height:120, borderRadius:100}}/>
            <Image source={require('../../storage/images/profile5.jpeg')}
                   style={{width:120, height:120, borderRadius:100}}/>
            <Image 
                   style={{width:120, height:120, borderRadius:100,backgroundColor:'#E5E5E5'}}/>
        </View>
            {/*MyPostInfo.map((data, index) => {
                return(
                    <View key={index}
                          style={{}}>
                        <View style={{ }}>
                            <Image source={data.image}
                               style={{width:100, height:100, borderRadius:100}}/>
                        </View>
                        <View style={{ }}>
                            <Image source={data.image}
                               style={{width:100, height:100, borderRadius:100}}/>
                        </View>
                    </View>
                )
            })*/}
        

    </ScrollView>
  );
};

export default MyPost;