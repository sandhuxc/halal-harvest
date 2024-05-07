import { Text, Image, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
// Importing Font Weights
import { fontWeight800, fontWeight600, fontWeight500 } from '../../assets/Styles/FontWeights';

SplashScreen.preventAutoHideAsync();

const Welcome = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Montserrat-900': require('../../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-800': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-700': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-600': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-500': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-400': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-300': require('../../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-200': require('../../assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-100': require('../../assets/fonts/Montserrat-Thin.ttf')
  });


  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!user) {
    navigation.navigate('Welcome')
  }

  // Keep the splash screen visible while we fetch resources
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, initializing]);

  if (!fontsLoaded || initializing) {
    return null;
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView className=' bg-white h-full' onLayout={onLayoutRootView}>
        <View className='flex flex-col justify-center items-center h-[75%]'>
          <Text style={fontWeight800} className='text-[#e8b05c] text-3xl text-center'>HALAL HARVEST</Text>
          <Text style={fontWeight500} className='text-[#2b2b2b] text-base text-center'>Qurbani Made Simple</Text>
          <Image
            source={require('../../assets/I3.png')}
            className='w-11/12 h-3/6 mt-10'
          />
        </View>
        <View className='h-1/6 w-full flex flex-col items-center p-5 gap-y-3'>
          {/* Pressable */}
          <Pressable onPress={() => navigation.navigate('SignupOptions')} className='w-full bg-[#e8b05c] text-center rounded-lg active:scale-95'>
            <Text style={fontWeight600} className='text-center text-white py-4'>
              GET STARTED
            </Text>
          </Pressable>

          {/* Pressable */}
          <Pressable onPress={() => navigation.navigate('Login')} className='w-full border-2 border-[#e8b05c] text-center rounded-lg active:scale-95 '>
            <Text style={fontWeight600} className='text-center text-[#e8b05c] py-4'>
              LOGIN
            </Text>
          </Pressable>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Welcome
