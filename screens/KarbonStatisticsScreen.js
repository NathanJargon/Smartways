import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome as Icon } from '@expo/vector-icons';


const KarbonStatisticsScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const screenWidth = Dimensions.get('window').width;
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const [period, setPeriod] = useState('Daily');
  
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14", "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20"],
    datasets: [
      {
        data: [50, 60, 70, 80, 50, 60, 70, 80, 50, 60, 70, 80, 50, 60, 70, 80, 50, 60, 70, 80]
      }
    ]
  };
  
  const nth = 5;
  const labels = data.labels.map((label, index) => (index % nth === 0 ? label : ''));
  

  return (
    <View style={styles.container}>

    <View style={styles.roundedBox}>
      <View style={styles.buttonContainer}>
        <Icon style={styles.icon1} name="chevron-left" size={20} onPress={() => setDate(prevDate => new Date(new Date(prevDate).setDate(new Date(prevDate).getDate() - 1)))} />
        <Text style= {{ fontSize: 20, fontFamily: "Montserrat-Light" }} >{day} {month}</Text>
        <Icon style={styles.icon2} name="chevron-right" size={20} onPress={() => setDate(prevDate => new Date(new Date(prevDate).setDate(new Date(prevDate).getDate() + 1)))} />
      </View>
    </View>

      <View style={styles.periodButton}>
        <TouchableOpacity style={styles.periodButton} onPress={() => {
          if (period === 'Daily') setPeriod('Monthly');
          else if (period === 'Monthly') setPeriod('Yearly');
          else if (period === 'Yearly') setPeriod('Daily');
        }}>
          <Text style={styles.buttonText}>{period}</Text>
        </TouchableOpacity>
      </View>

      <Text style={ styles.header1 }>Your {period} Record</Text>
      <Text style={ styles.header2 }>of Emission</Text>

      <LineChart
        data={{ ...data, labels }}
        width={screenWidth-60}
        height={320}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginBottom: 40,
        }}
      />

      <TouchableOpacity style={styles.roundBoxBelowGraph} onPress={() => {
        props.navigation.navigate('Karbon Leaderboard');
      }}>
        <View style={{ left: 30, top: -3 }}>
          <Icon name="trophy" size={32} color="gold" />
        </View>
        <Text style={styles.belowText1}>Community</Text>
        <Text style={styles.belowText2}>Leaderboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Profile');
        }}
        style={styles.cardContainer}
      >
        <View style={styles.profileContainer}>
          <Icon name="user" size={50} color="#000" />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>User Name</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundBoxBelowGraph: {
    position: 'absolute',
    top: 420,
    margin: 50,
    height: 70, 
    width: '70%',
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#e26a00', 
  },
  belowText1: { // roundedBlowBelowGraph
    fontSize: 19,
    bottom: 40,
    left: 80,
    fontFamily: 'Montserrat-Light',
    color: 'black',
  },
  belowText2: { // roundedBlowBelowGraph
    fontSize: 19,
    fontFamily: 'Montserrat-Light',
    color: 'black',
    bottom: 40,
    left: 80,
  },
  header1: {
    position: 'absolute',
    top: 100,
    fontSize: 27,
    fontFamily: 'Montserrat-Light',
  },
  header2: {
    position: 'absolute',
    top: 130,
    fontSize: 27,
    fontFamily: 'Montserrat-Light',
  },
  periodButton: {
    position: 'absolute',
    top: 18,
    left: 110,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black', 
    textAlign: 'center',
    fontSize: 27,
    padding: 10,
    fontFamily: 'Codec',
  },
  roundedBox: {
    position: 'absolute',
    top: 40,
    left: 30,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  cardContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
    height: 70,
    alignSelf: 'center',
    top: 550, // Adjust this value as needed
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
  nameContainer: {
    flex: 3,
    justifyContent: 'center',
    marginLeft: 10, // Add this line if you want some space between the icon and the text
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
  },
  nameText: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Montserrat-Light',
    color: 'black',
    padding: 10,
    marginLeft: 30,
    marginBottom: 0,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon1: {
    marginRight: 10,
  },
  icon2: {
    marginLeft: 10,
  }
});

export default KarbonStatisticsScreen;