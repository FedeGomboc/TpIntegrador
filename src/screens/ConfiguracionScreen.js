import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Vibration, ImageBackground  } from "react-native";
import ConfiguracionService from "../services/ConfiguracionService";
import BotonReutilizable from "../components/BotonReutilizable";
import MenuReutilizable from "../components/MenuReutilizable";
import ModalMensaje from "../components/ModalMensaje";
import MessageConstants from "../constants/MessageConstants";

export default function ConfiguracionScreen() {
  const [numero, setNumero] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [urlMusica, serUrlMusica] = useState("");
  const [image, setImage] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [acceso, setAcceso] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  let loadBackground = async () => {
    if (JSON.parse(await ConfiguracionService.obtenerFondo())) {
      let backgroundImage = JSON.parse(await ConfiguracionService.obtenerFondo());
      setImage(backgroundImage.uri);
    }
  }

  useEffect(() => {
    loadBackground();
  }, []);

  const guardarDatos = async () => {
    if (numero !== "" && urlVideo !== "" && urlMusica !== "") {
      if(await ConfiguracionService.guardarDatos(numero, urlVideo, urlMusica)){
        setMensajeModal(MessageConstants.MSG_DATOS_GUARDADOS);
        setSuccess(true)
      } else{
        setMensajeModal(MessageConstants.MSG_DATOS_GUARDADOS);
        setSuccess(false)
      }
    } else {
      setMensajeModal(MessageConstants.MSG_CAMPOS_INCOMPLETOS);
      setSuccess(false)
    }
    setModalVisible(true)
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: image }}
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
      <ModalMensaje mensaje={mensajeModal} modalVisible={modalVisible} setModalVisible={setModalVisible} success={success} />
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
