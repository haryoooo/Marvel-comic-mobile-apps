import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {MovieContext} from '../Context/MovieContext';

export default function SearchBarComponent() {
  const movieContext = useContext(MovieContext);
  const [value, setValue] = useState('');

  const updateSearch = search => {
    movieContext.setMovie(prev => ({
      ...prev,
      titleStartsWith: search,
    }));
    setValue(search);
  };

  return (
    <View>
      <SearchBar
        lightTheme="true"
        platform="default"
        placeholder="Type Here..."
        onChangeText={text => updateSearch(text)}
        value={value}
      />
    </View>
  );
}
