import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const AddProduct = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:4000/api/product/product",
        {
          name,
          price,
          description,
          category,
          stock,
        }
      );
      Alert.alert("Thành công thêm sản phẩm");
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <AntDesign
          name="leftcircle"
          style={styles.icon}
          onPress={() => navigation.navigate("TrangChu")}
        />
        <Text style={styles.title}>Thêm Sản Phẩm</Text>
      </View>
      <Text style={styles.label}>Tên</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Giá</Text>
      <TextInput
        style={styles.input}
        placeholder="Giá"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Danh mục</Text>
      <TextInput
        style={styles.input}
        placeholder="Danh mục"
        value={category}
        onChangeText={setCategory}
      />
      <Text style={styles.label}>Kho</Text>
      <TextInput
        style={styles.input}
        placeholder="Kho"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
  },
  icon: {
    fontSize: 30,
    color: "#333",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddProduct;
