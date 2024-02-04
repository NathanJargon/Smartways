import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const HomeScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const markedDates = {
    '2022-09-20': {selected: true, marked: true, selectedColor: 'blue', carbonFootprint: 10},
    '2022-09-21': {marked: true, dotColor: 'red', activeOpacity: 0, carbonFootprint: 20},
    '2022-09-22': {disabled: true, disableTouchEvent: true, carbonFootprint: 30}
  };

  const handleDayPress = (day) => {
    setSelectedDay(markedDates[day.dateString]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.graphTitle}>Your Carbon Footprint Calendar</Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />

    {selectedDay && (
      <View style={styles.footprintContainer}>
        <Text style={styles.footprintText}>Daily Carbon Footprint: {selectedDay.carbonFootprint}</Text>

        <Text style={styles.graphTitle}>Monthly Carbon Footprint</Text>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={/* Monthly data here */} x="month" y="carbonFootprint" />
        </VictoryChart>

        <Text style={styles.graphTitle}>Yearly Carbon Footprint</Text>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={/* Yearly data here */} x="year" y="carbonFootprint" />
        </VictoryChart>

        <Button title="Action Plan" onPress={() => { /* Navigate to action plan */ }} />
      </View>
    )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footprintContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footprintText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;