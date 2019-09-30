import PropTypes from 'prop-types';

export const MovieShape = PropTypes.shape({
  posterPath: PropTypes.string,
  adult: PropTypes.bool,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.number,
  original_title: PropTypes.string,
  original_language: PropTypes.string,
  title: PropTypes.string,
  backdrop_path: PropTypes.string,
  popularity: PropTypes.number,
  vote_count: PropTypes.number,
  video: PropTypes.bool,
  vote_average: PropTypes.number
});
