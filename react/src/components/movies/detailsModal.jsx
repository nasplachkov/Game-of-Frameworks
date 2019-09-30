import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MovieShape } from "./movieShape";
import { Rating } from '../rating';

export function DetailsModal(props) {
  const movie = props.movie;
  const [userRating, setUserRating] = useState(movie.userRating);
  const [userReview, setUserReview] = useState(movie.userReview);

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  const handleReviewChange = (event) => {
    setUserReview(event.currentTarget.value);
  };

  const handleSubmit = () => {
    props.onSubmit({ userRating, userReview });
  };

  return (
    <div id={'modal-' + movie.id} className="modal movie-modal">
      <div className="modal-content">
        <div className="row">
          <div className="col s12 m5 l3">
            <img className="movie-item-poster" src={props.getPosterUrl()} alt="" />
          </div>
          <div className="col s12 m7 l9 movie-item-details">
            <div className="row">
              <div className="col s12 movie-item-title">
                <b>{movie.title} {props.movieYear ? `(${props.movieYear})` : null}</b>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <b>Plot: </b>{movie.overview}
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <b>Genre: </b>{props.listGenres(movie.genre_ids)}
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
                <Rating stars={userRating} onClick={handleRatingChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <b>Write a review</b>
                <textarea rows={6} placeholder="Type here..." value={userReview} onChange={handleReviewChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 right-align">
            <button className="btn btn-primary waves-effect waves-light margin-button-right" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-primary waves-effect waves-light" onClick={props.onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DetailsModal.propTypes = {
  movie: MovieShape,
  movieYear: PropTypes.string,
  getPosterUrl: PropTypes.func,
  listGenres: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
