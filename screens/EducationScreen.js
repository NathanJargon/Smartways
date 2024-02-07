import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome as Icon } from '@expo/vector-icons';

function EducationScreen({ navigation }) {
  const initialFadeAnim = useRef(new Animated.Value(0)).current;
  const recurringFadeAnim = useRef(new Animated.Value(0)).current;
  const scrollPosition = useRef(new Animated.Value(0)).current;

  const arrowOpacity = scrollPosition.interpolate({
    inputRange: [0, 320 * 4], // Replace 4 with the number of buttons
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

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
      
      <Text style={styles.header1}>Karbon Footprint</Text>
      <Text style={styles.header2}>and Emission 101</Text>

      <ScrollView 
        horizontal 
        contentContainerStyle={styles.buttonRow} 
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollPosition } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >

        <View style={styles.buttonContainer}>
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
            </View>

            <View style={styles.buttonContainer}>
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
        </View>


              <View style={styles.buttonContainer}>
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
              </View>

              <View style={styles.buttonContainer}>
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
              </View>
              </ScrollView>
              <Animated.View style={{ ...styles.arrowContainer, opacity: arrowOpacity }}>
                <Icon 
                  name="arrow-right" 
                  size={20} 
                  color="#000" 
                  style={styles.arrowIcon} 
                />
              </Animated.View>
  </ImageBackground>
  </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrowContainer: {
    position: 'absolute', 
    marginLeft: 310,
    marginTop: 50,
    backgroundColor: 'transparent', // 'rgba(11, 156, 49, 1)', 
    padding: 10, // Add padding around the icon
    borderRadius: 15, // Optional: round the corners of the container
  },
  arrowIcon: {
    color: '#90EE90',
  },
  imageBackground: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color:  '#cefad0',
    marginRight: 50,
  },
  header2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color:  '#abf7b1', 
    marginLeft: 50,
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
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    marginBottom: 10,
    marginTop: -300,
  },
  buttonContainer: {
    width: 320, // Set the width to 11% of the parent container
    marginRight: 10, // Adjust the right margin to fill up the remaining width
    alignSelf: 'center', 
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 20,
    margin: 10,
    borderRadius: 20,
    height: 200, 
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
    padding: 10,
    flexWrap: 'wrap', 
    maxWidth: '100%', 
    textAlign: 'justify',
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