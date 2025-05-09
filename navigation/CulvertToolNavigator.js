import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import culvert tool screens
import InputScreen from '../screens/culvert/InputScreen';
// Import additional screens as they are created
// import ResultScreen from '../screens/culvert/ResultScreen';

const CulvertStack = createStackNavigator();

const CulvertToolNavigator = () => {
  return (
    <CulvertStack.Navigator
      initialRouteName="InputScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E7D32',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <CulvertStack.Screen 
        name="InputScreen" 
        component={InputScreen} 
        options={{ title: 'Culvert Sizing Tool' }}
      />
      {/* Add additional screens as they are created 
      <CulvertStack.Screen 
        name="ResultScreen" 
        component={ResultScreen} 
        options={{ title: 'Culvert Sizing Results' }}
      />
      */}
    </CulvertStack.Navigator>
  );
};

export default CulvertToolNavigator;