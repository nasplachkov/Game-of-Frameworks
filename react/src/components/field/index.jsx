import React from 'react';
import PropTypes from 'prop-types';

import { capitalize } from '../../utils/string';

export function Field(props) {
  const { name, type, error, touched, value, onChange, onBlur } = props;
  const className = touched ?
    error ? 'invalid' : 'valid' :
    '';

  return (
    <div className="input-field">
      <input id={name} name={name} type={type} className={className} value={value} onChange={onChange} onBlur={onBlur} />
      <label htmlFor={name}>{capitalize(name)}</label>
      {touched && error && <div>{error}</div>}
    </div>
  );
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Field.defaultProps = {
  error: null,
  touched: false,
  value: ''
};
