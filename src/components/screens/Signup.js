import React from 'react';
import { Text, View, StatusBar, TouchableOpacity, Keyboard, Alert, ScrollView, TextInput } from 'react-native';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import Ionic from 'react-native-vector-icons/Ionicons';
import Input from '../screenComponents/Input';
import Loader from '../screenComponents/Loader';

const Signup = ({navigation}) => {

  const [inputs,setInputs] = React.useState({  
    id:'',
    password:'',
    phoneNumber:'',
    name:'',
  });
  const [errors,setErrors] = React.useState({});
  const [loading,setLoading] = React.useState(false);
  const [isChecked,setIsChecked] = React.useState(false);

  const validate = () => {
      Keyboard.dismiss();
      let valid = true;
      if (!inputs.id) {
        handleError('아이디을 입력해주세요!','id');
        valid=false;
      } 
      if (!inputs.password) {
        handleError('비밀번호을 입력해주세요!','password');
        valid=false;
      } else if (inputs.password.length < 5) {
        handleError('5자 이상의 비밀번호을 입력해주세요!','password');
        valid=false;
      }
      if (!inputs.phoneNumber) {
        handleError('휴대폰 번호를을 입력해주세요!','phoneNumber');
        valid=false;
      } 
      if (!inputs.name) {
        handleError('닉네임을 입력해주세요!','name');
        valid=false;
      } 
      if(valid) {
          signup();
      }
  };
  const signup = () => {
    setLoading(true);
    setTimeout( () => {
        setLoading(false);
        try {
            //AsyncStorage.setItem("user",JSOM.stringify(inputs));
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Error",'뭔가 잘못됐다');
        }
    }, 2000);
  };
  const handleOnChange = (text, input) => {
      setInputs((prevState)=>({...prevState,[input]:text}));
  };
  const handleError = (errorMessage,input)=>{
      setErrors((prevState)=>({...prevState,[input]:errorMessage}));
  };

  const [isFocused,setIsFocused] = React.useState(false);
  
  return (
    <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
      <Loader visible={loading}/>
      <StatusBar backgroundColor='white' barStyle="dark-content" animated={true}/>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
         <Ionic 
            name="chevron-back-sharp" 
            style={{fontSize:40,paddingTop:5,color:'gray'}}/>
      </TouchableOpacity>
      <Text style={{padding:20, fontSize:30, fontWeight:'bold'}}>회원가입</Text>
      <Text style={{paddingLeft:20, fontSize:20, opacity:0.6}}>
          아래의 사항을 빠짐없이 기입해 주세요.
      </Text>

      <View style={{padding:20}}>
          <Input 
            label="ID" 
            placeholder="영문ID"
            iconName="person-outline"
            error={errors.id}
            onFocus={()=>{ handleError(null,'id'); }}
            onChangeText={(text)=>handleOnChange(text,'id')} />
          <View style={{alignItems:'flex-end'}}>
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
              <Ionic name="person-outline" style={{fontSize:20,color:'gray',paddingRight:10}}/>
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
            iconName="md-lock-closed-outline"
            error={errors.password}
            onFocus={()=>{ handleError(null,'password'); }}
            onChangeText={(text)=>handleOnChange(text,'password')}
            password />
          <Input 
            label="PhoneNumber" 
            placeholder="010-1234-5678"
            iconName="ios-logo-whatsapp"
            error={errors.phoneNumber}
            onFocus={()=>{ handleError(null,'phoneNumber'); }}
            onChangeText={(text)=>handleOnChange(text,'phoneNumber')}
            keyboardType="numeric" />
          <Input 
            label="Nickname" 
            placeholder="닉네임"
            iconName="heart-circle-outline"
            error={errors.name}
            onFocus={()=>{ handleError(null,'name'); }}
            onChangeText={(text)=>handleOnChange(text,'name')} />
      </View>
          
      <Text style={{paddingLeft:20, fontSize:20, opacity:0.6}}>
        서비스 이용 약관에 동의해 주세요.
      </Text>
      <View style={{padding:20}}>
        <View style={{
          flexDirection:'row',
          paddingBottom:10,
          borderBottomColor:'#E5E5E5',
          borderBottomWidth:2,
          width:'100%',
         }}>
           <TouchableOpacity onPress={()=> setIsChecked(!isChecked)}>
              <Ionic name='ios-checkmark-circle-sharp' 
                    style={{
                      color: isChecked ? '#ffbfbf':'#D9D9D9',
                      fontSize:20,
                      paddingRight:7}} />
           </TouchableOpacity>
            <Text style={{fontSize:17}}>약관 전체동의</Text>
        </View>

        <View style={{
          justifyContent:'space-between',
          flexDirection:'row',
          alignItems:'center',
          paddingTop:10,
         }}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=> setIsChecked(!isChecked)}>
                <Ionic name='ios-checkmark-circle-sharp' 
                      style={{
                        color: isChecked ? '#ffbfbf':'#D9D9D9',
                        fontSize:20,
                        paddingRight:7}} />
              </TouchableOpacity>
              <Text style={{fontSize:15}}>
                (필수) 만14세 이상입니다.
              </Text>
           </View>
           <TouchableOpacity>
              <Text style={{
                fontSize:13,opacity:0.7,textAlign:'right',paddingRight:10}}>
                보기
              </Text>
           </TouchableOpacity>
        </View>
        <View style={{
          justifyContent:'space-between',
          flexDirection:'row',
          alignItems:'center',
          paddingTop:10,
         }}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=> setIsChecked(!isChecked)}>
                <Ionic name='ios-checkmark-circle-sharp' 
                      style={{
                        color: isChecked ? '#ffbfbf':'#D9D9D9',
                        fontSize:20,
                        paddingRight:7}} />
              </TouchableOpacity>
              <Text style={{fontSize:15}}>
                (필수) 개인정보 수집이용에 동의
              </Text>
           </View>
           <TouchableOpacity>
              <Text style={{
                fontSize:13,opacity:0.7,textAlign:'right',paddingRight:10}}>
                보기
              </Text>
           </TouchableOpacity>
        </View>
        <View style={{
          justifyContent:'space-between',
          flexDirection:'row',
          alignItems:'center',
          paddingTop:10,
         }}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=> setIsChecked(!isChecked)}>
                <Ionic name='ios-checkmark-circle-sharp' 
                      style={{
                        color: isChecked ? '#ffbfbf':'#D9D9D9',
                        fontSize:20,
                        paddingRight:7}} />
              </TouchableOpacity>
              <Text style={{fontSize:15}}>
                (필수) 서비스 이용약관에 동의
              </Text>
           </View>
           <TouchableOpacity>
              <Text style={{
                fontSize:13,opacity:0.7,textAlign:'right',paddingRight:10}}>
                보기
              </Text>
           </TouchableOpacity>
        </View>
        <View style={{
          justifyContent:'space-between',
          flexDirection:'row',
          alignItems:'center',
          paddingTop:10,
         }}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=> setIsChecked(!isChecked)}>
                <Ionic name='ios-checkmark-circle-sharp' 
                      style={{
                        color: isChecked ? '#ffbfbf':'#D9D9D9',
                        fontSize:20,
                        paddingRight:7}} />
              </TouchableOpacity>
              <Text style={{fontSize:15}}>
                (선택) 홍보 및 마케팅 이용에 동의
              </Text>
           </View>
           <TouchableOpacity>
              <Text style={{
                fontSize:13,opacity:0.7,textAlign:'right',paddingRight:10}}>
                보기
              </Text>
           </TouchableOpacity>
        </View>
        <View style={{
          justifyContent:'space-between',
          flexDirection:'row',
          alignItems:'center',
          paddingTop:10,
         }}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=> setIsChecked(!isChecked)}>
                <Ionic name='ios-checkmark-circle-sharp' 
                      style={{
                        color: isChecked ? '#ffbfbf':'#D9D9D9',
                        fontSize:20,
                        paddingRight:7}} />
              </TouchableOpacity>
              <Text style={{fontSize:15}}>
                (선택) 마케팅 개인정보 제3자 제공 동의
              </Text>
           </View>
           <TouchableOpacity>
              <Text style={{
                fontSize:13,opacity:0.7,textAlign:'right',paddingRight:10}}>
                보기
              </Text>
           </TouchableOpacity>
        </View> 
      </View>

      <View style={{padding:20}}>
          <TouchableOpacity onPress={validate} activeOpacity={0.7}>
            <View style={{
                backgroundColor:'#ffbfbf', borderRadius:10,
                width:'100%', height:45, marginTop:20,
                alignItems:'center', justifyContent:'center',
            }}>
                <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>가입</Text>
            </View>
          </TouchableOpacity>
      </View>
    </ScrollView>
  )
};


export default Signup;