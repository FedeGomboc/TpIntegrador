import React, {useState, useEffect} from 'react'
import {Text, View, Button } from "react-native";

function MultimediaScreen() {
  
  const [sound, setSound] = useState();
  const [isReproducing, setIsReproducing] = useState(false);

  let selectSound = async () => {
    if(isReproducing && sound != undefined){
        setIsReproducing(false)
        console.log('Unloading Sound');
        await sound.pauseAsync();
        sound.unloadAsync();
    }else{
        console.log('Loading Sound');
        if (audioObject.type === 'url') {
            const { sound } = await Audio.Sound.createAsync({ uri: audioObject.sound }, { volume: 0.8 },);
            setSound(sound);
        } else {
            const { sound } = await Audio.Sound.createAsync(audioObject.sound)
            setSound(sound);            
        }
    }        
}

let playSound = async () => {
    setIsReproducing(true)
    console.log('Playing Sound');
    await sound.playAsync();        
}

useEffect(() => {
    if(sound != undefined){
        playSound();            
    }           
}, [sound]);

let audioContainer = {
    width: '50%',
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: isReproducing ? 'green' : 'white'
}

  return (
    <View>
      <Text>MultimediaScreen</Text>
    </View>
  )
}

export default MultimediaScreen