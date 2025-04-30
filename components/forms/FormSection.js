import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Component for grouping related form fields into sections
 * 
 * @param {Object} props Component props
 * @param {string} props.title Section title
 * @param {React.ReactNode} props.children Child components
 * @param {string} props.icon Optional icon name from Ionicons
 * @param {Object} props.style Additional styles
 */
const FormSection = ({ 
  title, 
  children, 
  icon = null,
  style = {} 
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color="#2E7D32" 
            style={styles.icon} 
          />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  content: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
});

export default FormSection;
