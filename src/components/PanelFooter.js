import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import avatars from '../constants/icons';

const PanelFooter = ({
  currentUser,
  showForm,
  editForm,
  handleShowForm,
  handleSubmit,
  handleChange,
  handleClickAvatar,
  handleDelete,
}) => (
  <div className="panel-footer">
    {showForm && (
      <div>
        <div className="columns">
          <div className="col-3 col-mr-auto">
            {editForm && (
              <button
                className="btn btn-link"
                type="button"
                onClick={handleDelete}
              >
                <i className="icon icon-delete text-error" />
              </button>
            )}
          </div>
          <div className="col-3">
            <button
              className="btn btn-link btn-action btn-lg float-right"
              type="button"
              onClick={handleShowForm}
            >
              <i className="icon icon-cross" />
            </button>
          </div>
        </div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {currentUser.avatar && (
            <div className="columns">
              <div className="column col-2 col-mx-auto">
                <figure className="avatar avatar-xl m-2">
                  <img src={currentUser.avatar} alt="avatar-icon" />
                </figure>
              </div>
            </div>
          )}
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label" htmlFor="name">
                Name
              </label>
            </div>
            <div className="col-9 col-sm-12">
              <input
                className="form-input"
                value={currentUser.name}
                onChange={handleChange}
                id="name"
                type="text"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label" htmlFor="avatar">
                Avatar url
              </label>
            </div>
            <div className="col-9 col-sm-12">
              <input
                className="form-input"
                value={currentUser.avatar}
                onChange={handleChange}
                id="avatar"
                type="text"
                placeholder="Avatar URL"
              />
              <div className="divider text-center" data-content="OR" />
              <div className="colums">
                <div className="col-12 col-mx-auto">
                  {avatars.map(avatar => (
                    <div
                      className="d-inline-block"
                      key={avatar}
                      role="button"
                      tabIndex={0}
                      onClick={handleClickAvatar}
                      onKeyPress={handleClickAvatar}
                    >
                      <figure className="avatar m-2">
                        <img src={avatar} alt="avatar-icon" />
                      </figure>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label" htmlFor="message">
                Message
              </label>
            </div>
            <div className="col-9 col-sm-12">
              <textarea
                className="form-input"
                id="message"
                value={currentUser.message}
                onChange={handleChange}
                placeholder="Current status you want to share"
                rows="3"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label" htmlFor="status">
                Status
              </label>
            </div>
            <div className="col-9 col-sm-12">
              <select
                className="form-select"
                id="status"
                multiple=""
                value={currentUser.status}
                onChange={handleChange}
              >
                <option>online</option>
                <option>busy</option>
                <option>away</option>
                <option>offline</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label">Focus time</label>
            </div>
            <div className="col-9 col-sm-12 col-ml-auto">
              <label className="form-switch">
                <input
                  type="checkbox"
                  id="focus_time_enabled"
                  checked={currentUser.focus_time.enabled}
                  onChange={handleChange}
                />
                <i className="form-icon" />
                Enable focus time ?
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-9 col-sm-12 col-ml-auto">
              <div className="form-group">
                <label className="form-label">Start time&nbsp;</label>
                <TimePicker
                  style={{ width: 100 }}
                  showSecond={false}
                  value={
                    currentUser.focus_time.start &&
                    moment().isBefore(currentUser.focus_time.start)
                      ? moment(currentUser.focus_time.start)
                      : moment()
                  }
                  defaultValue={moment()}
                  id="focus_time_start"
                  onChange={(value, id = 'start') => handleChange(value, id)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">End time&nbsp;</label>
                <TimePicker
                  style={{ width: 100 }}
                  showSecond={false}
                  value={
                    currentUser.focus_time.end &&
                    moment().isBefore(currentUser.focus_time.end)
                      ? moment(currentUser.focus_time.end)
                      : moment()
                  }
                  defaultValue={moment()}
                  id="focus_time_ent"
                  onChange={(value, id = 'end') => handleChange(value, id)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-success btn-block" type="submit">
            Submit team member
          </button>
        </form>
      </div>
    )}
    {!showForm && (
      <button
        className="btn btn-primary btn-block"
        type="button"
        onClick={handleShowForm}
      >
        Add team member
      </button>
    )}
  </div>
);

PanelFooter.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    avatar: PropTypes.string,
    status: PropTypes.string.isRequired,
    message: PropTypes.string,
    focus_time: PropTypes.shape({
      enabled: PropTypes.bool.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  showForm: PropTypes.bool.isRequired,
  editForm: PropTypes.bool.isRequired,
  handleShowForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClickAvatar: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default PanelFooter;
