import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ChatWith = ({route})=> {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: '그래 안녕',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: route.params.userImg,
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: '안녕',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor:'#fbcbd6'
          },
          right: {
            backgroundColor:'#ffbfbf'
          }
        }}
        textStyle={{
          left: {
            color:'#484848'
          },
          right: {
            color:'#484848'
          }
        }}
      /> 
    );
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <Icon 
            name='send-circle' 
            size={35} 
            color='#ffbfbf' 
            style={{marginBottom:5, marginRight:5}}/>
        </View>
      </Send>
    );
  }

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={23} color='#484848'/>
    );
  }

  return (

    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      //
      alwaysShowSend
      renderSend={renderSend}
      //
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      //
      placeholder="메세지를 입력하세요."
    />
    
  );
};

export default ChatWith;