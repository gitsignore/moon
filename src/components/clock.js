import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const clock = ({ size, time }) => (
  <div className={`panel-title ${size}`}>{moment(time).format('HH:mm')}</div>
);

clock.propTypes = {
  size: PropTypes.string,
  time: PropTypes.number.isRequired
};

clock.defaultProps = {
  size: 'h4'
};

export default clock;
