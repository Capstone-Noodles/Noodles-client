import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionic from "react-native-vector-icons/Ionicons";
import Evilcons from "react-native-vector-icons/EvilIcons";
import Stories from '../screenComponents/Stories';
import Post from '../screenComponents/Post';

const Home = ({navigation})=> {

  const [distance, setDistance] = useState('20km');

  const data = ['20km', '10km', '5km']

  //화면 맨 위로
  const scrollRef = useRef();
  const scrollTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }
  
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 34
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  return (
    
    <View style={{flex:1,backgroundColor:'white', height:'100%'}}>
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
        borderBottomWidth:1.5,
      }}>
        <TouchableOpacity onPress={()=>navigation.navigate("Locate")}>
          <Ionic name="locate" style={{fontSize: 30}}/>
        </TouchableOpacity>
        <View style={{ marginLeft: 50, flexDirection:'row',alignItems:'baseline'}}>
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
        <SelectDropdown
            defaultButtonText={distance}
            data={data}
            buttonStyle={{
              height: 20,
              width: 80,
              borderRadius: 3,
              backgroundColor: 'white'
            }}
            buttonTextStyle={{
              fontSize: 12,
              color: "grey"
            }}
            dropdownStyle={{
              borderRadius: 3
            }}
            rowStyle={{
              height: 20,
              width: 80,
            }}
            rowTextStyle={{
              fontSize: 12,
              color: "black",
              margin: "auto"
            }}
            renderDropdownIcon={()=> <View style={{ width:10 }}>
              <Image source={{uri:"https://www.clipartmax.com/png/small/118-1181112_chevron-icon-drop-down-menu-arrow.png"}} style={{ width: 10, height: 10, resizeMode: 'contain' }} />
              </View>}
            onSelect={(selectedItem, index) => {
              setDistance(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
            dropdownIconPosition="right"
          />
        {/* <Ionic name="notifications-outline" style={{fontSize:25}}/> */}
      </View>

      <ScrollView>
      {/* <ScrollView ref={scrollRef}> */}
        {/*<Stories/>*/}
        <Post distance={distance}/>
        <View style={{
          justifyContent:'center',
          alignItems:'center',
          padding:20
        }}>
          <TouchableOpacity onPress={scrollTop}>
            <Ionic name="ios-reload-circle-sharp"
                   style={{fontSize:60, opacity:0.2}}/>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
    
  );
};

export default Home;