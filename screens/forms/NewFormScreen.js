import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

/**
 * Screen for creating new assessment forms
 */
const NewFormScreen = ({ navigation }) => {
  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  
  /**
   * Save the form data to AsyncStorage
   */
  const saveForm = async () => {
    try {
      // Validate form data
      if (!formTitle.trim()) {
        Alert.alert('Error', 'Please enter a form title');
        return;
      }
      
      // Create form data object
      const formData = {
        title: formTitle.trim(),
        location: location.trim(),
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
        // We'll add dynamic fields system in the next iteration
        fields: []
      };
      
      // Generate unique ID for the form
      const formId = `form_${Date.now()}`;
      
      // Save to AsyncStorage
      await AsyncStorage.setItem(formId, JSON.stringify(formData));
      
      // Show success message
      Alert.alert(
        'Success', 
        'Assessment saved successfully!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Reset form fields
              setFormTitle('');
              setLocation('');
              setNotes('');
              
              // In future iterations, we'll navigate to the saved forms screen
              // navigation.navigate('SavedForms');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error saving form:', error);
      Alert.alert('Error', 'Failed to save the assessment');
    }
  };
  
  /**
   * Clear all form fields
   */
  const clearForm = () => {
    Alert.alert(
      'Clear Form',
      'Are you sure you want to clear all fields?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            setFormTitle('');
            setLocation('');
            setNotes('');
          }
        }
      ]
    );
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          {/* Form header */}
          <View style={styles.headerContainer}>
            <Ionicons name="create-outline" size={24} color="#2E7D32" />
            <Text style={styles.headerText}>New Field Assessment</Text>
          </View>
          
          {/* Basic form fields */}
          <Text style={styles.label}>Assessment Title *</Text>
          <TextInput
            style={styles.input}
            value={formTitle}
            onChangeText={setFormTitle}
            placeholder="Enter assessment title"
          />
          
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location"
          />
          
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Enter any additional notes"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          {/* Future iterations will have dynamic form fields here */}
          <Text style={styles.sectionTitle}>Field Data</Text>
          <Text style={styles.infoText}>
            In future versions, this section will contain dynamic form fields for capturing
            forest assessment data such as species information, health indicators, and 
            measurement data.
          </Text>
          
          {/* Form actions */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.clearButton]}
              onPress={clearForm}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={saveForm}
            >
              <Text style={styles.saveButtonText}>Save Assessment</Text>
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
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2E7D32',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginRight: 10,
  },
  clearButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#2E7D32',
    flex: 2,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default NewFormScreen;
