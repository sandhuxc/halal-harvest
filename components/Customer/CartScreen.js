import React, { useState, useEffect, useRef } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { View, Text, FlatList, Button, Image, Pressable, ScrollView, TextInput } from 'react-native';
import { useCart } from '../../Context/CartContext'; // Import the useCart hook
import { SafeAreaView } from 'react-native-safe-area-context'
import { fontWeight400, fontWeight500, fontWeight600 } from '../../assets/Styles/FontWeights';
import { Ionicons } from '@expo/vector-icons';
import NavHeader from '../Seller/NavHeader';
import { getDatabase, ref, set } from 'firebase/database'
import { getAuth } from 'firebase/auth';

// Notification
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


export default CartScreen = ({ navigation }) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid
    const db = getDatabase();
    // Notifications
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [address, setAddress] = useState('');
    const [totalBill, setTotalBill] = useState(0);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    // -------------

    const { cartItems, removeFromCart, emptyCart } = useCart();
    const handlePurchase = () => {
        if (cartItems.length > 0) {
            const newOrderId = uuidv4()
            // Map cartItems to collect animal IDs
            let sellerId = cartItems[0].seller_id;
            const animalIds = cartItems?.map((animal) => animal.id);
            console.log(JSON.stringify(animalIds))
            // Create a reference for each item in the database and add it's ID to an array of order items
            set(ref(db, 'Orders/' + newOrderId), {
                user_id: userId,
                animal_id: JSON.stringify(animalIds),
                order_id: newOrderId,
                seller_id: sellerId,
                status: "Bought",
                address: address,
                total: totalBill,
            }).then(() => {
                console.log('Success')
                schedulePushNotification()
                emptyCart()
                setAddress('')
            }).catch((err) => {
                console.log(err)
            })
        }

    }

    const handleTotal = () => {
        let total = 0;
        cartItems.map((animal) => {
            total += parseInt(animal.price);
        })
        setTotalBill(total)
    }

    useEffect(() => {
        handleTotal()
    }, [cartItems])

    console.log(cartItems)
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                <NavHeader title={'Cart'} />
                <ScrollView className='flex-grow p-4'>
                    <View>
                        <FlatList
                            data={cartItems}
                            renderItem={({ item }) => (
                                <View className='flex flex-row bg-white p-1 my-1'>
                                    {
                                        item.type === 'Goat' ?
                                            <Image
                                                source={require('../../assets/white-goat.jpeg')}
                                                className='w-24 bg-contain p-2 h-24 my-auto rounded-md'
                                            />
                                            :
                                            item.type === 'Camel' ?
                                                <Image
                                                    source={require('../../assets/camel.jpg')}
                                                    className='w-24 bg-contain p-2 h-24 my-auto rounded-md'
                                                />
                                                :
                                                <Image
                                                    source={require('../../assets/cow.jpg')}
                                                    className='w-24 bg-contain p-2 h-24 my-auto rounded-md'
                                                />
                                    }
                                    <View className='bg-[#FFFFFF] flex-1 flex flex-row items-center'>
                                        <View className='flex flex-col gap-y-2 p-2'>
                                            <View className='flex flex-row gap-x-1'>
                                                <Text style={fontWeight500} className='text-xs text-gray-600'>Id: </Text>
                                                <Text style={fontWeight400} className='text-xs'>{item.id.slice(1, 10)}</Text>
                                            </View>
                                            <View className='flex flex-row gap-x-1'>
                                                <Text style={fontWeight500} className='text-xs text-gray-600'>Color: </Text>
                                                <Text style={fontWeight400} className='text-xs'>{item.color}</Text>
                                            </View>
                                            <View className='flex flex-row gap-x-1'>
                                                <Text style={fontWeight500} className='text-xs text-gray-600'>Weight: </Text>
                                                <Text style={fontWeight400} className='text-xs'>{item.weight}</Text>
                                            </View>
                                        </View>
                                        <Pressable className='ml-auto active:scale-95' onPress={() => removeFromCart(item.id)}>
                                            <Ionicons name='trash-outline' size={32} color={"red"} />
                                        </Pressable>
                                    </View>
                                    <Text>{item.name}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                        <View className='flex flex-row justify-between border-t-2 border-dashed  my-4 py-2'>
                            <Text style={fontWeight600} className='text-lg'>Total: </Text>
                            <Text style={fontWeight600} className='text-lg'>Rs. {totalBill} </Text>
                        </View>
                    </View>

                    {/* Phone Input */}
                    <Text style={fontWeight400} className="text-gray-800 ">Address</Text>
                    <TextInput
                        style={fontWeight400}
                        keyboardType="email"
                        value={address}
                        onChangeText={setAddress}

                        className="     form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            w-full
                            mb-5"
                    />
                    {
                        cartItems.length > 0 && address.length > 0 &&
                        <Pressable className='my-5 py-3 rounded bg-[#e8b05c] disabled:opacity-50 disabled:bg-gray-200 active:scale-95 disabled:scale-100' onPress={handlePurchase}>
                            <Text className='text-white text-center' style={fontWeight400}>Buy Now</Text>
                        </Pressable>
                    }
                    {
                        cartItems.length === 0 &&
                        <Text className='text-center text-lg my-5 text-[#e8b05c]' style={fontWeight600}>Please Add Animals in Cart to proceed!</Text>
                    }
                    <Pressable className='py-3 rounded bg-white active:scale-95' onPress={() => navigation.navigate('CustomerDashboard')}>
                        <Text className='text-[#e8b05c] text-center' style={fontWeight400}>Back</Text>
                    </Pressable>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Order Placed!",
            body: 'Thank You for using Halal Harvest!',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 1 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: '8d217db7-8ff9-4515-9eba-fcb75b9c31e9' })).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}
