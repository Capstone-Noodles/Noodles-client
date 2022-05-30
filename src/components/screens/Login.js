import { NavigationContainer } from "@react-navigation/native";
import React, { useRef, useContext } from "react";
import {
  Text,
  View,
  Keyboard,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import Input from "../screenComponents/Input";
import Loader from "../screenComponents/Loader";
import { UserContext, UserProvider } from "../../contexts/User";
import axios from "axios";

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    id: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    inputs.id = inputs.id.replace(/ /g, "").trim();
    inputs.password = inputs.password.replace(/ /g, "").trim();

    let valid = true;
    if (!inputs.id) {
      handleError("아이디를 입력해주세요!", "id");
      valid = false;
    }
    if (!inputs.password) {
      handleError("비밀번호을 입력해주세요!", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("5자 이상의 비밀번호을 입력해주세요!", "password");
      valid = false;
    }
    if (valid) {
      //console.log([inputs.id,inputs.password])
      login();
    }
  };

  const { dispatch } = useContext(UserContext);

  // 로그인 axios
  const pressLoginBtn = async () => {
    await axios
      .post("http://133.186.228.218:8080/users/login", {
        id: `${inputs.id}`,
        password: `${inputs.password}`,
      })
      .then((response) => {
        if (response.data.result) {
          const accessToken = response.data.result.accessToken;
          const refreshToken = response.data.result.refreshToken;
          const id = inputs.id;
          dispatch({ accessToken, refreshToken, id });
          navigation.navigate("Bottom");
        } else {
          Alert.alert("Error", `${response.data.errorMessage}`);
        }
        // AsyncStorage.removeItem(response.data.token);
        // AsyncStorage.setItem("token", response.data.token);
      })
      .catch((err) => {
        console.log(err.response.data);
        // err.response.data == "입력하신 Id와 일치하는 아이디가 없습니다."
        //   ? Alert.alert(
        //       "로그인 실패",
        //       "입력하신 Id와 일치하는 아이디가 없습니다."
        //     )
        //   : Alert.alert("로그인 실패", "비밀번호가 일치하지 않습니다");
        Alert.alert("로그인 실패");
      });
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        //AsyncStorage.setItem("user",JSOM.stringify(inputs));
        navigation.navigate("Bottom");
      } catch (error) {
        Alert.alert("Error", "존재하지 않는 회원입니다!");
      }
      /*let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (inputs.id == userData.id && 
            inputs.password == userData.password) 
        {
          AsyncStorage.setItem('user',JSON.stringify({...userData,loggedIn:true}),);
          navigation.navigate("Bottom");
        } /*else {
          Alert.alert("Error",'invalid details');
        }///
      } else {
        Alert.alert("Error",'존재하지 않는 회원입니다!');
      } */
    }, 1000);
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Loader visible={loading} />
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
          marginTop: 50,
        }}
      >
        <Image source={require("../../storage/images/logo.jpg")} />
      </View>

      <View style={{ padding: 20 }}>
        <Input
          label="ID"
          placeholder="영문ID"
          iconName="person-outline"
          error={errors.id}
          onFocus={() => {
            handleError(null, "id");
          }}
          onChangeText={(text) => handleOnChange(text, "id")}
        />
        <Input
          label="Password"
          placeholder="5자 이상"
          iconName="md-lock-closed-outline"
          error={errors.password}
          onFocus={() => {
            handleError(null, "password");
          }}
          onChangeText={(text) => handleOnChange(text, "password")}
          onEndEditing={pressLoginBtn}
          password
        />

        <TouchableOpacity onPress={pressLoginBtn} activeOpacity={0.7}>
          <View
            style={{
              backgroundColor: "#ffbfbf",
              borderRadius: 10,
              width: "100%",
              height: 45,
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              로그인
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/*<View style={{marginTop:20}}>
      <Text style={{fontWeight:'bold', color:'gray'}}>  ID</Text>
      <TextInput
        placeholder='이메일을 입력하세요.'
        style={{opacity:0.8, borderColor:'gray', borderWidth:1, borderRadius:10,
        width:330, height:40, paddingLeft:10}}
        autoCapitalize="none"
      />
      </View>

      <View style={{marginTop:20}}>
      <Text style={{fontWeight:'bold', color:'gray'}}>  PASSWORD</Text>
      <TextInput
        placeholder='비밀번호를 입력하세요.'
        style={{opacity:0.8, borderColor:'gray', borderWidth:1, borderRadius:10,
        width:330, height:40, paddingLeft:10}}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      </View>

      <TouchableOpacity onPress={()=>navigation.navigate("Bottom")}>
      <View style={{backgroundColor:'#ffbfbf', borderRadius:10,
        width:330, height:50, marginTop:20, 
        alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'#fff', fontSize:20, fontWeight:'bold'}}>로그인</Text>
      </View>
      </TouchableOpacity>*/}

      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity>
          <Text style={{ paddingRight: 10, fontSize: 13 }}>아이디 찾기</Text>
        </TouchableOpacity>
        <Text style={{ color: "gray", fontSize: 13 }}>| </Text>
        <TouchableOpacity>
          <Text style={{ paddingRight: 10, fontSize: 13 }}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <Text style={{ color: "gray", fontSize: 13 }}>| </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ fontSize: 13 }}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
