import { Provider } from "react-redux";
import { store } from "./store/store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./pages/login";
import RegisterScreen from "./pages/register"; 
import HomeScreen from "./pages/Home";
import ProductDetailScreen from "./pages/productDetailScreen";
import CartScreen from "./pages/cart";
import ForgotPasswordScreen from "./pages/ForgotPassWordScreen";
import ResetPasswordScreen from "./pages/ResetPassWordScreen";
import CheckoutScreen from "./pages/Screen/CheckOutScreen";
import PotDetailScreen from "./pages/Screen/PotDetailScreen";
import AccessoryDetailScreen from "./pages/Screen/AccessoryDetailScreen";
import NotificationScreen from "./pages/Screen/NotificationSceen";
import SearchScreen from "./pages/Screen/SearchScreen";
import ProfileScreen  from "./pages/Screen/ProfileScreen";
import EditProfileScreen from "./pages/Screen/EditProfileScreen";
import PaymentScreen from "./pages/Screen/PaymentScreen";
import SuccessScreen from "./pages/Screen/SuccessScreen";
import GuideScreen from "./pages/Screen/GuideScreen";
const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="ProductDetail" component={ProductDetailScreen}/>
                    <Stack.Screen name="CartScreen" component={CartScreen} />
                    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
                    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
                    <Stack.Screen name="CheckoutScreen" component={CheckoutScreen}/>
                    <Stack.Screen name="AccessoryDetail" component={AccessoryDetailScreen}/>
                    <Stack.Screen name="PotDetail" component={PotDetailScreen}/>
                    <Stack.Screen name="NotificationScreen" component={NotificationScreen}/>
                    <Stack.Screen name="SearchScreen" component={SearchScreen}/>
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
                    <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
                    <Stack.Screen name ="PaymentScreen" component={PaymentScreen}/>
                    <Stack.Screen name ="SuccessScreen" component={SuccessScreen}/>
                    <Stack.Screen name ="GuideScreen" component={GuideScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
