import React from "react";
import PropTypes from 'prop-types';

import { MovieItem } from "./item";
import { MovieShape } from "./movieShape";
import { Title } from "../title";
import { useStore } from "../../store";

function EmptyMovieList() {
  const [state] = useStore();
  return (
    <div className="row movie-list-empty">
        <Title title={
          state.movies.onlyFavorites ?
            <>
              You have no favorite movies yet.
              <br />
              Use the search on the top-right.
            </> :
            'Use the search on the top-right to find movies'
        }
        />
      </div>
  );
}

export function MovieList(props) {
  return (
    props.movies.length === 0 ?
      <EmptyMovieList /> :
      props.movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} onFavoriteClick={props.onFavoriteClick} onMovieEdit={props.onMovieEdit} />
      ))
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(MovieShape),
  onFavoriteClick: PropTypes.func,
  onMovieEdit: PropTypes.func
};

MovieList.defaultProps = {
  movies: []
};
