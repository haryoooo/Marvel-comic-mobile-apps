import React, {useContext} from 'react';
import {View, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import ListMovieComponent from '../Components/ListMovieComponent';
import NavbarComponent from '../Components/NavbarComponent';
import SearchBarComponent from '../Components/SearchBarComponent';
import {MovieContext} from '../Context/MovieContext';

export default function Home() {
  const movieContext = useContext(MovieContext);

  return (
    <View>
      <NavbarComponent />
      {movieContext.isSearch === true ? <SearchBarComponent /> : null}
      <ListMovieComponent />
    </View>
  );
}
