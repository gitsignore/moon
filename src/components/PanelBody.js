import React from 'react';
import moment from 'moment';
import displayedStatus from '../constants/status';
import isBusy from '../constants/time';

const PanelBody = ({ users, handleEdit, time }) => (
  <div className="panel-body text-left">
    {users.map(user => {
      const startTime = moment(user.focus_time.start);
      const endTime = moment(user.focus_time.end);
      const status =
        user.focus_time &&
        user.focus_time.enabled &&
        isBusy(startTime, endTime, time)
          ? 'busy'
          : user.status;
      const timeline = endTime.diff(startTime, 'seconds');
      const remainingTime = endTime.diff(time, 'minutes');
      const progressTime = (
        100 -
        (endTime.diff(time, 'seconds') * 100) / timeline
      ).toFixed(1);
      return (
        <div key={user.id}>
          <div className="tile" onClick={() => handleEdit(user.id)}>
            <div className="tile-icon">
              <figure
                className="avatar avatar-xl text-uppercase"
                data-initial={user.name.substring(0, 2)}
              >
                {user.avatar && <img src={user.avatar} alt="Avatar" />}
                <i className={`avatar-presence ${status}`} />
              </figure>
            </div>
            <div className="tile-content">
              <p className="tile-title text-bold m-0">{user.name}</p>
              <p className="m-0">
                <span
                  className={`label label-${displayedStatus[status].color}`}
                >
                  {displayedStatus[status].text}
                </span>
              </p>
              <p className="tile-subtitle m-0">{user.message}</p>
            </div>
            {user.focus_time &&
              user.focus_time.enabled &&
              !moment(time).isAfter(endTime) && (
                <div className="tile-action">
                  <p
                    className={
                      isBusy(startTime, endTime, time)
                        ? 'text-error'
                        : 'text-warning'
                    }
                  >{`${startTime.format('HH:mm')} - ${endTime.format(
                    'HH:mm'
                  )}`}</p>
                  {!moment(time).isBefore(startTime) && (
                    <div className="bar">
                      <div
                        className="bar-item tooltip"
                        data-tooltip={`${remainingTime}min left`}
                        role="progressbar"
                        style={{
                          width: `${progressTime}%`
                        }}
                      >
                        {`${remainingTime}min left`}
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
          <div className="divider" />
        </div>
      );
    })}
  </div>
);

export default PanelBody;
