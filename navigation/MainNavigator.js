import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import NewFormScreen from '../screens/forms/NewFormScreen';
// We'll add SavedFormsScreen later to ensure it works correctly
// import SavedFormsScreen from '../screens/forms/SavedFormsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'NewForm') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'AI Forester' }}
      />
      <Tab.Screen 
        name="NewForm" 
        component={NewFormScreen} 
        options={{ title: 'New Assessment' }}
      />
    </Tab.Navigator>
  );
}

// Main stack navigator that includes the tabs
const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      {/* 
      We'll add these screens incrementally to ensure everything works properly
      <Stack.Screen
        name="SavedForms"
        component={SavedFormsScreen}
        options={{ title: 'Saved Assessments' }}
      />
      */}
    </Stack.Navigator>
  );
}

export default MainNavigator;
