import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const NextScreen = ({ route, navigation }) => {
  const { item } = route.params || {}; // Menerima item dari parameter navigasi dengan fallback untuk menghindari crash

  // Validasi jika `item` tidak ada
  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Data item tidak tersedia.</Text>
        <Button title="Kembali" onPress={() => navigation.goBack()} color="#FF6347" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Next Screen!</Text>
      <Text style={styles.subtitle}>Nama Makanan: {item.name}</Text>

      {/* Tombol untuk navigasi ke NutritionInfoScreen dengan data terbaru */}
      <Button
        title="Info Nutrisi"
        onPress={() => navigation.navigate('Nutrition', { foodName: item.name })}
        color="#1E90FF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default NextScreen;
