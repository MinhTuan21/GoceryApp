import { Provider } from "react-redux";
import { store } from "./store/store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./pages/login";
import RegisterScreen from "./pages/register"; 
import HomeScreen from "./pages/Home";

import CartScreen from "./pages/cart";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="CartScreen" component={CartScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
