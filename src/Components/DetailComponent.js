import axios from 'axios';
import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {API_KEY, hash} from '../Helpers/apiConfig';
import {url} from '../Helpers/urlConfig';

export default function DetailComponent({comicId, display, setDisplay}) {
  const [detailMovie, setDetailMovie] = useState({
    isLoading: false,
    items: [],
    parameters: {
      ts: 1,
      apikey: API_KEY,
      hash: hash,
    },
  });

  const fetchDetailComponent = () => {
    setDetailMovie(prev => ({
      ...prev,
      isLoading: true,
    }));
    axios
      .get(`${url}/${comicId}?${queryString.stringify(detailMovie.parameters)}`)
      .then(response => {
        setDetailMovie(prev => ({
          ...prev,
          isLoading: false,
          items: response.data.data.results,
        }));
      })

      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (comicId) {
      fetchDetailComponent();
    }
  }, [comicId, display]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={display}
        onRequestClose={setDisplay}>
        {detailMovie?.items?.map((value, i) => {
          return (
            <View style={styles.modalView} key={i}>
              <Text style={styles.modalText}>{value?.title}</Text>
              <Text style={styles.modalText}>
                {value?.description !== null
                  ? value.description
                  : 'No Description'}
              </Text>
              {/* {value.creators.items.map(value => {
                return (
                  <>
                    <Text>{value.name}</Text>
                    <Text>{value.role}</Text>
                  </>
                );
              })}
              {value.characters.items.map(value => {
                return (
                  <>
                    <Text>{value.name}</Text>
                  </>
                );
              })} */}
            </View>
          );
        })}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: 15,
    marginTop: '60%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'justify',
    fontFamily: 'poppins',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});
