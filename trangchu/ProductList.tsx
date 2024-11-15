import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const ProductList = ({ navigation }) => {
  const Separator = () => <View style={styles.separator} />;

  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});

  const fetchList = async () => {
    try {
      const response = await axios.get(
        "http://192.168.102.18:4000/api/product/getproduct"
      );
      console.log("Fetched list:", response.data);
      setList(response.data);
    } catch (error) {
      console.error("Error fetching list:", error);
      Alert.alert("Error", "Failed to fetch products");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchList();
      setSearchQuery("");
    }, [])
  );

  const addToCart = async (item) => {
    try {
      await axios.post("http://10.0.2.2:4000/api/cart/cart", {
        productId: item._id,
        quantity: 1,
        size: "L",
      });
      Alert.alert("Thành công", "Đã thêm vào giỏ hàng");
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add to cart");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { Id: item._id })}
      >
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.ngang}>
          <Text style={styles.price}>Price: ${item.price}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const filteredList = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AntDesign
          name="leftcircle"
          style={styles.icon}
          onPress={() => navigation.navigate("TrangChu")}
        />
        <Text style={styles.header}>Hàng Hóa</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.cartButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("HoaDon", { cart, list })}
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>Hóa Đơn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
  ngang: {
    flexDirection: "row",
    marginTop: 20,
  },
  item: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
    marginBottom: 12,
    borderColor: "gray",
    borderWidth: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: -10,
  },
  price: {
    fontSize: 16,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 200,
    marginTop: -10,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
  },
  row: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: 30,
    color: "#333",
  },
  cartButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 10,
  },
  cartButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductList;
