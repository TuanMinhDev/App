import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import APIConfig, { Url } from "../config/APIConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNum: "",
    gmail: "",
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const { data } = await axios.post(Url(APIConfig.GET_USER), {
        email: await AsyncStorage.getItem("email"),
      });
      setUserInfo({
        name: data.username,
        phoneNum: data.phoneNum,
        gmail: data.email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign
          name="left"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Thông tin cá nhân</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>User name</Text>
          <TextInput
            style={styles.input}
            value={userInfo.name}
            editable={false}
          />
        </View>
        {/* Phone Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            value={userInfo.phoneNum}
            editable={false}
          />
        </View>
        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={userInfo.gmail}
            editable={false}
          />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Appstore')}>
        <View style={styles.logoutButton}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 20,
  },
  backIcon: {
    fontSize: 30,
    color: "black",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 60,
  },
  infoContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingBottom: 5,
  },
  logoutButton: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30,
  },
  logoutText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default User;
