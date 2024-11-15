import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Animated,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import APIConfig, { Url } from "../config/APIConfig";

const Signup = ({ navigation }) => {
  const [getPass, setPass] = useState(false);
  const [getPass2, setPass2] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phoneNum: "",
    password: "",
    confirmPw: "",
  });
  const animationValue = useRef(
    new Animated.ValueXY({
      x: 60,
      y: 0,
    })
  ).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: {
        x: 60,
        y: 40,
      },
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [animationValue]);

  const handleSignUp = async () => {
    try {
      await axios.post(Url(APIConfig.CREATE_USER), {
        username: info.name,
        email: info.email,
        password: info.password,
        phoneNum: info.phoneNum,
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  return (
    <ImageBackground
      style={styles.backgroud}
      source={require("../anh/backgroud.webp")}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Appstore")}>
        <AntDesign name="leftcircle" style={styles.icon} />
      </TouchableOpacity>
      <ScrollView>
        <Animated.View
          style={{ marginLeft: animationValue.x, marginTop: animationValue.y }}
        >
          <View style={styles.box}>
            <Text style={styles.chusignup}>Sign Up</Text>
            <Text style={styles.chu}>Họ và tên</Text>
            <View style={styles.boxinput}>
              <TextInput
                style={styles.nhap}
                placeholder="Họ và tên"
                value={info.name}
                onChangeText={(e) => setInfo({ ...info, name: e })}
              ></TextInput>
            </View>

            <Text style={styles.chu}>Email</Text>
            <View style={styles.boxinput}>
              <TextInput
                style={styles.nhap}
                placeholder="Email"
                value={info.email}
                onChangeText={(e) => setInfo({ ...info, email: e })}
              ></TextInput>
            </View>

            <Text style={styles.chu}>Số điện thoại</Text>
            <View style={styles.boxinput}>
              <TextInput
                style={styles.nhap}
                placeholder="Số điện thoại"
                value={info.phoneNum}
                onChangeText={(e) => setInfo({ ...info, phoneNum: e })}
              ></TextInput>
            </View>

            <Text style={styles.chu}>Mật khẩu</Text>
            <View style={styles.boxinput}>
              <TextInput
                style={styles.nhap}
                secureTextEntry={getPass ? false : true}
                placeholder="Mật khẩu"
                value={info.password}
                onChangeText={(e) => setInfo({ ...info, password: e })}
              ></TextInput>
              <AntDesign
                name="eye"
                style={styles.eye}
                onPress={() => {
                  setPass(!getPass);
                }}
              />
            </View>

            <Text style={styles.chu}>Nhập lại mật khẩu</Text>
            <View style={styles.boxinput}>
              <TextInput
                style={styles.nhap}
                secureTextEntry={getPass2 ? false : true}
                placeholder="Nhập lại mật khẩu"
                value={info.confirmPw}
                onChangeText={(e) => setInfo({ ...info, confirmPw: e })}
              ></TextInput>
              <AntDesign
                name="eye"
                style={styles.eye}
                onPress={() => {
                  setPass2(!getPass2);
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                handleSignUp();
              }}
            >
              <View style={styles.boxsignup}>
                <Text style={styles.signup}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroud: {
    flex: 1,
    resizeMode: "cover",
  },
  icon: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 30,
  },
  box: {
    backgroundColor: "black",
    width: 300,
    height: 630,
    borderRadius: 50,
  },
  chusignup: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  chu: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 20,
  },
  boxinput: {
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderRadius: 60,
    marginBottom: 10,
  },
  nhap: {
    marginLeft: 10,
    marginTop: 5,
    color: "black",
  },
  boxsignup: {
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 80,
    marginRight: 80,
    borderRadius: 60,
    height: 60,
  },
  signup: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 15,
  },
  eye: {
    color: "black",
    fontSize: 30,
    marginTop: 5,
    marginLeft: 220,
    position: "absolute",
  },
});
export default Signup;
