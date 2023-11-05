import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vibration } from "react-native";

const KEY_NUMERO = "numero"
const KEY_VIDEO = "video"
const KEY_MUSICA = "musica"
const KEY_FONDO = "fondo"

export default class ConfiguracionService {
    guardarDatos = async (numero, urlVideo, urlMusica) => {
        try{
            await AsyncStorage.setItem(KEY_NUMERO, numero)
            await AsyncStorage.setItem(KEY_VIDEO, urlVideo)
            await AsyncStorage.setItem(KEY_MUSICA, urlMusica)
        } catch (error) {
            console.log(error)
            Vibration.vibrate()
        }
    }

    eliminarDatos = async() => { 
        try{
            await AsyncStorage.removeItem(KEY_NUMERO); 
            await AsyncStorage.removeItem(KEY_VIDEO); 
            await AsyncStorage.removeItem(KEY_MUSICA); 
        }catch(e){
            console.log(e);
        }
    }; 

    guardarFondo = async(fondo) => { 
        try {    
            await AsyncStorage.setItem(KEY_FONDO, fondo);  
            return true;
        } catch(e) {    
            console.log(e);
            return false;
        }
    }; 

    obtenerFondo = async() => { 
        let storedFondo = await AsyncStorage.getItem(KEY_FONDO);
        const returnValue = storedFondo; 
        return returnValue; 
    }; 

    obtenerDatos = async() => { 
        let storedNumero = await AsyncStorage.getItem(KEY_NUMERO);
        let storedVideo = await AsyncStorage.getItem(KEY_VIDEO);
        let storedMusica = await AsyncStorage.getItem(KEY_MUSICA);
        const returnValue = {'numero':storedNumero, 'video':storedVideo, 'musica':storedMusica}; 
        return returnValue; 
    }; 
}