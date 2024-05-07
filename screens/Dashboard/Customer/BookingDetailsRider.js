import { View, TextInput, Button, Text, KeyboardAvoidingView, Pressable, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useRef } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { fontWeight400, fontWeight500 } from '../../../assets/Styles/FontWeights'
import DateTimePicker from '@react-native-community/datetimepicker';
// Firebase Imports
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import { set, ref, getDatabase } from 'firebase/database';
// Icons
import Icon from 'react-native-vector-icons/Ionicons';

export default function BookingDetailsRider({ navigation, route }) {
  // Firebase Hooks
  const db = getDatabase();
  const auth = getAuth()
  
  // Navigation Params
  const user = route.params?.user;
  const service = route.params?.service;

  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const mapRef = useRef()
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0, // Default latitude
    longitude: 0, // Default longitude
  });
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fare, setFare] = useState('');
  const [customerContact, setCustomerContact] = useState('');

  function cleanNullFromString(inputString) {
    // Use a regular expression to remove 'null' (case-insensitive)
    const cleanedString = inputString.replace(/null,/gi, '');

    return cleanedString;
  }
  const zoomToMarker = () => {
    mapRef.current.fitToCoordinates([{
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    }], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Adjust padding as needed
      animated: true, // Animated zoom
    });
  };
  const handleGetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // Extract latitude and longitude from the location object
    const { latitude, longitude } = location.coords;
    setCurrentLocation({
      latitude: latitude,
      longitude: longitude
    })
    // Use reverse geocoding to get city name
    const geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    let address = geocode[0];
    let address2 = `${address?.street}, ${address.streetNumber},${address.district},  ${address.city}, ${address.country}`
    console.log(address2)
    setFrom(cleanNullFromString(address2))
    zoomToMarker()
  }
  const handleRequestService = () => {

    if (from.length > 0 && to.length > 0 && date !== null && fare.length > 0 && customerContact.length === 11) {
      if (parseInt(fare) > service?.minimum_fare) {
        set(ref(db, 'ServiceRequests/' + uuidv4()), {
          user_id: auth.currentUser.uid,
          service_provider_id: user.user_id,
          date: date?.toLocaleDateString(),
          time: date?.toLocaleTimeString(),
          from: from,
          to: to,
          customerContact: customerContact,
          status: 'Pending',
          service_type: service.service_type,
          fare : fare    
        }).then(() => {
          console.log('Success Requesting Service');
          setIsBooked(true)
          setTimeout(() => {
            navigation.navigate('AllBookingsCustomer')
          }, 2000);
        })
      } else {
        setError(`Fare should be greater than ${service?.minimum_fare}!`)
      }

    } else {
      setError("Please fill all details correctly!")
    }
  }
  // For date & time
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'Rider Booking Details'} navigation={navigation} />
        <ScrollView style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            style={{ height: 200 }}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            z
          >
            <Marker

              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="From Location"
            />
            {/* <Marker
              coordinate={{
                latitude: parseFloat(from.split(',')[0]),
                longitude: parseFloat(from.split(',')[1]),
              }}            
              title="from"
            /> */}
          </MapView>

          <View style={{ padding: 16 }}>
            {/* <Text>Current Location:</Text>
            <TextInput
              value={`${currentLocation.latitude}, ${currentLocation.longitude}`}
              placeholder="Enter Current Location"
              onChangeText={(text) => setCurrentLocation(text)}
            /> */}
            <Pressable onPress={handleGetCurrentLocation} className='my-5 py-3 rounded bg-[#e8b05c] active:scale-95' >
              <Text className='text-white text-center' style={fontWeight400}>Use Current Location</Text>
            </Pressable>
            <KeyboardAvoidingView>
              <Text style={fontWeight400}>From:</Text>
              <TextInput
                style={fontWeight400}
                className="
                 form-control
                 block
                 py-1.5
                 px-2
                 text-base
                 font-normal
                 text-gray-700
                 bg-white bg-clip-padding
                 border border-solid border-gray-300
                 rounded 
                 w-full
                 mb-1"
                value={from}
                placeholder="Enter from"
                onChangeText={(text) => setFrom(text)}
              />
              {/* Booking Date */}
              <Text style={fontWeight400} className="text-gray-800 ">Select Booking Date: </Text>
              <View className='flex flex-row justify-between items-center gap-x-2 mb-3'>
                <View
                  className="
                          form-control
                          block
                          py-2
                          px-2
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded 
                          flex-1 
                                                   "
                >
                  <Text style={fontWeight400}>{date.toLocaleDateString()}</Text>
                </View>
                <Pressable style={shadow} className='py-2 px-2 rounded bg-[#e8b05c] active:scale-95' onPress={showDatepicker}>
                  <Icon name="calendar-outline" size={20} color="#ffffff" />
                </Pressable>
              </View>
              {/* Booking Time */}
              <Text style={fontWeight400} className="text-gray-800 ">Select Booking Time: </Text>
              <View className='flex flex-row justify-between items-center gap-x-2 mb-3'>
                <View
                  className="
                          form-control
                          block
                          py-2
                          px-2
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded 
                          flex-1                        "
                >
                  <Text style={fontWeight400}>{date.toLocaleTimeString()}</Text>
                </View>
                <Pressable style={shadow} className='py-2 px-2 rounded bg-[#e8b05c] active:scale-95' onPress={showTimepicker}>
                  <Icon name="time-outline" size={20} color="#ffffff" />
                </Pressable>
              </View>
              <Text style={fontWeight400}>To:</Text>
              <TextInput
                style={fontWeight400}
                className="
                 form-control
                 block
                 py-1.5
                 px-2
                 text-base
                 font-normal
                 text-gray-700
                 bg-white bg-clip-padding
                 border border-solid border-gray-300
                 rounded 
                 w-full
                 mb-1"
                value={to}
                placeholder="Enter Destination"
                onChangeText={(text) => setTo(text)}
              />
              <Text style={fontWeight400}>Fare:</Text>
              <TextInput
                style={fontWeight400}
                className="
                 form-control
                 block
                 py-1.5
                 px-2
                 text-base
                 font-normal
                 text-gray-700
                 bg-white bg-clip-padding
                 border border-solid border-gray-300
                 rounded 
                 w-full
                 mb-1"
                value={fare}
                placeholder="Enter Fare"
                keyboardType="numeric"
                onChangeText={(text) => setFare(text)}
              />
              <Text style={fontWeight400}>Customer Contact:</Text>
              <TextInput
                style={fontWeight400}
                className="
                 form-control
                 block
                 py-1.5
                 px-2
                 text-base
                 font-normal
                 text-gray-700
                 bg-white bg-clip-padding
                 border border-solid border-gray-300
                 rounded 
                 w-full
                 mb-1"
                value={customerContact}
                placeholder="Enter Contact"
                keyboardType="phone-pad"
                onChangeText={(text) => setCustomerContact(text)}
              />
            </KeyboardAvoidingView>            
            <Text style={fontWeight500} className='text-xs text-red-500'>{error}</Text>
            {
              isBooked === true ?
                <Pressable className='my-5 py-3 rounded bg-white border-[#00b22d] border active:scale-95'>
                  <Text className='text-[#00b22d] text-center' style={fontWeight500}>Requested</Text>
                </Pressable>
                :
                <Pressable onPress={handleRequestService} className='my-5 py-3 rounded bg-[#e8b05c] active:scale-95'>
                  <Text className='text-white text-center' style={fontWeight400}>Request Service</Text>
                </Pressable>
            }

          </View>
        </ScrollView>
        <NavFooter navigation={navigation} />
      </View>
      {/* Footer */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </SafeAreaView>
  )
}


const { shadow } = StyleSheet.create({
  shadow: {
    elevation: 1
  }
})