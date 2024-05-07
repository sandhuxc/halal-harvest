import { View, Text, StyleSheet, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { fontWeight500 } from '../../assets/Styles/FontWeights';
import { useRoute } from '@react-navigation/native';

export default function NavFooter({ navigation }) {
    const activeTabStyle = 'flex flex-col items-center border-t-[3px] border-[#e8b05c] active:scale-95'
    const inActiveTabStyle = 'flex flex-col items-center border-[#e8b05c] active:scale-95'
    const route = useRoute();
    return (
        <View style={style.shadow} className='fixed bottom-0 h-[80px] px-4 border-none bg-[#f7f8f8]'>
            <View className='flex flex-row my-auto'>
                <View className='w-6/12'>
                    <View className='flex flex-row my-auto items-center justify-around'>
                        <Pressable onPress={() => navigation.navigate('CustomerDashboard')} className={route.name === 'CustomerDashboard' ? activeTabStyle : inActiveTabStyle}>
                            <AntDesign name="home" size={30} color="#e8b05c" />
                            <Text style={fontWeight500} className='text-[#e8b05c] text-xs'>Home</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('ChatScreenCustomer')} className={route.name === 'Chats' ? activeTabStyle : inActiveTabStyle}>
                            <AntDesign name="message1" size={30} color="#e8b05c" />
                            <Text style={fontWeight500} className='text-[#e8b05c] text-xs'>Chats</Text>
                        </Pressable>
                    </View>
                </View>            
                <View className='w-6/12'>
                    <View className='flex flex-row my-auto items-center justify-around'>
                        <Pressable onPress={()=> navigation.navigate('SellerView')} className={route.name === 'SellerAds' ? activeTabStyle : inActiveTabStyle}>
                            <Ionicons name="heart-outline" size={30} color="#e8b05c" />
                            <Text style={fontWeight500} className='text-[#e8b05c] text-xs'>Sellers</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('CustomerSettings')} className={route.name === 'CustomerSettings' ? activeTabStyle : inActiveTabStyle}>
                            <Ionicons name="person-outline" size={30} color="#e8b05c" />
                            <Text style={fontWeight500} className='text-[#e8b05c] text-xs'>Account</Text>
                        </Pressable>
                    </View>
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