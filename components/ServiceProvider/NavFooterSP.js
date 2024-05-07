import { View, Text, StyleSheet, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { fontWeight500 } from '../../assets/Styles/FontWeights';
import { useRoute } from '@react-navigation/native';

export default function NavFooterSP({ navigation, serviceType }) {
    const activeTabStyle = 'flex flex-col items-center border-t-[3px] border-[#e8b05c] active:scale-95'
    const inActiveTabStyle = 'flex flex-col items-center border-[#e8b05c] active:scale-95'
    const route = useRoute();
    return (
        <View style={style.shadow} className='fixed bottom-0 h-[60px] px-4 border-none bg-[#f7f8f8] py-2'>
            <View className='flex flex-row items-center'>
                <View className='w-4/12'>
                    <View className='flex flex-row my-auto items-center justify-around'>
                        <Pressable onPress={() => serviceType === 'Rider'? navigation.navigate('RiderDashboard') : serviceType === 'Butcher'? navigation.navigate('ButcherDashboard') : navigation.navigate('SlaughterHouseDashboard')} className={(route.name === 'RiderDashboard' || route.name === 'ButcherDashboard' || route.name === 'SlaughterHouseDashboard')  ? activeTabStyle : inActiveTabStyle}>
                            <AntDesign name="home" size={30} color="#e8b05c" />
                            <Text style={fontWeight500} className='text-[#e8b05c] text-xs'>Home</Text>
                        </Pressable>
                    </View>
                </View>
                <View className='w-4/12'>
                    <View className='flex flex-row my-auto items-center justify-around'>
                        <Pressable onPress={() => navigation.navigate('ChatScreenServiceProvider')} className={route.name === 'ChatScreenServiceProvider' ? activeTabStyle : inActiveTabStyle}>
                            <AntDesign name="message1" size={30} color="#e8b05c" />
                            <Text style={fontWeight500} className='text-[#e8b05c] text-xs'>Chats</Text>
                        </Pressable>
                    </View>
                </View>
                <View className='w-4/12'>
                    <View className='flex flex-row my-auto items-center justify-around'>
                        <Pressable onPress={() => navigation.navigate('ServiceProviderProfile',{
                            serviceType : serviceType
                        })} className={route.name === 'ServiceProviderProfile' ? activeTabStyle : inActiveTabStyle}>
                            <Ionicons name="person-outline" size={30} color="#e8b05c" />
                            <Text style={fontWeight500} className='text-[#e8b05c] text-xs'>Account</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}
NavFooterSP.defaultProps = {
    serviceType: 'Rider'
}
const style = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})