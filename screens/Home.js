import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions, View, Image, Modal, TextInput, InteractionManager } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Home({ handleCarTypePress }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [plate, setPlate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [carTypes, setCarTypes] = useState([
        { type: 'Sedan', plate: 'ABC-123', capacity: 4 },
        { type: 'SUV', plate: 'DEF-456', capacity: 7 },
        { type: 'Hatchback', plate: 'GHI-789', capacity: 5 },
        { type: 'Convertible', plate: 'JKL-012', capacity: 2 },
        { type: 'Pickup Truck', plate: 'MNO-345', capacity: 3 },
        { type: 'Sports Car', plate: 'PQR-678', capacity: 2 },
        { type: 'Station Wagon', plate: 'STU-901', capacity: 5 },
        { type: 'Van', plate: 'VWX-234', capacity: 8 },
        { type: 'Jeep', plate: 'YZA-567', capacity: 5 },
        { type: 'Limousine', plate: 'BCD-890', capacity: 10 },
        { type: 'Coupe', plate: 'EFG-123', capacity: 2 },
        { type: 'Minivan', plate: 'HIJ-456', capacity: 7 },
        { type: 'Off-road Vehicle', plate: 'KLM-789', capacity: 5 },
        // ...add other car types with their information
      ]);

    const handleEditPress = (car) => {
        InteractionManager.runAfterInteractions(() => {
          setSelectedCar(car);
          setPlate(car.plate);
          setCapacity(String(car.capacity));
          setModalVisible(true);
        });
      };
    
      const handleSavePress = () => {
        const updatedCar = { ...selectedCar, plate, capacity: Number(capacity) };
        const updatedCarTypes = carTypes.map(car => car.plate === updatedCar.plate ? updatedCar : car);
        setCarTypes(updatedCarTypes);
        setSelectedCar(null);
        setPlate('');
        setCapacity('');
        setModalVisible(false);
      };

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Choose your car to start tracking!</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          {carTypes.map((car, index) => (
            <View key={index}>
                <TouchableOpacity onPress={() => handleCarTypePress(car)}>
                <View style={styles.carType}>
                    <View style={styles.transparentBackground} />
                    <Text style={styles.carTypeText}>{car.type}</Text>
                    <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Plate: {car.plate}</Text>
                    <Text style={styles.infoText}>Capacity: {car.capacity}</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditPress(car)} style={styles.editIconContainer}>
                <Image source={require('../assets/icons/edit.png')} style={styles.editIcon} />
                </TouchableOpacity>
            </View>
            ))}
          </ScrollView>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Car Details</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Plate" 
              value={plate} 
              onChangeText={setPlate} 
            />
            <TextInput 
              style={styles.input} 
              placeholder="Capacity" 
              value={capacity} 
              onChangeText={setCapacity} 
              keyboardType="numeric" 
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSavePress}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: height * 0.1,
        alignItems: 'center', // add this line
        justifyContent: 'center', // add this line
    },
  header: {
    fontSize: 24,
    fontFamily: 'NeueMachina-Ultrabold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  carTypeButton: {
    backgroundColor: 'transparent',
  },
  carTypeText: {
    fontSize: 18,
    fontFamily: 'NeueMachina-Regular',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'NeueMachina-Regular',
  },
  carType: {
    marginBottom: height * 0.05,
    padding: 20,
    borderRadius: 10,
    width: width * .8, // increase width to 120% of screen width
    backgroundColor: 'rgba(221, 221, 221, 1)', // semi-transparent background
  },
  editIcon: {
    width: width * 0.1,
    height: height * 0.1,
    resizeMode: 'contain',
    position: 'absolute',
    right: width * 0.05,
    top: -width * .065,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {  
    marginBottom: height * 0.01,
    textAlign: "center",
    fontFamily: 'NeueMachina-Ultrabold',
  },
  input: {
    width: width * 0.5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NeueMachina-Ultrabold',
  },
  editIconContainer: {
    position: 'absolute',
    right: width * 0.05,
    top: '25%',
    zIndex: 10, // add this line
  },
});