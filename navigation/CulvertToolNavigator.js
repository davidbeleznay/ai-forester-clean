import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import culvert tool screens
import InputScreen from '../screens/culvert/InputScreen';
// Import additional screens as they are created
// import ResultScreen from '../screens/culvert/ResultScreen';

// Import ThemeContext
import { ThemeContext } from '../src/context/ThemeContext';

const CulvertStack = createStackNavigator();

const CulvertToolNavigator = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <CulvertStack.Navigator
      initialRouteName="InputScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#1e1e1e' : '#36833E',
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