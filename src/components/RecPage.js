import React from "react";
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
  if (!recSearchComplete) {
    return <Redirect to="/search" />;
  }

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
    return JSON.stringify(item, null, 2).replace(/\"/g, "");
  };

  // Only 10 recs per search

  const recTracks = results.payload.tracks;
  const tenRecTracks = recTracks.slice(-10);
  console.log(tenRecTracks);

  // play preview of song and change play button

  const playPreview = (e, songId) => {
    e.preventDefault();
    var myAudio = document.getElementById(songId);
    var playIcon = document.getElementById(songId + "ic");
    //   myAudio.paused ? (myAudio.play()) : myAudio.pause();

    if (myAudio.paused) {
      myAudio.play();
      //     $("#" + playIcon).attr("icon", { faPause });
      console.log("workd");
    } else {
      myAudio.pause();
      //   $("#" + playIcon).attr("icon", { faPlay });
      console.log("workd");
    }
  };

  return (
    <ul>
      {tenRecTracks.map((item) => {
        if (!item.images) {
          item.images = { coverart: "" };
          item.images.coverart = disc;
        }

        if (!item.hub.actions) {
          item.hub.actions = [{}, { uri: notFound }];
        }

        return (
          <li onClick={(e) => playPreview(e, cleanData(item.key))}>
            <img
              src={cleanData(item.images.coverart)}
              className="guess_cover_art"
            />
            {cleanData(item.title)} - {cleanData(item.subtitle)}
            <ReactAudioPlayer
              id={cleanData(item.key)}
              src={item.hub.actions[1].uri}
            />
            <FontAwesomeIcon icon={faPlay} id={item.key + "ic"} />
          </li>
        );
      })}
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
