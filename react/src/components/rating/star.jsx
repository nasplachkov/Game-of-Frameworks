import React from "react";
import PropTypes from "prop-types";

export function Star(props) {
  const handleEnter = () => {
    props.onHover && props.onHover(props.index, true);
  };

  const handleLeave = () => {
    props.onHover && props.onHover(props.index, false);
  };

  const handleClick = () => {
    props.onClick && props.onClick(props.index);
  };

  return (
    <div 
      className={
        'star' + (props.filled ? ' filled' : '') +
        (props.hover && !props.filled ? ' hover' : '') +
        (!props.onHover ? ' disabled' : '')
      }
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <i className="material-icons">star</i>
    </div>
  )
}

Star.propTypes = {
  filled: PropTypes.bool,
  hover: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func,
  onHover: PropTypes.func
};

Star.defaultProps = {
  filled: false,
  hover: false
};
