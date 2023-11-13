import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ConfiguracionScreen from "./src/screens/ConfiguracionScreen";
import CambioFondoScreen from "./src/screens/CambioFondoScreen";
import CamaraScreen from './src/screens/CamaraScreen';
import AcercaDeScreen from './src/screens/AcercaDeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
       <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ConfiguracionScreen" component={ConfiguracionScreen}/>
        <Stack.Screen name="CambioFondoScreen" component={CambioFondoScreen} />
        <Stack.Screen name="CamaraScreen" component={CamaraScreen} />
        <Stack.Screen name="AcercaDeScreen" component={AcercaDeScreen} />
      </Stack.Navigator>
       </NavigationContainer>
    </>
  );
}