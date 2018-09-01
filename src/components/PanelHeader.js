import React from 'react';
import moment from 'moment';
import status from '../helpers/status';

const PanelHeader = ({ time, currentFilter, handleClickFilter }) => (
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
  </div>
);

export default PanelHeader;
