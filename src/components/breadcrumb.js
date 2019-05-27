import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const breadcrumb = ({ pathUri, pathName, uri, title }) => (
  <ul className="breadcrumb">
    <li className="breadcrumb-item">
      <Link to={pathUri}>{pathName}</Link>
    </li>
    {uri && (
      <li className="breadcrumb-item">
        <Link to={`/${uri}`}>{title}</Link>
      </li>
    )}
  </ul>
);

breadcrumb.propTypes = {
  pathName: PropTypes.string,
  pathUri: PropTypes.string,
  uri: PropTypes.string,
  title: PropTypes.string
};

breadcrumb.defaultProps = {
  pathName: 'workspaces',
  pathUri: '/',
  uri: null,
  title: null
};

export default breadcrumb;
