import React from 'react';
import moment from 'moment';
import status from '../helpers/status';

const PanelHeader = ({
  search,
  time,
  currentFilter,
  handleClickFilter,
  clearSearch,
  handleSearch
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
      {Object.entries(status).map(status => (
        <span
          key={status[0]}
          className={`chip ${currentFilter === status[0] &&
            `chip-${status[1].color}`}`}
          onClick={() => handleClickFilter(status[0])}
        >
          {status[0]}
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
      <i className="form-icon icon icon-cross" onClick={clearSearch} />
    </div>
  </div>
);

export default PanelHeader;
