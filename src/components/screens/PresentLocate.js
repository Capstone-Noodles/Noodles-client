import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Ionic from "react-native-vector-icons/Ionicons";
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";

const PresentLocate = ({ navigation }) => {
  const devWidth = Dimensions.get("window").width;
  const devHeight = Dimensions.get("window").height;
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(UserContext);

  const [mapRegion, setmapRegion] = useState({
    latitude: 35.91395373474155,
    longitude: 127.73829440215488,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });

  const [mapWidth, setMapWidth] = useState("99%");
  // Update map style to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth(devWidth);
  };

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const setMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    // console.log("here");
    console.log(latitude, longitude);

    // console.log("before axios");
    await axios
      .get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
        headers: {
          Authorization: "KakaoAK 593cba0bc3ea7f52024615b72630d3ee",
        },
        params: {
          x: `${longitude}`,
          y: `${latitude}`,
        },
      })
      .then((res) => {
        dispatch({
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          id: user.id,
          location: res.data.documents[0].road_address.address_name,
          latitude: latitude,
          longitude: longitude,
        });
        Alert.alert("위치 설정이 완료되었습니다!");
        navigation.navigate("Locate");
      })
      .catch((err) => {
        Alert.alert("니 주소 없다잉");
      });

    // console.log("end");
  };

  // Get current location information
  // useEffect(async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     setErrorMsg("Permission to access location was denied");
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   setLocation(location);

  //   let latitude = location.coords.latitude;
  //   let longitude = location.coords.longitude;
  //   console.log("here");
  //   console.log(latitude, longitude);

  //   console.log("before axios");
  //   await axios
  //     .get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
  //       headers: {
  //         Authorization: "KakaoAK 593cba0bc3ea7f52024615b72630d3ee",
  //       },
  //       params: {
  //         x: `${longitude}`,
  //         y: `${latitude}`,
  //       },
  //     })
  //     .then((res) => {
  //       dispatch({
  //         accessToken: user.accessToken,
  //         refreshToken: user.refreshToken,
  //         id: user.id,
  //         location: res.data.documents[0].road_address.address_name,
  //         latitude: latitude,
  //         longitude: longitude,
  //       });
  //     })
  //     .catch((err) => {
  //       Alert.alert("니 주소 없다잉");
  //     });
  //   console.log("end");
  // }, []);

  let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   // 좌표로 주소 변환
  //   let latitude = location.coords.latitude;
  //   let longitude = location.coords.longitude;
  //   console.log(latitude, longitude);
  //   async () => {
  //     await axios
  //       .get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
  //         headers: {
  //           Authorization: "KakaoAK 593cba0bc3ea7f52024615b72630d3ee",
  //         },
  //         params: {
  //           x: `${longitude}`,
  //           y: `${latitude}`,
  //         },
  //       })
  //       .then((res) => {
  //         dispatch({
  //           accessToken: user.accessToken,
  //           refreshToken: user.refreshToken,
  //           id: user.id,
  //           location: res.data.documents[0].road_address.address_name,
  //           latitude: latitude,
  //           longitude: longitude,
  //         });
  //         // console.log(res.data.documents[0].address.address_name); // 지번
  //         //console.log(res.data.documents[0].road_address.address_name); // 도로명
  //       })
  //       .catch((err) => {
  //         Alert.alert("니 주소 없다잉");
  //       });
  //   };
  //   // for (let i = 0; i < 1; i++) addressInfo();
  // }

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View style={{ padding: 15 }}></View>
      <MapView
        style={{ width: mapWidth, height: devHeight, flex: 1 }}
        region={mapRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
          // console.log("qqqq");
          updateMapStyle();
        }}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        onPress={() => {
          {
            setMyLocation();
          }
          // navigation.navigate("Locate");
        }}
      >
        <View
          style={{
            backgroundColor: "#ffbfbf",
            borderRadius: 10,
            width: "100%",
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Ionic
            name="locate"
            style={{ fontSize: 30, right: 5, color: "#fff" }}
          />
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            위치설정
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PresentLocate;
