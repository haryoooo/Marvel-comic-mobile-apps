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
      limit: 20,
    },
  });
  const [isSearch, setIsSearch] = useState(false);

  const fetchMovie = () => {
    setMovie(prev => ({
      ...prev,
      isLoading: true,
    }));
    axios
      .get(`${url}?${queryString.stringify(movie.parameters)}`)
      .then(response => {
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
