import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import VehicleTracker from './VehicleTracker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(false);

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
  
  const loadHome = () => {
    // Reset isLoading to false when navigating to Home
    setIsLoading(false);
    setActiveComponent('Dashboard');
    setSidebarOpen(false);
  };
  

  return (
    <ImageBackground 
      source={isLoading ? require('../assets/loading.png') : require('../assets/dashboard.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
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
        {sidebarOpen && (
          <View style={styles.sidebar}>
            <TouchableOpacity
              style={[
                styles.customButton,
                activeComponent === 'Dashboard' && { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
              ]}
              onPress={loadHome}
            >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.customButton,
                activeComponent === 'VehicleTracker' && { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
              ]}
              onPress={loadVehicleTracker}
            >
              <Text style={styles.buttonText}>Tracking</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeComponent === 'VehicleTracker' && <VehicleTracker setIsLoading={setIsLoading} />}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Change backgroundColor to transparent
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '60%',
    backgroundColor: 'rgba(221, 221, 221, 0.5)', 
    zIndex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 150, 
    justifyContent: 'top', 
    alignItems: 'center', 
  },
  buttonClosed: {
    position: 'absolute',
    left: '5%', 
    top: '5%', 
    zIndex: 1, 
  },
  buttonOpen: {
    position: 'absolute',
    right: '5%', 
    top: '5%', 
    zIndex: 1, 
  },
  customButton: {
    backgroundColor: 'rgba(0, 0, 0, 1)', 
    padding: 10,
    marginTop: windowHeight * 0.09,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

