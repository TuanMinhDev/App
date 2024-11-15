import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TrangChu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kho và Hàng hoá</Text>
        <TouchableOpacity>
          <Icon name="view-grid-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderTitle}>Cửa hàng chính</Text>
      </View>
      
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('ProductList')}>
          <Icon name="cube-outline" size={50} color="#000080" />
          <Text style={styles.gridItemText}>Hàng hoá</Text>
          <Text style={styles.gridItemNumber}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('HoaDon')}>
          <Icon name="file-document-outline" size={50} color="#000080" />
          <Text style={styles.gridItemText}>Hoá đơn</Text>
          <Text style={styles.gridItemNumber}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('AddProduct')}>
          <Icon name="chart-bar" size={50} color="#000080" />
          <Text style={styles.gridItemText}>Thêm sản phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('MaVach')}>
          <Icon name="barcode-scan" size={50} color="#000080" />
          <Text style={styles.gridItemText}>Quét mã vạch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('User')}>
          <Icon name="package-variant-plus" size={50} color="#000080" />
          <Text style={styles.gridItemText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Appstore')}>
          <Icon name="chevron-right" size={50} color="#000080" />
          <Text style={styles.gridItemText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop:50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
  subHeader: {
    backgroundColor: '#555',
    padding: 10,
  },
  subHeaderTitle: {
    color: 'white',
    textAlign: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop:30,
  },
  gridItem: {
    backgroundColor: '#CFCFCF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
    height: 150,
    margin: 5,
    borderRadius: 10,
  },
  gridItemText: {
    color: '#000080',
    fontSize: 16,
    marginTop: 10,
  },
  gridItemNumber: {
    color: 'lightblue',
    fontSize: 20,
  },
});

export default TrangChu;
