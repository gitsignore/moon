import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';
import Breadcrumb from './breadcrumb';
import Clock from './clock';
import Avatar from './avatar';
import PanelTitle from './panelTitle';
import PanelSubtitle from './panelSubtitle';
import Chip from './chip';
import status from '../helpers/status';
import moon from '../assets/images/moon.png';

const PanelHeader = ({
  title,
  subtitle,
  avatar,
  uri,
  search,
  time,
  currentFilter,
  handleClickFilter,
  clearSearch,
  handleSearch
}) => (
  <div className="panel-header">
    <div className="col-12 d-inline-block text-center show-xs">
      <img src={moon} className="logo" alt="moon-logo" />
      <p className="h1 d-inline-block">&nbsp;Moon</p>
    </div>
    <div className="col-12 col-mx-auto">
      <div className="col-xs-8 col-4 d-inline-block">
        <Breadcrumb uri={uri} title={title} />
      </div>
      <div className="col-4 d-inline-block text-center hide-xs">
        <img src={moon} className="logo" alt="moon-logo" />
        <p className="h1 d-inline-block">&nbsp;Moon</p>
      </div>
      {time && (
        <div className="col-4 d-inline-block text-right">
          <Clock time={time} />
        </div>
      )}
      {title && <div className="divider" />}
    </div>
    <div className="col-12 col-mx-auto text-center">
      {avatar && <Avatar link={avatar} />}
      <PanelTitle title={title} />
    </div>
    <div className="col-12 col-mx-auto text-center">
      <PanelSubtitle title={subtitle} />
    </div>
    <div className="text-center m-2">
      {Object.entries(status).map(currentStatus => (
        <Chip
          key={currentStatus[0]}
          text={currentStatus[0]}
          color={
            currentFilter === currentStatus[0] ? currentStatus[1].color : ''
          }
          handleClickFilter={handleClickFilter}
        />
      ))}
    </div>
    {handleSearch && (
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
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
  currentFilter: PropTypes.string,
  handleClickFilter: PropTypes.func,
  clearSearch: PropTypes.func,
  handleSearch: PropTypes.func
};

PanelHeader.defaultProps = {
  title: '',
  subtitle: '',
  avatar: null,
  uri: null,
  search: '',
  time: null,
  currentFilter: null,
  handleClickFilter: null,
  clearSearch: null,
  handleSearch: null
};

export default PanelHeader;
