import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MenuReutilizable from "../components/MenuReutilizable";
import { useFonts } from "expo-font";
import * as Font from 'expo-font';
import * as Clipboard from 'expo-clipboard';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BotonReutilizable from "../components/BotonReutilizable";
import ConfiguracionService from "../services/ConfiguracionService";
import {useNavigation} from "@react-navigation/native";

export default function AcercaDeScreen(navigation) {
  const [textoCopiado, setTextoCopiado] = useState("")
  const [imagenFondo, setImagenFondo] = useState("https://img.freepik.com/foto-gratis/resumen-superficie-texturas-muro-piedra-hormigon-blanco_74190-8189.jpg");

  let configService = new ConfiguracionService();
  const navigation = useNavigation();


  useEffect(() => {
    const recibirFondo = async () => {
      let recibir = await configService.obtenerFondo();
      setImagenFondo(recibir);
    };
    recibirFondo();
  }, []);


  let [fontsLoaded] = useFonts({
    'BarcodeFont': require("../../assets/BarcodeFont.ttf"),
  });

  const Copiar = (texto) => {
    Clipboard.setString(texto)
    alert("Texto copiado al Clipboard")
  }


  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imagenFondo }}
        resizeMode="cover"
        style={styles.image}
      >
      <Text style={styles.barcode}>Federico Gomboc y Luciano Neiman</Text>
      <BotonReutilizable titulo="Copiar al Clipboard" onPress={Copiar}/>
      </ImageBackground>
      <MenuReutilizable/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  barcode: {
    fontFamily: "BarcodeFont",
    fontSize: 65,
  },
})