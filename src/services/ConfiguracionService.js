import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vibration } from "react-native";

const KEY_NUMERO = "numero";
const KEY_VIDEO = "video";
const KEY_MUSICA = "musica";
const KEY_FONDO = "fondo";

export default class ConfiguracionService {
  static guardarDatos = async (numero, urlVideo, urlMusica) => {
    try {
      await AsyncStorage.setItem(KEY_NUMERO, numero);
      await AsyncStorage.setItem(KEY_VIDEO, urlVideo);
      await AsyncStorage.setItem(KEY_MUSICA, urlMusica);
    } catch (error) {
      console.log(error);
      Vibration.vibrate();
    }
  };

  static guardarFondo = async (fondo) => {
    try {
      await AsyncStorage.setItem(KEY_FONDO, fondo);
    } catch (error) {
      console.log(error);
      Vibration.vibrate();
    }
  };

  static obtenerFondo = async () => {
    let storedBackground = await AsyncStorage.getItem(KEY_FONDO);
    const returnValue = storedBackground;
    return returnValue;
  };

  static obtenerDatos = async () => {
    let numero = await AsyncStorage.getItem(KEY_NUMERO);
    let video = await AsyncStorage.getItem(KEY_VIDEO);
    let musica = await AsyncStorage.getItem(KEY_MUSICA);
    const returnValue = {
      telefono: numero,
      video: video,
      musica: musica,
    };
    return returnValue;
  };

  static eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem(KEY_NUMERO);
      await AsyncStorage.removeItem(KEY_VIDEO);
      await AsyncStorage.removeItem(KEY_MUSICA);
    } catch (error) {
      console.log(error);
    }
  };
}
