import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { format } from 'date-fns';

const InputScreen = ({ navigation }) => {
  // State for basic info
  const [culvertId, setCulvertId] = useState('');
  const [location, setLocation] = useState(null);
  const [locationString, setLocationString] = useState('No location data');
  const [assessorName, setAssessorName] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [locationLoading, setLocationLoading] = useState(false);
  
  // Function to get current location
  const getCoordinates = async () => {
    setLocationLoading(true);
    try {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationString('Permission to access location was denied');
        setLocationLoading(false);
        return;
      }
      
      // Get current position
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationString(
        `Lat: ${location.coords.latitude.toFixed(6)}, Long: ${location.coords.longitude.toFixed(6)}`
      );
    } catch (error) {
      setLocationString('Error getting location');
      console.error('Error getting location:', error);
    } finally {
      setLocationLoading(false);
    }
  };
  
  // Handle form submission to next step
  const handleNext = () => {
    // Save form data and navigate to next step
    // This will be expanded as we develop the full form flow
    
    // For now, just navigate back to demonstrate functionality
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        {/* Culvert ID */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Culvert ID</Text>
          <TextInput
            style={styles.input}
            value={culvertId}
            onChangeText={setCulvertId}
            placeholder="Enter Culvert ID"
          />
        </View>
        
        {/* Location with Get Coordinates button */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{locationString}</Text>
            <TouchableOpacity 
              style={styles.locationButton} 
              onPress={getCoordinates}
              disabled={locationLoading}
            >
              <Text style={styles.buttonText}>
                {locationLoading ? 'Getting Location...' : 'Get Coordinates'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Date */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
          />
        </View>
        
        {/* Assessor Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Assessor Name</Text>
          <TextInput
            style={styles.input}
            value={assessorName}
            onChangeText={setAssessorName}
            placeholder="Enter your name"
          />
        </View>
        
        {/* Navigation buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2E7D32',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  locationContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  locationText: {
    marginBottom: 8,
    color: '#333',
  },
  locationButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  backButton: {
    backgroundColor: '#757575',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  nextButton: {
    backgroundColor: '#2E7D32',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InputScreen;