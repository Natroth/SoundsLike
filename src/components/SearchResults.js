import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getRecs } from "../actions/recs";

const SearchResults = ({
  results,
  searchComplete,
  getRecs,
  recSearchComplete,
}) => {
  if (!searchComplete) {
    return <Redirect to="/search" />;
  }

  const cleanData = (item) => {
    return JSON.stringify(item, null, 2).replace(/\"/g, "");
  };

  const findRecs = async (e, songId) => {
    e.preventDefault();
    await getRecs(songId);
    console.log("cleared");
    return <Redirect to="/recs" />;
  };

  if (recSearchComplete) {
    return <Redirect to="/recs" />;
  }

  var songs = results.payload.tracks.hits;

  return (
    <ul>
      {songs.map((item) => (
        <li
          onClick={(e) => {
            findRecs(e, cleanData(item.track.key));
          }}
        >
          <img
            src={cleanData(item.track.images.coverart)}
            className="guess_cover_art"
          />
          {cleanData(item.track.title)} - {cleanData(item.track.subtitle)}
        </li>
      ))}
    </ul>
  );
};

SearchResults.propTypes = {
  searchComplete: PropTypes.bool,
  results: PropTypes.object,
  getRecs: PropTypes.func.isRequired,
  recSearchComplete: PropTypes.bool,
};

const mapStatetoProps = (state) => ({
  searchComplete: state.search.searchComplete,
  results: state.search.results,
  recSearchComplete: state.recs.searchComplete,
});

export default connect(mapStatetoProps, { getRecs })(SearchResults);
