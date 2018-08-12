import React from 'react';
import moment from 'moment';

const PanelHeader = ({ time }) => (
  <div className="panel-header">
    <div className="panel-title h3 d-inline-block">
      {process.env.REACT_APP_TEAM_NAME}
    </div>
    <div className="panel-title h4 float-right d-inline-block">
      <p>{moment(time).format('HH:mm')}</p>
    </div>
  </div>
);

export default PanelHeader;
