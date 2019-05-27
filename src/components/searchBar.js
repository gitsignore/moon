import React from 'react';
import PropTypes from 'prop-types';

const searchBar = ({ search, clearSearch, handleSearch }) => (
  <div className="has-icon-right mt-2">
    <input
      id="search"
      className="form-input"
      type="text"
      value={search}
      onChange={handleSearch}
      placeholder="Search"
    />
    <i
      className="form-icon icon icon-cross c-hand mr-2"
      role="button"
      tabIndex={0}
      onClick={clearSearch}
      onKeyPress={clearSearch}
    />
  </div>
);

searchBar.propTypes = {
  search: PropTypes.string,
  clearSearch: PropTypes.func,
  handleSearch: PropTypes.func
};

searchBar.defaultProps = {
  search: '',
  clearSearch: null,
  handleSearch: null
};

export default searchBar;
