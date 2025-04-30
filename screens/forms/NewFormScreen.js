import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import components and utilities
import FormField from '../../components/forms/FormField';
import FormSection from '../../components/forms/FormSection';
import { saveFormToStorage } from '../../utils/formUtils';

/**
 * Screen for creating new assessment forms
 */
const NewFormScreen = ({ navigation }) => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    hasPhotos: false,
    // We'll add more fields in future iterations
  });
  
  /**
   * Update a single form field
   */
  const updateField = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };
  
  /**
   * Save the form data to AsyncStorage
   */
  const saveForm = async () => {
    try {
      // Validate form data
      if (!formData.title.trim()) {
        Alert.alert('Error', 'Please enter a form title');
        return;
      }
      
      // Add metadata before saving
      const formToSave = {
        ...formData,
        createdAt: new Date().toISOString(),
      };
      
      // Save using our utility function
      const formId = await saveFormToStorage(formToSave);
      
      // Show success message
      Alert.alert(
        'Success', 
        'Assessment saved successfully!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Reset form data
              setFormData({
                title: '',
                location: '',
                notes: '',
                date: new Date().toISOString().split('T')[0],
                hasPhotos: false,
              });
              
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
            setFormData({
              title: '',
              location: '',
              notes: '',
              date: new Date().toISOString().split('T')[0],
              hasPhotos: false,
            });
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
          
          {/* Basic form information section */}
          <FormSection 
            title="Basic Information" 
            icon="information-circle-outline"
          >
            <FormField
              label="Assessment Title"
              value={formData.title}
              onChange={(value) => updateField('title', value)}
              placeholder="Enter assessment title"
              required
            />
            
            <FormField
              label="Location"
              value={formData.location}
              onChange={(value) => updateField('location', value)}
              placeholder="Enter assessment location"
            />
            
            <FormField
              label="Date"
              value={formData.date}
              onChange={(value) => updateField('date', value)}
              placeholder="YYYY-MM-DD"
            />
            
            <FormField
              type="toggle"
              label="Include Photos"
              value={formData.hasPhotos}
              onChange={(value) => updateField('hasPhotos', value)}
            />
          </FormSection>
          
          {/* Notes section */}
          <FormSection 
            title="Notes" 
            icon="document-text-outline"
          >
            <FormField
              type="textarea"
              label="Notes"
              value={formData.notes}
              onChange={(value) => updateField('notes', value)}
              placeholder="Enter any additional notes or observations"
            />
          </FormSection>
          
          {/* Future iterations will have dynamic form fields here */}
          <FormSection 
            title="Assessment Data" 
            icon="leaf-outline"
          >
            <Text style={styles.infoText}>
              In future versions, this section will contain dynamic form fields for capturing
              forest assessment data such as species information, health indicators, and 
              measurement data.
            </Text>
          </FormSection>
          
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
  infoText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
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
