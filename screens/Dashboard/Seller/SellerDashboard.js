import { View, Text, ScrollView, StyleSheet, BackHandler, Alert, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import NavFooter from '../../../components/Seller/NavFooter'
import { fontWeight400, fontWeight500, fontWeight600, fontWeight700 } from '../../../assets/Styles/FontWeights'
import NavHeader from '../../../components/Seller/NavHeader'

import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from "react-native";

// Firebase Imports
import { getDatabase, ref, onValue, get, set, update } from "firebase/database";
import { getAuth } from 'firebase/auth'
// Expo Location
import * as Location from 'expo-location';


export default function SellerDashboard({ navigation }) {


  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(null)
  const backActionHandler = () => {
    Alert.alert("Alert!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "YES", onPress: () => BackHandler.exitApp()
      }
    ]);
    return true;
  };


  const db = getDatabase();
  const auth = getAuth()

  const userId = auth.currentUser.uid
  const [userDetails, setUserDetails] = useState({})
  const [dateToday, setDateToday] = useState('')
  const [animals, setAnimals] = useState([])
  const [totalListings, setTotalListings] = useState(0)
  const [sharedListings, setSharedListings] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  const [allOrders, setAllOrders] = useState([]);

  const fetchSellerListings = async () => {
    try {
      const db = getDatabase()
      fetchAllOrders()
      const snapshotOrders = await get(ref(db, '/Orders'))
      if (snapshotOrders.exists()) {
        const data = snapshotOrders.val();

        const ordersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }))

        const ordersFiltered = ordersArray.filter(({ seller_id }) => {
          return seller_id === userId;
        })
        console.clear()
        console.log('Orders Filtered', ordersArray)
        console.log('User id', userDetails.user_id)
        setAllOrders(ordersFiltered);
        let ordersArrayLength = ordersFiltered?.length;
        setTotalSales(ordersArrayLength)
      }




      const snapshot = await get(ref(db, '/Animals'));
      if (snapshot.exists()) {
        const data = snapshot.val()
        // Map data to array
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }))
        console.log('Seller ID Animals', userId)
        const filteredArray = dataArray.filter(({ seller_id }) => {
          return seller_id === userId
        })
        // console.log(dataArray)
        setAnimals(filteredArray)
        console.log(filteredArray.length)
        console.log(filteredArray.length)
        setTotalListings(filteredArray.length)
        console.log(filteredArray.length)
        setTotalListings(filteredArray.length)

        const sharedListings = filteredArray.filter(({ category }) => {
          return category === 'Shared'
        })
        setSharedListings(sharedListings.length)

      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };


  const fetchAllOrders = async () => {
    const snapshotOrders = await get(ref(db, '/Orders'))
    if (snapshotOrders.exists()) {
      const data = snapshotOrders.val();

      const ordersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      }))

      const ordersFiltered = ordersArray.filter(({ seller_id }) => {
        return seller_id === userId;
      })
      console.clear()
      console.log('Orders Filtered', ordersArray)
      console.log('User id', userDetails.user_id)
      let ordersArrayLength = ordersFiltered?.length;
      setTotalSales(ordersArrayLength)
    }
  }

  // Seller Details
  const [storeName, setStoreName] = useState('')
  const [cityName, setCityName] = useState('')
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [detailsFound, setDetailsFound] = useState(false)
  const [cnic, setCnic] = useState('')
  const handleLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // Extract latitude and longitude from the location object
    const { latitude, longitude } = location.coords;
    // Use reverse geocoding to get city name
    const geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    // Extract city name from the geocode result
    if (geocode.length > 0) {
      const city = geocode[0].city;
      setCityName(city);
      console.log(`City Name: ${city}`);
    }
    setLocation(location);
    console.clear()
    console.log('Location', location)
  }

  const getUserData = async () => {

    return onValue(ref(db, '/Users/' + userId), (snapshot) => {
      const user = snapshot.val() || 'Anonymous'
      console.log('User', user)
      let temp = user;
      let lastname = user.fullname.split(' ')
      temp.fullname = lastname[0];
      setUserDetails(temp)
      if (!userDetails.details_found) {
        handleLocation()
      }
    }, {
      onlyOnce: true
    })
  }
  function formatTodayDate() {
    const options = { weekday: 'short', day: 'numeric', month: 'long' };
    const today = new Date();
    return today.toLocaleString('en-US', options).toUpperCase();
  }
  useEffect(() => {
    if (!userId) {
      navigation.navigate('Welcome')
    }
    setDateToday(formatTodayDate())
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);
    getUserData()
    fetchSellerListings()

    //clear remove 
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler)
    }
  }, [detailsFound])

  const handleSaveSellerInfo = () => {
    if (cnic.length === 13 && cityName !== '' && storeName !== '') {
      set(ref(db, 'Sellers/' + userDetails.user_id), {
        city: cityName,
        cnic: cnic,
        country: "",
        name: storeName,
        phone: "",
        userId: userDetails.user_id

      }).then(() => {
        setSuccess('Store Added Successfully');
        update(ref(db, 'Users/' + userDetails.user_id), {
          details_found: true
        }).then(() => {
          setDetailsFound(true)
        })
        setTimeout(() => {
          setSuccess('')
        }, 1000);

        setLoading(false)
        console.log('Store Added Successfully with Id: ', userDetails.user_id)
        // Fields Empty After Adding Animal

      })
        .catch((err) => {
          console.log('Something Went Wrong While Posting Seller!', err);
        })
    } else {
      Alert.alert('Invalid Input', 'Please input correct details!', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);

    }

  }

  // Store Name
  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        {
          userDetails.details_found ?
            <ScrollView className='flex-grow px-4'>
              <>
                <NavHeader title={'Seller Dashboard'} />
                <View className='mt-5'>
                  <Text className='text-[10px] inter text-[#2b2b2b]' style={fontWeight400}>{dateToday}</Text>
                  <Text className='text-2xl inter text-[#e8b05c]' style={fontWeight600}>Greetings, {userDetails.fullname}</Text>
                </View>

                <View className='mt-10'>
                  <View className='flex flex-row justify-between items-center mb-5'>
                    <Text style={fontWeight500} className='text-base'>Analytics</Text>
                    <Text className='text-[10px] inter text-[#2b2b2b]' style={fontWeight400}>SALES (Rs)</Text>
                  </View>
                  {/* Line Chart */}
                  <View style={shadow} className='py-2 px-1 rounded-md bg-white'>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                      bezierrr
                      withInnerLines={false}
                      withVerticalLines={false}
                      withHorizontalLines={false}
                    />
                  </View>
                  {/* Cards */}
                  <View className='flex flex-col'>
                    <View className='mt-5 flex flex-row justify-between'>
                      <View style={shadow} className='w-[48%] rounded-md bg-white p-5'>
                        <Text style={fontWeight500} className='text-sm mb-1'>Total Listings</Text>
                        <Text style={fontWeight700} className='text-2xl text-[#e8b05c]'>{totalListings}</Text>
                      </View>
                      <View style={shadow} className='w-[48%] rounded-md bg-white p-5'>
                        <Text style={fontWeight500} className='text-sm mb-1'>Shared Qurbani</Text>
                        <Text style={fontWeight700} className='text-2xl text-[#e8b05c]'>{sharedListings}</Text>
                      </View>
                    </View>
                    <Pressable onPress={() => { navigation.navigate('TotalSales') }} className='mt-5 flex flex-row justify-between active:scale-95'>
                      <View style={shadow} className='w-full rounded-md bg-white p-5'>
                        <Text style={fontWeight500} className='text-sm mb-1'>Total Sales</Text>
                        <Text style={fontWeight700} className='text-2xl text-[#e8b05c]'>{totalSales}</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </>
            </ScrollView>
            :
            <View className='flex-1 bg-[#e8b05c] p-4'>
              <Text style={fontWeight700} className='text-2xl text-[#FFFFFF] mb-5' >Please Complete Seller Details.</Text>
              <View className='mx-5'>

                {/* Phone Input */}
                <Text style={fontWeight600} className="text-[#FFFFFF] text-lg">Store Name</Text>
                <TextInput
                  style={fontWeight500}
                  keyboardType='default'
                  value={storeName}
                  onChangeText={setStoreName}

                  className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border-none
                            rounded
                            w-full
                            mb-5"
                />
                {/* CNIC */}
                <Text style={fontWeight600} className="text-[#FFFFFF] text-lg">CNIC</Text>
                <TextInput
                  style={fontWeight500}
                  keyboardType='numeric'
                  value={cnic}
                  onChangeText={setCnic}

                  className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border-none
                            rounded
                            w-full
                            mb-5"
                />
                {/* City */}
                <Text style={fontWeight600} className="text-[#FFFFFF] text-lg">City</Text>
                <TextInput
                  style={fontWeight500}
                  keyboardType='default'
                  value={cityName}
                  onChangeText={setCityName}

                  className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border-none
                            rounded
                            w-full
                            mb-5"
                />

                {/* onPress event */}
                <Pressable style={shadow} className='my-5 py-3 rounded text-[#e8b05c] bg-[#FFFFFF] w-1/3 ml-auto active:scale-95' onPress={handleSaveSellerInfo}>
                  <Text className='text-[#e8b05c] text-center' style={fontWeight400}>{
                    'Save'
                  }</Text>
                </Pressable>
              </View>

            </View>
        }
        {/* Footer */}
        {
          userDetails.details_found &&
          <NavFooter navigation={navigation} />
        }
      </View>
    </SafeAreaView>
  )
}

const { shadow } = StyleSheet.create({
  shadow: {
    elevation: 1
  }
})

//table chart.
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [25000, 26000, 32000, 33000, 28000, 36000],
      color: (opacity = 1) => `rgba(232, 176, 92, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ]
};
const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(43, 43, 43, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional  
};
const screenWidth = Dimensions.get("window").width;