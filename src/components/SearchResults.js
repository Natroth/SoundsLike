import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const SearchResults = ({ hits, searchComplete }) => {
  if (!searchComplete) {
    return <Redirect to="/search" />;
  }

  return <div>{hits}</div>;
};

SearchResults.propTypes = {
  hits: PropTypes.array.isRequired,
  tracks: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  searchComplete: state.search.searchComplete,
});

export default connect(mapStatetoProps)(SearchResults);
