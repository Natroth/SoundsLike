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
    <div>
      <ul>
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
            >
              <img
                src={cleanData(item.track.images.coverart)}
                className="guess_cover_art"
                alt="cover-art"
              />
              {cleanData(item.track.title)} - {cleanData(item.track.subtitle)}
            </li>
          );
        })}
      </ul>
      <div id="loader" style={{ display: "none" }}>
        <p>Please Wait While We Find What You're Looking For </p>
        <ReactLoading
          type={"bars"}
          color={"linear-gradient(#24a4af, #696969)"}
          height={"20%"}
          width={"20%"}
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
