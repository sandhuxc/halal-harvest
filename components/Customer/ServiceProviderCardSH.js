import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { fontWeight400, fontWeight500, fontWeight700, fontWeight800, fontWeight900 } from '../../assets/Styles/FontWeights'

const ServiceProviderCardSH = ({ navigation, serviceProvider, service, user }) => {
    return (
        <View className='bg-white rounded-md w-[99%] p-2 flex flex-col mb-2.5'>
            <Image
                source={require('../../assets/slaughterhouse1.jpg')}
                className='rounded-full mx-auto mb-3 h-32 w-32'
            />

            <Text className='text-center text-xl text-[#e8b05c]' style={fontWeight800} >{service?.slaughterHouseName}
            </Text>
            <Text className='text-gray-700 text-center text-lg' style={fontWeight800}> Slaughter House</Text>

            {/* Location */}
            <View className='flex flex-row justify-between text-sm my-2'>
                <Text style={fontWeight400}>Location: </Text>
                <Text style={fontWeight500} >{service?.location}</Text>
            </View>
            <View className='flex flex-row justify-between text-sm my-2'>
                <Text style={fontWeight400}>Rating: </Text>
                <Text style={fontWeight500} >{service?.rating === 0 ? 'Not Available' : service?.rating}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate(serviceProvider === 'Rider' ? 'BookingDetailsRider' : serviceProvider === 'Butcher' ? 'BookingDetailsButcher' : 'BookingDetailsSlaughterHouse', {
                service,
                user
            })} className='my-5 py-3 rounded bg-[#e8b05c] active:scale-95'>
                <Text className='text-white text-center' style={fontWeight400}>Request Service</Text>
            </Pressable>
        </View>
    )
}

export default ServiceProviderCardSH