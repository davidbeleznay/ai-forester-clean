/**
 * Utility functions for form handling
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save a form to AsyncStorage
 * 
 * @param {object} formData - The form data to save
 * @returns {Promise<string>} The ID of the saved form
 */
export const saveFormToStorage = async (formData) => {
  try {
    // Generate a unique ID if not provided
    const formId = formData.id || `form_${Date.now()}`;
    
    // Ensure createdAt is set
    const dataToSave = {
      ...formData,
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Save to AsyncStorage
    await AsyncStorage.setItem(formId, JSON.stringify(dataToSave));
    
    return formId;
  } catch (error) {
    console.error('Error saving form:', error);
    throw error;
  }
};

/**
 * Load all saved forms from AsyncStorage
 * 
 * @returns {Promise<Array>} Array of saved forms
 */
export const loadAllForms = async () => {
  try {
    // Get all keys
    const keys = await AsyncStorage.getAllKeys();
    
    // Filter only form keys
    const formKeys = keys.filter(key => key.startsWith('form_'));
    
    if (formKeys.length === 0) {
      return [];
    }
    
    // Get all form data
    const forms = await Promise.all(
      formKeys.map(async (key) => {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue != null) {
          const form = JSON.parse(jsonValue);
          return {
            id: key,
            ...form,
          };
        }
        return null;
      })
    );
    
    // Filter out null values and sort by createdAt (newest first)
    return forms
      .filter(form => form !== null)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error loading forms:', error);
    throw error;
  }
};

/**
 * Load a specific form by ID
 * 
 * @param {string} formId - The ID of the form to load
 * @returns {Promise<object|null>} The form data or null if not found
 */
export const loadFormById = async (formId) => {
  try {
    const jsonValue = await AsyncStorage.getItem(formId);
    if (jsonValue != null) {
      const form = JSON.parse(jsonValue);
      return {
        id: formId,
        ...form,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error loading form ${formId}:`, error);
    throw error;
  }
};

/**
 * Delete a form by ID
 * 
 * @param {string} formId - The ID of the form to delete
 * @returns {Promise<boolean>} Success indicator
 */
export const deleteForm = async (formId) => {
  try {
    await AsyncStorage.removeItem(formId);
    return true;
  } catch (error) {
    console.error(`Error deleting form ${formId}:`, error);
    throw error;
  }
};

/**
 * Validate form fields
 * 
 * @param {Object} formData - The form data to validate
 * @param {Array} fieldDefinitions - The field definitions with validation rules
 * @returns {Object} Object with isValid flag and errors array
 */
export const validateForm = (formData, fieldDefinitions) => {
  const errors = [];
  
  // Check each field definition for required fields
  fieldDefinitions.forEach(field => {
    const value = formData[field.name];
    
    // Check required fields
    if (field.required && (value === undefined || value === null || value === '')) {
      errors.push({
        field: field.name,
        message: `${field.label || field.name} is required`
      });
    }
    
    // Add more validation rules as needed
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
