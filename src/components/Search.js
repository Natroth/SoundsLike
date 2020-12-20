import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchSong } from "../actions/search";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";

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
    <div>
      <div>
        <form onSubmit={(e) => submitSearch(e)} className="searchForm">
          <input
            type="text"
            name="search_term"
            placeholder="Search Song..."
            id="searchTxt"
          />
          <input type="submit" value="Search" className="searchButton" />
        </form>
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
