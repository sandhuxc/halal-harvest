import { View, Text, TextInput, Pressable } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { fontWeight400, fontWeight700, fontWeight500 } from '../../assets/Styles/FontWeights';
import validator from 'validator';
// import { Picker } from '@react-native-picker/picker';
import PickerForm from '../../components/PickerForm';

const ServiceProviderSignup = ({ navigation }) => {
    const auth = getAuth()
    const [loading, setLoading] = useState(false);
    const [fullname, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    const [selectedItem, setSelectedItem] = useState(null);

    const validatePassword = () => {
        let isValid = true


        if (!email || !password) {
            setError('Enter details to login')
            isValid = false;
        }
        else {
            if (validator.isEmail(email)) {
                if (password !== '' && confirmPassword !== '') {
                    if (password !== confirmPassword) {
                        isValid = false
                        setError('Passwords does not match')
                    }
                }
            }
            else {
                isValid = false;
                setError('Invalid Email')
            }
        }


        return isValid
    }

    const handleSignup = () => {
        setLoading(true)
        setError('')
        setSuccess('')
        if (validatePassword()) {
            console.log(selectedItem)
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    setLoading(false)
                    console.log('User Response', res.user)
                    const { uid, email } = res.user;
                    // const userType = 'Seller';
                    setSuccess('User Registered Successfully')
                    saveUserData(uid, email, selectedItem)
                })
                .catch(err => {
                    setLoading(false)
                    switch (err.code) {
                        case 'auth/email-already-in-use':
                            setError('Email Already in Use')
                            break;
                        case 'auth/weak-password':
                            setError('Password should be atleast 6 characters')
                            break;
                        case 'auth/invalid-email':
                            setError('Invalid Email')
                            break;
                        case 'auth/network-request-failed':
                            setError('Network Error')
                            break;
                        default:
                            // setError('Error', err.code)
                            console.error('Error Logged',  err.code)
                            break;
                    }
                })
        }
    }

    function saveUserData(userId, email, userType) {
        const db = getDatabase();
        set(ref(db, 'Users/' + userId), {
            user_id: userId,
            fullname: fullname,
            email: email,
            usertype: selectedItem,
            details_found: false
        }).then(() => {
            console.log('User Successfully Added of Type', userType);
            setTimeout(() => {
                navigation.navigate('Login')
            }, 1000)
        })
    }
    const items = [
        { label: 'Select...', value: '' },
        { label: 'Butcher', value: 'Butcher' },
        { label: 'Rider', value: 'Rider' },
        { label: 'Slaughter House', value: 'SlaughterHouse' },
    ]

    return (
        <SafeAreaView>
            <View className={`px-2 flex flex-col justify-center h-full bg-white`}>
                <View className='mx-5'>
                    <Text style={fontWeight700} className='text-center text-4xl text-[#e8b05c]'>Service Provider</Text>
                    <Text style={fontWeight500} className='text-[#2b2b2b] text-base text-center mb-5'>Register Account</Text>
                    {/* Phone Input */}
                    <Text style={fontWeight400} className="text-gray-800 ">Full Name</Text>
                    <TextInput
                        style={fontWeight400}                        
                        value={fullname}
                        onChangeText={setFullName}

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
                            w-full
                            mb-5"
                    />
                    {/* Phone Input */}
                    <Text style={fontWeight400} className="text-gray-800 ">Email</Text>
                    <TextInput
                        style={fontWeight400}
                        keyboardType="email"
                        value={email}
                        onChangeText={setEmail}

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
                            w-full
                            mb-5"
                    />
                    {/* Password Input */}
                    <Text style={fontWeight400} className="text-gray-800 ">Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={fontWeight400}
                        value={password}
                        onChangeText={setPassword}

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
                            w-full
                            mb-5"
                    />

                    {/* Password Input */}
                    <Text style={fontWeight400} className="text-gray-800 ">Confirm Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={fontWeight400}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}

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
                            w-full
                            rounded
                            mb-5"
                    />
                    {/* Picker Form */}
                    <PickerForm items={items} selectedItem={selectedItem} setSelectedItem={setSelectedItem} label={'Account Type'} />
                    <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
                    <Text style={fontWeight400} className="text-green-500 text-xs">{success}</Text>
                    {/* onPress event */}
                    <Pressable className='my-5 py-3 rounded bg-[#e8b05c] active:scale-95' onPress={handleSignup}>
                        <Text className='text-white text-center' style={fontWeight400}>{loading ? '...' : 'SIGNUP'}</Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default ServiceProviderSignup;