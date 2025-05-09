import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform
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
  const [topWidths, setTopWidths] = useState([{ id: 1, value: '' }]);
  const [bottomWidths, setBottomWidths] = useState([{ id: 1, value: '' }]);
  const [bankfullDepth, setBankfullDepth] = useState('');
  const [streamSlope, setStreamSlope] = useState('');
  const [drainageArea, setDrainageArea] = useState('');
  const [drainageAreaUnit, setDrainageAreaUnit] = useState('ha'); // 'ha' or 'km2'
  
  // Region is fixed at 3.0 for now
  const region = 3.0;
  
  // Optional considerations state
  const [includeTransport, setIncludeTransport] = useState(false);
  const [includeClimate, setIncludeClimate] = useState(false);
  
  // Calculate average widths
  const averageTopWidth = useMemo(() => {
    const validWidths = topWidths
      .map(item => parseFloat(item.value))
      .filter(value => !isNaN(value));
    
    if (validWidths.length === 0) return 0;
    
    const sum = validWidths.reduce((acc, value) => acc + value, 0);
    return (sum / validWidths.length).toFixed(2);
  }, [topWidths]);
  
  const averageBottomWidth = useMemo(() => {
    const validWidths = bottomWidths
      .map(item => parseFloat(item.value))
      .filter(value => !isNaN(value));
    
    if (validWidths.length === 0) return 0;
    
    const sum = validWidths.reduce((acc, value) => acc + value, 0);
    return (sum / validWidths.length).toFixed(2);
  }, [bottomWidths]);
  
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
  
  // Add new width measurement field
  const addWidthField = (type) => {
    if (type === 'top') {
      const newId = topWidths.length > 0 
        ? Math.max(...topWidths.map(item => item.id)) + 1 
        : 1;
      setTopWidths([...topWidths, { id: newId, value: '' }]);
    } else {
      const newId = bottomWidths.length > 0 
        ? Math.max(...bottomWidths.map(item => item.id)) + 1 
        : 1;
      setBottomWidths([...bottomWidths, { id: newId, value: '' }]);
    }
  };
  
  // Remove width measurement field
  const removeWidthField = (id, type) => {
    if (type === 'top') {
      if (topWidths.length > 1) {
        setTopWidths(topWidths.filter(item => item.id !== id));
      }
    } else {
      if (bottomWidths.length > 1) {
        setBottomWidths(bottomWidths.filter(item => item.id !== id));
      }
    }
  };
  
  // Update width value
  const updateWidthValue = (id, value, type) => {
    if (type === 'top') {
      setTopWidths(
        topWidths.map(item => 
          item.id === id ? { ...item, value } : item
        )
      );
    } else {
      setBottomWidths(
        bottomWidths.map(item => 
          item.id === id ? { ...item, value } : item
        )
      );
    }
  };
  
  // Toggle drainage area unit
  const toggleDrainageAreaUnit = () => {
    setDrainageAreaUnit(drainageAreaUnit === 'ha' ? 'km2' : 'ha');
  };
  
  // Handle form submission to next step
  const handleNext = () => {
    // Save form data and navigate to next step
    // This will be expanded as we develop the full form flow
    
    // For now, just navigate back to demonstrate functionality
    navigation.goBack();
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
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
          
          {/* Core Required Inputs Section */}
          <Text style={styles.sectionTitle}>Core Required Inputs</Text>
          
          {/* Top Width (W1) */}
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>W1 (Top Width) - meters</Text>
              {topWidths.length > 0 && 
                <Text style={styles.averageText}>Average: {averageTopWidth} m</Text>
              }
            </View>
            <Text style={styles.description}>
              Top width of channel at bankfull (measured with tape across top)
            </Text>
            
            {topWidths.map((item) => (
              <View key={`top-${item.id}`} style={styles.widthContainer}>
                <TextInput
                  style={styles.widthInput}
                  value={item.value}
                  onChangeText={(value) => updateWidthValue(item.id, value, 'top')}
                  placeholder="Enter width (m)"
                  keyboardType="numeric"
                />
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeWidthField(item.id, 'top')}
                  disabled={topWidths.length === 1}
                >
                  <Ionicons 
                    name="remove-circle" 
                    size={24} 
                    color={topWidths.length === 1 ? "#ccc" : "#ff6b6b"} 
                  />
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addWidthField('top')}
            >
              <Ionicons name="add-circle" size={24} color="#2E7D32" />
              <Text style={styles.addButtonText}>Add Another Top Width</Text>
            </TouchableOpacity>
          </View>
          
          {/* Bottom Width (W2) */}
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>W2 (Bottom Width) - meters</Text>
              {bottomWidths.length > 0 && 
                <Text style={styles.averageText}>Average: {averageBottomWidth} m</Text>
              }
            </View>
            <Text style={styles.description}>
              Bottom width of channel at bankfull (narrowest part of trapezoid)
            </Text>
            
            {bottomWidths.map((item) => (
              <View key={`bottom-${item.id}`} style={styles.widthContainer}>
                <TextInput
                  style={styles.widthInput}
                  value={item.value}
                  onChangeText={(value) => updateWidthValue(item.id, value, 'bottom')}
                  placeholder="Enter width (m)"
                  keyboardType="numeric"
                />
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeWidthField(item.id, 'bottom')}
                  disabled={bottomWidths.length === 1}
                >
                  <Ionicons 
                    name="remove-circle" 
                    size={24} 
                    color={bottomWidths.length === 1 ? "#ccc" : "#ff6b6b"} 
                  />
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addWidthField('bottom')}
            >
              <Ionicons name="add-circle" size={24} color="#2E7D32" />
              <Text style={styles.addButtonText}>Add Another Bottom Width</Text>
            </TouchableOpacity>
          </View>
          
          {/* Bankfull Depth (D) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bankfull Depth (D) - meters</Text>
            <Text style={styles.description}>
              Vertical distance from stream bed to bankfull indicator (typically from scour line, vegetation, or silt)
            </Text>
            <TextInput
              style={styles.input}
              value={bankfullDepth}
              onChangeText={setBankfullDepth}
              placeholder="Enter depth (m)"
              keyboardType="numeric"
            />
          </View>
          
          {/* Stream Slope (S) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Stream Slope (S) - % or unitless (m/m)</Text>
            <Text style={styles.description}>
              Stream slope near the crossing (use clinometer, Abney level, or LiDAR-derived)
            </Text>
            <TextInput
              style={styles.input}
              value={streamSlope}
              onChangeText={setStreamSlope}
              placeholder="Enter slope (e.g., 0.02 or 2%)"
              keyboardType="numeric"
            />
          </View>
          
          {/* Drainage Area (A) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Drainage Area (A)</Text>
            <Text style={styles.description}>
              Watershed area contributing to the crossing (from DEM or GIS tools)
            </Text>
            <View style={styles.inputWithUnit}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 10 }]}
                value={drainageArea}
                onChangeText={setDrainageArea}
                placeholder={`Enter area (${drainageAreaUnit})`}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.unitButton}
                onPress={toggleDrainageAreaUnit}
              >
                <Text style={styles.unitButtonText}>{drainageAreaUnit}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Region or Zone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Region or Zone</Text>
            <Text style={styles.description}>
              Hydrologic zone multiplier (Currently fixed at 3.0)
            </Text>
            <View style={styles.disabledInput}>
              <Text style={styles.disabledInputText}>3.0</Text>
            </View>
            <Text style={styles.noteText}>Note: Region value is fixed at 3.0 for now. Additional regions may be added in the future.</Text>
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
    </KeyboardAvoidingView>
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
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  averageText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  unitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disabledInputText: {
    color: '#666',
  },
  noteText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
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
  widthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  widthInput: {
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
    marginBottom: 24,
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