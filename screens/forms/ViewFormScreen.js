import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import utilities
import { loadFormById, deleteForm } from '../../utils/formUtils';

/**
 * Screen to view a single form's details
 */
const ViewFormScreen = ({ route, navigation }) => {
  const { formId } = route.params || {};
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load form data when component mounts
  useEffect(() => {
    if (formId) {
      loadFormData();
    } else {
      setLoading(false);
      Alert.alert('Error', 'No form ID provided');
    }
  }, [formId]);

  /**
   * Load form data from storage
   */
  const loadFormData = async () => {
    try {
      setLoading(true);
      const formData = await loadFormById(formId);
      
      if (formData) {
        setForm(formData);
      } else {
        Alert.alert('Error', 'Form not found');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error loading form:', error);
      Alert.alert('Error', 'Failed to load form data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form deletion
   */
  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this assessment? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteForm(formId);
              Alert.alert('Success', 'Assessment deleted successfully');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting form:', error);
              Alert.alert('Error', 'Failed to delete assessment');
            }
          }
        },
      ]
    );
  };

  /**
   * Render a field value based on its type
   */
  const renderFieldValue = (value, type) => {
    if (value === null || value === undefined) {
      return <Text style={styles.fieldValue}>Not provided</Text>;
    }

    switch (type) {
      case 'boolean':
      case 'toggle':
        return (
          <View style={styles.toggleValue}>
            <Ionicons 
              name={value ? 'checkmark-circle' : 'close-circle'} 
              size={18} 
              color={value ? '#2E7D32' : '#777'} 
            />
            <Text style={styles.fieldValue}>{value ? 'Yes' : 'No'}</Text>
          </View>
        );
        
      case 'date':
        try {
          const date = new Date(value);
          return <Text style={styles.fieldValue}>{date.toLocaleDateString()}</Text>;
        } catch (e) {
          return <Text style={styles.fieldValue}>{value}</Text>;
        }
        
      default:
        return <Text style={styles.fieldValue}>{value.toString()}</Text>;
    }
  };

  /**
   * Render the form content when loaded
   */
  const renderForm = () => {
    if (!form) return null;

    // Format the date for display
    const createdDate = new Date(form.createdAt);
    const formattedDate = createdDate.toLocaleDateString();

    return (
      <ScrollView style={styles.formContainer}>
        {/* Form header */}
        <View style={styles.header}>
          <Text style={styles.title}>{form.title || 'Untitled Assessment'}</Text>
          <Text style={styles.date}>Created: {formattedDate}</Text>
        </View>

        {/* Basic information section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          {form.location && (
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Location:</Text>
              <Text style={styles.fieldValue}>{form.location}</Text>
            </View>
          )}
          
          {form.date && (
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Assessment Date:</Text>
              {renderFieldValue(form.date, 'date')}
            </View>
          )}
          
          {form.hasPhotos !== undefined && (
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Has Photos:</Text>
              {renderFieldValue(form.hasPhotos, 'boolean')}
            </View>
          )}
        </View>

        {/* Notes section if available */}
        {form.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.notesContainer}>
              <Text style={styles.notes}>{form.notes}</Text>
            </View>
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.editButton]}
            onPress={() => Alert.alert('Coming Soon', 'Edit functionality will be added in a future update')}
          >
            <Ionicons name="create-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Loading assessment...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderForm()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  formContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2E7D32',
  },
  field: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
  },
  toggleValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notesContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 4,
  },
  notes: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    marginTop: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
  },
  editButton: {
    backgroundColor: '#2E7D32',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ViewFormScreen;
