import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import MenuReutilizable from "../components/MenuReutilizable";
import { Audio, Video } from "expo-av";
import ConfiguracionService from "../services/ConfiguracionService";
import BotonReutilizable from "../components/BotonReutilizable";
import { ImageBackground } from "react-native";

function MultimediaScreen() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [videoUrl, setVideoUrl] = useState(undefined)
  const [musicaUrl, setMusicaUrl] = useState(undefined)
  const [sound, setSound] = useState()
  const [image, setImage] = useState(null)
  

  let loadBackground = async () => {
    if (JSON.parse(await ConfiguracionService.obtenerFondo())) {
      let backgroundImage = JSON.parse(await ConfiguracionService.obtenerFondo());
      setImage(backgroundImage.uri);
    }
  }

  useEffect(() => {
    loadBackground();
    cargarDatos()
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const cargarDatos = async () => {
    if (await ConfiguracionService.obtenerDatos()) {
        let datos = await ConfiguracionService.obtenerDatos();
        if (datos.video && datos.musica) {
            setVideoUrl(datos.video)
            setMusicaUrl(datos.musica)
        }
      }
  }

  const reproducirSonido = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({uri: musicaUrl})
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
       <ImageBackground
        source={{ uri: image }}
        resizeMode="cover"
        style={styles.image}
      >
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      <BotonReutilizable onPress={reproducirSonido} titulo="Reproducir musica"/>
      <BotonReutilizable onPress={() => sound.unloadAsync()} titulo="Frenar musica"/>
      </ImageBackground>
      <MenuReutilizable />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "80%",
    height: 200,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
});

export default MultimediaScreen;
