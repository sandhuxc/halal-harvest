import { View, Text, TextInput, Pressable, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getAuth } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { fontWeight400, fontWeight700, fontWeight500 } from '../../assets/Styles/FontWeights';
import validator from 'validator';
import { getDatabase, ref, set } from '@firebase/database';


const CustomerSignup = ({ navigation }) => {

    // Firebase     
    const [fullname, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
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

    const handleSignup = () => {
        setLoading(true)        
        const auth = getAuth()
        setError('')
        setSuccess('')
        if (validatePassword()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log(res.user)
                    const userId = res.user.uid
                    console.log(userId)
                    saveUserData(userId, email, 'Customer')                    
                    setSuccess('User Registered Successfully')
                    setLoading(false)
                })
                .catch(err => {
                    switch (err.code) {
                        case 'auth/email-already-in-use':
                            setError('Email Already in Use')
                            break;
                        case 'auth/weak-password':
                            setError('Password should be atleast 6 characters')
                        default:
                            break;
                    }
                })
        }
    }

    return (
        <SafeAreaView>
            <View className={`px-2 flex flex-col justify-center h-full bg-white`}>
                <View className='mx-5'>
                    <Text style={fontWeight700} className='text-center text-4xl  text-[#e8b05c]'>Customer</Text>
                    <Text style={fontWeight500} className='text-[#2b2b2b] text-base text-center mb-5'>Register Account</Text>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <Text style={fontWeight400} className="text-gray-800 ">Full Name</Text>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    {/* Email Input */}
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
                        <Text className='text-white text-center' style={fontWeight400}>{loading? '...' : 'SIGNUP'}</Text>
                    </Pressable>
                    <Text style={fontWeight700} className='text-center'>OR</Text>
                    <Text style={fontWeight400} className='mt-1 text-center'>Already Have An Account? <Text className='text-[#e8b05c] font-semibold' onPress={() => navigation.navigate('Login')} > Login</Text></Text>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export default CustomerSignup;