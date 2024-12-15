import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ScrollView } from 'react-native';

const ShoppingCartScreen = ({ route, navigation }) => {
  const { item } = route.params; // Mendapatkan item yang ditambahkan ke keranjang
  const [cartItems, setCartItems] = useState([item]); // Menambahkan item pertama ke dalam keranjang

  const addToCart = () => {
    // Tambahkan item ke keranjang
    setCartItems([...cartItems, item]);
  };

  const handleCheckout = () => {
    // Placeholder untuk aksi checkout
    alert('Proceeding to checkout');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>

      {/* Menampilkan daftar item yang ada di keranjang belanja */}
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>Calories: {item.calories} kcal</Text>
              <Text style={styles.itemDetails}>Protein: {item.protein} g</Text>
              <Text style={styles.itemDetails}>Carbs: {item.carbohydrates} g</Text>
              <Text style={styles.itemDetails}>Fat: {item.fat} g</Text>
              <Text style={styles.itemDetails}>Vitamins: {item.vitamins}</Text>
              <Text style={styles.itemDetails}>Minerals: {item.minerals}</Text>
              <Text style={styles.itemDetails}>Fiber: {item.fiber} g</Text>
              <Text style={styles.itemDetails}>Sugar: {item.sugar} g</Text>
              <Text style={styles.itemDetails}>Sodium: {item.sodium} mg</Text>
            </View>
          )}
        />
      )}

      {/* Tombol untuk menambah lebih banyak item ke keranjang */}
      <View style={styles.buttonContainer}>
        <Button title="Add More" onPress={addToCart} color="#4CAF50" />
      </View>

      {/* Tombol untuk melanjutkan ke checkout */}
      <View style={styles.buttonContainer}>
        <Button title="Proceed to Checkout" onPress={handleCheckout} color="#FF6347" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 16,
    justifyContent: 'flex-start', // Agar konten dimulai dari atas
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  cartItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 10,
    elevation: 5,
    width: '100%', // Lebar penuh agar responsif
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetails: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%', // Agar tombol mengambil seluruh lebar layar
  },
});

export default ShoppingCartScreen;
