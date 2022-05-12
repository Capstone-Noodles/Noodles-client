import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import Ionic from "react-native-vector-icons/Ionicons";

const PresentLocate = ({navigation})=> {
  const devWidth= Dimensions.get('window').width;
  const devHeight= Dimensions.get('window').height;

  const [mapRegion, setmapRegion] = useState({
    latitude: 35.91395373474155,
    longitude: 127.73829440215488,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });

  const [mapWidth, setMapWidth] = useState('99%');
  // Update map style to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth(devWidth)
  }


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // Get current location information 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log('[LOG] current location : ' + text);
  }

  return (
    
    <View style={{ flex: 1, flexDirection:'column' }}>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <View style={{padding:15}}></View>
      <MapView 
        style={{ width: mapWidth, height: devHeight, flex:1 }}
        region={mapRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
           updateMapStyle()
        }}
      />
      <TouchableOpacity 
        activeOpacity={0.7} 
        style={{justifyContent:'center', alignItems:'center', width:'100%'}}
        onPress={()=>navigation.navigate("Locate")}>
        <View style={{
            backgroundColor:'#ffbfbf', borderRadius:10,
            width:'100%', height:45, 
            alignItems:'center', justifyContent:'center', flexDirection:'row'
        }}>
            <Ionic name="locate" style={{fontSize:30,right:5,color:'#fff'}}/>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>위치설정</Text>
        </View>
      </TouchableOpacity>  
    </View>
    
  );
};

export default PresentLocate;