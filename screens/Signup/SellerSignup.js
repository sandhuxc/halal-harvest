import { View, Text, TextInput, Pressable } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import { fontWeight400, fontWeight700, fontWeight500 } from '../../assets/Styles/FontWeights';
import validator from 'validator';

import { getDatabase, ref, set } from "firebase/database";

const SellerSignup = ({ navigation }) => {
    // Get Auth
    const auth = getAuth()
    const [fullname, setFullName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [confirmPassword, setConfirmPassword] = React.useState(null);
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(null)
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])


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
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    setLoading(false)
                    console.log(res.user)
                    const { uid, email } = res.user;
                    const userType = 'Seller';
                    setSuccess('User Registered Successfully')
                    saveUserData(uid, email, userType)
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err.code)
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
                            setError('Error Occured')
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
            usertype: userType,
            details_found: false
        }).then(() => {
            console.log('User Successfully Added of Type', userType);
            setTimeout(() => {
                navigation.navigate('Login')
            }, 1000)
        })
    }

    return (
        <SafeAreaView>
            <View className={`px-2 flex flex-col justify-center h-full bg-white`}>
                <View className='mx-5'>
                    <Text style={fontWeight700} className='text-center text-4xl text-[#e8b05c]'>Seller</Text>
                    <Text style={fontWeight500} className='text-[#2b2b2b] text-base text-center mb-5'>Register Account</Text>
                    {/* Phone Input */}
                    <Text style={fontWeight400} className="text-gray-800 ">Full Name</Text>
                    <TextInput
                        style={fontWeight400}
                        keyboardType="email"
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
                            rounded"
                    />
                    <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
                    <Text style={fontWeight400} className="text-green-500 text-xs">{success}</Text>
                    {/* onPress event */}
                    <Pressable className='my-5 py-3 rounded bg-[#e8b05c] active:scale-95' onPress={handleSignup}>
                        <Text className='text-white text-center' style={fontWeight400}>{loading ? '...' : 'SIGNUP'}</Text>
                    </Pressable>
                    <Text style={fontWeight700} className='text-center'>OR</Text>
                    <Text style={fontWeight400} className='mt-1 text-center'>Already Have An Account? <Text className='text-[#e8b05c] font-semibold' onPress={() => navigation.navigate('Login')} > Login</Text></Text>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default SellerSignup;