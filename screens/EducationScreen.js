import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome as Icon } from '@expo/vector-icons';

function EducationScreen({ navigation }) {
  const initialFadeAnim = useRef(new Animated.Value(0)).current;
  const recurringFadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      recurringFadeAnim.setValue(0);
      Animated.timing(
        recurringFadeAnim,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    }, [])
  );

  return (
    <Animated.View style={{ ...styles.container }}>
      <ImageBackground
        source={require('../assets/edubg.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.header}>Ecological Sustainability Practices</Text>

          <Animated.View style={{ ...styles.buttonRow, opacity: recurringFadeAnim }}>
            <ImageBackground
              source={require('../assets/edustepbg.png')}
              style={styles.button}
              resizeMode="cover"
              imageStyle={{ borderRadius: 8 }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Step1')}>
                <Text style={styles.buttonTitle}>Introduction to Carbon Footprint</Text>
                <Text style={styles.buttonDescription}>Understanding carbon footprint is crucial. It's the total greenhouse gases, especially carbon dioxide, produced by human activities. Explore its impact on our planet.</Text>
                <Icon name="hand-pointer-o" size={24} color="#4caf50" style={styles.icon} />
              </TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={require('../assets/edustepbg.png')}
              style={styles.button}
              resizeMode="cover"
              imageStyle={{ borderRadius: 8 }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Step2')}>
                <Text style={styles.buttonTitle}>Daily Activities and Emissions</Text>
                <Text style={styles.buttonDescription}>Discover the effects of daily activities on the environment. Examine your energy use, food choices, and vehicle carbon emissions. Learn useful tips for lowering your own carbon impact.</Text>
                <Icon name="hand-pointer-o" size={24} color="#4caf50" style={styles.icon} />
              </TouchableOpacity>
            </ImageBackground>
          </Animated.View>

          <Animated.View style={{ ...styles.buttonRow, opacity: recurringFadeAnim }}>
            <ImageBackground
              source={require('../assets/edustepbg.png')}
              style={styles.button}
              resizeMode="cover"
              imageStyle={{ borderRadius: 8 }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Step3')}>
                <Text style={styles.buttonTitle}>The Impact of Diet on Emissions</Text>
                <Text style={styles.buttonDescription}>Discover how food choices influence carbon emissions.</Text>
                <Icon name="hand-pointer-o" size={24} color="#4caf50" style={styles.icon} />
              </TouchableOpacity>
            </ImageBackground>

            <ScrollView>
              <ImageBackground
                source={require('../assets/edustepbg.png')}
                style={styles.button}
                resizeMode="cover"
                imageStyle={{ borderRadius: 8 }}
              >
                <TouchableOpacity onPress={() => navigation.navigate('Step4')}>
                  <Text style={styles.buttonTitle}>Sustainable Transportation Tips</Text>
                  <Text style={styles.buttonDescription}>Learn eco-friendly ways to commute and reduce emissions.</Text>
                  <Icon name="hand-pointer-o" size={24} color="#4caf50" style={styles.icon} />
                </TouchableOpacity>
              </ImageBackground>
            </ScrollView>
          </Animated.View>
        </ScrollView>
      </ImageBackground>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 10,
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
    flexDirection: 'row',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 8, 
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoImage: {
    width: '40%', 
    height: 200,  
    resizeMode: 'contain',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
  },
  buttonRow: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 20,
    margin: 10,
    borderRadius: 20,
    height: 150, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonTitle: {
    color: '#000',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonDescription: {
    color: '#000',
    textAlign: 'justify',
    marginTop: 10,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    color: '#000',
  },
});

export default EducationScreen;