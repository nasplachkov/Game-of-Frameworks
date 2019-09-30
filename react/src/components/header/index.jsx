import React from 'react';
import PropTypes from 'prop-types';

import { Logo } from "../logo";
import { Field } from "../field";

export function Header(props) {
  const handleSearch = (event) => props.onSearch(event.currentTarget.value);

  return (
    <div className="row header">
      <div className="col s12 m6">
        <Logo white simple />
      </div>
      <div className="col s12 m6 l4 push-l2">
        <Field name="search" type="text" value={props.search} onChange={handleSearch} />
      </div>
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func
};

Header.defaultProps = {
  search: '',
  onSearch: () => {}
};
