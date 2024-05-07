import { View, Text, ScrollView, StyleSheet, Pressable, TextInput, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavFooter from '../../components/Seller/NavFooter'
import { fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'
import NavHeader from '../../components/Seller/NavHeader'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PickerForm from '../../components/PickerForm'
import { getDatabase, ref, set } from 'firebase/database'

// Authentication
import { getAuth } from "firebase/auth";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'
// Image Picker
import * as ImagePicker from 'expo-image-picker';
// Storage
import { getStorage, uploadBytes, getDownloadURL, ref as refStorage } from 'firebase/storage';

export default function PostAnimal({ navigation }) {
    // Image Picker Code
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    // ----------------------------------
    const auth = getAuth()
    // Getting LoggedIn / Current User
    const user = auth.currentUser
    // loading State
    const [loading, setLoading] = useState(false);
    // Type Goat / Cow / Camel
    const [animalType, setAnimalType] = useState('Goat')
    const [category, setCategory] = useState('Independent')
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedAge, setSelectedAge] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [weight, setWeight] = useState('')
    const [downloadUrl, setDownloadUrl] = useState(null)
    // Error / Success
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

// Function to upload an image to Firebase Storage
async function uploadImageToStorage(image, animalNewId) {
    const storage = getStorage();    
    const storageRef = refStorage(storage, 'Images/' + animalNewId);
    const metadata = {
        contentType: 'image/jpeg',
    };

    try {
        const response = await fetch(image);
        const blobImage = await response.blob();
        const snapshot = await uploadBytes(storageRef, blobImage, metadata);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image.');
    }
}

// Function to save animal data to Firebase Database
async function saveAnimalData() {
    setLoading(true);
    setError('');

    try {
        if (selectedColor && selectedAge && price && weight) {
            const animalNewId = uuidv4();
            const downloadUrl = await uploadImageToStorage(image, animalNewId);

            const animalData = {
                seller_id: user.uid,
                age: selectedAge,
                category: category,
                color: selectedColor,
                description: description,
                price: price,
                type: animalType,
                weight: weight,
                animalImage: downloadUrl,
            };

            const db = getDatabase();
            const animalRef = ref(db, 'Animals/' + animalNewId);
            
            await set(animalRef, animalData);

            setSuccess('Animal Added Successfully');
            setTimeout(() => {
                setSuccess('');
            }, 1000);

            setLoading(false);

            // Clear form fields
            setSelectedColor('');
            setSelectedAge('');
            setDescription('');
            setPrice('');
            setWeight('');
            setImage(null);
            setDownloadUrl(null);
        } else {
            setError('Please Fill all Details!');
            setLoading(false);
        }
    } catch (error) {
        console.log('Something Went Wrong:', error);
        setLoading(false);
        setError('An error occurred while saving the animal.');
    }
}

    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'Post Animal'} />
                <ScrollView className='flex-grow px-4'>
                    <View className='mt-5'>
                        <Text style={fontWeight400} className="text-gray-800 mb-2">Animal Type</Text>
                        <View className='flex flex-row justify-between'>
                            <Pressable onPress={() => setAnimalType('Goat')} className={animalType === 'Goat' ? selectedAnimal : animalStyle}>

                                <Text style={fontWeight500} className={animalType === 'Goat' ? 'text-sm mt-1 text-white' : 'text-sm mt-1'}>Goat</Text>
                            </Pressable>
                            <Pressable onPress={() => setAnimalType('Cow')} className={animalType === 'Cow' ? selectedAnimal : animalStyle}>

                                <Text style={fontWeight500} className={animalType === 'Cow' ? 'text-sm mt-1 text-white' : 'text-sm mt-1'}>Cow</Text>
                            </Pressable>
                            <Pressable onPress={() => setAnimalType('Camel')} className={animalType === 'Camel' ? selectedAnimal : animalStyle}>

                                <Text style={fontWeight500} className={animalType === 'Camel' ? 'text-sm mt-1 text-white' : 'text-sm mt-1'}>Camel</Text>
                            </Pressable>
                        </View>
                        {
                            (animalType === 'Cow' || animalType === 'Camel') &&
                            <>
                                <Text style={fontWeight400} className="text-gray-800 mb-2 mt-5">Category</Text>
                                <View className='flex flex-row justify-between'>
                                    <Pressable onPress={() => setCategory('Independent')} className={category === 'Independent' ? selectedCategory : categoryStyle}>
                                        <MaterialIcons name="goat" size={30} color="#e8b05c" />
                                        <Text style={fontWeight500} className='text-sm mt-1'>Independent</Text>
                                    </Pressable>
                                    <Pressable onPress={() => setCategory('Shared')} className={category === 'Shared' ? selectedCategory : categoryStyle}>
                                        <MaterialCommunityIcons name="knife" size={30} color="#e8b05c" />
                                        <Text style={fontWeight500} className='text-sm mt-1'>Shared</Text>
                                    </Pressable>
                                </View>
                            </>
                        }
                        {/* Forms */}
                        <View className='mt-5'>
                            <PickerForm items={colorOptions} selectedItem={selectedColor} setSelectedItem={setSelectedColor} label={'Color'} />
                            <View className='my-4'>
                                <PickerForm items={ageOptions} selectedItem={selectedAge} setSelectedItem={setSelectedAge} label={'Age'} />
                            </View>
                            <Text style={fontWeight400} className="text-gray-800">Price (Rs)</Text>
                            <TextInput
                                value={price}
                                onChangeText={setPrice}
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
                            mb-4
                           "
                            />
                            <Text style={fontWeight400} className="text-gray-800 ">Weight (Kg)</Text>
                            <TextInput
                                value={weight}
                                onChangeText={setWeight}
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
                            mb-4
                            "
                            />
                        </View>


                        <Pressable onPress={pickImage} className={image ? 'border border-green-500 rounded-md active:scale-105 p-2 bg-[#FFFFFF]' : 'border border-[#e8b05c] rounded-md active:scale-105 p-2 bg-[#FFFFFF]'}

                        >
                            <Text style={fontWeight500} className={image ? "text-green-500 text-center text-base" : "text-[#e8b05c] text-center text-base"}>
                                {
                                    image ? 'Image Uploaded' :
                                        'Upload Image'
                                }
                            </Text>
                        </Pressable>
                        {image && <Image className='rounded-md my-2' source={{ uri: image }} style={{ width: 100, height: 100 }} />}
                    </View>
                    <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
                    <Text style={fontWeight400} className="text-green-500 text-xs">{success}</Text>
                    <Pressable onPress={
                        () => {
                            saveAnimalData().
                                then(() => console.log("Success")).catch((err) => {
                                    console.log("Error", err)
                                })
                        }
                    } style={shadow} className='bg-[#e8b05c] px-4 py-2 rounded-md ml-auto flex flex-row items-center mb-4'>
                        <Text style={fontWeight500} className="text-white text-center text-base">{
                            loading ?
                                '...'
                                :
                                'Add Post'
                        }</Text>
                    </Pressable>
                </ScrollView>
                <NavFooter navigation={navigation} />
            </View >
        </SafeAreaView >
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})

