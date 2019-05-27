import React from 'react';
import PropTypes from 'prop-types';

const panelTitle = ({ title, size }) => (
  <div className={`panel-title ${size}`}>{title}</div>
);

panelTitle.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string
};

panelTitle.defaultProps = {
  title: '',
  size: 'h3'
};

export default panelTitle;
