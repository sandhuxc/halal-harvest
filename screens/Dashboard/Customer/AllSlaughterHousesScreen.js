import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import ServiceProviderCard from '../../../components/Customer/ServiceProviderCard'
// Firebase Imports
import { getDatabase, get, ref } from 'firebase/database'
import ServiceProviderCardSH from '../../../components/Customer/ServiceProviderCardSH'

export default function AllSlaughterHousesScreen({ navigation }) {
    const [sHouseListings, setSHouseListings] = useState([]);
    const db = getDatabase()
    const fetchSellerListings = async () => {
        try {
            const snapshot = await get(ref(db, '/OfferedServices'));
            if (snapshot.exists()) {
                const data = snapshot.val();

                // Map data to array
                const dataArray = await Promise.all(
                    Object.keys(data).map(async (key) => {
                        const service = data[key];
                        const userId = service.service_provider_id;

                        // Fetch user data for the service
                        const userSnapshot = await get(ref(db, `/Users/${userId}`));

                        if (userSnapshot.exists()) {
                            const userData = userSnapshot.val();
                            return {
                                id: key,
                                service,
                                user: userData
                            };
                        } else {
                            // Handle the case where the user data doesn't exist
                            console.error(`User data not found for service with ID ${key}`);
                            return null;
                        }
                    })
                );

                // Filter out null entries (cases where user data was not found)
                const filteredDataArray = dataArray.filter((entry) => entry !== null);

                setSHouseListings(filteredDataArray);
                console.clear();
                console.log('Data Array', filteredDataArray);
            } else {
                console.log("No Data");
                setSHouseListings(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchSellerListings();
    }, [])

    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'Slaughter Houses'} navigation={navigation} />
                <ScrollView className='flex-grow p-4'>
                    <View className='flex flex-row justify-between flex-wrap'>
                        {
                            sHouseListings.filter(({ service, user }) => {
                                if (service?.service_type === 'SlaughterHouse') {
                                    return true;
                                }
                            }).map(({ id, service, user }) => {
                                return (
                                    <ServiceProviderCardSH key={id} service={service} user={user} navigation={navigation} serviceProvider={'SlaughterHouse'} />
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