import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { fontWeight400, fontWeight500, fontWeight800 } from '../../assets/Styles/FontWeights'

const ServiceProviderCard = ({ navigation, serviceProvider, service, user }) => {

    const fullname = user?.fullname.split(' ');
    const firstname = fullname[0];
    const lastName = fullname[1];
    return (
        <View className='bg-white rounded-md w-[99%] p-2 flex flex-col mb-2.5'>
            {
                serviceProvider === 'Butcher' ?
                    <Image
                        source={require('../../assets/butcher-service-request-2.jpg')}
                        className=' rounded-full mx-auto mb-3 aspect-auto h-24 w-20'
                    />
                    :
                    <Image
                        source={require('../../assets/meat-delivery.webp')}
                        className='w-24 h-24 rounded-full mx-auto mb-3'
                    />
            }


            <Text className='text-center text-xl text-[#e8b05c]' style={fontWeight800} >{firstname}
                <Text className='text-center text-xl text-gray-500' style={fontWeight800} > {lastName} </Text>
            </Text>


            {
                service?.service_type === 'Butcher' &&
                <>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Rate Goat: </Text>
                        <Text style={fontWeight500} >{service?.rate_goat}Pkr</Text>
                    </View>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Rate Cow: </Text>
                        <Text style={fontWeight500} >{service?.rate_cow}Pkr</Text>
                    </View>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Rate Camel: </Text>
                        <Text style={fontWeight500} >{service?.rate_camel}Pkr</Text>
                    </View>
                </>
            }

            {
                service?.service_type === 'Rider' &&
                <>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Contact: </Text>
                        <Text style={fontWeight500} >{service?.contact}</Text>
                    </View>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Min. Fare: </Text>
                        <Text style={fontWeight500} >{service?.minimum_fare}Pkr</Text>
                    </View>
                </>
            }
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

export default ServiceProviderCard