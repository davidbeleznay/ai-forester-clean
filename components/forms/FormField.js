import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  Switch
} from 'react-native';

/**
 * Generic form field component that handles different field types
 */
const FormField = ({ 
  type = 'text',
  label,
  value,
  onChange,
  required = false,
  placeholder = '',
  style = {},
  ...props
}) => {
  
  // Render different input types based on the type prop
  const renderInputType = () => {
    switch(type) {
      case 'text':
      case 'string':
        return (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            {...props}
          />
        );
        
      case 'number':
        return (
          <TextInput
            style={styles.input}
            value={value?.toString()}
            onChangeText={(text) => {
              // Only allow numbers
              const numericValue = text.replace(/[^0-9.]/g, '');
              onChange(numericValue);
            }}
            keyboardType="numeric"
            placeholder={placeholder}
            {...props}
          />
        );
        
      case 'textarea':
        return (
          <TextInput
            style={[styles.input, styles.textarea]}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            {...props}
          />
        );
        
      case 'toggle':
      case 'boolean':
        return (
          <View style={styles.toggleContainer}>
            <Switch
              value={Boolean(value)}
              onValueChange={onChange}
              trackColor={{ false: '#d1d1d1', true: '#b7dfb9' }}
              thumbColor={value ? '#2E7D32' : '#f4f3f4'}
            />
            <Text style={styles.toggleLabel}>
              {value ? 'Yes' : 'No'}
            </Text>
          </View>
        );
        
      default:
        return (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            {...props}
          />
        );
    }
  };
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.requiredStar}>*</Text>}
      </View>
      {renderInputType()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  requiredStar: {
    color: 'red',
    fontSize: 16,
    marginLeft: 4,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  textarea: {
    height: 100,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
});

export default FormField;
