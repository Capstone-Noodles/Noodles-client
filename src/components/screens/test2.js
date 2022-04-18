import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity } from "react-native";
import Ionic from 'react-native-vector-icons/Ionicons';

const Test2 = ({navigation}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const devHeight = Dimensions.get("window").height;

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    }}>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(!modalVisible); }}
      >
        <View style={{
          flex:1,
          backgroundColor:'#000000AA',
          justifyContent:'flex-end',

        }}>
          <View style={{
            backgroundColor:'white',
            width:'100%',
            borderTopRightRadius:15,
            borderTopLeftRadius:15,
            paddingHorizontal:10,
            maxHeight:devHeight*0.4,

          }}>

            <TouchableOpacity 
              onPress={()=>setModalVisible(!modalVisible)}
              style={{marginVertical:10}}>
              <Ionic 
                name="close" 
                style={{fontSize:20,color:'gray',textAlign:'right'}}/>
            </TouchableOpacity>
            
            <View>
              <Text style={{
                color:'#182E44',
                fontSize:20,
                fontWeight:'500',
                margin:15,
              }}>
                title
              </Text>
            </View>
            <Text style={{
                color:'#182E44',
                fontSize:20,
                fontWeight:'500',
                margin:15,
              }}>
                dfdf
              </Text>

          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>

      
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Test2;