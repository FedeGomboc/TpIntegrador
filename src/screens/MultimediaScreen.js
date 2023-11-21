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

function MultimediaScreen() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [videoUrl, setVideoUrl] = useState(undefined)
  const [musicaUrl, setMusicaUrl] = useState(undefined)
  const [sound, setSound] = useState()

  useEffect(() => {
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
      <MenuReutilizable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "80%",
    height: 200,
  },
});

export default MultimediaScreen;
