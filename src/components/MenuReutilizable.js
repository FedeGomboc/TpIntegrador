import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MenuReutilizable() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.boton} onPress={() => navigation.navigate("ConfiguracionScreen")}>
        <Text style={styles.text}>Configuración</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => navigation.navigate("CambioFondoScreen")}>
        <Text style={styles.text}>Fondo</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => navigation.navigate("AcercaDeScreen")}>
        <Text style={styles.text}>Acerca de</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => navigation.navigate("MultimediaScreen")}>
        <Text style={styles.text}>Multimedia</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => navigation.navigate("EmergenciaScreen")}>
        <Text style={styles.text}>Emergencia</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
    position: "absolute",
    bottom: 0,
  },
  boton: {
    width: "20%",
    height: "100%",
    display: "flex",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 10
  },
  text: {
    textAlign: "center",
    color: 'black',
  },
});