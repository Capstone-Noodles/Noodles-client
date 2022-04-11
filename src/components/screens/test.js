import React, { useState, useEffect } from 'react';
import {  StyleSheet, Dimensions,View, Button, Image, StatusBar, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Title, Caption, Text, TouchableRipple, } from 'react-native-paper';
import Ionic from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
const images = [
    
    '../../storage/images/post1.png',
    '../../storage/images/post2.png',
    '../../storage/images/post3.jpg',
    '../../storage/images/post22.jpg',
    '',
    
]

const WITDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
//const {HEIGHT,WITDTH} = useWindowDimensions();
const Test = ()=> {
    const [imgActive,setimgActive] = useState(0);

    const onchange = (nativeEvent) => {
        if(nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != imgActive) {
                setimgActive(slide);
            }
        }
    }
  return (
    
    <View style={{flex:1,}}>
        <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>

        {/*<View style={{
          alignItems:'center',
          justifyContent:'center',
          paddingTop:50,
          paddingBottom:20,
          paddingHorizontal:10, 
      }}>
          <ScrollView style={{
              width:'95%',
              height:350,
              backgroundColor:'#ffd2cf',
              borderRadius:10,
              
          }}
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
          >
              {
                    images.map((e,index) =>
                        
                    <TouchableOpacity key={e}>
                    <Entypo name='camera' style={{fontSize:20}}/>
                    
                  </TouchableOpacity>
                            
                    )
                }
               
          </ScrollView>
          <View style={styles.wrapDot}>
            {
                images.map((e,index) =>
                    
                    <Text 
                        key={e}
                        style={imgActive==index ? styles.dotActive: styles.dot}
                        >
                            ●
                    </Text>
                   
                )
            }
        </View>
        </View>*/}

      <View style={{alignItems:'center',
          justifyContent:'center',
          paddingTop:50,
          paddingBottom:20,
          paddingHorizontal:10, }}>
        <ScrollView 
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={{width:'95%',
            height:350,
            backgroundColor:'#ffd2cf',
            borderRadius:10,}}>
                {
                    images.map((e,index) =>
                        <View key={e} resizeMode='stretch'
                        style={styles.wrap}>
                        {/*<Image
                            key={e}
                            resizeMode='stretch'
                            style={styles.wrap}
                            sorce={{uri:e}}
                />*/}
                        
                        <TouchableOpacity  >
                            <Entypo name='camera' style={{fontSize:20}}/>   
                        </TouchableOpacity>
                          
                          </View>
                          
                    )
                }
        </ScrollView>
        <View style={styles.wrapDot}>
            {
                images.map((e,index) =>
                    <Text 
                        key={e}
                        style={imgActive==index ? styles.dotActive: styles.dot}
                        >
                            ●
                    </Text> 
                )
            }
        </View>
      </View>

    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    wrap: {
        width:WITDTH-30,
        height: 350,
        alignItems:'center',
        justifyContent:'center'
    },
    wrapDot: {
        position:'absolute',
        bottom:20,
        flexDirection:'row',
        alignSelf:'center',
    },
    dotActive: {
        margin:3,
        color:'black'
    },
    dot: {
        margin:3,
        color:'white'
    }
});

export default Test;