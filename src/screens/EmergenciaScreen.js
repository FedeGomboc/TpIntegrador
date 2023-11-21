import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import MenuReutilizable from "../components/MenuReutilizable";
import ConfiguracionService from "../services/ConfiguracionService";
import { Accelerometer } from "expo-sensors";
import call from "react-native-phone-call";

export default function EmergenciaScreen() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [telefono, setTelefono] = useState();
  const [image, setImage] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);

  useEffect(() => {
    cargarDatos();
    _subscribe();
    _slow();
    return () => _unsubscribe();
  }, []);

  let loadBackground = async () => {
    if (JSON.parse(await ConfiguracionService.obtenerFondo())) {
      let backgroundImage = JSON.parse(
        await ConfiguracionService.obtenerFondo()
      );
      setImage(backgroundImage.uri);
    }
  };

  useEffect(() => {
    loadBackground();
  }, []);

  const checkNumber = async () => {
    datos = await ConfiguracionService.obtenerDatos();
    setTelefono(datos.telefono);
    llamarNumero(datos.telefono);
  };

  const _subscribe = () => {
    let auxiliarX;
    setSubscription(
      Accelerometer.addListener(async (accelerometerData) => {
        auxiliarX = x;
        if (accelerometerData.x < auxiliarX) {
          if (auxiliarX - accelerometerData.x > 0.5) {
            checkNumber();
          }
        } else {
          if (accelerometerData.x - auxiliarX > 0.5) {
            if (auxiliarX - accelerometerData.x > 0.5) {
              checkNumber();
            }
          }
        }
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const cargarDatos = async () => {
    if (await ConfiguracionService.obtenerDatos()) {
      let datos = await ConfiguracionService.obtenerDatos();
      if (datos.telefono) {
        setTelefono(datos.telefono);
      }
    }
  };

  const llamarNumero = (telefono) => {
    const args = {
      number: telefono, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
      skipCanOpen: true, // Skip the canOpenURL check
    };

    call(args).catch(console.error);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: image }}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}>Numero: {telefono}</Text>
        <Text style={styles.text}>
          Agita el celular para llamar a tu contacto de emergencia
        </Text>
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
    width: "100%",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    backgroundColor: "white",
    fontSize: 20,
    width: "80%",
    textAlign: "center",
  },
});
