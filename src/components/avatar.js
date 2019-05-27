import React from 'react';
import PropTypes from 'prop-types';

const avatar = ({ link, text, alt, size, imgClass, status }) => (
  <figure
    className={`avatar avatar-${size} text-uppercase`}
    data-initial={text.substring(0, 2)}
  >
    {link && <img src={link} className={imgClass} alt={alt} />}
    {status && <i className={`avatar-presence ${status}`} />}
  </figure>
);

avatar.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.string,
  imgClass: PropTypes.string,
  status: PropTypes.string
};

avatar.defaultProps = {
  link: '',
  text: '',
  alt: 'avatar',
  size: 'xl',
  imgClass: '',
  status: ''
};

export default avatar;
