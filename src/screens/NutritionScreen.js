import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

const NutritionInfoScreen = ({ navigation }) => {
  const route = useRoute();
  const { itemId } = route.params; // Extract itemId from route params
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('itemId received:', itemId); // Debug log for itemId
    if (itemId) {
      fetchNutritionData(itemId);
    } else {
      setNutritionInfo(null);
      setLoading(false);
    }
  }, [itemId]);

  // Function to fetch nutrition data based on itemId
  const fetchNutritionData = async (id) => {
    console.log('Fetching data for itemId:', id); // Debug log for itemId
    setLoading(true);

    setTimeout(() => {
      const nutritionData = {
        '1': { 
          name: 'Nasi Goreng',
          calories: 400,
          protein: 10,
          carbohydrates: 50,
          fat: 12,
          vitamins: 'Vitamin A, B, C',
          minerals: 'Calcium, Iron',
          fiber: 5,
          sugar: 4,
          sodium: 300,
        },
        '2': {
          name: 'Ayam Bakar',
          calories: 250,
          protein: 30,
          carbohydrates: 5,
          fat: 12,
          vitamins: 'Vitamin B6, C',
          minerals: 'Potassium, Iron',
          fiber: 3,
          sugar: 1,
          sodium: 350,
        },
        // Add more items as needed
      };

      const itemNutrition = nutritionData[String(id)];

      if (itemNutrition) {
        setNutritionInfo(itemNutrition);
      } else {
        setNutritionInfo(null); // Handle case when itemId is not found
      }

      setLoading(false);
    }, 2000); // Simulate API delay
  };

  const handleAddToCart = () => {
    if (nutritionInfo) {
      navigation.navigate('ShoppingCart', { item: nutritionInfo });
    }
  };

  const handleViewRecipe = () => {
    if (itemId) {
      navigation.navigate('ResepMakanan', { itemId });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : nutritionInfo ? (
        <View style={styles.card}>
          <Text style={styles.title}>{nutritionInfo.name}</Text>
          <Text style={styles.subtitle}>Nutrition Facts</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}><Text style={styles.label}>Calories:</Text> {nutritionInfo.calories} kcal</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Protein:</Text> {nutritionInfo.protein} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Carbohydrates:</Text> {nutritionInfo.carbohydrates} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Fat:</Text> {nutritionInfo.fat} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Vitamins:</Text> {nutritionInfo.vitamins}</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Minerals:</Text> {nutritionInfo.minerals}</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Fiber:</Text> {nutritionInfo.fiber} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Sugar:</Text> {nutritionInfo.sugar} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Sodium:</Text> {nutritionInfo.sodium} mg</Text>
          </View>
          <Button title="View Recipe" onPress={handleViewRecipe} color="#2196F3" />
        </View>
      ) : (
        <Text style={styles.loadingText}>Nutrition information not found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E5F9E1',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  label: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  loadingText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
});

export default NutritionInfoScreen;
