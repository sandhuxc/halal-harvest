import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { fontWeight500 } from '../../assets/Styles/FontWeights';

export default function NavHeader({title}) {
    return (
        <View style={style.shadow} className='fixed bottom-0 h-16 px-4 border-none bg-[#f7f8f8]'>
            <View className='flex flex-row items-center my-auto'>
                <Image
                    source={require('../../assets/logo-small.png')}
                    className='w-8 h-8 rounded-full'
                />
                <Text className='text-[#e8b05c] mx-auto' style={fontWeight500}>{title}</Text>
                <Image
                    source={require('../../assets/sample-avatar.png')}
                    className='w-8 h-8 rounded-full'
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})