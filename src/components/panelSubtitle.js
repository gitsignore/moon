import React from 'react';
import PropTypes from 'prop-types';

const panelSubtitle = ({ title, size }) => (
  <div className={`panel-subtitle ${size}`}>{title}</div>
);

panelSubtitle.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string
};

panelSubtitle.defaultProps = {
  title: '',
  size: ''
};

export default panelSubtitle;
