import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavFooter from '../../../components/Seller/NavFooter'
import { fontWeight400, fontWeight500 } from '../../../assets/Styles/FontWeights'
import NavHeader from '../../../components/Seller/NavHeader'

import { ref, get, getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth'


export default function TotalSales({ navigation }) {

    const auth = getAuth()
    const db = getDatabase()
    const userId = auth.currentUser.uid

    const [dateToday, setDateToday] = useState('')
    const [allOrders, setAllOrders] = useState([])
    // Store Name

    const fetchAllOrders = async () => {
        try {
            const snapshotOrders = await get(ref(db, '/Orders'));

            if (snapshotOrders.exists()) {
                const data = snapshotOrders.val();

                const ordersArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));

                const ordersFiltered = ordersArray.filter(({ seller_id }) => {
                    return seller_id === userId;
                });

                setAllOrders(ordersFiltered);
                console.clear();
                console.log('Seller Orders', ordersFiltered);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []); // Run once on mount, no dependency

    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}

                <ScrollView className='flex-grow px-4'>
                    <>
                        <NavHeader title={'Seller Dashboard'} />
                        <View className='mt-5'>
                            <Text className='text-[10px] inter text-[#2b2b2b]' style={fontWeight400}>{dateToday}</Text>
                            {/* <Text className='text-2xl inter text-[#e8b05c]' style={fontWeight600}>Greetings, Talha</Text> */}
                        </View>

                        <View className='mt-10'>
                            <View className='flex flex-row justify-between items-center mb-5'>
                                <Text style={fontWeight500} className='text-base'>Sales</Text>
                                <Text className='text-[10px] inter text-[#2b2b2b]' style={fontWeight400}>SALES (Rs)</Text>
                            </View>

                        </View>
                    </>
                    {
                        allOrders.map((order) => (
                            <>
                                <Pressable style={shadow} className='w-full bg-white rounded-md p-2 mb-3 flex flex-col gap-y-1 active:scale-95'>
                                    <Text style={fontWeight500} className='text-xs'>Booking Id: #{order?.order_id}</Text>
                                    {/* Row */}                                    
                                    {/* Row */}
                                    <View className='flex flex-row justify-between items-center'>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight400} className='text-xs '>Destination:</Text>
                                        </View>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight500} className='text-sm  text-right'>{order?.address}</Text>
                                        </View>
                                    </View>
                                    {/* Row */}
                                    <View className='flex flex-row justify-between items-center'>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight400} className='text-xs '>Customer Name:</Text>
                                        </View>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight500} className='text-sm  text-right'>Talha Noman</Text>
                                        </View>
                                    </View>
                                    {/* Row */}
                                    <View className='flex flex-row justify-between items-center'>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight400} className='text-xs '>Date:</Text>
                                        </View>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight500} className='text-sm  text-right'>Wed 22, May</Text>
                                        </View>
                                    </View>
                                    {/* Row */}
                                    <View className='flex flex-row justify-between items-center'>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight400} className='text-xs '>Charges:</Text>
                                        </View>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight500} className='text-sm  text-right'>Rs. {order?.total}</Text>
                                        </View>
                                    </View>
                                    {/* Row */}
                                    <View className='flex flex-row justify-between items-center'>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight400} className='text-xs '>Status:</Text>
                                        </View>
                                        <View className='w-[49%]'>
                                            <Text style={fontWeight500} className='text-sm  text-right'>{order?.status}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </>
                        ))
                    }

                </ScrollView>

                <NavFooter navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})
