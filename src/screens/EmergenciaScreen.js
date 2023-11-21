import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import MenuReutilizable from '../components/MenuReutilizable';
import ConfiguracionService from '../services/ConfiguracionService';
import { Accelerometer } from 'expo-sensors';

function EmergenciaScreen() {

  const [numero, setNumero] = useState()

  useEffect(() => {
    cargarDatos()
  }, []);

  const cargarDatos = async () => {
    if (await ConfiguracionService.obtenerDatos()) {
        let datos = await ConfiguracionService.obtenerDatos();
        if (datos.numero) {
            setNumero(datos.numero)
        }
      }
  }

  return (
    <View style={styles.container}>
      <Text>Numero: </Text>
      <MenuReutilizable/>
    </View>
  )
}

export default EmergenciaScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },

  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
