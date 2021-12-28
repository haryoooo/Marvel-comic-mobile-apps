import React, {useContext, useRef, useState} from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {MovieContext} from '../Context/MovieContext';

export default function NavbarComponent() {
  const movieContext = useContext(MovieContext);
  const pickerRef = useRef();
  const [selectedLanguage, setSelectedLanguage] = useState();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.pickerContainer}>
        <Picker
          dropdownIconColor={'white'}
          style={styles.picker}
          ref={pickerRef}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Order" value="default" />
          <Picker.Item label="Latest" value="modified" />
          <Picker.Item label="Issue Number" value="issueNumber" />
        </Picker>
      </View>
      <View style={styles.text}>
        <Image
          style={{
            width: 150,
            height: 50,
          }}
          source={require('../Assets/marvel_text.png')}
        />
      </View>
      <Pressable
        onPress={() => movieContext.setIsSearch(!movieContext.isSearch)}>
        <Image
          style={styles.iconSearch}
          source={require('../Assets/search_icon.png')}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#BD1023',
    border: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    height: 80,
  },

  pickerContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    width: 105,
    marginRight: -90,
    marginLeft: 8,
    marginVertical: 20,
  },

  picker: {
    width: 125,
    top: -10,
    marginLeft: -10,
    backgroundColor: 'transparent',
    color: 'white',
  },

  text: {
    top: 15,
    width: 130,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 18,
    color: 'white',
  },

  iconSearch: {
    top: 20,
    right: 15,
    width: 30,
    height: 30,
  },

  iconMenu: {
    top: 20,
    left: 10,
    width: 30,
    height: 30,
  },
});
