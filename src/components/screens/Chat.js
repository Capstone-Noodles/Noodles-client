import React from 'react';
import { Text, View, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";

const Chats = [
  {
    id: '1',
    userName: '친구1',
    userImg: require('../../storage/images/profile3.jpg'),
    msgTime: '4분 전',
    msgText: '그래 안녕',
  },
  {
    id: '2',
    userName: '친구2',
    userImg: require('../../storage/images/profile4.jpg'),
    msgTime: '6분 전',
    msgText: '그래 안녕',
  },
  {
    id: '3',
    userName: '친구3',
    userImg: require('../../storage/images/profile5.jpeg'),
    msgTime: '7분 전',
    msgText: '그래 안녕',
  },
];

const Chat = ({navigation})=> {
  return (
    
    <View style={{ flex: 1, backgroundColor:'#fff'}}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>

      <View style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom:10,
        backgroundColor:'white',
        borderBottomColor:'#ffd2cf',
        borderBottomWidth:3,
      }}>
        <TouchableOpacity onPress={()=>navigation.navigate("Locate")}>
          <Ionic name="locate" style={{fontSize: 30}}/>
        </TouchableOpacity>
        <View style={{flexDirection:'row',alignItems:'baseline'}}>
          <Text style={{
            fontSize:25, fontWeight:'700', color:'tomato'}}>
            우
          </Text>
          <Text style={{
            fontSize:15, fontWeight:'700', color:'tomato',}}>
            리
          </Text>
          <Text style={{
            fontSize:25, fontWeight:'700', color:'tomato'}}>
            동
          </Text>
          <Text style={{
            fontSize:15, fontWeight:'700', color:'tomato',}}>
            네
          </Text>
        </View>
        <Ionic name="notifications-outline" style={{fontSize:25}}/>
      </View>
      
      <FlatList 
        data={Chats}
        keyExtractor={item=>item.id}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={{width:'100%',paddingHorizontal:20, alignItems:'center'}} 
            onPress={()=>navigation.navigate('ChatWith', {userName:item.userName, userImg:item.userImg})}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                <View style={{paddingTop:15, paddingBottom:15}}>
                  <Image 
                    style={{width:50, height:50, borderRadius:25}}
                    source={item.userImg} />
                </View>
            
                <View style={{
                  flexDirection:'column',
                  justifyContent:'center',
                  padding:15,
                  paddingLeft:0,
                  marginLeft:10,
                  width:300,
                  borderBottomWidth:1,
                  borderBottomColor:'#ffd2cf',
                }}>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>{item.userName}</Text>
                    <Text style={{fontSize:12, color:'#666'}}>{item.msgTime}</Text>
                  </View>
                  <Text style={{fontSize:14,color:'#333'}}>{item.msgText}</Text>
                </View>

            </View>
          </TouchableOpacity>
        )}
      />

    </View>
    
  );
};

export default Chat;