import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {MovieContext} from '../Context/MovieContext';
import DetailComponent from './DetailComponent';
// import SkeletonContent from 'react-native-skeleton-content';

export default function ListMovieComponent() {
  const movieContext = useContext(MovieContext);
  const [modalVisible, setModalVisible] = useState({
    display: false,
    comicId: null,
  });

  useEffect(() => {
    movieContext.fetchMovie();
  }, []);

  // if(movieContext.movie.isLoading === true){
  //   return (
  //     <>
  //     <SkeletonContent
  //     containerStyle={{ flex: 1, width: 300 }}
  //     isLoading={false}
  //     layout={[
  //       { key: 'someId', width: 220, height: 20, marginBottom: 6 },
  //       { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
  //     ]}
  //   ></SkeletonContent>
  //     </>
  //   )
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        <DetailComponent
          display={modalVisible.display}
          comicId={modalVisible.comicId}
          setDisplay={() =>
            setModalVisible({
              display: false,
            })
          }
        />
        {movieContext.movie.items?.map((item, i) => {
          const images = item.images.map(val => {
            return val.path;
          });

          return (
            <View key={i}>
              <Pressable
                onPress={() =>
                  setModalVisible(prev => ({
                    ...prev,
                    display: true,
                    comicId: item.id,
                  }))
                }>
                <Image style={styles.images} source={{uri: `${images}.jpg`}} />
              </Pressable>
            </View>
          );
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    // marginHorizontal: 50,
  },
  content: {
    marginBottom: 50,
  },
  images: {
    width: 170,
    height: 250,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  modalView: {
    margin: 20,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});
