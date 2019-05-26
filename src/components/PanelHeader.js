import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import status from '../helpers/status';

const PanelHeader = ({
  title,
  subtitle,
  avatar,
  uri,
  search,
  time,
  showBackLink,
  currentFilter,
  handleClickFilter,
  clearSearch,
  handleSearch
}) => (
  <div className="panel-header">
    {showBackLink && (
      <div className="col-12 col-mx-auto">
        <div className="col-8 d-inline-block">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Workspaces</Link>
            </li>
            {uri && (
              <li className="breadcrumb-item">
                <Link to={`/${uri}`}>{title}</Link>
              </li>
            )}
          </ul>
        </div>
        {time && (
          <div className="col-4 d-inline-block text-right">
            <div className="panel-title h4">{moment(time).format('HH:mm')}</div>
          </div>
        )}
        <div className="divider" />
      </div>
    )}
    <div className="col-12 col-mx-auto text-center">
      {avatar && (
        <figure className="avatar avatar-xl">
          <img src={avatar} alt="Avatar" />
        </figure>
      )}
      <div className="panel-title h3">{title}</div>
    </div>
    <div className="col-12 col-mx-auto text-center">
      {subtitle && <div className="panel-subtitle">{subtitle}</div>}
    </div>
    <div className="text-center m-2">
      {handleClickFilter &&
        Object.entries(status).map(currentStatus => (
          <span
            key={currentStatus[0]}
            className={`chip ${currentFilter === currentStatus[0] &&
              `chip-${currentStatus[1].color}`} c-hand`}
            role="button"
            tabIndex={0}
            onClick={() => handleClickFilter(currentStatus[0])}
            onKeyPress={() => handleClickFilter(currentStatus[0])}
          >
            {currentStatus[0]}
          </span>
        ))}
    </div>
    {handleSearch && (
      <div className="has-icon-right mt-2">
        <input
          id="search"
          className="form-input"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search"
        />
        <i
          className="form-icon icon icon-cross c-hand"
          role="button"
          tabIndex={0}
          onClick={clearSearch}
          onKeyPress={clearSearch}
        />
      </div>
    )}
  </div>
);

PanelHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  avatar: PropTypes.string,
  uri: PropTypes.string,
  search: PropTypes.string,
  time: PropTypes.number,
  showBackLink: PropTypes.bool,
  currentFilter: PropTypes.string,
  handleClickFilter: PropTypes.func,
  clearSearch: PropTypes.func,
  handleSearch: PropTypes.func
};

PanelHeader.defaultProps = {
  title: 'Workspaces',
  subtitle: '',
  avatar: null,
  uri: null,
  search: '',
  time: null,
  showBackLink: false,
  currentFilter: null,
  handleClickFilter: null,
  clearSearch: null,
  handleSearch: null
};

export default PanelHeader;
