import React, { useState, useCallback, useContext } from 'react';
import { Alert, Text, View, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import styled from 'styled-components/native';
import axios from "axios";
import { UserContext } from "../../contexts/User";

const ItemContainer = styled.TouchableOpacity`
    flex-direction: column;
    border-bottom-width: 0.5px;
    border-color: gray;
    padding: 10px 15px;
    margin-right: 20px;
    margin-left: 20px;
    height: 50px;
`;

const Address = styled.Text`
    margin: auto 0;
    font-size: 13px;
    font-weight: 300;
    color: gray;
`;

const Item = React.memo(
  ({ item: { address_name, road_address_name, longitude, latitude } }) => {
    const { user } = useContext(UserContext);
    const { dispatch } = useContext(UserContext);
    let address;
    if (road_address_name) {
      address = road_address_name;
    } else {
      address = address_name;
    }

    const _handleAddressPress = useCallback(async() => {
      dispatch({ 
        accessToken: user.accessToken, 
        refreshToken: user.refreshToken,
        id: user.id,
        location: address,
        latitude: latitude, 
        longitude: longitude
      });
    }, [dispatch, user, address, latitude, longitude]);

    if (road_address_name) {
      return (
        <ItemContainer onPress={_handleAddressPress}>
          <Address>{address_name}</Address>
          <Address>도로명: {road_address_name}</Address>
        </ItemContainer>
      );
    } else {
      return (
        <ItemContainer onPress={ _handleAddressPress }>
          <Address>{address_name}</Address>
        </ItemContainer>
      );
    }
  },
);

const Locate = ({navigation})=> {
  const [text,setText] = useState('');
  const [locationObj, setLocationObj] = useState({});

  const _handleSearchAddress = useCallback(async() => {
    await axios.get('https://dapi.kakao.com/v2/local/search/address.json?query='+text,
      {
        headers: {
          Authorization: 'KakaoAK 593cba0bc3ea7f52024615b72630d3ee'
        }
      })
      .then((res)=> {
        const result = res.data.documents;
        const list = []
        if (result[0].road_address) {
          list.push({
            id: 0,
            address_name: result[0].address.address_name,
            road_address_name: result[0].road_address.address_name,
            longitude: result[0].road_address.x,
            latitude: result[0].road_address.y
          })
        } else {
          for (let i = 0; i < result.length; i++) {
            list.push({
              id: i,
              address_name: result[i].address.address_name,
              longitude: result[i].address.x,
              latitude: result[i].address.y
            })
          }
        }
        setLocationObj(list);
      })
      .catch((err) => {
        Alert.alert("입력하신 주소와 일치하는 주소가 없습니다.");
      });
  }, [text, setLocationObj]);

  return (
    
    <View style={{ flex: 1, backgroundColor:'#fff' }}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>

      <View 
        style={{
          justifyContent:'center',
          alignItems:'center',
          width:'100%',
          paddingTop:10, 
        }}>
        <Ionic 
          name="search"
          style={{fontSize:20, opacity:0.7, position:'absolute', zIndex:1, left:25, paddingTop:10}}/>
        <TextInput 
          placeholder="동명(읍,면)으로 검색 (ex. 죽전동)"
          placeholderTextColor="#909090"
          onChangeText={(text) => setText(text)}
          onEndEditing={_handleSearchAddress}
          style={{
            width:'94%',
            height:40,
            backgroundColor:'#EBEBEB',
            borderRadius:10,
            alignItems:'center',
            justifyContent:'center',
            fontSize:18,
            padding:4,
            paddingLeft:40,
          }}/>
      </View>

      <TouchableOpacity 
        activeOpacity={0.7} 
        style={{justifyContent:'center', alignItems:'center', width:'100%'}}
        onPress={()=>navigation.navigate("PresentLocate")}>
        <View style={{
            backgroundColor:'#ffbfbf', borderRadius:10,
            width:'94%', height:45, marginTop:20,
            alignItems:'center', justifyContent:'center', flexDirection:'row'
        }}>
            <Ionic name="locate" style={{fontSize:30,right:5,color:'#fff'}}/>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>현재 위치로 검색</Text>
        </View>
      </TouchableOpacity>  

      <View style={{paddingLeft:20}}>
        <View style={{paddingTop:20}}>
            <Text style={{color:'#484848',fontSize:17,paddingBottom:10}}>
                '{text}' 검색 결과
            </Text>
        </View>
        {/*
        <Text style={{color:'#484848',fontSize:15,paddingVertical:10,left:7,borderBottomColor:'#ffbfbf',borderBottomWidth:1}}>
            {text} 9-12
        </Text> 
        <Text style={{color:'#484848',fontSize:15,paddingVertical:10,left:7,borderBottomColor:'#ffbfbf',borderBottomWidth:1}}>
            {text} 4-25
        </Text> 
        */}
      </View>
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={locationObj}
        renderItem={({ item }) => (
          <Item item={item} />
        )}
        windowSize={3}
      />
    </View>
  );
};

export default Locate;