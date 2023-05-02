import { StyleSheet, Text, View, Image} from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

export function DetailsScreen({ route }) {
  const { itemId } = route.params;
  const [item, setItem] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [fullAddress, setFullAddress] = useState(null)
  const apiKey = 'AIzaSyBpRjBqpzfIf1SIOEyKkTpWlZ6AxY5-wAY'; 

  useEffect(() => {
    axios
      .get(`https://victvs.onrender.com/api/data/${itemId}`)
      .then((response) => {
        console.log(response.config.url)
        const datapoint = response.data.data[0];
        setItem(datapoint);
        setLat(datapoint.latitude);
        setLng(datapoint.longitude);
      })
      .catch((error) => {
        console.log(error, 'newERRROROROO');
      });
  }, [itemId]);

  useEffect(() => {
    if (lat !== null && lng !== null) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        )
        .then((response) => {
          setFullAddress(response.data.results[0].formatted_address);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [lat, lng, apiKey]);

  if (lat === null || lng === null) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={require('./VICTVS.png')} style={styles.image} />
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.candidate}>{item.candidatename}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.010,
        }}
      >
        <Marker coordinate={{latitude:lat, longitude: lng}} />
      </MapView>
      <Text style={styles.candidate}>Exam Details</Text>
      <View style={styles.textContainer}>
        <Text style={styles.date}>                   {item.date}</Text>
        <Text style={styles.address}>    {fullAddress}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  textContainer: {
    padding: 20,
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  candidate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    marginBottom: 10,
    color: '#fff',
  },
  address: {
    fontSize:14,
    marginBottom:10,
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
})
