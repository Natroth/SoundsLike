import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { resetSearch } from "../actions/search";
import { resetRecs } from "../actions/recs";
import { connect } from "react-redux";

const Error = ({
  resetSearch,
  resetRecs,
  searchComplete,
  results,
  recResults,
}) => {
  const goBack = () => {
    resetRecs();
    resetSearch();
  };

  if (!searchComplete && !results && !recResults) {
    return <Redirect to="/search" />;
  }

  return (
    <div>
      <div>Hmm... We Couldn't Find Anything Matching Your Search</div>
      <span onClick={() => goBack()}>Try again with something else?</span>
    </div>
  );
};

Error.propTypes = {
  resetSearch: PropTypes.func.isRequired,
  resetRecs: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  searchComplete: state.search.searchComplete,
  results: state.search.results,
  recResults: state.recs.results,
  recSearchComplete: state.recs.searchComplete,
});

export default connect(mapStatetoProps, { resetRecs, resetSearch })(Error);
