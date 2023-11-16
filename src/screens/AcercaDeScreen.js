import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MenuReutilizable from "../components/MenuReutilizable";
import { useFonts } from "expo-font";
import Clipboard from "@react-native-community/clipboard";
import BotonReutilizable from "../components/BotonReutilizable";

function AcercaDeScreen() {
  const [textoCopiado, setTextoCopiado] = useState("")

  let [fontsLoaded] = useFonts({
    'BarcodeFont': require("../../assets/BarcodeFont.ttf"),
    });

  const Copiar = (texto) => {
    Clipboard.setString(texto)
    alert("Texto copiado al Clipboard")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.barcode}>Federico Gomboc y Luciano Neiman</Text>
      <BotonReutilizable titulo="Copiar al Clipboard" onPress={Copiar}/>
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

export default AcercaDeScreen;
