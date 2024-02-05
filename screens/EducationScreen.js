import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';

function EducationScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/edubg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>

    <Text style={styles.header}>Ecological Sustainability Practices</Text>

    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Step1')}>
        <Text style={styles.buttonText}>1. What is Carbon Footprint?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Step2')}>
        <Text style={styles.buttonText}>2. What can you do to help Earth?</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Step3')}>
        <Text style={styles.buttonText}>3. How does recycling help?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Step4')}>
        <Text style={styles.buttonText}>4. What is global warming?</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Step5')}>
        <Text style={styles.buttonText}>5. How can we reduce pollution?</Text>
      </TouchableOpacity>
    </View>

    {/* Repeat the above pattern for other tutorial buttons */}

    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row', // Arrange children horizontally
    marginBottom: 20,
  },
  textContainer: {
    flex: 1, // Takes the available space
    marginRight: 8, // Adjust spacing as needed
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoImage: {
    width: '40%', // Adjust width as needed
    height: 200,  // Adjust height as needed
    resizeMode: 'contain',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    flex: 1,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default EducationScreen;