import React from 'react';
import PropTypes from 'prop-types';

export function Trailer(props) {
  const { innerWidth, innerHeight } = window;
  return (
    <>
      <div className="trailer-backdrop" onClick={props.onClose} />
      {props.loading ?
        <div className="loader" /> :
        <iframe
          title={props.youtubeId}
          width={innerWidth / 2}
          height={innerHeight / 2}
          src={`https://www.youtube.com/embed/${props.youtubeId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      }
    </>
  )
}

Trailer.propTypes = {
  youtubeId: PropTypes.string,
  loading: PropTypes.bool,
  onClose: PropTypes.func
};

Trailer.defaultProps = {
  youtubeId: '',
  loading: false
};
