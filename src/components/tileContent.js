import React from 'react';
import PropTypes from 'prop-types';

const tileContent = ({ title, subtitle }) => (
  <div className="tile-content">
    <p className="tile-title text-bold m-0">{title}</p>
    <p className="tile-subtitle m-0">{subtitle}</p>
  </div>
);

tileContent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

tileContent.defaultProps = {
  title: '',
  subtitle: ''
};

export default tileContent;
