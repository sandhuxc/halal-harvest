import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavFooter from '../../components/Seller/NavFooter'
import NavHeader from '../../components/Seller/NavHeader'
import { getAuth, signOut } from 'firebase/auth'
import { fontWeight300, fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'
export default function SellerSettings({ navigation }) {
    const [error, setError] = useState('')
    const auth = getAuth()
    const handleSignout = () => {
        signOut(auth).then(() => {
            navigation.navigate("Login")
        }).catch((error) => {
            // An error happened.            
            setError(error)
        });
    }
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'Account'} />
                <ScrollView className='flex-grow p-4'>
                    <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
                    <View className='p-2 rounded-md bg-white my-2 flex flex-col' style={shadow}>
                        <Image
                            source={require('../../assets/sample-avatar.png')}
                            className='w-16 h-16 rounded-full mx-auto'
                        />
                        <Text className='text-base text-center' style={fontWeight500}>{auth.currentUser.displayName}</Text>
                        <Text className='text-sm text-center' style={fontWeight300}>{auth.currentUser.email}</Text>
                        <Text className='text-base text-center' style={fontWeight300}>{'Seller'}</Text>
                        <View className='bg-gray-200 h-[1px] w-full my-3' />
                        <View className='flex flex-col gap-y-2'>
                            {/* Row */}
                            <View className='flex flex-row justify-between items-center'>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm '>Total Earnings:</Text>
                                </View>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm  text-right'>Rs. 8000</Text>
                                </View>
                            </View>
                            {/* Row */}
                            <View className='flex flex-row justify-between items-center'>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm '>Bookings Fulfilled:</Text>
                                </View>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm  text-right'>23</Text>
                                </View>
                            </View>
                            {/* Row */}
                            <View className='flex flex-row justify-between items-center'>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm '>Bookings Rejected:</Text>
                                </View>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm  text-right text-red-500'>3</Text>
                                </View>
                            </View>
                            {/* Row */}
                            <View className='flex flex-row justify-between items-center'>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm '>Rating:</Text>
                                </View>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm  text-right'>4.1</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <Pressable onPress={handleSignout} style={shadow} className='bg-red-500 px-4 py-2 rounded-md mt-auto flex flex-row items-center mb-4 active:scale-95'>
                        <Text style={fontWeight500} className="text-white text-center text-base">Logout</Text>
                    </Pressable>
                </ScrollView>
                <NavFooter navigation={navigation} />
            </View >
        </SafeAreaView >
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})