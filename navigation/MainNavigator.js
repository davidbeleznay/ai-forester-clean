import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import NewFormScreen from '../screens/forms/NewFormScreen';
import SavedFormsScreen from '../screens/forms/SavedFormsScreen';

// Import navigators
import CulvertToolNavigator from './CulvertToolNavigator';

// Import ThemeContext
import { ThemeContext } from '../src/context/ThemeContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator
const TabNavigator = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'NewForm') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'SavedForms') {
            iconName = focused ? 'folder' : 'folder-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: isDarkMode ? '#4A90E2' : '#2374E1',
        tabBarInactiveTintColor: isDarkMode ? '#888888' : 'gray',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
          borderTopColor: isDarkMode ? '#333333' : '#e0e0e0',
        },
        headerStyle: {
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
          borderBottomColor: isDarkMode ? '#333333' : '#e0e0e0',
          borderBottomWidth: 1,
        },
        headerTintColor: isDarkMode ? '#e0e0e0' : '#333333',
        headerShown: true,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Digital Forester' }}
      />
      <Tab.Screen 
        name="NewForm" 
        component={NewFormScreen} 
        options={{ title: 'New Assessment' }}
      />
      <Tab.Screen 
        name="SavedForms" 
        component={SavedFormsScreen} 
        options={{ title: 'Saved Assessments' }}
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
      {/* Culvert Tool Navigator */}
      <Stack.Screen
        name="CulvertTool"
        component={CulvertToolNavigator}
        options={{ headerShown: false }}
      />
      {/* 
        Additional screens can be added here, for example:
        <Stack.Screen
          name="ViewForm"
          component={ViewFormScreen}
          options={{ title: 'Assessment Details' }}
        />
      */}
    </Stack.Navigator>
  );
}

export default MainNavigator;