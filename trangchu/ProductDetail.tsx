import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const ProductDetail = ({ route, navigation }) => {
  const { Id } = route.params;

  const [Info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
  });
  const [editableFields, setEditableFields] = useState({
    name: false,
    price: false,
    description: false,
    category: false,
    stock: false
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:4000/api/product/product/${Id}`);
        setInfo(response.data);
        setUpdatedInfo(response.data); // Populate initial updatedInfo with fetched data
      } catch (error) {
        setError('Error fetching product data');
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [Id]);

  const deleteSP = async () => {
    setLoading(true); // Set loading to true while deleting
    try {
      await axios.delete(`http://10.0.2.2:4000/api/product/product/${Id}`);
      navigation.goBack(); // Navigate back to the previous screen or update the state to remove the deleted student
    } catch (error) {
      setError('Error deleting product data');
      console.error('Error deleting product data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSP = async () => {
    setLoading(true);
    try {
      await axios.put(`http://10.0.2.2:4000/api/product/product/${Id}`, updatedInfo);
      // Optionally, update the local state with the new information
      setInfo(updatedInfo);
      alert('Cập nhật thông tin thành công!');
      navigation.goBack();
    } catch (error) {
      setError('Error updating data');
      console.error('Error updating data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = (field) => {
    setEditableFields({ ...editableFields, [field]: !editableFields[field] });
  };

  const renderEditableField = (label, field) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        style={styles.input}
        placeholder={label}
        value={updatedInfo[field].toString()}
        onChangeText={(text) => setUpdatedInfo({ ...updatedInfo, [field]: text })}
        editable={editableFields[field]}
      />
      <TouchableOpacity onPress={() => toggleEdit(field)}>
        <Text style={styles.editText}>{editableFields[field] ? 'Lưu' : 'Sửa'}</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name='left' style={styles.left} onPress={() => navigation.goBack()} />
        <Text style={styles.chuThongTin}>Thông Tin Sản Phẩm</Text>
      </View>
      {Info ? (
        <>
          {renderEditableField('Tên sản phẩm', 'name')}
          {renderEditableField('Giá', 'price')}
          {renderEditableField('Mô tả', 'description')}
          {renderEditableField('Danh mục', 'category')}
          {renderEditableField('Kho', 'stock')}
        </>
      ) : (
        <Text>Lỗi</Text>
      )}
      <View style={styles.ngang}>
        <TouchableOpacity style={styles.delete} onPress={deleteSP}>
          <Text style={styles.buttonText}>Xóa sản phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={updateSP}>
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    marginTop:30,
  },
  chuThongTin: {
    fontSize: 22,
    marginLeft: 60,
    fontWeight:'bold'
  },
  left: {
    fontSize: 25,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
  },
  editText: {
    color: 'blue',
    marginLeft: 10,
  },
  ngang: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  delete: {
    backgroundColor: '#FF5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ProductDetail;
