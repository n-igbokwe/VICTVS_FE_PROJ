import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios'

export function Datalist() {
    const [data, setData] = useState(null);
    const [sortBy, setSortBy] = useState('Date')
    const [orderBy, setOrderBy] = useState('asc')
    const [locationFilter, setLocationFilter] = useState([])
    const [nameFilter, setNameFilter] = useState([])
    const [location, setLocation] = useState()
    const [name, setName] = useState()
    const navigation = useNavigation();
    const [isLocationOpen, setIsLocationOpen] = useState(false); 
    const [isNameOpen, setIsNameOpen] = useState(false);
  

    function openLocation() {
      setIsLocationOpen(true);
      setIsNameOpen(false);
    }
    
    function closeLocation() {
      setIsLocationOpen(false);
    }
  
    function openName() {
      setIsNameOpen(true);
      setIsLocationOpen(false);

    }
    
    function closeName() {
      setIsNameOpen(false);
    }

    function reset() {
        setLocation(null);
        setName(null);
      }

      useEffect(() => {
        let url = `https://victvs.onrender.com/api/data?order=${orderBy}&sort_by=${sortBy}`;
        if (location) {
          url += `&LocationName=${location.label}`;
        }
        if (name) {
          url += `&CandidateName=${name.label}`;
        }
      
        axios.get(url)
          .then((response) => {
            console.log(url)
            setData(response.data);
            const locationArr = [];
            const nameArr = [];
            const dateArr = [];
            response.data.data.map((item) => {
              locationArr.push(item.locationname);
              nameArr.push(item.candidatename);
              dateArr.push(item.date);
            });
            setLocationFilter([...new Set(locationArr)]);
            setNameFilter([...new Set(nameArr)]);
          })
          .catch((error) => {
            console.log(error, "<---CAUGHT ERROR");
          });
      }, [sortBy, orderBy, location, name]);
  
    const handlePress = (id) => {
      navigation.navigate('DetailsScreen', { itemId: id });
    };
    
    return (
      <View>
        <DropDownPicker
  items={locationFilter.map((location) => ({ label: location, value: location }))}
  value={location}
  onSelectItem={(itemValue) => setLocation(itemValue)}
  placeholder={'Select a location'}
  open={isLocationOpen}
  onOpen={openLocation}
  onClose={closeLocation}
  zIndex={3000}
  zIndexInverse={1000}
/>
  
<DropDownPicker
  items={nameFilter.map((name) => ({ label: name, value: name }))}
  value={name}
  onSelectItem={(itemValue) => setName(itemValue)}
  placeholder="Select a name"
  open={isNameOpen}
  onOpen={openName}
  onClose={closeName}
  zIndex={1000}
  zIndexInverse={3000}

/>
<View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setOrderBy('asc')}>
          <Text style={styles.buttonText}>date ascending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setOrderBy('desc')}>
          <Text style={styles.buttonText}>date descending</Text>
        </TouchableOpacity>
    </View>

   <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>                                       Reset filters</Text>
        </TouchableOpacity>
      </View>

      

      {data !== null ? (
        <ScrollView style={{height:600}}>
          {data.data.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => handlePress(item.id)}>
              <View>
                <Text style={styles.itemId}>{item.description}</Text>
                <Text style={styles.itemDescription}>{item.date}</Text>
                <Text style={styles.itemDescription}>{item.candidatename}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 20,
        margin: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'normal',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },
    itemId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    itemDescription: {
        fontSize: 16,
    },
});