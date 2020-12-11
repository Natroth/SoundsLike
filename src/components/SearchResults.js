import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const SearchResults = ({ results, searchComplete }) => {
  if (!searchComplete) {
    return <Redirect to="/search" />;
  }

  const cleanData = (item) => {
    return JSON.stringify(item, null, 2).replace(/\"/g, "");
  };

  var songs = results.payload.tracks.hits;

  return (
    <ul>
      {songs.map((item) => (
        <li>
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
};

const mapStatetoProps = (state) => ({
  searchComplete: state.search.searchComplete,
  results: state.search.results,
});

export default connect(mapStatetoProps)(SearchResults);
