/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

import { MovieShape } from "./movieShape";
import { Trailer } from "./trailer";
import { useStore } from '../../store';
import { Rating } from '../rating';
import { DetailsModal } from './detailsModal';

import movieDBService from '../../services/moviedb';

const BASE_PATH = 'https://image.tmdb.org/t/p/w500';
const MODAL_DESTROY_DELAY = 350;

export function MovieItem(props) {
  const [state] = useStore();
  const [loading, setLoading] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [isModalOpened, setModalOpened] = useState(false);
  const modalInstance = useRef(null);

  const trailerElement = document.getElementById('trailer');
  const movie = state.movies.favoriteMovies[props.movie.id] || props.movie;
  const isFavorite = !!state.movies.favoriteMovies[props.movie.id];
  const releaseDate = movie.release_date || '';
  const year = releaseDate.split('-')[0];

  const getPosterUrl = () => {
    return movie.poster_path ? BASE_PATH + movie.poster_path : '/blank-image.png';
  };

  const listGenres = (ids) => {
    if (!ids && !Array.isArray(ids)) {
      return 'N/A';
    }
    return ids
      .map(id => state.movies.genres[id] ? state.movies.genres[id].name : null)
      .filter(genre => genre)
      .join(', ');
  };

  const handleFavorite = () => {
    props.onFavoriteClick && props.onFavoriteClick(movie);
  };

  const handleTrailer = () => {
    setLoading(true);
    trailerElement.style.display = 'block';
    movieDBService
      .getMovieTrailers(movie.id)
      .then(
        (trailers) => {
          setTrailers(trailers);
          if (trailers.length === 0) {
            trailerElement.style.display = 'none';
          }
        }
      ).finally(
        () => setLoading(false)
      );
  };

  const handleTrailerClose = () => {
    setTrailers([]);
    trailerElement.style.display = '';
  };

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    if (!modalInstance.current) {
      return;
    }
    modalInstance.current.close();
    modalInstance.current = null;
    setTimeout(() => setModalOpened(false), MODAL_DESTROY_DELAY);
  };

  const submitModal = (editableData) => {
    props.onMovieEdit && props.onMovieEdit(movie.id, editableData);
    closeModal();
  };

  useEffect(() => {
    if (isFavorite) {
      const element = document.querySelectorAll(`[data-target="dropdown-${movie.id}"]`);
      window.M.Dropdown.init(element, { constrainWidth: false });
    }
  }, [movie.id, isFavorite]);

  useEffect(() => {
    if (isModalOpened) {
      const modal = document.querySelectorAll('#modal-' + movie.id);
      modalInstance.current = window.M.Modal.init(modal, {
        onCloseEnd: closeModal
      })[0];
      modalInstance.current.open();
    }
  }, [isModalOpened, movie.id]);

  return (
    <div className="row movie-item">
      <div className="col s12 m5 l3">
        <img className="movie-item-poster" src={getPosterUrl()} alt="" />
      </div>
      <div className="col s12 m7 l9 movie-item-details">
        <div className="row">
          <div className="col s12 movie-item-title">
            <b>{movie.title} {year ? `(${year})` : null}</b>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <b>Plot: </b>{movie.overview}
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <b>Genre: </b>{listGenres(movie.genre_ids)}
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <b>Rating: </b>{movie.vote_average} ({movie.vote_count} votes)
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <b>Personal Rating: </b>
            <Rating stars={movie.userRating} disabled />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <b>Personal Review: </b>
            {movie.userReview || '- - -'}
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button className="btn btn-primary waves-effect waves-light margin-button-right" onClick={handleFavorite}>
              {isFavorite ?
                <i className="material-icons red-text">favorite</i> :
                <i className="material-icons">favorite_border</i>
              }
              &nbsp;
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            &nbsp;
            <button className="btn btn-primary waves-effect waves-light" onClick={handleTrailer}>
              <i className="material-icons">play_arrow</i>
              &nbsp;
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
      {isFavorite &&
        <button className="btn-floating btn-large waves-effect waves-light dropdown-menu dropdown-trigger" data-target={'dropdown-' + movie.id}>
          <i className="material-icons dark-text">more_vert</i>
        </button>
      }
      <ul id={'dropdown-' + movie.id} className="dropdown-content">
        <li>
          <a className="modal-trigger" onClick={openModal}>
            <i className="material-icons dark-text">mode_edit</i> Add Review
          </a>
        </li>
      </ul>
      {isModalOpened &&
        <DetailsModal
          movie={movie}
          movieYear={year}
          getPosterUrl={getPosterUrl}
          listGenres={listGenres}
          onClose={closeModal}
          onSubmit={submitModal}
        />
      }
      {(loading || (trailers.length > 0 && trailers[0].key)) && 
        ReactDOM.createPortal(
          <Trailer youtubeId={trailers[0] && trailers[0].key} loading={loading} onClose={handleTrailerClose} />,
          trailerElement
        )
      }
    </div>
  );
}

MovieItem.propTypes = {
  movie: MovieShape,
  onFavoriteClick: PropTypes.func,
  onMovieEdit: PropTypes.func
};
