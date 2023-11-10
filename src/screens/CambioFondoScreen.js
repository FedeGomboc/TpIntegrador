import { useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import BotonReutilizable from "../components/BotonReutilizable";
import MenuReutilizable from "../components/MenuReutilizable";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import ConfiguracionService from "../services/ConfiguracionService";
import { Vibration } from "react-native";

export default function CambioFondoScreen() {
  const navigation = useNavigation();
  const [imagenFondo, setImagenFondo] = useState("");

  const guardarFondo = async () => {
    if (imagenFondo !== "") {
      await ConfiguracionService.guardarFondo(imagenFondo);
      alert("Los datos han sido guardados");
      Vibration.vibrate();
    } else {
      alert("Ha ocurrido un error");    
      console.log(error)
      Vibration.vibrate();
    }
  };

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log(
        "Permisos insuficientes para acceder a la galería de imágenes."
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.cancelled) {
        console.log("El usuario canceló la selección");
      } else {
        const path = result.assets[0].uri;
        setImagenFondo(path);
        guardarFondo()
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  return (
    <View style={styles.container}>
      <BotonReutilizable
        titulo="Sacar foto"
        onPress={() => navigation.navigate("CamaraScreen")}
      />
      <BotonReutilizable
        titulo="Galeria de fotos"
        onPress={() => seleccionarImagen()}
      />
      <MenuReutilizable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
