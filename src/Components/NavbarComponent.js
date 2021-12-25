import React, {useContext} from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {MovieContext} from '../Context/MovieContext';

export default function NavbarComponent() {
  const movieContext = useContext(MovieContext);

  return (
    <View style={styles.navbarContainer}>
      <Image
        style={styles.iconMenu}
        source={require('../Assets/burger_menu.png')}
      />
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
