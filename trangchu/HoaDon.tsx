import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const HoaDon = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handCart = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:4000/api/cart/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        Alert.alert("Error", "Failed to fetch cart data");
      }
    };
    handCart();
  }, []);

  return (
    <View style={styles.container}>
      {cart.map((item) => (
        <View key={item._id} style={styles.item}>
          <Text style={styles.name}>{item.productId.name}</Text>
          <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
          <Text style={styles.price}>Price: ${item.productId.price}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  item: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343a40",
  },
  quantity: {
    fontSize: 16,
    color: "#495057",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 8,
  },
});

export default HoaDon;
