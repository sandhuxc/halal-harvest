import { View, ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect, useCallback } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import { GiftedChat, Bubble, Composer, Send } from 'react-native-gifted-chat'

export default function ChatScreenCustomer({ navigation }) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Talha Noman',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ML3lGa0d7YLL1GPcNpOK0J-IB_MV1dXZ0w&usqp=CAU',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])


    // Customize the message bubble style
    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                // Apply your custom styles to specific message types
                left: {
                    // Styles for received messages               
                    backgroundColor: '#FFFFFF'
                },
                right: {
                    // Styles for sent messages
                    backgroundColor: '#e8b05c',
                },
            }}
            textStyle={{
                // Apply your custom text styles
                left: {
                    // Styles for received messages
                    color: '#e8b05c',
                    fontFamily: 'Montserrat-500'
                },
                right: {
                    // Styles for sent messages
                    color: 'white',
                    fontFamily: 'Montserrat-500'
                },
            }}
        />
    );

    const renderInputToolbar = (props) => (
        <Composer
            {...props}
            textInputProps={{
                style: {
                    fontFamily: 'Montserrat-500',
                    // Add other text input styles as needed
                },
            }}
        />
    );

    const renderSend = (props) => (
        <Send {...props}>
            <View style={{ marginRight: 10, marginBottom: 5 }}>
                {/* Customize the send button here */}
                <Text style={{ fontFamily: 'Montserrat-500', color: 'blue' }}>Send</Text>
            </View>
        </Send>
    );
    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-1 '>
                {/* Nav Header */}
                <NavHeader title={'Chat'} navigation={navigation} />
               
                    {/* GiftedChat */}
                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                        isLoadingEarlier={true}
                        isTyping={true}
                        renderBubble={renderBubble}
                       
                       
                    />              
                {/* Nav Footer */}
                <NavFooter navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}
