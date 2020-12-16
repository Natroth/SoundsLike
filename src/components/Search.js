import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchSong } from "../actions/search";
import { Redirect } from "react-router-dom";

const Search = ({ searchSong, searchComplete }) => {
  const submitSearch = async (e) => {
    e.preventDefault();
    var searchTerm = document.getElementById("searchTxt").value;
    await searchSong(searchTerm);
    return <Redirect to="/search_results" />;
  };

  if (searchComplete) {
    return <Redirect to="/search_results" />;
  }

  return (
    <div>
      <form onSubmit={(e) => submitSearch(e)}>
        <input
          type="text"
          name="search_term"
          placeholder="Search Song..."
          id="searchTxt"
        />
        <input type="submit" />
      </form>
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
