import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { fontWeight500 } from '../../assets/Styles/FontWeights';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../Context/CartContext';
export default function NavHeader({ title, navigation }) {
    const { cartItems } = useCart();
    return (
        <View style={style.shadow} className='fixed bottom-0 h-16 px-4 border-none bg-[#f7f8f8]'>
            <View className='flex flex-row items-center my-auto'>
                <Image
                    source={require('../../assets/logo-small.png')}
                    className='w-8 h-8 rounded-full'
                />
                <Text className='text-[#e8b05c] mx-auto' style={fontWeight500}>{title}</Text>
                <View className='relative rounded-full border border-gray-400 p-1'>
                    <Pressable className='active:scale-95' onPress={()=> navigation.navigate('CartDetails')}>
                        <Ionicons size={24} name='cart-outline' color={'#9ca3af'} />

                    {cartItems.length > 0 &&
                        <View className=' bg-[#e8b05c] rounded-full absolute px-2 py-1 -top-3 -right-2'>
                            <Text style={fontWeight500} className='text-[10px] text-white text-center'>{cartItems.length}</Text>
                        </View>
                    }
                    </Pressable>

                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})