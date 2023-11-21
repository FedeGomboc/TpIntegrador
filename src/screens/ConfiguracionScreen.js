import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Vibration, ImageBackground  } from "react-native";
import ConfiguracionService from "../services/ConfiguracionService";
import BotonReutilizable from "../components/BotonReutilizable";
import MenuReutilizable from "../components/MenuReutilizable";
import MensajeModal from "../components/MensajeModal";
import Mensaje from "../constants/Mensajes"
import {useNavigation} from "@react-navigation/native";
import { Navigation } from "react-native-navigation";

export default function ConfiguracionScreen() {
  const [numero, setNumero] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [urlMusica, serUrlMusica] = useState("");
  const [imagenFondo, setImagenFondo] = useState("https://img.freepik.com/foto-gratis/resumen-superficie-texturas-muro-piedra-hormigon-blanco_74190-8189.jpg");
  const [mensaje, setMensaje] = useState("");
  const [verModal, setVerModal] = useState(false);
  const [acceso, setAcceso] = useState(false);

  const navigation = useNavigation(); 

  useEffect(() => {
    const recibirFondo = async () => {
      let recibir = await ConfiguracionService.obtenerFondo();
      setImagenFondo(recibir);
    };
    recibirFondo();
  }, [navigation]);//probar con Navigation

  const guardarDatos = async () => {
    if (numero !== "" && urlVideo !== "" && urlMusica !== "") {
      if(await ConfiguracionService.guardarDatos(numero, urlVideo, urlMusica)){
        setMensaje(Mensaje.MSG_DATOS_GUARDADOS);       
        setAcceso(true)
        Vibration.vibrate();
      } else{
        setMensaje(Mensaje.MSG_GUARDADO_FALLIDO);
        setAcceso(false)
        Vibration.vibrate();
      }
    } else {
      setMensaje(Mensaje.MSG_CAMPOS_INCOMPLETOS);
      setAcceso(false)
      Vibration.vibrate();
    }
    setVerModal(true)
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
          editable
          style={styles.input}
          placeholder="Ingrese un número telefonico"
          onChangeText={setNumero}
          value={numero}
          keyboardType="numeric"
        />

        <Text>Ingrese la url del video</Text>
        <TextInput
          editable
          style={styles.input}
          placeholder="Ingrese una URL"
          onChangeText={setUrlVideo}
          value={urlVideo}
        />

        <Text>Ingrese la url de la musica de fondo</Text>
        <TextInput
          editable
          style={styles.input}
          placeholder="Ingrese una URL"
          onChangeText={serUrlMusica}
          value={urlMusica}
        />

        <BotonReutilizable titulo="Guardar" onPress={guardarDatos} />
      </ImageBackground>
      <MensajeModal mensaje={mensaje} verModal={verModal} setVerModal={setVerModal} acceso={acceso} />
      <MenuReutilizable navigation={navigation}/>
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
