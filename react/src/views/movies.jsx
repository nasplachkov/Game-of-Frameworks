/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect } from 'react';

import { debounce } from "../utils/debounce";

import { useStore, setGenres, showFavorites, setMovies, setSearch, addToFavorites, editMovie } from '../store';
import { Header } from "../components/header";
import { MovieList } from "../components/movies";

import movieDBService from '../services/moviedb';
import moviesService from '../services/movies';

const SEARCH_DELAY = 500;

const movieSearch = debounce((text, callback) => {
  if (!text) {
    callback();
    return;
  }
  movieDBService
    .search(text)
    .then(callback);
}, SEARCH_DELAY);

export function Movies() {
  const [state, dispatch] = useStore();

  const handleSearch = (text) => {
    movieSearch(text, (movies) => dispatch(setMovies(movies || [])));
    dispatch(setSearch(text));
  };

  const handleFavorite = (movie) => {
    let promise;

    if (state.movies.favoriteMovies[movie.id]) {
      promise = moviesService.removeFromFavorites(movie);
    } else {
      promise = moviesService.addToFavorites(movie);
    }

    promise.then(
      () => {
        dispatch(addToFavorites(movie));
      }
    );
  };

  const handleMovieEdit = (movieId, editedData) => {
    dispatch(editMovie(movieId, editedData));
    moviesService.editFavoriteMovie(movieId, editedData);
  };

  const handleFavorites = () => {
    dispatch(showFavorites(!state.movies.onlyFavorites));
  };

  useEffect(() => {
    if (Object.keys(state.movies.genres).length > 0) {
      return;
    }
    movieDBService
      .getGenres()
      .then((genres) => dispatch(setGenres(genres)));
  }, []);

  useEffect(() => {
    moviesService.getFavorites();
  }, []);

  return (
    <div className="container">
      <Header search={state.movies.search} onSearch={handleSearch} />
      <div className="row">
        <div className="col s12">
          <label className="right">
            <input type="checkbox" checked={state.movies.onlyFavorites} onChange={handleFavorites} />
            <span>Show Favorites</span>
          </label>
        </div>
      </div>
      <MovieList
        movies={state.movies.onlyFavorites ? Object.values(state.movies.favoriteMovies) : state.movies.movies}
        onFavoriteClick={handleFavorite}
        onMovieEdit={handleMovieEdit}
      />
    </div>
  );
}
