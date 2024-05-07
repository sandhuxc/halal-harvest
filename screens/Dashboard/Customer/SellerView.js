import { View, ScrollView, Pressable, Text, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import { fontWeight600 } from '../../../assets/Styles/FontWeights'
import NavFooter from '../../../components/Customer/NavFooter'
import { getDatabase, get, ref } from 'firebase/database'

import SellerStoreCard from '../../../components/Customer/SellerStoreCard';




export default function CustomerDashboard({ navigation }) {
    const [sellerStores, setSellerStores] = useState([])

    const fetchSellerStores = async () => {
        const db = getDatabase()
        const snapshot = await get(ref(db, '/Sellers'));
        if (snapshot.exists()) {
            const data = snapshot.val()
            // Map data to array
            const dataArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key]
            }))
            return dataArray;
        } else {
            return new Error('Failed!');
        }

    };

    useEffect(() => {
        fetchSellerStores()
            .then((data) => {
                console.log(data)
                setSellerStores(data)
            }).catch((err) => console.log(err))
    }, [])
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'Customer Dashboard'} navigation={navigation} />
                <ScrollView className='flex-grow px-4'>
                    <View className={`flex flex-row items-center border border-gray-300 rounded-md px-4 bg-white my-5`}>
                        <Icon name="search" size={20} color="#aaa" className={`mr-4`} />
                        <TextInput
                            className={`flex-1 h-10 text-black `}
                            placeholder="Search..."
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    {/* Cards Section */}
                    <View className="flex flex-row justify-between flex-wrap mt-4">                        
                        {
                            sellerStores?.map(({ city, cnic, country, name, userId }) => {
                                return (
                                    <SellerStoreCard key={userId} sellerId={userId} name={name} city={city} navigation={navigation} />                                
                                )
                            })
                        }
                    </View>

                </ScrollView>
                <NavFooter navigation={navigation} />
            </View>
            {/* Footer */}
        </SafeAreaView>
    )
}