import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ImageBackground } from "react-native";
import ConfiguracionService from "../services/ConfiguracionService";
import BotonReutilizable from "../components/BotonReutilizable";
import { Vibration } from "react-native";
import MenuReutilizable from "../components/MenuReutilizable";
import Mensajes from '../constants/Mensajes'
import Helper from '../components/Helper'


let configurationService = new ConfiguracionService();

export default function ConfiguracionScreen({ navigation }) {
  const [numero, setNumero] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [urlMusica, setUrlMusica] = useState("");
  const [urlFondo, setUrlFondo] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [acceso, setAcceso] = useState(false);
  
  

  const guardarDatos = async () => {
    if (numero !== "" && urlVideo !== "" && urlMusica !== "") {
      if (await configurationService.guardarDatos(numero, urlVideo, urlMusica)) {
        setMensajeModal(Mensajes.MSG_DATOS_GUARDADOS);//es para que la alerta pueda tener un estilo (lo pide la consigna)
        setAcceso(true)
      } else {
        setMensajeModal(Mensajes.MSG_GUARDADO_FALLIDO);
        setAcceso(false)
      } 
    } else {
      setMensajeModal(Mensajes.MSG_CAMPOS_INCOMPLETOS);
      setAcceso(false)
    }
    setModalVisible(true)
  };

  let cargarFondo = async () => {
    if (JSON.parse(await configurationService.obtenerFondo())) {
      let imgFondo = JSON.parse(await dataService.obtenerBackground());
      setUrlFondo(imgFondo.uri);
    }
  }

  useEffect(() => {
    cargarFondo();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: urlFondo }} style={styles.image}>
        <Text>Telefono</Text>
        <TextInput
          editable
          style={styles.input}
          placeholder="Ingrese un telefono de emergencia"
          onChangeText={setNumero}
          value={numero}
          keyboardType="numeric"
        />

        <Text>Video</Text>
        <TextInput
          editable
          style={styles.input}
          onChangeText={setUrlVideo}
          placeholder="Ingrese una url de un video"
          value={urlVideo}
        />

        <Text>Musica</Text>
        <TextInput
          editable
          style={styles.input}
          onChangeText={setUrlMusica}
          placeholder="Ingrese una url de una cancion"
          value={urlMusica}
        />
        <BotonReutilizable titulo="Guardar" onPress={guardarDatos}/>
      </ImageBackground>
      <Helper mensaje={mensajeModal} modalVisible={modalVisible} setModalVisible={setModalVisible} acceso={acceso} />
      <MenuReutilizable navigation={navigation}/>
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
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});