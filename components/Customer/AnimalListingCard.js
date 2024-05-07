import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { fontWeight500, fontWeight600 } from '../../assets/Styles/FontWeights'
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../../Context/CartContext';


const AnimalListingCard = ({ id, price, age, color, type, category, weight, seller_id , navigation }) => {
    const { addToCart } = useCart()
    return (
        <Pressable style={shadow} className='w-[48%] bg-white my-2 rounded-t-2xl p-1 active:scale-95'>
            {
                type === 'Goat' ?
                    <Image
                        source={require('../../assets/white-goat.jpeg')}
                        className='w-full rounded-t-2xl bg-contain h-52 p-2'
                    />
                    :
                    type === 'Camel' ?
                        <Image
                            source={require('../../assets/camel.jpg')}
                            className='w-full rounded-t-2xl bg-contain h-52 p-2'
                        />
                        :
                        <Image
                            source={require('../../assets/cow.jpg')}
                            className='w-full rounded-t-2xl bg-contain h-52 p-2'
                        />
            }
            <View className='px-2.5 py-2'>
                <Text style={fontWeight600} className='text-sm mb-2'>Rs. {price}</Text>

                <View className='flex flex-row items-center justify-between'>
                    <Icon name="barbell-outline" size={20} color="#e8b05c" />
                    <Text style={fontWeight500} className='mx-2 text-xs'>{weight} Kg</Text>
                </View>

                <View className='border-b my-1 border-gray-200' />
                <View className='flex flex-row items-center justify-between'>
                    <Icon name="color-palette-outline" size={20} color="#e8b05c" />
                    <Text style={fontWeight500} className='mx-2 text-xs'>{color}</Text>
                </View>

                <View className='border-b my-1 border-gray-200' />
                <View className='flex flex-row items-center justify-between'>
                    <Icon name="eye-outline" size={20} color="#e8b05c" />
                    <Text style={fontWeight500} className='mx-2 text-xs'>{category}</Text>
                </View>
                <View className='border-b my-1 border-gray-200' />
                <View className='flex flex-row items-center justify-between'>
                    <Icon name="rose-outline" size={20} color="#e8b05c" />
                    <Text style={fontWeight500} className='mx-2 text-xs'>{age}</Text>
                </View>


                <Pressable onPress={() => addToCart({ id, price, age, color, type, category, weight, seller_id })} className='w-full rounded-2xl bg-[#e8b05c] mt-4 p-2 active:bg-[#dba656] active:scale-95'>
                    <Text style={fontWeight500} className='text-white text-center'>Add To Cart</Text>
                </Pressable>

                <Pressable onPress={() => { navigation.navigate('CartDetails') }} className='w-full rounded-2xl mt-2 p-2 border-[#e8b05c] border active:bg-gray-100 active:scale-95'>
                    <Text style={fontWeight500} className='text-[#e8b05c] text-center'>View Cart</Text>
                </Pressable>
            </View>
        </Pressable>
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})
export default AnimalListingCard