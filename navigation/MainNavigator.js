import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import NewFormScreen from '../screens/forms/NewFormScreen';
import SavedFormsScreen from '../screens/forms/SavedFormsScreen';

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
          } else if (route.name === 'SavedForms') {
            iconName = focused ? 'folder' : 'folder-outline';
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
      {/* 
      Add additional screens here:
      <Stack.Screen
        name="ViewForm"
        component={ViewFormScreen}
        options={{ title: 'View Assessment' }}
      />
      */}
    </Stack.Navigator>
  );
}

export default MainNavigator;
