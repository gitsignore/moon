import React from 'react';
import PropTypes from 'prop-types';

const chips = ({ text, color, handleClickFilter }) =>
  handleClickFilter && (
    <span
      key={text}
      className={`chip chip-${color} c-hand`}
      role="button"
      tabIndex={0}
      onClick={() => handleClickFilter(text)}
      onKeyPress={() => handleClickFilter(text)}
    >
      {text}
    </span>
  );

chips.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  handleClickFilter: PropTypes.func
};

chips.defaultProps = {
  text: '',
  color: '',
  handleClickFilter: null
};

export default chips;
