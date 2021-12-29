import axios from 'axios';
import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {API_KEY, hash} from '../Helpers/apiConfig';
import {url} from '../Helpers/urlConfig';
import LoadingComponent from './LoadingComponent';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={display}
        onRequestClose={setDisplay}>
        {detailMovie.isLoading === true ? (
          <View style={styles.modalView}>
            <LoadingComponent />
          </View>
        ) : (
          detailMovie?.items?.map((value, i) => {
            return (
              <View style={styles.modalView} key={i}>
                <Pressable
                  style={styles.modalIcon}
                  onPress={() => setDisplay(false)}>
                  <Icon name="close-circle-outline" size={35} />
                </Pressable>
                <Text style={styles.modalHeaderText}>{value?.title}</Text>
                {value.images.map((val, i) => {
                  return (
                    <View key={i}>
                      <Image
                        style={styles.images}
                        source={{uri: `${val.path}.${val.extension}`}}
                      />
                    </View>
                  );
                })}
                <View style={styles.modalText}>
                  <Text>
                    {value.description !== '' && value.description !== null
                      ? value.description
                      : 'No Description'}
                  </Text>
                </View>
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
          })
        )}
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: 15,
    marginTop: '30%',
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

  modalIcon: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },

  modalHeaderText: {
    fontFamily: 'poppins',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },

  modalText: {
    textAlign: 'justify',
    fontFamily: 'poppins',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  images: {
    width: 170,
    height: 250,
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
