import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import $ from "jquery";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import disc from "../images/disc1.webp";
import notFound from "../audio/notFound.mp3";

const RecPage = ({ searchComplete, recSearchComplete, results }) => {
  const initialPlayButton = {
    1: faPlay,
    2: faPlay,
    3: faPlay,
    4: faPlay,
    5: faPlay,
    6: faPlay,
    7: faPlay,
    8: faPlay,
    9: faPlay,
    0: faPlay,
  };

  const [playButton, setPlayButton] = useState(initialPlayButton);

  if (!recSearchComplete) {
    return <Redirect to="/search" />;
  }

  if (!results.payload.tracks) {
    return <Redirect to="/error_page" />;
  }

  // Only 10 recs per search

  const recTracks = results.payload.tracks;
  const tenRecTracks = recTracks.slice(-10);

  // one song plays at a time

  $(function () {
    $("audio").on("play", function () {
      $("audio")
        .not(this)
        .each(function (index, audio) {
          audio.pause();
        });
    });
  });

  // stringify

  const cleanData = (item) => {
    return JSON.stringify(item, null, 2).replace(/"/g, "");
  };

  // play preview of song and change play button

  const playPreview = (e, songId, index) => {
    e.preventDefault();
    var myAudio = document.getElementById(songId);

    if (myAudio.paused) {
      myAudio.play();
      setPlayButton({ ...playButton, [index]: faPause });
    } else {
      myAudio.pause();
      setPlayButton({ ...playButton, [index]: faPlay });
    }
  };

  return (
    <div>
      <h1 className="youMean">10 Songs Just For You...</h1>

      <ul className="songList">
        {tenRecTracks.map((item, index) => {
          if (!item.images) {
            item.images = { coverart: "" };
            item.images.coverart = disc;
          }

          if (!item.hub.actions) {
            item.hub.actions = [{}, { uri: notFound }];
          }

          if (!item.hub.actions[1]) {
            item.hub.actions = [{}, { uri: notFound }];
          }
          return (
            <li
              onClick={(e) => playPreview(e, cleanData(item.key), index)}
              key={index}
              className="songLine recSongLine"
            >
              <div className="songInfoRec">
                <img
                  src={cleanData(item.images.coverart)}
                  className="coverArt"
                  alt="cover-art"
                />
                {cleanData(item.title)} - {cleanData(item.subtitle)}
                <ReactAudioPlayer
                  id={cleanData(item.key)}
                  src={cleanData(item.hub.actions[1].uri)}
                />
              </div>
              <div>
                {" "}
                <FontAwesomeIcon icon={playButton[index]} />{" "}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
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
