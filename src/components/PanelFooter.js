import React from 'react';
import PropTypes from 'prop-types';
import UserForm from './forms/UserForm';
import TeamForm from './forms/TeamForm';

const PanelFooter = ({
  context,
  data,
  errors,
  buttonText,
  showForm,
  editForm,
  handleShowForm,
  handleSubmit,
  handleChange,
  handleClickAvatar,
  handleDelete,
}) => (
  <div className="panel-footer">
    {showForm &&
      context === 'user' && (
        <UserForm
          currentUser={data}
          errors={errors}
          editForm={editForm}
          handleShowForm={handleShowForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClickAvatar={handleClickAvatar}
          handleDelete={handleDelete}
        />
      )}
    {showForm &&
      context === 'team' && (
        <TeamForm
          currentTeam={data}
          errors={errors}
          editForm={editForm}
          handleShowForm={handleShowForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleClickAvatar={handleClickAvatar}
          handleDelete={handleDelete}
        />
      )}
    {!showForm && (
      <button
        className="btn btn-primary btn-block"
        type="button"
        onClick={handleShowForm}
      >
        {buttonText}
      </button>
    )}
  </div>
);

PanelFooter.propTypes = {
  context: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      message: PropTypes.string,
      users: PropTypes.array,
    }),
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
      status: PropTypes.string,
      message: PropTypes.string,
      focus_time: PropTypes.shape({
        enabled: PropTypes.bool,
        start: PropTypes.string,
        end: PropTypes.string,
      }),
    }),
  ]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  buttonText: PropTypes.string,
  showForm: PropTypes.bool.isRequired,
  editForm: PropTypes.bool.isRequired,
  handleShowForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClickAvatar: PropTypes.func,
  handleDelete: PropTypes.func.isRequired,
};

PanelFooter.defaultProps = {
  context: 'team',
  errors: null,
  buttonText: 'Add team',
  handleClickAvatar: null,
};

export default PanelFooter;
