import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  Alert,
  TextInput,
  ScrollView
} from "react-native";
//import { ScrollView } from 'react-native-virtualized-view';
import styled from "styled-components";
import Ionic from 'react-native-vector-icons/Ionicons';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import Agreement from "../screenComponents/Agreement";
import Input from "../screenComponents/Input";
import Loader from "../screenComponents/Loader";
import axios from "axios";

const CheckIdContainer = styled.View`
  flex-direction: row;
`;

const ErrorText = styled.Text`
  flex: 1;
  width: 50%;
  height: 17px;
  color: grey;
`;

const Signup = ({ navigation }) => {
  const scrollRef = useRef();
  const scrollTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const [inputs, setInputs] = React.useState({
    id: "",
    password: "",
    phoneNumber: "",
    nicknickname: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [duplicated, setDuplicated] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    if (errorMessage == '사용가능한 아이디입니다.') {
      if (inputs.id && inputs.password && inputs.phoneNumber && inputs.nickname) {
        setDisabled();
      }
    }
  }, [errorMessage, inputs]);

  const pressSignupBtn = async () => {
    console.log(inputs);
    await axios
      .post("http://133.186.228.218:8080/users", {
        id: `${inputs.id}`,
        password: `${inputs.password}`,
        phoneNum: `${inputs.phoneNumber}`,
        nickName: `${inputs.nickname}`,
      })
      .then((response) => {
        console.log(response.data.result);
        // AsyncStorage.removeItem(response.data.token);

        // AsyncStorage.setItem("token", response.data.token);
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("오류", err.message);
      });
  };

  const validateIdDuplicate = useCallback(async() => {
    try {
      axios({
        method: 'get',
        url: `http://133.186.228.218:8080/users/idCheck?id=${inputs.id}`,
      })
      .then(function (response) {
        setErrorMessage('사용 가능한 아이디입니다.')
      })
      .catch(function(error) {
        setErrorMessage('중복된 아이디입니다.')
      });
    } catch (e) {
    } finally {

    }
  }, [inputs, errorMessage]);

  // const validateIdDuplicate = async () => {
  //   await axios
  //     .get(`http://133.186.228.218:8080/users/idCheck?id=${inputs.id}`)
  //     .then((response) => {
  //       console.log(isOk);
  //       Alert.alert("사용가능한 아이디입니다.");
  //     })
  //     .catch((err) => {
  //       Alert.alert("아이디가 중복되었습니다.");
  //       console.log(err);
  //     });
  // };

  const validate = () => {
    Keyboard.dismiss();
    //inputs.id=inputs.id.replace(/\s| /gi, '');

    let valid = true;
    if (!inputs.id) {
      handleError("아이디를 입력해주세요!", "id");
      valid = false;
    } else if (inputs.id.length > 20) {
      handleError("20자 이하의 아이디를 입력해주세요!", "id");
      valid = false;
    } else if (inputs.id.match(/[\s]/g)) {
      handleError("공백을 제거해주세요!", "id");
      valid = false;
    } else if (inputs.id.match(/[`~!@#$%^&*|\\\'\";:\/?]/gi)) {
      handleError("특수문자를 제거해주세요!", "id");
      valid = false;
    }
    if (!inputs.password) {
      handleError("비밀번호를 입력해주세요!", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("5자 이상의 비밀번호를 입력해주세요!", "password");
      valid = false;
    } else if (inputs.password.length > 20) {
      handleError("20자 이하의 비밀번호를 입력해주세요!", "password");
      valid = false;
    }
    if (!inputs.phoneNumber) {
      handleError("휴대폰 번호를 입력해주세요!", "phoneNumber");
      valid = false;
    } else if (!inputs.phoneNumber.match(/^[0-9\b -]/g)) {
      handleError("숫자만 입력해주세요!", "phoneNumber");
      valid = false;
    }
    if (!inputs.nickname) {
      handleError("닉네임을 입력해주세요!", "nickname");
      valid = false;
    }
    if (valid == false) {
      scrollTop();
    }
    if (valid) {
      //console.log([inputs.id,inputs.password])
      scrollTop();
      signup();
    }
  };
  const signup = () => {
    console.log(disabled);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        //AsyncStorage.setItem("user",JSOM.stringify(inputs));
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Error", "뭔가 잘못됐다");
      }
    }, 2000);
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Loader visible={loading} />
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      <Text
        style={{
          paddingTop: 25,
          paddingBottom: 10,
          paddingLeft: 20,
          fontSize: 20,
          opacity: 0.6,
        }}
      >
        아래의 사항을 빠짐없이 기입해 주세요.
      </Text>

      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Input
          label="ID"
          placeholder="영문ID"
          iconnickname="person-outline"
          error={errors.id}
          onFocus={() => {
            handleError(null, "id");
          }}
          onChangeText={(text) => handleOnChange(text, "id")}
        />
        <CheckIdContainer>
          <ErrorText>{errorMessage}</ErrorText>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#E5E5E5",
                borderRadius: 10,
                width: 60,
                height: 17,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
              }}
              onPress={validateIdDuplicate}
            >
              <Text style={{ textAlign: "right", fontSize: 12 }}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </CheckIdContainer>
        {/*<View style={{marginBottom:15,}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'baseline'}}>
              <Text style={{marginVertical:5,fontSize:14,color:'gray'}}>ID</Text>
              <TouchableOpacity style={{
                  backgroundColor:'#E5E5E5',
                  borderRadius:10,
                  width:50, height:15, 
                  alignItems:'center', justifyContent:'center',marginVertical:5}}>
                    <Text style={{textAlign:'right',fontSize:12}}>
                      중복확인
                    </Text>
              </TouchableOpacity>
            </View>

            <View style={{   
                    width:'100%',
                    height:45,
                    backgroundColor:'#E5E5E5',
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:10,
                    borderRadius:10,
                    borderColor: errors.id ? 'red':'#ffbfbf',
                    borderWidth: isFocused ? 2.5:1,
            }}>
              <Ionic nickname="person-outline" style={{fontSize:20,color:'gray',paddingRight:10}}/>
              <TextInput 
                  autoCorrect={false}
                  onFocus={()=>{
                      handleError(null,'id');
                      setIsFocused(true);
                  }}
                  onBlur={()=>{
                      setIsFocused(false);
                  }}
                  style={{flex:1}}
                  placeholder="영문ID" 
                  
              /> 
            </View>
              {errors.id && (
                <Text style={{color:'red', fontSize:12, marginTop:7}}>{errors.id}</Text>
              )}
              </View>*/}

        <Input
          label="Password"
          placeholder="5자 이상"
          iconnickname="md-lock-closed-outline"
          error={errors.password}
          onFocus={() => {
            handleError(null, "password");
          }}
          onChangeText={(text) => handleOnChange(text, "password")}
          password
        />
        <Input
          label="PhoneNumber"
          placeholder="- 없이 숫자만 입력"
          iconnickname="ios-logo-whatsapp"
          error={errors.phoneNumber}
          onFocus={() => {
            handleError(null, "phoneNumber");
          }}
          onChangeText={(text) => handleOnChange(text, "phoneNumber")}
          keyboardType="numeric"
        />
        <Input
          label="Nickname"
          placeholder="닉네임"
          iconnickname="heart-circle-outline"
          error={errors.nickname}
          onFocus={() => {
            handleError(null, "nickname");
          }}
          onChangeText={(text) => handleOnChange(text, "nickname")}
        />
      </View>

      <Text
        style={{
          paddingTop: 20,
          paddingBottom: 15,
          paddingLeft: 20,
          fontSize: 20,
          opacity: 0.6,
        }}
      >
        서비스 이용 약관에 동의해 주세요.
      </Text>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Agreement/>
      </View>

      <TouchableOpacity
        onPress={pressSignupBtn}
        activeOpacity={0.7}
        style={{ padding: 20 }}
      >
        <View
          style={{
            /*backgroundColor: isChecked? '#ffbfbf':'#D9D9D9', */
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
            가입
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Signup;
