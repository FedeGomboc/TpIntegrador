import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MenuReutilizable() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.boton} onPress={() => navigation.navigate("ConfiguracionScreen")}>
        <Text>Configuracion</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => navigation.navigate("CambioFondoScreen")}>
        <Text>Cambio Fondo</Text>
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
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});