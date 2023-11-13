import { useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import ConfiguracionService from "../services/ConfiguracionService";
import BotonReutilizable from "../components/BotonReutilizable";
import { Vibration } from "react-native";
import MenuReutilizable from "../components/MenuReutilizable";
import { ImageBackground } from "react-native";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import useNavigation from "@react-navigation/native";

export default function ConfiguracionScreen() {
  const [numero, setNumero] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [urlMusica, serUrlMusica] = useState("");
  const [imagenFondo, setImagenFondo] = useState("https://img.freepik.com/foto-gratis/resumen-superficie-texturas-muro-piedra-hormigon-blanco_74190-8189.jpg");

/*   const isFocused = useIsFocused()
  const navigation = useNavigation(); */

  useEffect(() => {
    const recibirFondo = async () => {
      let recibir = await ConfiguracionService.obtenerFondo();
      setImagenFondo(recibir);
    };
    recibirFondo();
  }, []);

  const guardarDatos = async () => {
    if (numero !== "" && urlVideo !== "" && urlMusica !== "") {
      await ConfiguracionService.guardarDatos(numero, urlVideo, urlMusica);
      alert("Los datos han sido guardados");
      Vibration.vibrate();
    } else {
      alert("Es necesario completar todos los datos");
      Vibration.vibrate();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imagenFondo }}
        resizeMode="cover"
        style={styles.image}
      >
        <Text>Ingrese el numero de emergencia</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNumero}
          value={numero}
          keyboardType="numeric"
        />

        <Text>Ingrese la url del video</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUrlVideo}
          value={urlVideo}
        />

        <Text>Ingrese la url de la musica de fondo</Text>
        <TextInput
          style={styles.input}
          onChangeText={serUrlMusica}
          value={urlMusica}
        />

        <BotonReutilizable titulo="Guardar" onPress={guardarDatos} />
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
  input: {
    backgroundColor: "lightgray",
    borderRadius: 23,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 8,
    justifyContent: "center",
    borderColor: "#00716F",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
