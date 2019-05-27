import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import TileAction from './tileAction';
import TileIcon from './tileIcon';
import TileContent from './tileContent';
import displayedStatus from '../helpers/status';
import { filterTeamsBySearch, sortUsersListByPriority } from '../helpers/list';
import isBusy from '../helpers/time';
import TeamCollection from '../models/TeamCollection';
import UserCollection from '../models/UserCollection';

const PanelBody = ({
  dataCollection,
  search,
  time,
  currentFilter,
  handleEdit
}) => {
  const data = dataCollection.getData();

  if (dataCollection instanceof TeamCollection) {
    return filterTeamsBySearch(data, search).map(team => (
      <Link
        key={team.id}
        to={`/${team.id}`}
        className="panel-body text-primary text-no-underline"
      >
        <div className="tile">
          <TileIcon link={team.avatar} text={team.name} />
          <TileContent title={team.name} subtitle={team.message} />
          <TileAction action={handleEdit} parameter={team.id} />
        </div>
        <div className="divider" />
      </Link>
    ));
  }

  return sortUsersListByPriority(data, currentFilter, search).map(user => {
    const startTime = moment(user.focus_time.start);
    const endTime = moment(user.focus_time.end);
    const userIsBusy = isBusy(startTime, endTime, time);
    const userInFocusTime = userIsBusy && user.focus_time.enabled;
    const status =
      user.focus_time && user.focus_time.enabled && userIsBusy
        ? 'busy'
        : user.status;
    const timeline = endTime.diff(startTime, 'seconds');
    const remainingTime = endTime.diff(time, 'minutes');
    const progressTime = (
      100 -
      (endTime.diff(time, 'seconds') * 100) / timeline
    ).toFixed(1);

    return (
      <div key={user.id} className="panel-body c-hand">
        <div
          className="tile"
          role="button"
          tabIndex={0}
          onClick={() => handleEdit(user.id)}
          onKeyPress={() => handleEdit(user.id)}
        >
          <TileIcon
            link={user.avatar}
            text={user.name}
            imgClass={userInFocusTime ? 'img-focus_time' : ''}
            status={status}
          />
          <div className="tile-content">
            <p
              className={`tile-title text-bold m-0 ${userInFocusTime &&
                'text-focus_time'}`}
            >
              {user.name}
              {user.location && (
                <span className="label text-normal ml-2">{user.location}</span>
              )}
            </p>
            <p className="m-0">
              <span className={`label label-${displayedStatus[status].color}`}>
                {displayedStatus[status].text}
              </span>
            </p>
            <p className="tile-subtitle m-0">{user.message}</p>
          </div>
          {user.focus_time &&
            user.focus_time.enabled &&
            !moment(time).isAfter(endTime) && (
              <div className="tile-action">
                <p className={userIsBusy ? 'text-focus_time' : 'text-warning'}>
                  {`${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`}
                </p>
                {!moment(time).isBefore(startTime) && (
                  <div className="bar">
                    <div
                      className="bar-item tooltip"
                      data-tooltip={`${remainingTime + 1}min left`}
                      role="progressbar"
                      style={{
                        width: `${progressTime}%`
                      }}
                    >
                      {`${remainingTime + 1}min left`}
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
        <div className="divider" />
      </div>
    );
  });
};

PanelBody.propTypes = {
  dataCollection: PropTypes.oneOfType([
    PropTypes.instanceOf(TeamCollection),
    PropTypes.instanceOf(UserCollection)
  ]).isRequired,
  search: PropTypes.string.isRequired,
  time: PropTypes.number,
  currentFilter: PropTypes.string,
  handleEdit: PropTypes.func.isRequired
};

PanelBody.defaultProps = {
  currentFilter: null,
  time: null
};

export default PanelBody;
