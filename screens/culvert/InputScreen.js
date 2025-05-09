import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Switch
} from 'react-native';
import * as Location from 'expo-location';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

const InputScreen = ({ navigation }) => {
  // Basic information state
  const [culvertId, setCulvertId] = useState('');
  const [location, setLocation] = useState(null);
  const [locationString, setLocationString] = useState('No location data');
  const [assessorName, setAssessorName] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [locationLoading, setLocationLoading] = useState(false);
  
  // Stream measurements state
  const [streamWidths, setStreamWidths] = useState([{ id: 1, value: '' }]);
  
  // Optional considerations state
  const [includeTransport, setIncludeTransport] = useState(false);
  const [includeClimate, setIncludeClimate] = useState(false);
  
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
  
  // Add new stream width field
  const addStreamWidth = () => {
    const newId = streamWidths.length > 0 
      ? Math.max(...streamWidths.map(item => item.id)) + 1 
      : 1;
    setStreamWidths([...streamWidths, { id: newId, value: '' }]);
  };
  
  // Remove stream width field
  const removeStreamWidth = (id) => {
    if (streamWidths.length > 1) {
      setStreamWidths(streamWidths.filter(item => item.id !== id));
    }
  };
  
  // Update stream width value
  const updateStreamWidth = (id, value) => {
    setStreamWidths(
      streamWidths.map(item => 
        item.id === id ? { ...item, value } : item
      )
    );
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
        {/* Basic Information Section */}
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
        
        {/* Stream Measurements Section */}
        <Text style={styles.sectionTitle}>Stream Measurements</Text>
        
        {/* Multiple Stream Width Inputs */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Stream Width Measurements (meters)</Text>
          
          {streamWidths.map((item) => (
            <View key={item.id} style={styles.streamWidthContainer}>
              <TextInput
                style={styles.streamWidthInput}
                value={item.value}
                onChangeText={(value) => updateStreamWidth(item.id, value)}
                placeholder="Enter width"
                keyboardType="numeric"
              />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeStreamWidth(item.id)}
                disabled={streamWidths.length === 1}
              >
                <Ionicons 
                  name="remove-circle" 
                  size={24} 
                  color={streamWidths.length === 1 ? "#ccc" : "#ff6b6b"} 
                />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={addStreamWidth}
          >
            <Ionicons name="add-circle" size={24} color="#2E7D32" />
            <Text style={styles.addButtonText}>Add Another Measurement</Text>
          </TouchableOpacity>
        </View>
        
        {/* Optional Considerations Section */}
        <Text style={styles.sectionTitle}>Optional Considerations</Text>
        
        {/* Transport Consideration Toggle */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleTextContainer}>
            <Text style={styles.toggleLabel}>Include Transport Considerations</Text>
            <Text style={styles.toggleDescription}>
              Consider sediment and debris transport capacity
            </Text>
          </View>
          <Switch
            value={includeTransport}
            onValueChange={setIncludeTransport}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={includeTransport ? "#2E7D32" : "#f4f3f4"}
          />
        </View>
        
        {/* Climate Consideration Toggle */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleTextContainer}>
            <Text style={styles.toggleLabel}>Include Climate Projections</Text>
            <Text style={styles.toggleDescription}>
              Apply future climate adjustments to sizing calculations
            </Text>
          </View>
          <Switch
            value={includeClimate}
            onValueChange={setIncludeClimate}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={includeClimate ? "#2E7D32" : "#f4f3f4"}
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
    marginTop: 24,
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
  streamWidthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  streamWidthInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#2E7D32',
    marginLeft: 8,
    fontWeight: '500',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  toggleDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
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