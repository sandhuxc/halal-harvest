import { View, ScrollView, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontWeight400, fontWeight500, fontWeight600 } from '../../../assets/Styles/FontWeights'
// Firebase Imports
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import { set, ref, getDatabase } from 'firebase/database';
export default function BookingDetailsSlaughterHouse({ navigation, route }) {

    const { user, service } = route.params;
    // Firebase Hooks
    const db = getDatabase();
    const auth = getAuth()
    // Rate
    const [goatRate, setGoatRate] = useState(service?.rate_goat);
    const [cowRate, setCowRate] = useState(service?.rate_cow);
    const [camelRate, setCamelRate] = useState(service?.rate_camel);
    const [error, setError] = useState("")
    const [isBooked, setIsBooked] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [goats, setGoats] = useState(0)
    const [cows, setCows] = useState(0)
    const [camels, setCamels] = useState(0)
    const [customerContact, setCustomerContact] = useState("")

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleTotal = () => {
        return (goatRate * goats) + (cowRate * cows) + (camelRate * camels)
    }
    const handleRequestService = () => {

        if (date !== "" && handleTotal() !== 0) {
            if (customerContact.length === 11) {
                set(ref(db, 'ServiceRequests/' + uuidv4()), {
                    user_id: auth.currentUser.uid,
                    service_provider_id: user.user_id,
                    date: date?.toLocaleDateString(),
                    time: date?.toLocaleTimeString(),
                    number_of_goats: goats,
                    number_of_camels: camels,
                    number_of_cows: cows,
                    total: handleTotal(),
                    status: 'Pending',
                    service_type: service.service_type,
                    customerContact: customerContact,

                }).then(() => {
                    console.log('Success Requesting Service');
                    setIsBooked(true)
                    setTimeout(() => {
                        navigation.navigate('AllBookingsCustomer')
                    }, 2000);
                })
            } else {
                setError("Incorrect Contact Number!")
            }

        } else {
            setError("Please fill all details!")
        }
    }
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'Slaughter Houses'} navigation={navigation} />
                <ScrollView className='flex-grow p-4'>
                    <Text style={fontWeight600} className='text-xl mb-2'>{service?.slaughterHouseName}</Text>
                    <View className='flex flex-row items-center mb-5'>
                        <Text style={fontWeight500} className='text-lg'>{service?.rating === 0 ? 'Not Available' : service.rating}</Text>
                        <Icon name="star" size={20} color="#e8b05c" />
                    </View>
                    {/* Customer Contact */}
                    <Text style={fontWeight400}>Customer Contact:</Text>
                    <TextInput
                        style={fontWeight400}
                        className="
                 form-control
                 block
                 py-1.5
                 px-2
                 text-sm
                 font-normal
                 text-gray-700
                 bg-white bg-clip-padding
                 border border-solid border-gray-300
                 rounded 
                 w-full
                 mb-1"
                        value={customerContact}
                        placeholder="03236676567"
                        keyboardType="phone-pad"
                        onChangeText={(text) => setCustomerContact(text)}
                    />
                    {/* Booking Date */}
                    <Text style={fontWeight400} className="text-gray-800 ">Select Booking Date: </Text>
                    <View className='flex flex-row justify-between items-center gap-x-2 mb-3'>
                        <View
                            className="
                          form-control
                          block
                          py-2
                          px-2
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded 
                          flex-1 
                                                   "
                        >
                            <Text style={fontWeight400}>{date.toLocaleDateString()}</Text>
                        </View>
                        <Pressable style={shadow} className='py-2 px-2 rounded bg-[#e8b05c] active:scale-95' onPress={showDatepicker}>
                            <Icon name="calendar-outline" size={20} color="#ffffff" />
                        </Pressable>
                    </View>

                    {/* Booking Time */}
                    <Text style={fontWeight400} className="text-gray-800 ">Select Booking Time: </Text>
                    <View className='flex flex-row justify-between items-center gap-x-2 mb-3'>
                        <View
                            className="
                          form-control
                          block
                          py-2
                          px-2
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded 
                          flex-1                        "
                        >
                            <Text style={fontWeight400}>{date.toLocaleTimeString()}</Text>
                        </View>
                        <Pressable style={shadow} className='py-2 px-2 rounded bg-[#e8b05c] active:scale-95' onPress={showTimepicker}>
                            <Icon name="time-outline" size={20} color="#ffffff" />
                        </Pressable>
                    </View>



                    {/* Animal Count */}
                    <View className='flex flex-row justify-between gap-x-2 mt-3'>
                        {/* Section 1/3 */}
                        <View className='w-[29%]'>
                            <Text style={fontWeight400} className="text-gray-800 ">Goat(s)</Text>
                            <TextInput
                                style={fontWeight400}
                                value={goats}
                                onChangeText={setGoats}
                                keyboardType='numeric'
                                className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded 
                          flex-1
                           "
                            />
                        </View>
                        {/* Section 2/3 */}
                        <View className='w-[29%]'>
                            <Text style={fontWeight400} className="text-gray-800 ">Cow(s)</Text>
                            <TextInput
                                style={fontWeight400}
                                value={cows}
                                onChangeText={setCows}
                                keyboardType='numeric'
                                className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded  
                            flex-1                           
                           "
                            />
                        </View>
                        {/* Section 3/3 */}
                        <View className='w-[29%]'>
                            <Text style={fontWeight400} className="text-gray-800 ">Camel(s)</Text>
                            <TextInput
                                style={fontWeight400}
                                value={camels}
                                onChangeText={setCamels}
                                keyboardType='numeric'
                                className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded 
                            flex-1
                           "
                            />
                        </View>
                    </View>
                    {/* Divider */}
                    <View className='h-[1px] bg-gray-300 w-full my-5' />

                    {/* <Text style={fontWeight600} className='text-lg'>Charges: </Text> */}
                    <View className='flex flex-row justify-between'>
                        <View className='w-[34%]'><Text style={fontWeight500} className='text-center'>Animal Type </Text></View>
                        <View className='w-[29%]'><Text style={fontWeight500} className='text-center'>Qty </Text></View>
                        <View className='w-[34%]'><Text style={fontWeight500} className='text-center'>Qurbani Rate </Text></View>
                    </View>
                    <View className='flex flex-row justify-between'>
                        <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Goat </Text></View>
                        <View className='w-[29%]'><Text style={fontWeight500} className='text-xs text-center'>{goats} </Text></View>
                        <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Rs. {service?.rate_goat} </Text></View>
                    </View>
                    <View className='flex flex-row justify-between'>
                        <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Cow </Text></View>
                        <View className='w-[29%]'><Text style={fontWeight500} className='text-xs text-center'>{cows} </Text></View>
                        <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Rs. {service?.rate_cow} </Text></View>
                    </View>
                    <View className='flex flex-row justify-between'>
                        <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Camel </Text></View>
                        <View className='w-[29%]'><Text style={fontWeight500} className='text-xs text-center'>{camels} </Text></View>
                        <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Rs. {service?.rate_camel} </Text></View>
                    </View>
                    <View className="border border-3 border-dashed my-2" />
                    <View className='flex flex-row justify-between'>
                        <Text style={fontWeight600} className='text-lg'>Total: </Text>
                        <Text style={fontWeight600} className='text-lg'>Rs. {handleTotal()} </Text>
                    </View>
                    <Text style={fontWeight500} className='text-xs text-red-500'>{error}</Text>
                    {
                        isBooked === true ?
                            <Pressable className='my-5 py-3 rounded bg-white border-[#00b22d] border active:scale-95'>
                                <Text className='text-[#00b22d] text-center' style={fontWeight500}>Requested</Text>
                            </Pressable>
                            :
                            <Pressable onPress={handleRequestService} className='my-5 py-3 rounded bg-[#e8b05c] active:scale-95'>
                                <Text className='text-white text-center' style={fontWeight400}>Request Service</Text>
                            </Pressable>
                    }

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                            minimumDate={new Date()}
                        />
                    )}
                </ScrollView>
                <NavFooter navigation={navigation} />
            </View>
            {/* Footer */}
        </SafeAreaView>
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})