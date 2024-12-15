import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MenuPlanScreen from './src/screens/MenuPlanScreen';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import { Button } from 'react-native';

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: 'maroon' }, // Header background color
          headerTintColor: '#fff', // Header text color
          headerTitleStyle: { fontWeight: 'bold' }, // Header title style
        }}
      >
        {/* Home Screen with a button in header */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Meal Planner Home', // Custom title
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('MenuPlan')}
                title="Go to Plan"
                color="#fff"
              />
            ),
          })}
        />

        {/* Other screens */}
        <Stack.Screen
          name="MenuPlan"
          component={MenuPlanScreen}
          options={{ title: 'Your Menu Plan' }}
        />
        <Stack.Screen
          name="ShoppingList"
          component={ShoppingListScreen}
          options={{ title: 'Shopping List' }}
        />
        <Stack.Screen
          name="Nutrition"
          component={NutritionScreen}
          options={{ title: 'Nutrition Info' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
