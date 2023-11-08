import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { BackHandler, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function App() {
  const [city, setCity] = useState('')
  const [weatherTopic, setWeatherTopic] = useState(['Local', 'Temperature', 'Wind', 'Humidity', 'Visibility', 'Sunrise', 'Sunset'])
  const [weatherInfo, setWeatherInfo] = useState(new Array(7))

  function searchCityWeather(){
    console.log(city);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <Text>
          Procurar Cidade
        </Text>
        <Text>
            Digite o nome da Cidade
          </Text>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <TextInput style={{flex: 1, height: 40, borderBottomWidth: 1, marginRight: 15}}
          value={city} onChangeText={setCity}/>
          <TouchableHighlight style={styles.button} onPress={searchCityWeather}>
            <Text>Previsão do Tempo</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.weatherInfo}>
        {
           weatherTopic.map((w, i) => {
            
            return <>
              <Text style={[styles.weatherDesc,styles.weatherTopic]}>
                {w}
              </Text>
              <Text style={[styles.weatherDesc, styles.weatherValue]}>
                {weatherInfo[i]}
              </Text>
            </>
           })
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  searchArea: {
    backgroundColor: 'gray',
    flexDirection: 'column',
    width: '100%',
    padding: 20,
    paddingTop: 40,
    flex: 1
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
    justifyContent:  'center'
  },
  weatherDesc: {
    textAlign: 'left'
  },
  weatherInfo: {
    flex: 6,
    width: '100%',
    padding: 20
  },
  weatherTopic: {
    color: 'gray'
  },
  weatherValue: {
    color: 'black'
  }
});
