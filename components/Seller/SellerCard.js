import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { fontWeight400, fontWeight500, fontWeight600 } from '../../assets/Styles/FontWeights'
// key={id} age={age} category={category} color={color} price={price} weight={weight} type={type}
export default function SellerCard({ price, age, color, type, category, weight, animalImage }) {
    return (
        <View style={shadow} className='bg-white rounded-2xl p-2 flex flex-col mb-2.5'>
            {
                animalImage ?
                    <Image
                        source={{uri : animalImage}}
                        className='w-full rounded-t-2xl bg-contain h-52'
                    />
                    :
                    type === 'Goat' ?
                        <Image
                            source={require('../../assets/white-goat.jpeg')}
                            className='w-full rounded-t-2xl bg-contain h-52'
                        />
                        :
                        type === 'Camel' ?
                            <Image
                                source={require('../../assets/camel.jpg')}
                                className='w-full rounded-t-2xl bg-contain h-52'
                            />
                            :
                            <Image
                                source={require('../../assets/cow.jpg')}
                                className='w-full rounded-t-2xl bg-contain h-52'
                            />
            }

            <View className='py-2.5'>
                <Text style={fontWeight600} className=' text-lg text-[#e8b05c]' >Rs. {price}</Text>
                <View className='flex flex-row justify-between py-1'>
                    <Text style={fontWeight500}>Age</Text>
                    <Text style={fontWeight400}>{age}</Text>
                </View>
                <View className='flex flex-row justify-between py-1'>
                    <Text style={fontWeight500}>Color</Text>
                    <Text style={fontWeight400}>{color}</Text>
                </View>
                <View className='flex flex-row justify-between py-1'>
                    <Text style={fontWeight500}>Type</Text>
                    <Text style={fontWeight400}>{type}</Text>
                </View>
                <View className='flex flex-row justify-between py-1'>
                    <Text style={fontWeight500}>Category</Text>
                    <Text style={fontWeight400}>{category}</Text>
                </View>
                <View className='flex flex-row justify-between py-1'>
                    <Text style={fontWeight500}>Weight</Text>
                    <Text style={fontWeight400}>{weight} Kg</Text>
                </View>
            </View>
        </View>
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})