import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export default function Helper() {

  return (
     Alert.alert("Hola")
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
    width: "33%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});