import { Text, Image, View, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Importing Font Weights
import { fontWeight800, fontWeight600, fontWeight500 } from '../../assets/Styles/FontWeights';


const SignupOptions = ({ navigation }) => {
    return (

        <SafeAreaView className=' bg-white h-full'>
            <View className='flex flex-col justify-center items-center h-4/6'>
                <Text style={fontWeight800} className='text-[#e8b05c] text-3xl text-center'>Account Type</Text>
                {/* <Text style={fontWeight500} className='text-[#2b2b2b] text-base text-center'>Account Type</Text> */}
                <Image
                    source={require('../../assets/I3.png')}
                    className='w-11/12 h-3/6 mt-10'
                />
            </View>
            <View className='h-2/6 w-full flex flex-col items-center p-5 gap-y-3'>
                {/* Pressable */}
                <Pressable onPress={() => navigation.navigate('CustomerSignup')} className='w-full border-2 border-[#e8b05c] text-center rounded-lg active:scale-95'>
                    <Text style={fontWeight600} className='text-center text-[#e8b05c] py-4'>
                        Customer
                    </Text>
                </Pressable>
                {/* Pressable */}
                <Pressable onPress={() => navigation.navigate('ServiceProviderSignup')} className='w-full border-2 border-[#e8b05c] text-center rounded-lg active:scale-95'>
                    <Text style={fontWeight600} className='text-center text-[#e8b05c] py-4'>
                        Service Provider
                    </Text>
                </Pressable>


                {/* Pressable */}
                <Pressable onPress={() => navigation.navigate('SellerSignup')} className='w-full border-2 border-[#e8b05c] text-center rounded-lg active:scale-95'>
                    <Text style={fontWeight600} className='text-center text-[#e8b05c] py-4'>
                        Seller
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default SignupOptions
