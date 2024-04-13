import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Title from '../components/title'; // Importing the Title component
import ManageUsers from '../components/manageUsers'; // Importing the ManageUsers component
import Dashboard from '../components/dashboard'; // Importing the Dashboard component
import ManageQuestions from '../components/manageQuestions'; // Importing the ManageQuestions component
import Icon from "react-native-vector-icons/Ionicons"; // Importing the Ionicons icon component

// Admin component
const Admin = ({ navigation }) => {
  // State to manage the selected menu item
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');

  // Define menu items
  const menuItems = [
    { id: 'Dashboard', title: 'Dashboard' },
    { id: 'Users', title: 'Users' },
    { id: 'Questions', title: 'Questions' },
    // Add more menu items as needed
  ];

  // Function to handle menu item click
  const handleMenuItemClick = (menuItem) => {
    // Set the selected menu item
    setSelectedMenuItem(menuItem);
  };

  // Function to render content based on selected menu item
  const renderMainContent = () => {
    switch (selectedMenuItem) {
      case 'Users':
        return <ManageUsers />;
      case 'Questions':
        return <ManageQuestions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Title component */}
      <Title />
      {/* Navigation menu */}
      <View style={styles.sidebar}>
        <View style={styles.flatlistContainer}>
          {/* Back navigation to Home */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="chevron-back-circle-outline" size={28} color="black" style={{ margin:10 }} />
          </TouchableOpacity>
          {/* Menu items */}
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                selectedMenuItem === item.id ? styles.selectedMenuItem : null,
              ]}
              onPress={() => handleMenuItemClick(item.id)}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main content area */}
      <ScrollView>
        <View style={styles.mainContent}>
          {/* Display content based on selected menu item */}
          {renderMainContent()}
        </View>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
  },
  sidebar: {
    paddingVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedMenuItem: {
    backgroundColor: '#ddd',
    borderRadius: 10
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Admin; // Exporting the Admin component
