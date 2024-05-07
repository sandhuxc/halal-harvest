import { View, ScrollView, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavFooter from '../../components/Seller/NavFooter'
import NavHeader from '../../components/Seller/NavHeader'
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from '@firebase/auth'
import SellerCard from '../../components/Seller/SellerCard'
// import { v4 as uuidv4 } from 'uuid'
export default function SellerAds({ navigation }) {
    // const db = getDatabase()
    const auth = getAuth()
    const user = auth.currentUser

    // user.uid to get uid of current user
    const [animals, setAnimals] = useState([])

    const fetchSellerListings = async () => {
        try {
            const db = getDatabase()
            const snapshot = await get(ref(db, '/Animals'));
            if (snapshot.exists()) {
                const data = snapshot.val()
                // Map data to array
                const dataArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }))
                console.log(dataArray)
                setAnimals(dataArray)


            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    useEffect(() => {
        fetchSellerListings()
    }, [])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);        
        fetchSellerListings()
        .then(()=>{
            setRefreshing(false);
        })
    }, []);
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'Seller Ads'} />
                <ScrollView className='flex-grow px-4'
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View className="mt-5">
                        {/* Seller Card */}
                        {
                            animals.filter(({ seller_id }) => {
                                return (user.uid === seller_id)
                            }).map(({ id, age, category, color, price, weight, type, animalImage }) => {
                                return (
                                    <SellerCard key={id} age={age} category={category} color={color} price={price} weight={weight} type={type} animalImage={animalImage} />
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <NavFooter navigation={navigation} />
            </View >
        </SafeAreaView >
    )
}



