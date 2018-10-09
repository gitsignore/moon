import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import avatars from '../../constants/icons';
import userModel from '../../models/UserModel';
import status from '../../helpers/status';

const UserForm = ({
  currentUser,
  errors,
  editForm,
  handleShowForm,
  handleSubmit,
  handleChange,
  handleClickAvatar,
  handleDelete,
}) => (
  <div>
    <div className="columns">
      <div className="col-3 col-mr-auto">
        {editForm && (
          <button className="btn btn-link" type="button" onClick={handleDelete}>
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
        <div className="columns m-2">
          <div className="col-2 col-mx-auto text-center">
            <figure className="avatar avatar-xl m-2">
              <img src={currentUser.avatar} alt="avatar-icon" />
            </figure>
          </div>
        </div>
      )}
      <div className={`form-group ${errors && errors.name ? 'has-error' : ''}`}>
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
          {errors &&
            errors.name && <p className="form-input-hint">{errors.name.msg}</p>}
        </div>
      </div>
      <div
        className={`form-group ${errors && errors.avatar ? 'has-error' : ''}`}
      >
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
          {errors &&
            errors.avatar && (
              <p className="form-input-hint">{errors.avatar.msg}</p>
            )}
          <div className="divider text-center" data-content="OR" />
          <div className="colums">
            <div className="col-12 col-mx-auto text-center">
              {avatars.map(avatar => (
                <div
                  className="d-inline-block c-hand"
                  key={avatar}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleClickAvatar(avatar)}
                  onKeyPress={() => handleClickAvatar(avatar)}
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
      <div
        className={`form-group ${errors && errors.message ? 'has-error' : ''}`}
      >
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
          {errors &&
            errors.message && (
              <p className="form-input-hint">{errors.message.msg}</p>
            )}
        </div>
      </div>
      <div
        className={`form-group ${errors && errors.status ? 'has-error' : ''}`}
      >
        <div className="col-3 col-sm-12">
          <label className="form-label" htmlFor="status">
            Status
          </label>
        </div>
        <div className="col-9 col-sm-12">
          <div className="text-center m-2">
            {Object.entries(status).map(currentStatus => (
              <span
                key={currentStatus[0]}
                className={`chip ${currentUser.status === currentStatus[0] &&
                  `chip-${currentStatus[1].color}`} c-hand`}
                role="button"
                tabIndex={0}
                onClick={() =>
                  handleChange({ value: currentStatus[0] }, 'status')
                }
                onKeyPress={() =>
                  handleChange({ value: currentStatus[0] }, 'status')
                }
              >
                {currentStatus[0]}
              </span>
            ))}
          </div>
          {errors &&
            errors.status && (
              <p className="form-input-hint">{errors.status.msg}</p>
            )}
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
        Submit
      </button>
    </form>
  </div>
);

UserForm.propTypes = {
  currentUser: PropTypes.instanceOf(userModel).isRequired,
  editForm: PropTypes.bool.isRequired,
  handleShowForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClickAvatar: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default UserForm;
