import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

// Import utilities
import { loadAllForms, deleteForm } from '../../utils/formUtils';

/**
 * Screen to display all saved forms
 */
const SavedFormsScreen = ({ navigation }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  /**
   * Load all saved forms when screen is focused
   */
  useEffect(() => {
    if (isFocused) {
      loadForms();
    }
  }, [isFocused]);

  /**
   * Load all forms from storage
   */
  const loadForms = async () => {
    try {
      setLoading(true);
      const savedForms = await loadAllForms();
      setForms(savedForms);
    } catch (error) {
      console.error('Error loading forms:', error);
      Alert.alert('Error', 'Failed to load saved forms');
    } finally {
      setLoading(false);
    }
  };

  /**
   * View a specific form
   */
  const viewForm = (form) => {
    // We'll implement the view form screen in a future update
    Alert.alert('Coming Soon', 'View form functionality will be added in the next update');

    // In the future, we'll navigate to the ViewFormScreen
    // navigation.navigate('ViewForm', { formId: form.id });
  };

  /**
   * Delete a form after confirmation
   */
  const confirmDeleteForm = (form) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${form.title}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteForm(form.id);
              setForms(forms.filter(f => f.id !== form.id));
              Alert.alert('Success', 'Form deleted successfully');
            } catch (error) {
              console.error('Error deleting form:', error);
              Alert.alert('Error', 'Failed to delete form');
            }
          }
        },
      ]
    );
  };

  /**
   * Render a single form item
   */
  const renderFormItem = ({ item }) => {
    // Format the date
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString();

    return (
      <TouchableOpacity
        style={styles.formItem}
        onPress={() => viewForm(item)}
      >
        <View style={styles.formContent}>
          <Text style={styles.formTitle}>{item.title || 'Untitled Form'}</Text>
          <Text style={styles.formDate}>{formattedDate}</Text>
          
          {/* Show location if available */}
          {item.location && (
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmDeleteForm(item)}
        >
          <Ionicons name="trash-outline" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  /**
   * Render empty state when no forms are available
   */
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No Saved Assessments</Text>
      <Text style={styles.emptySubtitle}>
        Your saved assessments will appear here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Loading saved assessments...</Text>
        </View>
      ) : (
        <FlatList
          data={forms}
          renderItem={renderFormItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
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
    color: '#666',
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  formItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  formContent: {
    flex: 1,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  formDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SavedFormsScreen;
