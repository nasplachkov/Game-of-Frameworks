import React, { useState } from "react";
import PropTypes from "prop-types";

import { Star } from "./star";

const MAX_STARS = 5;

export function Rating(props) {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleHover = (hoverIndex, isEnter) => {
    if (isEnter) {
      setHoverIndex(hoverIndex);
    } else {
      setHoverIndex(-1);
    }
  };

  const handleClick = (starIndex) => {
    if (props.onClick) {
      props.onClick(starIndex + 1);
    }
  };

  const stars = [];
  for (let i = 0; i < MAX_STARS; i++) {
    stars.push(
      props.disabled ?
        <Star key={i} index={i} filled={i + 1 <= props.stars} /> :
        <Star key={i} index={i} filled={i + 1 <= props.stars} hover={i <= hoverIndex} onClick={handleClick} onHover={handleHover} />
    );
  }

  return (
    <div className="rating">
      {stars}
    </div>
  )
}

Rating.propTypes = {
  stars: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Rating.defaultProps = {
  disabled: false,
  stars: 0
};
