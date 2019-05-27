import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';

const tileIcon = props => (
  <div className="tile-icon">
    <Avatar {...props} />
  </div>
);

tileIcon.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.string,
  imgClass: PropTypes.string,
  status: PropTypes.string
};

tileIcon.defaultProps = {
  link: '',
  text: '',
  alt: 'avatar',
  size: 'xl',
  imgClass: '',
  status: ''
};

export default tileIcon;
