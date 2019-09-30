import React from 'react';
import PropTypes from 'prop-types';

import './logo.scss';

const DEFAULT_SIZE = 188;
const SIMPLE_WIDTH = 206;
const SIMPLE_HEIGHT = 63;

export function Logo(props) {
  const style = {
    width: props.simple ? SIMPLE_WIDTH : props.size,
    height: props.simple ? SIMPLE_HEIGHT : props.size
  };

  return (
      <div
        className={(props.white ? 'logo-white' : 'logo') + (props.simple ? ' simple' : '')}
        style={style}
      />
  );
}

Logo.propTypes = {
  size: PropTypes.number,
  white: PropTypes.bool,
  simple: PropTypes.bool
};

Logo.defaultProps = {
  size: DEFAULT_SIZE,
  white: false,
  simple: false
};
