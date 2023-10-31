import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Pressable } from "react-native";

export default function BotonReutilizable({ onPress, style, titulo }) {
  const handleOnPress = () => {
    if (typeof onPress === "function"){
      onPress()
    }
  }

  return (
    <Pressable style={[styles.boton, style]} onPress={handleOnPress}>
      <Text style={styles.text}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    borderRadius: 20,
    backgroundColor: "#007AFF",
    marginTop: 10,
    width: "90%",
    height: 60,
  },
  text: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 18
  }
});