import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./front/login";
import Appstore from "./front/appstore";
import Signup from "./front/signup";
import TrangChu from "./trangchu/TrangChu";
import ProductList from "./trangchu/ProductList";
import AddProduct from "./trangchu/AddProduct";
import HoaDon from "./trangchu/HoaDon";
import ProductDetail from "./trangchu/ProductDetail";
import User from "./trangchu/User";
import MaVach from "./trangchu/MaVach";








const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={ProductList}></Stack.Screen>
      <Stack.Screen name="Appstore" component={Appstore}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
      <Stack.Screen name="TrangChu" component={TrangChu}></Stack.Screen>
      <Stack.Screen name="User" component={User}></Stack.Screen>
      <Stack.Screen name="MaVach" component={MaVach}></Stack.Screen>

      <Stack.Screen name="ProductDetail" component={ProductDetail}></Stack.Screen>

        
        <Stack.Screen name="AddProduct" component={AddProduct}></Stack.Screen>
        <Stack.Screen name="HoaDon" component={HoaDon}></Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
