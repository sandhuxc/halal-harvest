import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavFooter from '../../components/Customer/NavFooter'
import NavHeader from '../../components/Seller/NavHeader'
import { getAuth, signOut } from 'firebase/auth'
import { fontWeight300, fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'
export default function CustomerSettings({ navigation }) {
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
                <NavHeader title={'Customer Account'} />
                <ScrollView className='flex-grow p-4'>
                    <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
                    <View className='p-2 rounded-md bg-white my-2 flex flex-col' style={shadow}>
                        <Image
                            source={require('../../assets/sample-avatar.png')}
                            className='w-16 h-16 rounded-full mx-auto'
                        />
                        <Text className='text-base text-center' style={fontWeight500}>{auth.currentUser.displayName}</Text>
                        <Text className='text-sm text-center' style={fontWeight300}>{auth.currentUser.email}</Text>
                        <Text className='text-base text-center' style={fontWeight300}>{'Customer'}</Text>
                        <View className='bg-gray-200 h-[1px] w-full my-3' />
                        <View className='flex flex-col gap-y-2'>
                            {/* Row */}
                            <View className='flex flex-row justify-between items-center'>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm '>Total Spent:</Text>
                                </View>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm  text-right'>Rs. 8000</Text>
                                </View>
                            </View>
                            {/* Row */}
                            <View className='flex flex-row justify-between items-center'>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm '>Bookings Requested:</Text>
                                </View>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm  text-right'>13</Text>
                                </View>
                            </View>                         
                            {/* Row */}
                            <View className='flex flex-row justify-between items-center'>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm '>Served:</Text>
                                </View>
                                <View className='w-[49%]'>
                                    <Text style={fontWeight400} className='text-sm  text-right'>5</Text>
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