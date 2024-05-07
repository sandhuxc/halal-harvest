// ModalComponent.js
import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TextInput, Pressable } from 'react-native';
import { fontWeight400, fontWeight600 } from '../../assets/Styles/FontWeights';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth } from 'firebase/auth';
import { set, ref, getDatabase } from 'firebase/database';

const MyModalRider = ({ modalVisible, setModalVisible, setToastDisplay, fetchAllServices }) => {

    const auth = getAuth()
    const [minimumFare, setMinimumFare] = useState("")
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");

    const [error, setError] = useState("");
    const emptyFields = () => {
        setMinimumFare("");
        setDescription("");
        setContact("");
        setError("")
    }
    const handleSave = () => {
        // Getting LoggedIn / Current User
        const user = auth.currentUser;
        const db = getDatabase();
        if (minimumFare.length > 0 && contact.length > 0) {
            set(ref(db, 'OfferedServices/' + user.uid), {
                service_provider_id: user.uid,
                service_type: 'Rider',
                minimum_fare: minimumFare,
                description: description,
                total_bookings: 0,
                rating: 0,
                contact: contact

            }).then(() => {
                console.log('Success Adding Service');
                fetchAllServices();
                emptyFields();
                setModalVisible(false);
                setTimeout(() => {
                    setToastDisplay(true)
                    setTimeout(() => {
                        setToastDisplay(false)
                    }, 1000);
                }, 1000);
            })
        } else {
            setError('Please fill the required fields!')
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
                        {/* Forms */}
                        <Text style={fontWeight400} className="text-gray-800 text-xs">Minimum Fare (Rs)</Text>
                        <TextInput
                            value={minimumFare}
                            onChangeText={setMinimumFare}
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
                        <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
                        <View className='flex flex-row justify-between mt-2.5 pt-3 border-t border-t-gray-200'>
                            <Pressable onPress={()=> setModalVisible(false)} className=' p-2 rounded border bg-[#ffffff] border-[#e8b05c] flex flex-row w-[49%] gap-x-1 active:scale-95'>
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

export default MyModalRider;
