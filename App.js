/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MovieContextProvider from './src/Context/MovieContext';
import Home from './src/Screens/Home';

const App = () => {
  return (
    <MovieContextProvider>
      <SafeAreaView>
        <StatusBar />
        <ScrollView>
          <View>
            <Home />
          </View>
        </ScrollView>
      </SafeAreaView>
    </MovieContextProvider>
  );
};

export default App;
