import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

const Item = ({item,allChk}) => {
    const [onlyChk, setOnlyChk] = useState(allChk);

    return (
              <View style={{
                      justifyContent:'space-between',
                      flexDirection:'row',
                      alignItems:'center',
                      paddingTop:10,
                   }}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                          <TouchableOpacity onPress={()=>setOnlyChk(!onlyChk)}>
                              <Ionic name='ios-checkmark-circle-sharp' 
                                  style={{
                                      color: allChk || onlyChk ? "#ffbfbf":'#D9D9D9',
                                      
                                      fontSize:20,
                                      paddingRight:7}} />
                          </TouchableOpacity>
                          <Text style={{fontSize:15}}> {item.title} </Text>
                      </View>
                      <TouchableOpacity>
                          <Text style={{
                              fontSize:13,opacity:0.7,textAlign:'right',paddingRight:10}}>
                                보기
                          </Text>
                      </TouchableOpacity>
                  </View>
    )
};

const Agreement = ()=> {

    const checkInfo = [
        {
            title: '(필수) 만14세 이상입니다.',
            
        },
        {
            title: '(필수) 개인정보 수집이용에 동의',
            
        },
        {
            title: '(필수) 서비스 이용약관에 동의',
            
        },
        {
            title: '(선택) 홍보 및 마케팅 이용에 동의',
            
        },
        {
            title: '(선택) 마케팅 개인정보 제3자 제공 동의',
            
        },
    ];

  const [allChk, setAllChk] = useState(false);
  

  return (
    <View>
        <View style={{
                flexDirection:'row',
                paddingBottom:10,
                borderBottomColor:'#E5E5E5',
                borderBottomWidth:2,
                width:'100%',
              }}>
                <TouchableOpacity onPress={()=> {setAllChk(!allChk); console.log(!allChk)}}>
                    <Ionic name='ios-checkmark-circle-sharp' 
                          style={{
                            color: allChk ? '#ffbfbf':'#D9D9D9',
                            fontSize:20,
                            paddingRight:7}} />
                </TouchableOpacity>
                <Text style={{fontSize:17}}>약관 전체동의</Text>
          </View>
        <FlatList
        keyExtractor={item=>item.title}
        data={checkInfo}
        renderItem={  ({ item })  => (
          <Item item={item} allChk={allChk}/>
        )}
        windowSize={3}
      />
      {/* {
          checkInfo.map( (data,index)=> {
              const [onlyChk, setOnlyChk] = useState(false);
              console.log("안",isChecked)
              //setOnlyChk(isChecked);
              
              console.log(onlyChk)
            
              return(
                 <View key={index}>

                     <View style={{
                        justifyContent:'space-between',
                        flexDirection:'row',
                        alignItems:'center',
                        paddingTop:10,
                     }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity 
                                onPress={
                                     isChecked ?
                                     ()=> setOnlyChk(true)
                                     :
                                    ()=> setOnlyChk(!onlyChk)
                                    }>
                                <Ionic name='ios-checkmark-circle-sharp' 
                                    style={{
                                        color: onlyChk ? '#ffbfbf':'#D9D9D9',
                                        fontSize:20,
                                        paddingRight:7}} />
                            </TouchableOpacity>
                            <Text style={{fontSize:15}}> {data.title} </Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{
                                fontSize:13,opacity:0.7,textAlign:'right',paddingRight:10}}>
                                  보기
                            </Text>
                        </TouchableOpacity>
                    </View> 

                 </View>
              )
          })
      } */}
    </View>
  );
};

export default Agreement;