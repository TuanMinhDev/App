import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import APIConfig, { Url } from "../config/APIConfig";

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { data } = await axios.post(Url(APIConfig.LOGIN), {
        email: info.email,
        password: info.password,
      });
      await AsyncStorage.setItem(`email`, info.email);
      setIsLoading(true);
      console.log(data);
      if (data?._id) {
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate("TrangChu");
        }, 2000);
      } else {
        alert("Dang nhap khong thanh cong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [getPass, setPass] = useState(false);
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
        y: 150,
      },
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [animationValue]);

  return (
    <ImageBackground
      style={styles.backgroud}
      source={require("../anh/backgroud.webp")}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Appstore")}>
        <AntDesign name="leftcircle" style={styles.icon} />
      </TouchableOpacity>

      <Animated.View
        style={{ marginLeft: animationValue.x, marginTop: animationValue.y }}
      >
        <View style={styles.box}>
          <Text style={styles.chulogin}>Login</Text>

          <Text style={styles.chu}>Email</Text>
          <View style={styles.boxinput}>
            <TextInput
              style={styles.nhap}
              placeholder="Email"
              value={info.email}
              onChangeText={(e) => setInfo({ ...info, email: e })}
            ></TextInput>
          </View>

          <Text style={styles.chu}>Password</Text>
          <View style={styles.boxinput}>
            <TextInput
              style={styles.nhap}
              placeholder="Passwork"
              secureTextEntry={getPass ? false : true}
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

          <Text style={styles.quenmk}>Forgot Password?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSignIn}
              style={[styles.button, isLoading && styles.buttonLoading]}
              disabled={isLoading}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                ) : null}
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signup}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
    height: 400,
    borderRadius: 50,
  },
  chulogin: {
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
  eye: {
    color: "black",
    fontSize: 30,
    marginTop: 5,
    marginLeft: 220,
    position: "absolute",
  },
  nhap: {
    marginLeft: 10,
    marginTop: 5,
    color: "black",
  },
  quenmk: {
    color: "gray",
    fontSize: 16,
    marginLeft: 140,
  },
  boxsignin: {
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 80,
    marginRight: 80,
    borderRadius: 60,
    height: 60,
  },
  signin: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 15,
  },
  signup: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 90,
    marginTop: 10,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 60,
    width: 120,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLoading: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default Login;
