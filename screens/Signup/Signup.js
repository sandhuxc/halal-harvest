import { View, Text, TextInput, Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import { fontWeight400, fontWeight700 } from '../../assets/Styles/FontWeights';
import validator from 'validator';

// Old File-> Not In use
const Signup = ({ navigation }) => {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [confirmPassword, setConfirmPassword] = React.useState(null);
    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
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
            createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then((res) => {
                    setLoading(false)
                    console.log(res.user)
                    setSuccess('User Registered Successfully')
                })
                .catch(err => {
                    setLoading(false)
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
                    <Text style={fontWeight700} className='text-center text-4xl mb-10 text-[#e8b05c]'>Signup</Text>
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
                        <Text className='text-white text-center' style={fontWeight400}>{
                            loading? '...'
                            :
                            'SIGN UP'
                        }</Text>
                    </Pressable>
                    <Text style={fontWeight700} className='text-center'>OR</Text>
                    <Text style={fontWeight400} className='mt-1 text-center'>Already Have An Account? <Text className='text-[#e8b05c] font-semibold' onPress={() => navigation.navigate('Login')} > Login</Text></Text>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default Signup;