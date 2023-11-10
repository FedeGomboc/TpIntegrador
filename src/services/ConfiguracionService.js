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
    const returnValue = await AsyncStorage.getItem(KEY_FONDO)
    return returnValue
  };
}
