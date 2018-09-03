import React from 'react';
import PropTypes from 'prop-types';
import TeamModel from '../../models/TeamModel';

const TeamForm = ({
  currentTeam,
  errors,
  editForm,
  handleShowForm,
  handleSubmit,
  handleChange,
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
      {currentTeam.avatar && (
        <div className="columns m-2">
          <div className="col-12 col-mx-auto text-center">
            <figure className="avatar avatar-xl m-2">
              <img src={currentTeam.avatar} alt="avatar-icon" />
            </figure>
          </div>
        </div>
      )}
      {!editForm && (
        <div className={`form-group ${errors && errors.name ? 'has-error' : ''}`}>
          <div className="col-3 col-sm-12">
            <label className="form-label" htmlFor="name">
              Name
            </label>
          </div>
          <div className="col-9 col-sm-12">
            <input
              className="form-input"
              value={currentTeam.name}
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
      )}
      {editForm && (
        <div className="form-group">
          <div className="col-3 col-sm-12">
            <label className="form-label" htmlFor="name">
              Name
            </label>
          </div>
          <div className="col-9 col-sm-12">
            <div className="form-input">{currentTeam.name}</div>
          </div>
        </div>
      )}
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
            value={currentTeam.avatar}
            onChange={handleChange}
            id="avatar"
            type="text"
            placeholder="Avatar URL"
          />
          {errors &&
            errors.avatar && (
              <p className="form-input-hint">{errors.avatar.msg}</p>
            )}
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
            value={currentTeam.message}
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
      <button className="btn btn-success btn-block" type="submit">
        Submit
      </button>
    </form>
  </div>
);

TeamForm.propTypes = {
  currentTeam: PropTypes.instanceOf(TeamModel).isRequired,
  errors: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  editForm: PropTypes.bool.isRequired,
  handleShowForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

TeamForm.defaultProps = {
  errors: null,
};

export default TeamForm;