const selectedCategory = 'rounded-md w-[48%] bg-white p-5 flex flex-col items-center justify-center border border-[#e8b05c] active:scale-95'
const categoryStyle = 'rounded-md w-[48%] bg-white p-5 flex flex-col items-center justify-center active:scale-95'

const selectedAnimal = 'rounded-md w-[32%] bg-white px-5 py-2.5 flex flex-col items-center justify-center bg-[#e8b05c] active:scale-95'
const animalStyle = 'rounded-md w-[32%] bg-white px-5 py-2.5 flex flex-col items-center justify-center active:scale-95'

const colorOptions = [
    { label: 'Select Color', value: '' },
    { label: 'White', value: 'White' },
    { label: 'Black', value: 'Black' },
    { label: 'Brown', value: 'Brown' },
    { label: 'White-Black', value: 'White-Black' },
    { label: 'White-Brown', value: 'White-Brown' },
]
const ageOptions = [
    { label: 'Select Age', value: '' },
    { label: 'Two-Tooth (دو دانت)', value: 'Two-Tooth (دو دانت)' },
    { label: 'Four-Tooth (چار دانت)', value: 'Four-Tooth (چار دانت)' },
    { label: 'Six-Tooth (چھ دانت)', value: 'Six-Tooth (چھ دانت)' },
]