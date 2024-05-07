import { View, ScrollView, Pressable, TextInput, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'

import NavFooter from '../../../components/Customer/NavFooter'
import { fontWeight400, fontWeight500, fontWeight600 } from '../../../assets/Styles/FontWeights';
import BookingCard from '../../../components/Customer/BookingCard';
// Firebase Imports
import { getDatabase, get, ref, query, equalTo, orderByChild } from 'firebase/database'
import { getAuth } from 'firebase/auth';

export default function AllBookingsCustomer({ navigation }) {
  const db = getDatabase();
  const auth = getAuth();
  const [bookings, setBookings] = useState([]);
  const fetchAllBookings = async () => {
    try {
      // Fetch service requests
      const bookingsSnapshot = await get(query(ref(db, 'ServiceRequests'), orderByChild('user_id'), equalTo(auth.currentUser.uid)));
      const bookingsData = bookingsSnapshot.val();

      if (!bookingsSnapshot.exists()) {
        // Return an empty array or handle the case where there are no bookings
        console.log('No Bookings');
        return [];
      }

      // Fetch users
      const usersSnapshot = await get(ref(db, 'Users'));
      const usersData = usersSnapshot.val();

      // Map data to an array with the join
      const bookingsArray = Object.keys(bookingsData).map((key) => {
        const booking = bookingsData[key];
        const user = usersData[booking.service_provider_id]; // Assuming service_provider_id is the user_id in the Users collection

        return {
          id: key,
          ...booking,
          user,
        };
      });

      console.clear();
      console.log('Bookings', bookingsArray);
      return bookingsArray;
    } catch (error) {
      // Handle any errors here
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchAllBookings().then((allBookings) => setBookings(allBookings))
  }, [])

  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'All Bookings'} navigation={navigation} />
        <ScrollView className='flex-grow px-4'>
          <View className={`flex flex-row items-center border border-gray-300 rounded-md px-4 bg-white my-5`}>
            <Icon name="search" size={20} color="#aaa" className={`mr-4`} />
            <TextInput
              className={`flex-1 h-10 text-black `}
              placeholder="Search..."
              placeholderTextColor="#aaa"
            />
          </View>

          {
            bookings?.map((booking) => {
              return (
                <BookingCard booking={booking} status={'Approved'} />
              )
            })

          }
          {/* <BookingCard status={'Approved'} />
          <BookingCard status={'Pending'} />
          <BookingCard status={'Served'} /> */}

        </ScrollView>
        <NavFooter navigation={navigation} />
      </View>
      {/* Footer */}
    </SafeAreaView>
  )
}