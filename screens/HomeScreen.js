import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { ImageBackground } from 'react-native';
import JapanFishPalette from './JapanFishPalette';


function HomeScreen({ navigation }) {

  return (
    <ImageBackground source={require('../assets/homebg.png')} style={styles.container}>
      <ScrollView
        contentContainerStyle={[ styles.scrollContainer ]}
        scrollEventThrottle={16}
      >
        <View style={styles.row}>
          <View style={styles.box1}>
            <Text style={styles.text11}>Calculate your</Text>
            <Text style={styles.text12}>carbon emissions</Text>
          </View>
          <View style={styles.box2}>
            <Text style={styles.text21}>Know the fastest</Text>
            <Text style={styles.text22}>and cleanest</Text>
            <Text style={styles.text23}>route to your</Text>
            <Text style={styles.text24}>destination</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.box3}>
            <Text style={styles.text31}>View your records</Text>
            <Text style={styles.text32}>and data of your</Text>
            <Text style={styles.text33}>carbon footprint</Text>
          </View>
          <View style={styles.box4}>
            <Text style={styles.text41}>Edit your</Text>
            <Text style={styles.text42}>personal profile</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  box1: {
    width: 140,
    height: 170,
    backgroundColor: JapanFishPalette.text4,
    margin: 15,
    borderRadius: 12,
  },
  text11: {
    position: 'absolute',
    bottom: 35,
    left: 15,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text12: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  box2: {
    width: 140,
    height: 170,
    backgroundColor: JapanFishPalette.text3,
    margin: 15,
    borderRadius: 12,
  },
  text21: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text22: {
    position: 'absolute',
    top: 30,
    right: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text23: {
    position: 'absolute',
    top: 50,
    right: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text24: {
    position: 'absolute',
    top: 70,
    right: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  box3: {
    width: 140,
    height: 170,
    backgroundColor: JapanFishPalette.text3,
    margin: 15,
    borderRadius: 12,
  },
  text31: {
    position: 'absolute',
    top: 10,
    left: 12,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text32: {
    position: 'absolute',
    top: 30,
    left: 15,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text33: {
    position: 'absolute',
    top: 50,
    left: 15,
    color: JapanFishPalette.text3,
    fontFamily: 'Montserrat-Light',
  },
  box4: {
    width: 140,
    height: 170,
    backgroundColor: JapanFishPalette.text4,
    margin: 15,
    borderRadius: 12,
  },
  text41: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
  text42: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: JapanFishPalette.text10,
    fontFamily: 'Montserrat-Light',
  },
});


export default HomeScreen;
