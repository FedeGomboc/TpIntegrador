import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking, Alert, Platform, ImageBackground} from "react-native";
import ConfiguracionService from "../services/ConfiguracionService";
import MenuReutilizable from "../components/MenuReutilizable";
import { Accelerometer } from 'expo-sensors';
import { Vibration } from 'react-native';
import Helper from '../components/Helper';
import Mensajes from '../constants/Mensajes';



let configurationService = new ConfiguracionService();

export default function EmergenciaScreen({navigation}){
  const [{ x, y, z }, setData] = useState({x: 0, y: 0, z: 0});
  const [subscription, setSubscription] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [acceso, setAcceso] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [fondo, setUrlFondo] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);
  
  const llamarNumero = ({texto}) => {
    console.log('callNumber ----> ', texto);
    const phoneNumber = texto;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${texto}`;
    }
    else {
      phoneNumber = `tel:${texto}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Número telefónico NO disponible');
      } else {
        return Linking.openURL(phoneNumber)
      }
    })
    .catch(err => console.error('An error occurred', err))
  }  


  const _subscribe = () => {
    let aux;
    setSubscription(Accelerometer.addListener(async(dataAccelerometer) => {
      aux = x;
      if (dataAccelerometer.x < aux) {
        if ((aux - dataAccelerometer.x) > 0.5) {
          let datos = await configurationService.obtenerDatos();
          let telefono = datos.telefono;
          if (telefono) {
            callNumber(telefono)
          } else {
            setMensajeModal(Mensajes.MSG_TELEFONO_UNDEFINED);
            setModalVisible(true)
          }
          Vibration.vibrate();
        }
      } else {
        if ((dataAccelerometer.x - aux) > 0.5) {
          if ((aux - dataAccelerometer.x) > 0.5) {
            let datos = await configurationService.obtenerDatos();
            let telefono = datos.telefono;
            if (telefono) {
              callNumber(telefono)
            } else {
              setMensajeModal(Mensajes.MSG_TELEFONO_UNDEFINED);
              setModalVisible(true)
            }
            Vibration.vibrate();
          }
        }
      }
      setData(dataAccelerometer);
    }));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  let cargarFondo = async () => {
    if(JSON.parse(await configurationService.obtenerFondo())){
      let fondo = JSON.parse(await configurationService.obtenerFondo());
      setUrlFondo(fondo.uri);
    }    
  }
  
  useEffect(() => {
    cargarFondo();
    _subscribe();
    _slow();
    return () => _unsubscribe();    
  }, []);


  return (
          <View style={styles.container}>
           <ImageBackground source={{uri: fondo}} style={styles.image}>
              <Text style={{backgroundColor:'white', fontSize: 18, width: '75%', textAlign:'center'}}>AGITA el celular para llamar a tu contacto de emergencia</Text>
              <Helper mensaje={mensajeModal} modalVisible={modalVisible} setModalVisible={setModalVisible} acceso={acceso}/>
            </ImageBackground>
            <MenuReutilizable navigation={navigation}/>
          </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    image: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
})