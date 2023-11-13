import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { BackHandler, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function App() {
  const [city, setCity] = useState('')
  const [hasCheckedWeather, setHasCheckedWeather] = useState(false)
  const [weatherTopic, setWeatherTopic] = useState(['Local', 'Temperature', 'Wind', 'Humidity', 'Visibility'])
  const [weatherInfo, setWeatherInfo] = useState(new Array(5))

  function searchCityWeather(){
    setHasCheckedWeather(true)

    const path = `http://api.weatherapi.com/v1/current.json?q=${city}&key=9d38b16d3ce742c0813220400230911`


    fetch(path).then(res => res.json()).then(json => {
      console.log(json);

      setWeatherInfo([
        `${json.location.name} - ${json.location.region}`,
        `${json.current.temp_c}ºC`,
        `${json.current.wind_kph}km/h`,
        `${json.current.humidity}g/cm^3`,
        `${json.current.vis_km}km`
      ])
      })

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
            <Text>{hasCheckedWeather? 'Nova Previsão' : 'Previsão do Tempo'}</Text>
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
    paddingTop: 40
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
    flex: 1,
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
