import { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Vibration } from "react-native";
import BotonReutilizable from "../components/BotonReutilizable";
import MenuReutilizable from "../components/MenuReutilizable";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import ConfiguracionService from "../services/ConfiguracionService";

export default function CambioFondoScreen() {
  
  const navigation = useNavigation();

  const [image, setImage] = useState("https://img.freepik.com/foto-gratis/resumen-superficie-texturas-muro-piedra-hormigon-blanco_74190-8189.jpg");

  /* useEffect(() => {
    if (imagenFondo !== "" && imagenFondo !== "https://img.freepik.com/foto-gratis/resumen-superficie-texturas-muro-piedra-hormigon-blanco_74190-8189.jpg"){
      guardarFondo()
    }
  }, [imagenFondo]); */

  let loadBackground = async () => {
    if (JSON.parse(await ConfiguracionService.obtenerFondo())) {
      let backgroundImage = JSON.parse(await ConfiguracionService.obtenerFondo());
      setImage(backgroundImage.uri);
    }
  }

  useEffect(() => {
    loadBackground();
  }, []);

  /* const guardarFondo = async () => {
    if (imagenFondo !== "") {
      await ConfiguracionService.guardarFondo(imagenFondo);
    } else {
      alert("Ha ocurrido un error");    
      console.log(error)
      Vibration.vibrate();
    }
  }; */

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

      if (result.canceled) {
        console.log("El usuario canceló la selección");
      } else {
        /* const path = result.assets[0].uri;
        setImagenFondo(path); */
        await ConfiguracionService.guardarFondo(JSON.stringify(result.assets[0]));
        let backgroundImage = JSON.parse(await ConfiguracionService.obtenerFondo());
        setImage(backgroundImage.uri);
      }
    } catch (error) {
      console.log("Error al seleccionar la imagen:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: image}} resizeMode="cover" style={styles.image}>
      <BotonReutilizable titulo="Sacar foto" onPress={() => navigation.navigate("CamaraScreen")}/>
      <BotonReutilizable titulo="Galeria de fotos" onPress={() => seleccionarImagen()}/>
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
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
});
