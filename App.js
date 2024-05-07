import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Login/Login';
// Signup Screens
import Signup from './screens/Signup/Signup';
import SignupOptions from './screens/Signup/SignupOptions';
import SellerSignup from './screens/Signup/SellerSignup';
import ServiceProviderSignup from './screens/Signup/ServiceProviderSignup';
import CustomerSignup from './screens/Signup/CustomerSignup';
// Dashboards
import SellerDashboard from './screens/Dashboard/Seller/SellerDashboard';
import CustomerDashboard from './screens/Dashboard/Customer/CustomerDashboard';
import ButcherDashboard from './screens/Dashboard/ServiceProvider/ButcherDashboard'
import RiderDashboard from './screens/Dashboard/ServiceProvider/RiderDashboard'
import SlaughterHouseDashboard from './screens/Dashboard/ServiceProvider/SlaughterHouseDashboard'
import PostAnimal from './screens/PostAnimal/PostAnimal';
// Settings
import SellerSettings from './screens/Settings/SellerSettings';
import SellerAds from './screens/SellerAds/SellerAds';
import CustomerSettings from './screens/Settings/CustomerSettings';
import { CartProvider } from './Context/CartContext';
// Cart
import CartScreen from './components/Customer/CartScreen';
import SellerView from './screens/Dashboard/Customer/SellerView';
import SellerListingDetails from './screens/Dashboard/Customer/SellerListingDetails';
import ChatScreenCustomer from './screens/Dashboard/Customer/ChatScreenCustomer';
import BuyCustomerScreen from './screens/Dashboard/Customer/BuyCustomerScreen';
import AllButchersScreen from './screens/Dashboard/Customer/AllButchersScreen';
import AllRidersScreen from './screens/Dashboard/Customer/AllRidersScreen';
import BookingDetailsRider from './screens/Dashboard/Customer/BookingDetailsRider';
import BookingDetailsButcher from './screens/Dashboard/Customer/BookingDetailsButcher';
import BookingDetailsSlaughterHouse from './screens/Dashboard/Customer/BookingDetailsSlaughterHouse';
import AllSlaughterHousesScreen from './screens/Dashboard/Customer/AllSlaughterHousesScreen';
import AllBookingsCustomer from './screens/Dashboard/Customer/AllBookingsCustomer';
import ChatScreenServiceProvider from './screens/Dashboard/ServiceProvider/ChatScreenServiceProvider';
import ServiceProviderProfile from './screens/Dashboard/ServiceProvider/ServiceProviderProfile';
import TotalSales from './screens/Dashboard/Seller/TotalSales';
//#e8b05c
//2b2b2b
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="SignupOptions" component={SignupOptions} />
          <Stack.Screen name="SellerSignup" component={SellerSignup} />
          <Stack.Screen name="ServiceProviderSignup" component={ServiceProviderSignup} />
          <Stack.Screen name="CustomerSignup" component={CustomerSignup} />
          {/* Dashboards */}
          <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
          <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
          <Stack.Screen name="ButcherDashboard" component={ButcherDashboard} />
          <Stack.Screen name="RiderDashboard" component={RiderDashboard} />
          <Stack.Screen name="SlaughterHouseDashboard" component={SlaughterHouseDashboard} />
          {/* Post Animal */}
          <Stack.Screen name="PostAnimal" component={PostAnimal} />
          {/* Settings */}
          <Stack.Screen name="SellerSettings" component={SellerSettings} />
          <Stack.Screen name="CustomerSettings" component={CustomerSettings} />
          {/* Seller Ads */}
          <Stack.Screen name="SellerAds" component={SellerAds} />
          <Stack.Screen name="TotalSales" component={TotalSales} />
          
          {/* Cart */}
          <Stack.Screen name="CartDetails" component={CartScreen} />
          <Stack.Screen name="SellerView" component={SellerView} />
          <Stack.Screen name="SellerListingDetails" component={SellerListingDetails} />
          {/* Chat Screens */}
          <Stack.Screen name="ChatScreenCustomer" component={ChatScreenCustomer} />
          {/* Customer Screen */}
          <Stack.Screen name="BuyCustomerScreen" component={BuyCustomerScreen} />
          <Stack.Screen name="AllButchersScreen" component={AllButchersScreen} />
          <Stack.Screen name="AllRidersScreen" component={AllRidersScreen} />
          <Stack.Screen name="AllSlaughterHousesScreen" component={AllSlaughterHousesScreen} />
          <Stack.Screen name="AllBookingsCustomer" component={AllBookingsCustomer} />
          {/* Booking Details */}
          <Stack.Screen name="BookingDetailsRider" component={BookingDetailsRider} />
          <Stack.Screen name="BookingDetailsButcher" component={BookingDetailsButcher} />
          <Stack.Screen name="BookingDetailsSlaughterHouse" component={BookingDetailsSlaughterHouse} />
          {/* Service Provider Screens */}               
          <Stack.Screen name="ChatScreenServiceProvider" component={ChatScreenServiceProvider} />
          <Stack.Screen name="ServiceProviderProfile" component={ServiceProviderProfile} />                    
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
