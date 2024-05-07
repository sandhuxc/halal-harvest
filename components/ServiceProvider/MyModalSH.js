// ModalComponent.js
import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TextInput, Pressable } from 'react-native';
import { fontWeight400, fontWeight500, fontWeight600 } from '../../assets/Styles/FontWeights';
import Icon from 'react-native-vector-icons/Ionicons';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import { set, ref, getDatabase } from 'firebase/database';

const MyModalSH = ({ modalVisible, setModalVisible, setToastDisplay, fetchAllServices }) => {

    const auth = getAuth()
    const [rateCamel, setRateCamel] = useState("")
    const [rateCow, setRateCow] = useState("")
    const [rategoat, setRateGoat] = useState("")
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [location, setLocation] = useState("");
    const [slaughterHouseName, setSlaughterHouseName] = useState("");
    // Error
    const [error, setError] = useState('')

    const emptyFields = () => {
        setRateCamel('');
        setRateCow('');
        setRateGoat('');
        setDescription('');
        setContact('');
        setSlaughterHouseName();
    }
    const handleSave = () => {
        // Getting LoggedIn / Current User
        const user = auth.currentUser;
        const db = getDatabase();
        if (rategoat.length > 0 && rateCow.length > 0 && rateCamel.length > 0 && contact.length === 11 && slaughterHouseName.length > 0 && slaughterHouseName.length > 0) {
            set(ref(db, 'OfferedServices/' + user.uid), {
                service_provider_id: user.uid,
                service_type: 'SlaughterHouse',
                rate_goat: rategoat,
                rate_cow: rateCow,
                rate_camel: rateCamel,
                description: description,
                total_bookings: 0,
                rating: 0,
                location: location,
                contact: contact,
                slaughterHouseName: slaughterHouseName

            }).then(() => {
                console.log('Success Adding Service');
                fetchAllServices()
                emptyFields();
                setModalVisible(false);
                setTimeout(() => {
                    setToastDisplay(true)
                    setTimeout(() => {
                        setToastDisplay(false)
                    }, 1000);
                }, 1000);
            })
        }else {
            setError('Please fill all the fields correctly.')
        }
    }
    return (
        <View style={styles.container}>
            <Button title="Open Modal" onPress={() => setModalVisible(true)} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={fontWeight600} className='text-center text-lg text-[#e8b05c] mb-2'>Add Service</Text>
                        <Text style={fontWeight500} className='text-xs text-red-500'>{error}</Text>
                        <Text style={fontWeight400} className="text-gray-800 text-xs">Slaughter House Name</Text>
                        <TextInput
                            value={slaughterHouseName}
                            onChangeText={setSlaughterHouseName}
                            style={fontWeight400}                            
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
                            mb-2.5
                           "
                        />
                        <Text style={fontWeight400} className="text-gray-800 text-xs">Goat Charges (Rs)</Text>
                        <TextInput
                            value={rategoat}
                            onChangeText={setRateGoat}
                            style={fontWeight400}
                            keyboardType="numeric"
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
                            mb-2.5
                           "
                        />
                        <Text style={fontWeight400} className="text-gray-800 text-xs">Cow Charges (Rs)</Text>
                        <TextInput
                            value={rateCow}
                            onChangeText={setRateCow}
                            style={fontWeight400}
                            keyboardType="numeric"
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
                            mb-2.5
                           "
                        />
                        <Text style={fontWeight400} className="text-gray-800 text-xs">Camel Charges (Rs)</Text>
                        <TextInput
                            value={rateCamel}
                            onChangeText={setRateCamel}
                            style={fontWeight400}
                            keyboardType="numeric"
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
                            mb-2.5
                           "
                        />
                        <Text style={fontWeight400} className="text-gray-800 text-xs">Contact</Text>
                        <TextInput
                            value={contact}
                            onChangeText={setContact}
                            style={fontWeight400}
                            keyboardType='numeric'
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
                            mb-2.5
                           "
                        />
                        <Text style={fontWeight400} className="text-gray-800 text-xs">Location</Text>
                        <TextInput
                            value={location}
                            onChangeText={setLocation}
                            style={fontWeight400}
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
                            mb-2.5
                           "
                        />
                        <Text style={fontWeight400} className="text-gray-800 text-xs">Description</Text>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            style={fontWeight400}
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
                            mb-2.5
                           "
                        />
                        <View className='flex flex-row justify-between mt-2.5 pt-3 border-t border-t-gray-200'>
                            <Pressable onPress={() => setModalVisible(false)} className=' p-2 rounded border bg-[#ffffff] border-[#e8b05c] flex flex-row w-[49%] gap-x-1 active:scale-95'>
                                <Icon name="close-outline" size={20} color="#e8b05c" />
                                <Text className='text-[#e8b05c] text-center' style={fontWeight400}>
                                    Close
                                </Text>
                            </Pressable>
                            <Pressable onPress={handleSave} className=' p-2 rounded bg-[#e8b05c] flex flex-row w-[49%] gap-x-1 active:scale-95'>
                                <Icon name="add-circle-outline" size={20} color="#ffffff" />
                                <Text className='text-white text-center' style={fontWeight400}>
                                    Save
                                </Text>
                            </Pressable>
                        </View>
                        {/* <Button title="Close Modal" onPress={() => setModalVisible(!modalVisible)} /> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '90%'
    },
});

export default MyModalSH;
