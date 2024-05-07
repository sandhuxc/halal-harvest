import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { fontWeight400, fontWeight500, fontWeight600, fontWeight800 } from '../../assets/Styles/FontWeights'

const SellerStoreCard = ({ name, city, sellerId, navigation }) => {
    let getInitials = name.split(' ');
    getInitials = getInitials[0][0] + getInitials[1][0]
    return (
        <View style={shadow} className="bg-white shadow-lg rounded-lg overflow-hidden w-full mb-3">
            {/* <Image
                source={require('../../assets/SellerViewCard.jpg')}
                className='w-full h-40'
            /> */}
            <View style={shadow} className='w-20 h-20 mx-auto mt-4 rounded-full bg-[#e8b05c]' >
                <Text className='text-xl text-white text-center my-auto' style={fontWeight800}>{getInitials}</Text>
            </View>
            <View className="px-4 py-4">
                <Text className='text-center text-xl text-[#e8b05c]' style={fontWeight800} >{name}</Text>
                <Text className='text-gray-700 text-center text-lg' style={fontWeight800}>{city}</Text>
                <View className='flex flex-row items-center justify-center'>
                    <Text className='text-gray-600 text-center text-lg' style={fontWeight800}>4.6</Text>
                    <Icon name="star" size={20} color="#e8b05c" className='h-6 w-6' />
                </View>
            </View>

            <View className="px-4 py-4 flex justify-between items-center">
                <Pressable onPress={() => navigation.navigate('SellerListingDetails', { sellerId, name })} className="px-4 py-2 bg-[#e8b05c] text-white rounded-full hover:bg-[#e8b05c] focus:outline-none focus:ring focus:ring-[#e8b05c] active:scale-95">
                    <Text className='text-[#FFFFFF]' style={fontWeight500}>
                        View Listings
                    </Text>
                </Pressable>
            </View>
        </View>

    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 3
    }
})
export default SellerStoreCard