import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchSong } from "../actions/search";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import logo from "../images/logo.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ searchSong, searchComplete }) => {
  const submitSearch = async (e) => {
    e.preventDefault();
    const loader = document.querySelector("#loader");
    var searchTerm = document.getElementById("searchTxt").value;
    loader.style.display = "block";
    await searchSong(searchTerm);
    loader.style.display = "none";
    return <Redirect to="/search_results" />;
  };

  if (searchComplete) {
    return <Redirect to="/search_results" />;
  }

  return (
    <div style={{ height: "100vh" }}>
      <div className="searchPageWrapper">
        <img src={logo} alt="logo" className="logo" />
        <p className="explain outlineFont">
          Search up your favorite song and find 10 songs that you are bound to
          love. Give it a try!{" "}
        </p>
        <div>
          <form onSubmit={(e) => submitSearch(e)} className="searchForm">
            <input
              type="text"
              name="search_term"
              placeholder="Search Song..."
              id="searchTxt"
              className="searchBar"
            />
            <button type="submit" className="searchButton">
              <FontAwesomeIcon icon={faSearch} />{" "}
            </button>
          </form>
        </div>
      </div>
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

Search.propTypes = {
  searchSong: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  searchComplete: state.search.searchComplete,
});
export default connect(mapStatetoProps, { searchSong })(Search);
