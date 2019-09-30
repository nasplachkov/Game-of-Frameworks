import React from 'react';
import PropTypes from 'prop-types';

export function Title(props) {
  return (
      <div className="title center-align">
        {props.title}
      </div>
  );
}

Title.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired
};
