import React from 'react';
import {  Text, View ,StyleSheet, TextInput, Button, TouchableOpacity, ImageBackground} from 'react-native';


  const Appstore = ({navigation})=> {
   
  return (
      <ImageBackground style={styles.backgroud} source={require('../anh/backgroud.webp') }>
        <TouchableOpacity onPress={() =>navigation.navigate('Login')}>
          <View style={styles.box}>
            <Text style={styles.chu}>Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>navigation.navigate('Signup')}>
          <View style={styles.box}>
           <Text style={styles.chu}>Sign up</Text>
          </View>
        </TouchableOpacity>

      </ImageBackground>
  );
  }
  const styles = StyleSheet.create({
    backgroud:{
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
       
    },
    box:{
      height:80,
      width:200,
      borderRadius:60,
      backgroundColor:'black',
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop:50,
    },
    chu:{
      color:'white',
      fontSize:20,
      textAlign: 'center',

    }
  });
export default Appstore;
