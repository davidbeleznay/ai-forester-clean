import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../src/context/ThemeContext';
import ThemeToggle from '../src/components/ThemeToggle';

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const menuItems = [
    {
      title: 'Road Risk Assessment',
      icon: 'warning-outline',
      color: '#2374E1',
      onPress: () => navigation.navigate('NewForm')
    },
    {
      title: 'Culvert Sizing Tool',
      icon: 'water-outline',
      color: '#36833E',
      onPress: () => navigation.navigate('CulvertTool')
    },
    {
      title: 'Assessment History',
      icon: 'time-outline',
      color: '#6E34B8',
      onPress: () => navigation.navigate('SavedForms')
    }
  ];

  const recentDrafts = [
    { id: 1, title: 'Culvert name', location: 'gps', date: 'May 7, 2025', type: 'Culvert Sizing' },
    { id: 2, title: 'yes', location: 'No location', date: 'May 8, 2025', type: 'Road Risk' }
  ];

  return (
    <ScrollView 
      style={[
        styles.container, 
        isDarkMode && styles.containerDark
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <ThemeToggle />

      <View style={styles.header}>
        <Text style={[
          styles.title, 
          isDarkMode && styles.titleDark
        ]}>
          Digital Forester App
        </Text>
      </View>

      <Text style={[
        styles.selectionText, 
        isDarkMode && styles.textDark
      ]}>
        Select a tool to begin:
      </Text>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={28} color="white" />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.recentContainer}>
        <Text style={[
          styles.recentTitle, 
          isDarkMode && styles.textDark
        ]}>
          Recent Drafts
        </Text>
        
        {recentDrafts.map(draft => (
          <TouchableOpacity 
            key={draft.id}
            style={[
              styles.draftCard, 
              isDarkMode && styles.draftCardDark
            ]}
            onPress={() => console.log(`Open draft ${draft.id}`)}
          >
            <View style={styles.draftHeader}>
              <Text style={[
                styles.draftTitle, 
                isDarkMode && styles.textDark
              ]}>
                {draft.title}
              </Text>
              <Text style={[
                styles.draftType, 
                { color: draft.type === 'Road Risk' ? '#2374E1' : '#36833E' }
              ]}>
                {draft.type}
              </Text>
            </View>
            
            <Text style={[
              styles.draftLocation, 
              isDarkMode && styles.textMediumDark
            ]}>
              {draft.location}
            </Text>
            
            <View style={styles.draftFooter}>
              <Text style={[
                styles.draftDate, 
                isDarkMode && styles.textLightDark
              ]}>
                {draft.date}
              </Text>
              <TouchableOpacity>
                <Text style={styles.continueButton}>Continue editing →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[
          styles.footerText, 
          isDarkMode && styles.textLightDark
        ]}>
          Digital Forester App v0.2.0
        </Text>
        <Text style={[
          styles.footerText, 
          isDarkMode && styles.textLightDark
        ]}>
          © 2025 Forest Management Technologies
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2374E1',
    marginBottom: 5,
  },
  titleDark: {
    color: '#4A90E2',
  },
  selectionText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  textDark: {
    color: '#e0e0e0',
  },
  textMediumDark: {
    color: '#cccccc',
  },
  textLightDark: {
    color: '#a0a0a0',
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuItemText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  recentContainer: {
    marginBottom: 30,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  draftCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  draftCardDark: {
    backgroundColor: '#1e1e1e',
  },
  draftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  draftTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  draftType: {
    fontSize: 14,
    fontWeight: '500',
  },
  draftLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  draftFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  draftDate: {
    fontSize: 14,
    color: '#888',
  },
  continueButton: {
    color: '#2374E1',
    fontWeight: '500',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
});

export default HomeScreen;