import React from 'react';
import PropTypes from 'prop-types';

const tileAction = ({ action, parameter }) => (
  <div className="tile-action">
    <button
      className="btn btn-link"
      type="button"
      onClick={e => action(e, parameter)}
      onKeyPress={e => action(e, parameter)}
    >
      <i className="icon icon-edit text-warning" />
    </button>
  </div>
);

tileAction.propTypes = {
  action: PropTypes.func,
  parameter: PropTypes.string
};

tileAction.defaultProps = {
  action: null,
  parameter: ''
};

export default tileAction;
