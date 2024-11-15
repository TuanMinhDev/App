import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MaVach = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require("../anh/qr.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light grey background for a cleaner look
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 15, // Rounded corners
    borderWidth: 1, // Add a border to the image
    borderColor: '#ccc', // Light grey border color
  },
});

export default MaVach;
