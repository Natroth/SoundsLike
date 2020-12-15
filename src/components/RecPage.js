import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const RecPage = ({ searchComplete, recSearchComplete, results }) => {
  if (!recSearchComplete) {
    return <Redirect to="/search" />;
  }

  const cleanData = (item) => {
    return JSON.stringify(item, null, 2).replace(/\"/g, "");
  };

  const recTracks = results.payload.tracks;
  const tenRecTracks = recTracks.slice(-10);
  console.log(tenRecTracks);

  return (
    <ul>
      {tenRecTracks.map((item) => (
        <li>
          <img
            src={cleanData(item.images.coverart)}
            className="guess_cover_art"
          />
          {cleanData(item.title)} - {cleanData(item.subtitle)}
        </li>
      ))}
    </ul>
  );
};

RecPage.propTypes = {
  searchComplete: PropTypes.bool,
  results: PropTypes.object,
  recSearchComplete: PropTypes.bool,
};

const mapStatetoProps = (state) => ({
  searchComplete: state.search.searchComplete,
  results: state.recs.results,
  recSearchComplete: state.recs.searchComplete,
});
export default connect(mapStatetoProps)(RecPage);
