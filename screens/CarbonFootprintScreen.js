import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Switch, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CarbonFootprintScreen() {
  const [electricBill, setElectricBill] = useState('');
  const [gasBill, setGasBill] = useState('');
  const [oilBill, setOilBill] = useState('');
  const [yearlyMileage, setYearlyMileage] = useState('');
  const [shortFlights, setShortFlights] = useState('');
  const [longFlights, setLongFlights] = useState('');
  const [recycleNewspaper, setRecycleNewspaper] = useState(false);
  const [recycleAluminumTin, setRecycleAluminumTin] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const allInputsFilled = electricBill !== '' && gasBill !== '' && oilBill !== '' && yearlyMileage !== '' && shortFlights !== '' && longFlights !== '';

  const startAnimation = () => {
    const totalCarbonFootprint = calculateCarbonFootprint();
  
    navigation.navigate('HomeScreen', { carbonFootprint: totalCarbonFootprint });
  
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  
  const calculateCarbonFootprint = () => {
    let total = 0;

    const electricBillValue = Number(electricBill);
    const gasBillValue = Number(gasBill);
    const oilBillValue = Number(oilBill);
    const yearlyMileageValue = Number(yearlyMileage);
    const shortFlightsValue = Number(shortFlights);
    const longFlightsValue = Number(longFlights);

    total += Number(electricBill) * 105;
    total += Number(gasBill) * 105;
    total += Number(oilBill) * 113;
    total += Number(yearlyMileage) * .79;
    total += Number(shortFlights) * 1100;
    total += Number(longFlights) * 4400;
    if (!recycleNewspaper) total += 184;
    if (!recycleAluminumTin) total += 166;
    return total;
  };

  return (
    <ImageBackground source={require('../assets/assessbg.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Monthly Electric Bill</Text>
          <TextInput
            style={styles.input}
            value={electricBill}
            onChangeText={setElectricBill}
            placeholder="Electric Bill"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Monthly Gas Bill</Text>
          <TextInput
            style={styles.input}
            value={gasBill}
            onChangeText={setGasBill}
            placeholder="Gas Bill"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Monthly Oil Bill</Text>
          <TextInput
            style={styles.input}
            value={oilBill}
            onChangeText={setOilBill}
            placeholder="Oil Bill"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Yearly Mileage</Text>
          <TextInput
            style={styles.input}
            value={yearlyMileage}
            onChangeText={setYearlyMileage}
            placeholder="Yearly Mileage"
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Short Flights (4 hours or less)</Text>
          <TextInput
            style={styles.input}
            value={shortFlights}
            onChangeText={setShortFlights}
            placeholder="Short Flights"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Has Recycled Newspaper?</Text>
          <Switch
            value={recycleNewspaper}
            onValueChange={setRecycleNewspaper}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Long Flights (4 hours or more)</Text>
          <TextInput
            style={styles.input}
            value={longFlights}
            onChangeText={setLongFlights}
            placeholder="Long Flights"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Has Recycled Aluminum and Tin?</Text>
          <Switch
            value={recycleAluminumTin}
            onValueChange={setRecycleAluminumTin}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, allInputsFilled && styles.buttonGlow]}
        onPress={startAnimation}
        disabled={!allInputsFilled}
      >
        <Text style={styles.buttonText}>Calculate Carbon Footprint</Text>
      </TouchableOpacity>
      <Animated.View style={{ opacity: animation }}>
        <Text>Your total carbon footprint is: {calculateCarbonFootprint()}</Text>
      </Animated.View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '10%',
  },
  inputContainer: {
    width: '45%',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#4caf50',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#74D178',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonGlow: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
  },
});

export default CarbonFootprintScreen;