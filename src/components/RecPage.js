import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const RecPage = ({ searchComplete, recSearchComplete, results }) => {
  if (!recSearchComplete) {
    return <Redirect to="/search" />;
  }

  return <div>yoyoyo</div>;
};

RecPage.propTypes = {
  searchComplete: PropTypes.bool,
  results: PropTypes.object,
  recSearchComplete: PropTypes.bool,
};

const mapStatetoProps = (state) => ({
  searchComplete: state.search.searchComplete,
  results: state.search.results,
  recSearchComplete: state.recs.searchComplete,
});
export default connect(mapStatetoProps)(RecPage);
