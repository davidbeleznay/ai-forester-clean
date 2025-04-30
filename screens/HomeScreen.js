import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="leaf" size={48} color="#2E7D32" />
        <Text style={styles.title}>AI Forester</Text>
        <Text style={styles.subtitle}>Field Assessment Tool</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('NewForm')}
        >
          <Ionicons name="add-circle" size={32} color="#2E7D32" />
          <Text style={styles.actionText}>New Assessment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('SavedForms')}
        >
          <Ionicons name="folder" size={32} color="#2E7D32" />
          <Text style={styles.actionText}>Saved Assessments</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About AI Forester</Text>
        <Text style={styles.infoText}>
          AI Forester is a comprehensive tool designed to help forest professionals collect,
          manage, and analyze field data efficiently. Use this app to conduct field assessments,
          record observations, and track forest health indicators.
        </Text>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
  },
  actionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2E7D32',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  versionText: {
    fontSize: 12,
    color: '#888',
    marginTop: 20,
    textAlign: 'right',
  }
});

export default HomeScreen;
