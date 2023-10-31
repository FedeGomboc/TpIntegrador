import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ConfiguracionScreen from "./src/screens/ConfiguracionScreen";
import AcercaDeScreen from "./src/screens/AcercaDeScreen";
import EmergenciaScreen from "./src/screens/EmergenciaScreen";
import MultimediaScreen from "./src/screens/MultimediaScreen";
import CambioFondoScreen from "./src/screens/CambioFondoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
       <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ConfiguracionScreen" component={ConfiguracionScreen}/>
        <Stack.Screen name="CambioFondoScreen" component={CambioFondoScreen} />
      </Stack.Navigator>
       </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
