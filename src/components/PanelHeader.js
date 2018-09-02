import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import status from '../helpers/status';

const PanelHeader = ({
  search,
  time,
  currentFilter,
  handleClickFilter,
  clearSearch,
  handleSearch,
}) => (
  <div className="panel-header">
    <div>
      <div className="panel-title h3 d-inline-block">
        {process.env.REACT_APP_TEAM_NAME}
      </div>
      <div className="panel-title h4 float-right d-inline-block">
        <p>{moment(time).format('HH:mm')}</p>
      </div>
    </div>
    <div>
      {Object.entries(status).map(currentStatus => (
        <span
          key={currentStatus[0]}
          className={`chip ${currentFilter === currentStatus[0] &&
            `chip-${currentStatus[1].color}`}`}
          role="button"
          tabIndex={0}
          onClick={() => handleClickFilter(currentStatus[0])}
          onKeyPress={() => handleClickFilter(currentStatus[0])}
        >
          {currentStatus[0]}
        </span>
      ))}
    </div>
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
        className="form-icon icon icon-cross"
        role="button"
        tabIndex={0}
        onClick={clearSearch}
        onKeyPress={clearSearch}
      />
    </div>
  </div>
);

PanelHeader.propTypes = {
  search: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  currentFilter: PropTypes.string,
  handleClickFilter: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

PanelHeader.defaultProps = {
  currentFilter: null,
};

export default PanelHeader;
