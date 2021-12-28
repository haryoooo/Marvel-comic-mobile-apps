import axios from 'axios';
import queryString from 'query-string';
import React, {createContext, useEffect, useState} from 'react';
import {url} from '../Helpers/urlConfig';
import {API_KEY, hash} from '../Helpers/apiConfig';

export const MovieContext = createContext();

const MovieContextProvider = ({children}) => {
  const [movie, setMovie] = useState({
    isLoading: false,
    items: [],
    parameters: {
      ts: 1,
      apikey: API_KEY,
      hash: hash,
      format: 'comic',
      formatType: 'comic',
      startYear: '2000',
      orderBy: 'title',
      // limit: 20,
    },
    titleStartsWith: '',
  });
  const [isSearch, setIsSearch] = useState(false);

  const fetchMovie = () => {
    setMovie(prev => ({
      ...prev,
      isLoading: true,
    }));
    axios
      .get(
        `${url}?${queryString.stringify(
          movie.titleStartsWith === ''
            ? movie.parameters
            : {...movie.parameters, titleStartsWith: movie.titleStartsWith},
        )}`,
      )
      .then(response => {
        // console.log(response.data.data.results);
        const data = [];
        data.push(response.data.data.results);

        if (response.data.code === 200) {
          setMovie(prev => ({
            ...prev,
            items: response.data.data.results,
            isLoading: false,
          }));
        }
      })

      .catch(err => {
        console.log(err);
      });
  };
  // console.log({...movie.parameters, titleStartsWith: movie.titleStartsWith});

  return (
    <MovieContext.Provider
      value={{
        movie,
        fetchMovie,
        setMovie,
        isSearch,
        setIsSearch,
      }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
