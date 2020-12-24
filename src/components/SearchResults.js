import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getRecs } from "../actions/recs";
import disc from "../images/disc1.webp";
import ReactLoading from "react-loading";

const SearchResults = ({
  results,
  searchComplete,
  getRecs,
  recSearchComplete,
}) => {
  if (!searchComplete) {
    return <Redirect to="/search" />;
  }

  if (!results.payload.tracks) {
    return <Redirect to="/error_page" />;
  }
  const cleanData = (item) => {
    return JSON.stringify(item, null, 2).replace(/"/g, "");
  };

  const findRecs = async (e, songId) => {
    e.preventDefault();
    const loader = document.querySelector("#loader");
    loader.style.display = "block";
    await getRecs(songId);
    loader.style.display = "none";
    return <Redirect to="/recs" />;
  };

  if (recSearchComplete) {
    return <Redirect to="/recs" />;
  }

  var songs = results.payload.tracks.hits;

  return (
    <div style={{ height: "100vh" }}>
      <h1 className="youMean outlineFont">Did You Mean...</h1>
      <ul className="songList">
        {songs.map((item, index) => {
          if (!item.track.images) {
            item.track.images = { coverart: "" };
            item.track.images.coverart = disc;
          }
          return (
            <li
              onClick={(e) => {
                findRecs(e, cleanData(item.track.key));
              }}
              key={index}
              className="songLine"
            >
              <img
                src={cleanData(item.track.images.coverart)}
                className="coverArt"
                alt="cover-art"
              />
              <div className="songTitleArtist">
                {" "}
                {cleanData(item.track.title)} - {cleanData(item.track.subtitle)}{" "}
              </div>
            </li>
          );
        })}
      </ul>
      <div id="loader" style={{ display: "none" }}>
        <ReactLoading
          type={"bars"}
          color={"#e3e3e3"}
          height={"8rem"}
          width={"8rem"}
          className="loader"
        />
      </div>
    </div>
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
