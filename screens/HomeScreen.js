import React, { useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const HomeScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState({carbonFootprint: 0});
  const [markedDates, setMarkedDates] = useState({
    '2022-09-20': {selected: true, marked: true, selectedColor: 'blue', carbonFootprint: 10},
    '2022-09-21': {marked: true, dotColor: 'red', activeOpacity: 0, carbonFootprint: 20},
    '2022-09-22': {disabled: true, disableTouchEvent: true, carbonFootprint: 30}
  });

  const lastSelectedDay = useRef();

  const monthlyData = [
    { month: 'Jan', carbonFootprint: 20 },
    { month: 'Feb', carbonFootprint: 30 },
    { month: 'Mar', carbonFootprint: 25 },
    { month: 'Apr', carbonFootprint: 27 },
    { month: 'May', carbonFootprint: 22 },
    { month: 'Jun', carbonFootprint: 24 },
    { month: 'Jul', carbonFootprint: 26 },
    { month: 'Aug', carbonFootprint: 28 },
    { month: 'Sep', carbonFootprint: 23 },
    { month: 'Oct', carbonFootprint: 21 },
    { month: 'Nov', carbonFootprint: 29 },
    { month: 'Dec', carbonFootprint: 31 },
  ];
  
  const yearlyData = [
    { year: '2018', carbonFootprint: 250 },
    { year: '2019', carbonFootprint: 300 },
    { year: '2020', carbonFootprint: 275 },
    { year: '2021', carbonFootprint: 290 },
    { year: '2022', carbonFootprint: 310 },
  ];

  const handleDayPress = (day) => {
    let newMarkedDates = {...markedDates};
  
    // Unselect the last selected day
    if (lastSelectedDay.current) {
      newMarkedDates[lastSelectedDay.current] = {...newMarkedDates[lastSelectedDay.current], selected: false};
    }
  
    // Select the new day
    newMarkedDates[day.dateString] = {
      ...newMarkedDates[day.dateString], 
      selected: true, 
      selectedColor: 'blue',
      carbonFootprint: newMarkedDates[day.dateString]?.carbonFootprint || 0
    };
  
    setMarkedDates(newMarkedDates);
    setSelectedDay(newMarkedDates[day.dateString]);
    lastSelectedDay.current = day.dateString;
  };

  const MonthlyChart = useMemo(() => (
    <VictoryChart width={350} theme={VictoryTheme.material}>
      <VictoryBar data={monthlyData} x="month" y="carbonFootprint" />
    </VictoryChart>
  ), [monthlyData]);

  const YearlyChart = useMemo(() => (
    <VictoryChart width={350} theme={VictoryTheme.material}>
      <VictoryBar data={yearlyData} x="year" y="carbonFootprint" />
    </VictoryChart>
  ), [yearlyData]);

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
          {MonthlyChart}
  
          <Text style={styles.graphTitle}>Yearly Carbon Footprint</Text>
          {YearlyChart}
          
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