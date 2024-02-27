import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Button, ActivityIndicator } from 'react-native';
import VehicleTracker from './VehicleTracker';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(false); // Add this line

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const loadVehicleTracker = () => {
    setIsLoading(true);
    setActiveComponent('VehicleTracker');
    setSidebarOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSidebar} style={sidebarOpen ? styles.buttonOpen : styles.buttonClosed}>
        <Image
          source={
            sidebarOpen
              ? require('../assets/icons/clicked.png')
              : require('../assets/icons/not-clicked.png')
          }
          style={{ width: windowWidth * 0.1, height: windowHeight * 0.05 }}
        />
      </TouchableOpacity>
      {activeComponent === 'Dashboard' && <Text style={styles.title}>Dashboard</Text>}
        {sidebarOpen && (
        <View style={styles.sidebar}>
            <TouchableOpacity style={styles.customButton} onPress={loadVehicleTracker}>
            <Text style={styles.buttonText}>Tracking</Text>
            </TouchableOpacity>
        </View>
        )}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Image source={require('../assets/icons/loading.png')} style={{ width: 100, height: 100 }} />
        </View>
      )}
      {activeComponent === 'VehicleTracker' && <VehicleTracker />}
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '60%',
    backgroundColor: 'rgba(221, 221, 221, 0.5)', // Semi-transparent background
    zIndex: 1,
    borderTopRightRadius: 20, // Rounded top right corner
    borderBottomRightRadius: 150, // Rounded bottom right corner
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonClosed: {
    position: 'absolute',
    left: '5%', // 2% of the screen width from the left edge
    top: '5%', // 2% of the screen height from the top edge
    zIndex: 1, // Add this line
  },
  buttonOpen: {
    position: 'absolute',
    right: '5%', // 2% of the screen width from the right edge
    top: '5%', // 2% of the screen height from the top edge
    zIndex: 1, // Add this line
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  customButton: {
    backgroundColor: '#4CAF50', // Change this to your preferred color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Change this to your preferred color
    fontSize: 18,
  },
});