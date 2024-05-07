import { View, ScrollView, Pressable, Text, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import { getDatabase, get, ref, query, equalTo, orderByKey, orderByChild } from 'firebase/database'
import AnimalListingCard from '../../../components/Customer/AnimalListingCard';
import { fontWeight600 } from '../../../assets/Styles/FontWeights';



export default function SellerListingDetails({ navigation, route }) {
    
    const sellerId = route.params?.sellerId;
    const name = route.params?.name;
    const [animalData, setAnimalData] = useState([]);
    
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const fetchAnimalListings = async (sellerId) => {
        const db = getDatabase();
        // Create a query to fetch animals with a specific seller_id
        const animalQuery = query(ref(db, 'Animals'), orderByChild('seller_id'), equalTo(sellerId)); // Use 'seller_id' or the correct property name        
        try {
            const snapshot = await get(animalQuery);
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Map data to an array
                const animalArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                return animalArray;
            } else {
                // Return an empty array or handle the case where there are no animals
                return [];
            }
        } catch (error) {
            // Handle any errors here
            console.error(error);
            return [];
        }
    };

    const fetchSellerOrders = async (sellerId) => {
        const db = getDatabase();
        // Create a query to fetch animals with a specific seller_id
        const orderQuery = query(ref(db, 'Orders'), orderByChild('seller_id'), equalTo(sellerId)); // Use 'seller_id' or the correct property name        
        try {
            const snapshot = await get(orderQuery);
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Map data to an array
                const orderArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                return orderArray;
            } else {
                // Return an empty array or handle the case where there are no animals
                return [];
            }
        } catch (error) {
            // Handle any errors here
            console.error(error);
            return [];
        }
    };

    useEffect(() => {
        fetchAnimalListings(sellerId).then((data) => {
            setAnimalData(data)
        }).catch((err) => console.error(err))



        fetchSellerOrders(sellerId).then((data) => {
            let tempAnimals = [];            
            data.map((order) => {
                let parsedAnimals = JSON.parse(order?.animal_id)
                parsedAnimals.map((animalId) => { tempAnimals.push(animalId) })
            })         
            setFilteredAnimals(tempAnimals);
        }).catch((err) => console.log(err))
    }, []);

    const handleFilter = ({id}) => {        
        const idExists = filteredAnimals.some(animalId => animalId === id);                
        return !idExists;        
    }
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={name} navigation={navigation} />
                <ScrollView className='flex-grow px-4'>
                    <View className={`flex flex-row items-center border border-gray-300 rounded-md px-4 bg-white my-5`}>
                        <Icon name="search" size={20} color="#aaa" className={`mr-4`} />
                        <TextInput
                            className={`flex-1 h-10 text-black `}
                            placeholder="Search..."
                            placeholderTextColor="#aaa"
                        />
                    </View>
                    <View className="flex flex-row justify-between flex-wrap mt-4">
                        {
                            animalData?.filter(handleFilter).map(({ id, price, age, color, type, category, weight, seller_id }) => {                              
                                return (
                                    <AnimalListingCard key={id} id={id} price={price} age={age} color={color} type={type} category={category} weight={weight} seller_id={sellerId} navigation={navigation} />
                                )
                            })
                        }
                    </View>
                    {
                        animalData.length === 0 &&
                        <View className='justify-center'>
                            <Text style={fontWeight600} className='text-center text-xl'>No Listing by this particular seller :(</Text>
                        </View>
                    }

                </ScrollView>
                <NavFooter navigation={navigation} />
            </View>
            {/* Footer */}
        </SafeAreaView>
    )
}