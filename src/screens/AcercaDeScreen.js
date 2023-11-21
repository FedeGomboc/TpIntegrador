import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import MenuReutilizable from "../components/MenuReutilizable";
import * as Font from "expo-font";
import BotonReutilizable from "../components/BotonReutilizable";
import ConfiguracionService from "../services/ConfiguracionService";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableOpacity } from "react-native";

export default function AcercaDeScreen() {
  const [textoCopiado, setTextoCopiado] = useState("");
  const [imagenFondo, setImagenFondo] = useState(
    "https://img.freepik.com/foto-gratis/resumen-superficie-texturas-muro-piedra-hormigon-blanco_74190-8189.jpg"
  );
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    const recibirFondo = async () => {
      let recibir = await ConfiguracionService.obtenerFondo();
      setImagenFondo(recibir);
    };
    recibirFondo();
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      font: require("../../assets/fonts/BarcodeFont.ttf"),
    });
    setFontsLoaded(true);
  }

  const Copiar = async (texto) => {
    await Clipboard.setStringAsync(texto);
    alert("Texto copiado al Clipboard");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imagenFondo }}
        resizeMode="cover"
        style={styles.image}
      >
         {fontsLoaded ? (
              <TouchableOpacity onPress={() => Copiar()}>
                <Text style={{ fontSize: 20 }}>FEDERICO GOMBOC Y LUCIANO NEIMAN</Text>
                <Text style={{ fontFamily: 'font', fontSize: 60 }}>FEDERICO GOMBOC Y LUCIANO NEIMAN</Text>
              </TouchableOpacity>
          ) : (
            <Text>Error</Text>
          )}
        <BotonReutilizable titulo="Copiar al Clipboard" onPress={Copiar} />
      </ImageBackground>
      <MenuReutilizable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
