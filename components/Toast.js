import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { fontWeight500, fontWeight600 } from '../assets/Styles/FontWeights';
const Toast = ({ display, message }) => {
    return (
        <>
            {
                display &&
                <View style={shadow} className={`rounded-xl border border-gray-100 bg-white p-4 absolute w-10/12 top-10 left-[10%]`}>
                    <View className="flex flex-row items-start gap-4">
                        <View className="text-green-600">
                            <Icon name="checkmark-circle-outline" size={20} color="#e8b05c" className='h-6 w-6' />
                        </View>

                        <View className="flex-1">
                            <Text style={fontWeight600} className="block font-medium text-gray-900"> Changes saved </Text>

                            <Text style={fontWeight500} className="mt-1 text-sm text-gray-700">
                                {message}
                            </Text>
                        </View>

                        <Pressable className="text-gray-500 transition hover:text-gray-600 active:scale-95">
                            <Icon name="close-outline" size={20} color="#e8b05c" className='h-6 w-6' />
                        </Pressable>
                    </View>
                </View>
            }
        </>
    )
}
const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 2
    }
})
export default Toast